type Todo = {
  id: string;
  title: string;
  completed: boolean;
};

function App() {
  const todos = [
    { id: "1", title: "GraphQLを学ぶ", completed: false },
    { id: "2", title: "Reactを学ぶ", completed: true },
  ] as Todo[];

  return (
    <>
      <div>
        <h1>TO DO List</h1>
        <input type="text" placeholder="TODOを追加してください" />
        <button>追加</button>
        <ul>
          {todos.map((todo) => (
            <li
              key={todo.id}
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
              }}
            >
              <input type="checkbox" checked={todo.completed} />
              {todo.title}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
