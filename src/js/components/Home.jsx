import React, { useState } from "react";

//create your first component
const Home = () => {

    const [tarea, setTarea] = useState("");
    const [ul, setUl] = useState([]);

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && tarea.trim() !== "") {
            setUl([...ul, tarea]);   // add new task
            setTarea("");            // clear input
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

                <ul>
                    {ul.map((tareas, index) => (
                        <li key={index}>{tareas}</li>
                    ))}
                </ul>

            </div>
        </div>
    );
};

export default Home;