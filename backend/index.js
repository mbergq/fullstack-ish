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

app.get("/api", (_request, response) => {
  response.send({ hello: "World" });
});

app.get("/api/users", async (_request, response) => {
  const { rows } = await client.query("SELECT * FROM users");
  console.log(rows);
  response.send(rows);
});

// const addNote = {
//   text: "INSERT INTO notes(name, content) VALUES ($1, $2)",
//   values: ["myFirstNote", "this is my first note"],
// };

// const res = await client.query(addNote);

app.use(express.static(path.join(path.resolve(), "dist")));

app.listen(3000, () => {
  console.log("Redo på http://localhost:3000/");
});
