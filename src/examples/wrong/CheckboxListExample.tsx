import React, { useState, useEffect } from "react";
import { getCheckboxState } from "./checkbox-utils.ts";

// interface TodoItem {
//   id: number;
//   text: string;
//   completed: boolean;
// }

const defaultCheckboxes = [
  { id: 1, text: "Text 1" },
  { id: 2, text: "Text 2" },
  { id: 3, text: "Text 3" },
];

// const saveCheckboxes = (checkboxes: number[]) => {
//   localStorage.setItem("checkboxes", JSON.stringify(checkboxes));
// };

export const CheckboxListExample: React.FC = () => {
  // const [todos, setTodos] = useState<TodoItem[]>([
  //   { id: 1, text: "Learn React", completed: false },
  //   { id: 2, text: "Master Typescript", completed: false },
  //   { id: 3, text: "Build Projects", completed: false },
  // ])
  // const [isAllChecked, setIsAllChecked] = useState(false);
  //
  // useEffect(() => {
  //   setIsAllChecked(todos.every((todo) => todo.completed))
  // }, [todos]);
  //
  // const handleCheckAll = () => {
  //   const newValue = !isAllChecked;
  //
  //   todos.forEach((todo) => {
  //       setTodos((prev) =>
  //         prev.map((t) => t.id === todo.id ? {...t, completed: newValue} : t)
  //       )
  //   });
  // }
  //
  // const handleToggle = (id: number) => {
  //   setTodos((prev) =>
  //       prev.map((todo) => todo.id === id ? { ...todo, completed: !todo.completed} : todo)
  //   )
  // }
  //
  // return (
  //     <div style={{ padding: "20px" }}>
  //       <h2>Wrong Checkbox List Implementation</h2>
  //
  //       <label
  //           style={{
  //             display: "flex",
  //             gap: "8px",
  //             marginBottom: "16px",
  //             alignItems: "center",
  //             cursor: "pointer",
  //           }}
  //       >
  //         <input
  //             type="checkbox"
  //             checked={isAllChecked}
  //             onChange={handleCheckAll}
  //         />
  //         Check All
  //       </label>
  //
  //       <div
  //           style={{
  //             display: "flex",
  //             flexDirection: "column",
  //             gap: "8px",
  //           }}
  //       >
  //         {todos.map((todo) => (
  //             <label
  //                 key={todo.id}
  //                 style={{
  //                   display: "flex",
  //                   gap: "8px",
  //                   alignItems: "center",
  //                   cursor: "pointer",
  //                 }}
  //             >
  //               <input
  //                   type="checkbox"
  //                   checked={todo.completed}
  //                   onChange={() => handleToggle(todo.id)}
  //               />
  //               {todo.text}
  //             </label>
  //         ))}
  //       </div>
  //     </div>
  // );

  // const [checkedCheckboxes, setCheckedCheckboxes] = useState<number[]>(() =>
  //   localStorage.getItem("checkboxes")
  //     ? (JSON.parse(localStorage.getItem("checkboxes") ?? "[]") as number[])
  //     : [],
  // );
  //
  // const handleToggle = (id: number) => {
  //   setCheckedCheckboxes((prev) => {
  //     if (prev.includes(id)) {
  //       return prev.filter((c) => c !== id);
  //     } else {
  //       return [...prev, id];
  //     }
  //   });
  // };
  //
  // const isAllChecked = checkedCheckboxes.length === checkboxes.length;
  //
  // const handleCheckAll = () => {
  //   if (isAllChecked) {
  //     setCheckedCheckboxes([]);
  //   } else {
  //     setCheckedCheckboxes(checkboxes.map((c) => c.id));
  //   }
  // };
  //
  // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   saveCheckboxes(checkedCheckboxes);
  // };

  // Вариант, когда чекбокс обновился и список чекбоксов изменился
  const [checkboxes, setCheckBoxes] = useState(defaultCheckboxes);

  // имитация получения данных с сервера и обновление списка чекбоксов
  useEffect(() => {
    const clear = setTimeout(() => {
      setCheckBoxes((c) => {
        return [...c, { id: 4, text: "Text 4" }];
      });
    }, 5000);

    return () => clearTimeout(clear);
  }, []);

  // ДАЛЕЕ КОД БЕЗ USE EFFECT
  const [userIsAllChecked, setUserIsAllChecked] = useState(false);
  const [userCheckedCheckboxes, setUserCheckedCheckboxes] = useState<
    Record<number, boolean | undefined>
  >({});

  const { isAllChecked, getIsChecked } = getCheckboxState({
    userCheckedCheckboxes,
    checkboxesLength: checkboxes.length,
    userIsAllChecked,
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleToggle = (id: number) => {
    setUserCheckedCheckboxes((prev) => {
      if (getIsChecked(id)) {
        return { ...prev, [id]: false };
      } else {
        return { ...prev, [id]: true };
      }
    });
  };

  const handleCheckAll = () => {
    if (isAllChecked) {
      setUserIsAllChecked(false);
    } else {
      setUserIsAllChecked(true);
      setUserCheckedCheckboxes({});
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Wrong Checkbox List Implementation</h2>

      <form onSubmit={handleSubmit}>
        <label
          style={{
            display: "flex",
            gap: "8px",
            marginBottom: "16px",
            alignItems: "center",
            cursor: "pointer",
          }}
        >
          <input
            type="checkbox"
            checked={isAllChecked}
            onChange={handleCheckAll}
          />
          Check All
        </label>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          {checkboxes.map((checkbox) => (
            <label
              key={checkbox.id}
              style={{
                display: "flex",
                gap: "8px",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <input
                type="checkbox"
                checked={getIsChecked(checkbox.id)}
                onChange={() => handleToggle(checkbox.id)}
              />
              {checkbox.text}
            </label>
          ))}
        </div>
        {/*<button type="submit">Отправить</button>*/}
      </form>
    </div>
  );
};
