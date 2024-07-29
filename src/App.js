import React from "react";
import TodoList from "./components/TodoList";
import "./tailwind.css"; // Import Tailwind CSS

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-200 via-blue-200 to-blue-500 p-4">
      <h1 className="text-3xl font-bold mb-3 underline">To-Do List</h1>
      <TodoList />
    </div>
  );
}

export default App;
