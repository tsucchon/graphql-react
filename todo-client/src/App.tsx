import { gql } from "@apollo/client";
import { useMutation, useQuery } from "@apollo/client/react";
import { useState } from "react";

const GET_TODOS = gql`
  query {
    getTodos {
      id
      title
      completed
    }
  }
`;

const ADD_TODO = gql`
  mutation addTodo($title: String!) {
    addTodo(title: $title) {
      id
      title
      completed
    }
  }
`;

const UPDATE_TODO = gql`
  mutation updateTodo($id: ID!, $completed: Boolean!) {
    updateTodo(id: $id, completed: $completed) {
      id
      title
      completed
    }
  }
`;

type Todo = {
  id: string;
  title: string;
  completed: boolean;
};

function App() {
  const { loading, data } = useQuery<{ getTodos: Todo[] }>(GET_TODOS, {
    fetchPolicy: "network-only",
  });

  const todos = data ? data.getTodos : [];
  const [addTodo] = useMutation(ADD_TODO);
  const [updateTodo] = useMutation(UPDATE_TODO);
  const [title, setTitle] = useState("");

  if (loading) return <p>Loading...</p>;

  const handleAddTodo = async () => {
    await addTodo({
      variables: { title },
      refetchQueries: [{ query: GET_TODOS }],
    });
    setTitle("");
  };

  const handleUpdateTodo = async (id: string, completed: boolean) => {
    await updateTodo({
      variables: { id, completed: !completed },
      refetchQueries: [{ query: GET_TODOS }],
    });
  };

  return (
    <>
      <div>
        <h1>TO DO List</h1>
        <input
          type="text"
          placeholder="TODOを追加してください"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button onClick={handleAddTodo}>追加</button>
        <ul>
          {todos.map((todo: Todo) => (
            <li
              key={todo.id}
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
              }}
            >
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleUpdateTodo(todo.id, todo.completed)}
              />
              {todo.title}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
