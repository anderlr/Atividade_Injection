const express = require("express");
const { Pool } = require("pg");

const app = express();
app.use(express.json());

const pool = new Pool({
  connectionString: `postgres://postgres:root@localhost:5432/injection`,
});

pool.on("connect", () => {
  console.log("Online");
});

app.get("/usuarios", async (req, res) => {
  // console.log(req.body.query);
  const algo = await pool.query(
    `select * from usuarios where username = ${req.body.query}`
    // select * from usuarios where nome = {}
    //"query": "' ' or '1' = '1'"
    //"query": "'ikaro'"
  );
  res.status(200).json(algo.rows);
});

app.post("/usuarios", async (req, res) => {
  const { rows: user } = await pool.query(
    "INSERT INTO usuarios (username, password) VALUES ($1, $2)",
    [req.body.user, req.body.password]
  );
  res.status(200).send("success");
  // {
  // "user":"alguem",
  // "password":"senhafortissima"
  // }
});

app.listen(5000, () => {
  console.log("Inicializado");
  console.log(`Server is running on http://localhost:5000`);
});
