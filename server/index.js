const express = require("express");
const cors = require("cors");

const error = require("./middlewares/error.js");
const { v4: uuid } = require("uuid");
const todoList = require("./todoList.js");

const app = express();
const PORT = 3005;

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.get("/api/todo", (req, res) => {
  res.status(200).json(todoList);
});

app.post("/api/todo", error(["todo"]), (req, res) => {
  console.log(req.body, "posr");

  const { todo } = req.body;
  if (todo) {
    const newTodoItem = {
      id: uuid(),
      todo: todo,
      isCompleted: false,
    };

    todoList.push(newTodoItem);
    return res.status(200).json({ mesaage: "Successfully Posted" });
  }

  return res.status(404).json({ mesaage: "Not Found!" });
});

app.delete("/api/todo", (req, res) => {
  console.log(req.body, "del");
  const { id } = req.body;
  const todoIndex = todoList.findIndex((item) => item.id === id);
  if (todoIndex !== -1) {
    todoList.splice(todoIndex, 1);

    return res.status(200).json({ mesaage: "Deleted Successfully !" });
  }

  return res.status(400).json({ mesaage: "Item not found !" });
});

app.put("/api/todo", error(["id", "todo"]), (req, res) => {
  console.log(req.body, "put");
  const { id, todo } = req.body;
  const existTodo = todoList.find((item) => item.id === id);
  if (existTodo) {
    todoList.forEach((item) => {
      if (existTodo === item) {
        (item.id = id), (item.todo = todo), (item.isCompleted = false);
      }
    });

    return res.status(200).json({ mesaage: "Successfully Updated !" });
  }
  return res.status(404).json({ mesaage: "Item not found !" });
});

app.put("/api/todo/iscomplete", error(["id", "signal"]), (req, res) => {
  const { id, isCompleted } = req.body;
  const existTodo = todoList.find((item) => item.id === id);
  if (existTodo) {
    todoList.forEach((item) => {
      if (existTodo === item) {
        (item.id = id), (item.isCompleted = !item.isCompleted);
      }
    });
    return res.status(200).json({ mesaage: "Successfully Completed" });
  }
  return res.status(404).json({ mesaage: "item not found" });
});

app.all("*", (req, res) => {
  return res.status(404).json({ mesaage: "404 not found!" });
});

// Start the Server
app.listen(PORT, () => {
  console.log(`Server started at Port ${PORT}`);
});
