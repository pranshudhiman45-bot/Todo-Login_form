import "./App.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Todo({logout}) {
  const navigate = useNavigate();

  const handleLogout = () => {
   logout()
    navigate("/login");
  };

  const intialValue = "taskList";
  const pendingValue = "pendingList";
  const completeValue = "CompleteList";

//Task List....
  const [inputValue, setInputValue] = useState("");
  const [tasks, setTasks] = useState(() => {
    const localTask = localStorage.getItem(intialValue);
    if (!localTask) return [];
    return JSON.parse(localTask);
  });
  useEffect(() => {
    localStorage.setItem(intialValue, JSON.stringify(tasks));
  }, [tasks]);

  // Pending List....
  const [pending, setPending] = useState(() => {
    const PendingTasks = localStorage.getItem(pendingValue);
    if (!PendingTasks) return [];
    return JSON.parse(PendingTasks);
  });
   useEffect(() => {
    localStorage.setItem(pendingValue, JSON.stringify(pending));
  }, [pending]);

  //Complete List....
  const [completed, setCompleted] = useState(() => {
    const CompletedTasks = localStorage.getItem(completeValue);
    if (!CompletedTasks) return [];
    return JSON.parse(CompletedTasks);
  });
  useEffect(() => {
    localStorage.setItem(completeValue, JSON.stringify(completed));
  }, [completed]);

  // Handle Form 
  const handleShow = () => {
    if (inputValue === "") return;

    const newTask = {
      id: Date.now(),
      text: inputValue,
    };

    setTasks([...tasks, newTask]);
    setInputValue("");
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };
  const handleClick = (event) => {
    setInputValue(event.target.value);
  };
  const moveToPending = (task) => {
    setTasks(tasks.filter((t) => t.id !== task.id));
    setPending([...pending, task]);
  };
  const deletePending = (id) => {
    setPending(pending.filter((task) => task.id !== id));
  };
  const moveToCompleted = (task) => {
    setPending(pending.filter((t) => t.id !== task.id));
    setCompleted([...completed, task]);
  };
  const deleteCompleted = (id) => {
    setCompleted(completed.filter((task) => task.id !== id));
  };

  return (
    <>
      <div className="container">
        <h2>3 Step Todo App</h2>
        <div className="input-box">
          <input
            type="text"
            placeholder="Enter task"
            value={inputValue}
            onChange={handleClick}
          />
          <button onClick={handleShow}>Add Task</button>
        </div>

        <div className="section1">
          <div className="section">
            <h3>Task List</h3>
            <ul>
              {tasks.map((task) => (
                <li key={task.id}>
                  {task.text}

                  <button onClick={() => moveToPending(task)}>✅</button>
                  <button onClick={() => deleteTask(task.id)}>❌</button>
                </li>
              ))}
            </ul>
          </div>
          <div className="section">
            <h3>Pending</h3>
            <ul>
              {pending.map((task) => (
                <li key={task.id}>
                  {task.text}

                  <button onClick={() => moveToCompleted(task)}>➡️</button>
                  <button onClick={() => deletePending(task.id)}>❌</button>
                </li>
              ))}
            </ul>
          </div>
          <div className="section">
            <h3>Completed</h3>
            <ul>
              {completed.map((task) => (
                <li key={task.id}>
                  🎉 {task.text}

                  <button onClick={() => deleteCompleted(task.id)}>❌</button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="log-out">
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </>
  );
}

export default Todo;