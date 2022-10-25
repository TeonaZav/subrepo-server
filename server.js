const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const pool = require("./db");
require("dotenv").config();
const path = require("path");
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

//create todo
app.post("/todos", async (req, res) => {
  try {
    const { text } = req.body;
    console.log(text);
    const newTodo = await pool.query(
      "INSERT INTO todos (text) VALUES($1) RETURNING *",
      [text]
    );
    res.json(newTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});
app.get("/todos", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM todos ORDER BY id DESC");
    res.json(allTodos.rows);
  } catch (err) {
    console.error(err.message);
  }
});
//get todo
app.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const todolist = await pool.query("SELECT * FROM todos WHERE id = $1", [
      id,
    ]);
    res.json(todolist.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});
//update todo
app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const active = "active";
    const completed = "completed";
    const updateTodo = await pool.query(
      "UPDATE todos SET status = $1 WHERE id = $2",
      [status == "active" ? completed : active, id]
    );

    res.json(updateTodo);
  } catch (err) {
    console.error(err.message);
  }
});
// delete todo
app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const toDelete = await pool.query("SELECT * FROM todos WHERE id = $1", [
      id,
    ]);
    const deleteTodo = await pool.query("DELETE FROM todos WHERE id = $1", [
      id,
    ]);
    res.json("deleted");
  } catch (err) {
    console.error(err.message);
  }
});

app.delete("/todos", async (req, res) => {
  try {
    const toDelete = await pool.query("SELECT * FROM todos WHERE status = $1", [
      "completed",
    ]);
    const deleteTodo = await pool.query("DELETE FROM todos WHERE status = $1", [
      "completed",
    ]);
    res.json("deleted");
  } catch (err) {
    console.error(err.message);
  }
});
