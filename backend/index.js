const express = require("express"),
  path = require("path");

const dotenv = require("dotenv"),
  { Client } = require("pg");

dotenv.config();

const client = new Client({
  connectionString: process.env.PGURI,
});

client.connect();

const app = express();
app.use(express.json());
const bodyParser = require("body-parser");
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/api", (_request, response) => {
  response.send({ hello: "World" });
});

app.get("/api/users", async (_request, response) => {
  const { rows } = await client.query(
    "SELECT * FROM users WHERE username = $1",
    ["georgeclooney"]
  );
  response.send(rows);
});

app.get("/api/notes", async (_request, response) => {
  const { rows } = await client.query("SELECT * FROM notes;");
  response.send(rows);
});

app.post("/api/add-note", async (req, response) => {
  const { name, content } = req.body;
  const text = "INSERT INTO notes (name, content) VALUES ($1, $2)";
  const values = [name, content];
  await client.query(text, values);
  response.status(200).json({
    name,
    content,
  });
});

app.use(express.static(path.join(path.resolve(), "dist")));

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Redo på http://localhost:${port}/`);
});
