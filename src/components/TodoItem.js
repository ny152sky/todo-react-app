import React from "react";

function TodoItem({ task, deleteTask, toggleCompleted }) {
  function handleChange() {
    toggleCompleted(task);
  }

  return (
    <div className="w-full max-w-md p-4 mb-2 border rounded shadow flex items-center justify-between hover:bg-blue-300 transition duration-300 ease-in-out">
      <div className="flex items-center space-x-4">
        <input type="checkbox" checked={task.isComplete} onChange={handleChange} />
        <p className={task.isComplete ? "line-through text-gray-500" : ""}>{task.text}</p>
      </div>
      <button onClick={() => deleteTask(task.id)} className="text-red-500">
        X
      </button>
    </div>
  );
}

export default TodoItem;
