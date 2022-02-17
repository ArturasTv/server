const cors = require("cors");
const express = require("express");
const Datastore = require("nedb");

const app = express();

app.listen(4321, () => console.log("Listening at 4321"));
app.use(express.json());
app.use(cors());

const database = new Datastore("database.db");
database.loadDatabase();

app.post("/api/task", (req, res) => {
  const data = req.body;
  database.insert(data);
  res.sendStatus(200);
});

app.delete("/api/task/:id", (req, res) => {
  const id = req.params.id;
  database.remove({ _id: id }, (err, data) => {
    if (err) {
      return res.status(500).send({ message: "Serverio klaida!" });
    }
    return res.sendStatus(200);
  });
});

app.put("/api/task/:id", (req, res) => {
  const id = req.params.id;
  const data = req.body;
  database.update({ _id: id }, { ...data }, (err, data) => {
    if (err) {
      return res.status(500).send({ message: "Serverio klaida!" });
    }
    return res.sendStatus(200);
  });
});

app.get("/api/task/:id", (req, res) => {
  const id = req.params.id;
  database.find({ _id: id }, (err, data) => {
    if (err) {
      return res.status(500).send({ message: "Serverio klaida!" });
    }
    res.json(data);
  });
});

app.get("/api/tasks", (req, res) => {
  database.find({}, (err, data) => {
    if (err) {
      return res.status(500).send({ message: "Serverio klaida!" });
    }
    res.json(data);
  });
});
