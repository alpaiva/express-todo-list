const express = require("express");
const router = express.Router();
const taskService = require("../service/task-service");

router.use(function timeLog(req, res, next) {
  console.log("Time: ", Date.now());
  next();
});

router.get("/", (req, res) => {
  taskService
    .getAll()
    .then((tasks) => res.send(tasks))
    .catch((err) => res.send({ err }));
});

router.post("/", (req, res) => {
  taskService
    .createTask(
      req.body.description,
      req.body.scheduleDate,
      req.body.priority,
      req.body.title
    )
    .then((task) => res.send(task))
    .catch((err) => {
      console.log(err);
      res.send({ err: "error" });
    });
});

module.exports = router;
