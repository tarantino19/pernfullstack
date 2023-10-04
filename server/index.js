const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 3001;
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json()); //req.body

//get all todos

app.get("/api/v1/todos", async (req, res) => {
  try {
    const allToDos = await pool.query("SELECT * FROM todo");
    res.status(200).json(allToDos.rows);
  } catch (error) {
    console.log(error.message);
  }
});

//get a todo
app.get("/api/v1/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [
      id,
    ]);
    res.status(200).json(todo.rows);
  } catch (error) {
    console.log(error.message);
  }
});

//create a todo

app.post("/api/v1/todos", async (req, res) => {
  try {
    const { description } = req.body;
    const newToDo = await pool.query(
      "INSERT INTO todo (description) VALUES($1) RETURNING *",
      [description]
    );
    res.status(200).json(newToDo.rows);
  } catch (error) {
    console.log(error.message);
  }
});

//update a todo
app.put("/api/v1/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;

    const updateToDo = await pool.query(
      "UPDATE todo SET description = $1 WHERE todo_id = $2",
      [description, id]
    );

    res.status(200).json("Todo was updated");
  } catch (error) {
    console.log(error.message);
  }
});

//delete a todo

app.delete("/api/v1/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteToDo = await pool.query("DELETE FROM todo where todo_id = $1", [
      id,
    ]);
    res.status(200).send(`Todo with id of ${id} successfully deleted`);
  } catch (error) {
    console.log(error.message);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
