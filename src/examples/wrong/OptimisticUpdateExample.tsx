import React, {
  useState,
  useEffect,
  useOptimistic,
  startTransition,
} from "react";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

type WithPending = Todo & {
  pending?: boolean;
};

const mockTodos: Todo[] = [
  { id: 1, text: "Learn React", completed: false },
  { id: 2, text: "Master TypeScript", completed: true },
  { id: 3, text: "Build Projects", completed: false },
];

const api = {
  getTodos: async (): Promise<Todo[]> => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return JSON.parse(localStorage.getItem("todos") || "[]");
  },

  updateTodo: async (todo: Todo): Promise<Todo> => {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    const todos = JSON.parse(localStorage.getItem("todos") || "[]");
    const updatedTodos = todos.map((t: Todo) => (t.id === todo.id ? todo : t));
    localStorage.setItem("todos", JSON.stringify(updatedTodos));

    // Simulate random API failure
    if (Math.random() < 0.3) {
      throw new Error("Failed to update todo");
    }

    return todo;
  },
};

// Initialize storage
const initStorage = () => {
  if (!localStorage.getItem("todos")) {
    localStorage.setItem("todos", JSON.stringify(mockTodos));
  }
};
initStorage();

export const OptimisticUpdateExample: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadTodos = async () => {
    try {
      const data = await api.getTodos();
      setTodos(data);
    } catch (err) {
      setError("Failed to load todos");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadTodos();
  }, []);

  const [optimisticTodos, setOptimisticTodos] = useOptimistic(
    todos as WithPending[],
    (prev, updatedTodo: WithPending) => {
      return prev.map((todo) => {
        if (updatedTodo.id === todo.id) {
          return { ...updatedTodo, pending: true };
        }
        return todo;
      });
    }
  );

  const handleToggle = (todo: Todo) =>
    startTransition(async () => {
      const updatedTodo = { ...todo, completed: !todo.completed };

      setOptimisticTodos(updatedTodo);

      await api.updateTodo(updatedTodo);
      await loadTodos();
    });

  if (isLoading) {
    return (
      <div
        style={{
          padding: "20px",
          textAlign: "center",
          backgroundColor: "#f3f4f6",
          borderRadius: "4px",
        }}
      >
        Loading...
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Wrong Optimistic Update Implementation</h2>

      {error && (
        <div
          style={{
            padding: "12px",
            backgroundColor: "#fee2e2",
            color: "#dc2626",
            borderRadius: "4px",
            marginBottom: "16px",
          }}
        >
          {error}
        </div>
      )}

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        }}
      >
        {optimisticTodos.map((todo) => (
          <div
            key={todo.id}
            style={{
              display: "flex",
              alignItems: "center",
              padding: "12px",
              backgroundColor: "#fff",
              borderRadius: "4px",
              border: "1px solid #e5e7eb",
              gap: "12px",
              cursor: "pointer",
              opacity: todo.pending ? 0.5 : 1,
            }}
            onClick={() => {
              handleToggle(todo);
            }}
          >
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => {}}
              style={{ cursor: "pointer" }}
            />
            <span
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
                color: todo.completed ? "#9ca3af" : "inherit",
              }}
            >
              {todo.text}
            </span>
          </div>
        ))}
      </div>

      <div
        style={{
          marginTop: "16px",
          padding: "12px",
          backgroundColor: "#f3f4f6",
          borderRadius: "4px",
          fontSize: "14px",
          color: "#4b5563",
        }}
      >
        Try clicking multiple items quickly or during updates to see race
        conditions. There's a 30% chance of update failure to demonstrate error
        handling issues.
      </div>
    </div>
  );
};
