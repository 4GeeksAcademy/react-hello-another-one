import React, { useState, useEffect } from "react";

const USERNAME = "flavio123";
const USERS_URL = `https://playground.4geeks.com/todo/users/${USERNAME}`;
const TODOS_URL = `https://playground.4geeks.com/todo/todos`;

const Home = () => {
    const [tarea, setTarea] = useState("");
    const [ul, setUl] = useState([]);

    //  CREATE USER
    const createUser = async () => {
        await fetch(USERS_URL, { method: "POST" });
    };

    //  GET TASKS 
    const getTasks = async () => {
        try {
            const resp = await fetch(USERS_URL);

            if (resp.status === 404) {
                await createUser();
                await getTasks();
                return;
            }

            const data = await resp.json();
            setUl(data.todos || []);
        } catch (error) {
            console.log(error);
        }
    };

    //  ADD TASK 
    const addTask = async (newTask) => {
        await fetch(`${TODOS_URL}/${USERNAME}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ label: newTask, done: false })
        });
        await getTasks();
    };

    //  DELETE ONE TASK 
    const deleteTask = async (todoId) => {
        await fetch(`${TODOS_URL}/${todoId}`, {
            method: "DELETE",
        });
        await getTasks();
    };

    //  CLEAR ALL 
    const clearAll = async () => {
        await fetch(USERS_URL, { method: "DELETE" });
        setUl([]);
    };

    useEffect(() => {
        getTasks();
    }, []);

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && tarea.trim() !== "") {
            addTask(tarea);
            setTarea("");
        }
    };

    return (
        <div className="text-center">
            <div className="col-8 form-floating mb-3">
                <input
                    type="text"
                    className="form-control"
                    id="floatingInput"
                    placeholder="METETUTAREA"
                    value={tarea}
                    onChange={(e) => setTarea(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <label htmlFor="floatingInput">METETUTAREA</label>

                <ul className="list-group mt-2">
                    {ul.map((task) => (
                        <li key={task.id} className="list-group-item d-flex justify-content-between align-items-center">
                            {task.label}
                            <button className="btn btn-danger btn-sm" onClick={() => deleteTask(task.id)}>×</button>
                        </li>
                    ))}
                </ul>

                <button className="btn btn-primary btn-sm mt-3" onClick={clearAll}>Clear All</button>
                <p>{ul.length} tasks left</p>
            </div>
        </div>
    );
};

export default Home;