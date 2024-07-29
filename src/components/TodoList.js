import React, { useState, useEffect } from "react";
import TodoItem from "./TodoItem";

function TodoList() {

    const [tasks, setTasks] = useState([]);
    const [text, setText] = useState("");

    async function fetchData() {
        try {
            const response = await fetch("https://localhost:7286/api/TodoItems");
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            setTasks(data);
        } catch (error) {
            console.error("Error fetching data: ", error);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    async function addData(task) {
        fetch("https://localhost:7286/api/TodoItems",
            {
                method: "POST",
                headers: {Accept: "application/json","Content-Type": "application/json;charset=UTF-8",},
                body: JSON.stringify( task )
            })
            .then(function(res){ return res.json(); })
            .then(() => {
                fetchData();
                setText("");
            })
    }

    function addTask(text) {
        const newTask = {
            text,
            isComplete: false
        };
        addData(newTask);
        setText('');
    }

    function deleteTask(id) {
        fetch("https://localhost:7286/api/TodoItems/" + id,
            {
                method: "DELETE"
            })
            .then(function(res){ console.log(res) })
            .then(() => {
                fetchData();
                setText("");
            })
    }

    async function updateData(task) {
        fetch("https://localhost:7286/api/TodoItems/" + task.id,
            {
                method: "PUT",
                headers: {Accept: "application/json","Content-Type": "application/json;charset=UTF-8",},
                body: JSON.stringify( task )
            })
            .then(() => {
                fetchData();
                setText("");
            })
    }

    function toggleCompleted(task) {
        const newTask = {
            id: task.id,
            text: task.text,
            isComplete: !task.isComplete
        };
        updateData(newTask);
        setText('');
    }

    return (
        <div className="flex flex-col items-center">
          {tasks.map((task) => (
            <TodoItem
              key={task.id}
              task={task}
              deleteTask={deleteTask}
              toggleCompleted={toggleCompleted}
            />
          ))}
          <input
            className="mt-4 p-2 border-2 border-gray-300 rounded outline-none focus:ring-2 focus:ring-blue-500"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button
            className="mt-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            onClick={() => addTask(text)}
          >
            Add
          </button>
        </div>
      );

}
export default TodoList;