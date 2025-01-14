import { useEffect, useState } from "react";
import "./Todo.css";
import { useTodo } from "../hooks/useTodo.jsx";

export const Todo = () => {
  const [newTask, setNewTask] = useState("");
  const [editTaskId, SetEditTaskId] = useState("");
  const [editedTask, setEditedTask] = useState("");
  const [error, setError] = useState({
    errorTask: "",
    errorOnEdit: "",
  }); // for display the error

  const [todoList, getTodo, postTodo, updateTodo, deleteTodo, editComplete] =
    useTodo();

  const handleInput = (event) => {
    // get input value from the user
    setNewTask(event.target.value);
  };

  const addTasktoTasks = () => {
    if (newTask) {
      postTodo(newTask);

      setError((prev) => ({ ...prev, errorTask: "" }));
    } else {
      setError((prev) => ({ ...prev, errorTask: "Please enter your Task!" }));
    }

    setNewTask("");
  };

  const deleteTask = (id) => {
    deleteTodo(id);
  };

  const updateId = (tasks) => {
    SetEditTaskId(tasks.id);
    setEditedTask(tasks.todo);
  };
  const updateTasks = (id) => {
    if (editedTask) {
      updateTodo(id, editedTask);

      SetEditTaskId("");
      setError((prev) => ({ ...prev, errorOnEdit: "" }));
    } else {
      setError((prev) => ({
        ...prev,
        errorOnEdit: "Please enter the edited task !",
      }));
    }
  };

  // const completeTask = (id) => {
  //   editComplete(id);
  // };

  return (
    <>
      <div className="main-contianer">
        <h1>Todo List</h1>
        <div className="input-contianer">
          <input
            type="text"
            name=""
            id=""
            placeholder="New Todo"
            value={newTask}
            onChange={handleInput}
          />
          <button onClick={addTasktoTasks} className="add-button">
            ADD TODO
          </button>
        </div>
        <p style={{ color: "red", marginTop: "10px", paddingLeft: "70px" }}>
          {error.errorTask}
        </p>

        {todoList.map((item) => {
          return (
            <>
              {editTaskId === item.id ? (
                <div className="edit-contianer">
                  <div className="edit-section" key={item.id}>
                    <input
                      type="text"
                      placeholder="Editing Current Todo Item"
                      value={editedTask}
                      onChange={(event) => setEditedTask(event.target.value)}
                    />
                    <div style={{ margin: "20px 50px 0px 0px" }}>
                      <button
                        className="save-button"
                        onClick={() => updateTasks(item.id)}
                      >
                        SAVE
                      </button>
                      <button
                        style={{
                          backgroundColor: "#8FA8C1",
                          color: "#0C5488",
                        }}
                        className="cancel-button"
                        onClick={() => SetEditTaskId("")}
                      >
                        CANCEL
                      </button>
                    </div>
                  </div>
                  <div className="display-error">
                    <p
                      style={{
                        color: "red",
                        paddingLeft: "50px",
                        marginBottom: "10px",
                      }}
                    >
                      {error.errorOnEdit}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="display-task" key={item.id}>
                  <h3
                    onClick={() => {
                      editComplete(item.id);
                    }}
                    style={
                      item.isCompleted
                        ? { textDecoration: "line-through 3px" }
                        : { textDecoration: "none" }
                    }
                  >
                    {item.todo}
                  </h3>

                  <div className="edit-button">
                    <button style={{ marginRight: "11px" }}>
                      <img
                        src="../public/update.png"
                        alt=""
                        width="24px"
                        height="24px"
                        onClick={() => updateId(item)}
                      />
                    </button>
                    <button>
                      <img
                        src="../public/delete.png"
                        alt=""
                        width="24px"
                        height="24px"
                        className="delete-img"
                        onClick={() => deleteTask(item.id)}
                      />
                    </button>
                  </div>
                </div>
              )}
            </>
          );
        })}
      </div>
    </>
  );
};
