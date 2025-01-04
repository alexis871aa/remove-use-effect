import { useState, useEffect, Suspense, use, useTransition } from "react";
import { ErrorBoundary } from "react-error-boundary";

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

const loadData = async (id: number): Promise<Todo> => {
  if (Math.random() < 0.3) {
    throw new Error("Something went wrong");
  }

  const response = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${id}`
  );
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const result = await response.json();
  return result;
};

export function AsyncLoading() {
  const [dataPromises, setDataPromises] = useState<
    Record<number, Promise<Todo>>
  >({});

  const [todoId, setTodoId] = useState(1);

  if (!dataPromises[todoId]) {
    setDataPromises((prev) => ({
      ...prev,
      [todoId]: loadData(todoId),
    }));
  }

  const handlePrevTodo = () => {
    setTodoId((current) => Math.max(1, current - 1));
  };

  const handleNextTodo = () => {
    setTodoId((current) => current + 1);
  };

  const refetch = () => {
    setDataPromises((prev) => ({
      ...prev,
      [todoId]: loadData(todoId),
    }));
  };

  const loading = usePromiseIsLoading(dataPromises[todoId]);

  console.log(loading);

  return (
    <section style={{ padding: "20px" }}>
      <h2>9. Async Loading</h2>

      <div style={{ marginBottom: "20px" }}>
        <button
          onClick={handlePrevTodo}
          disabled={loading}
          style={{ marginRight: "10px" }}
        >
          Previous Todo {loading && <span>Loading...</span>}
        </button>
        <button onClick={handleNextTodo} disabled={loading}>
          Next Todo
        </button>
        <div style={{ marginTop: "10px" }}>Current Todo ID: {todoId}</div>
        <div style={{ marginTop: "10px" }}>
          <button onClick={refetch}>Refetch</button>
        </div>
      </div>
      <ErrorBoundary fallback={<div>Something went wrong</div>}>
        <Suspense
          fallback={
            <div
              style={{
                padding: "20px",
                backgroundColor: "#f0f0f0",
                borderRadius: "4px",
                textAlign: "center",
              }}
            >
              Loading...
            </div>
          }
        >
          <Body data={dataPromises[todoId]} />
        </Suspense>
      </ErrorBoundary>
    </section>
  );
}

const usePromiseIsLoading = <T,>(promise: Promise<T>) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    promise
      .then(() => {
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, [promise]);

  return isLoading;
};

function PreviousTodo() {
  return <div>Previous Todo</div>;
}

function Body({ data }: { data: Promise<Todo> | undefined }) {
  if (!data) return <div>Loading...</div>;
  const { title, completed, userId } = use(data);
  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "#f8f9fa",
        borderRadius: "4px",
        border: "1px solid #e9ecef",
      }}
    >
      <h3 style={{ margin: "0 0 10px 0" }}>{title}</h3>
      <div>
        <strong>Status:</strong> {completed ? "Completed" : "Pending"}
      </div>
      <div>
        <strong>User ID:</strong> {userId}
      </div>
    </div>
  );
}
