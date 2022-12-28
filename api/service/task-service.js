const Task = require("../model/Task");
const crypto = require("crypto");
const dao = require("../dao/task-dao");
const datefns = require("date-fns");

let map = function map(task) {
  return {
    title: task.getTitle(),
    description: task.getDescription(),
    scheduleDate: task.getScheduleDate(),
    priority: task.getPriority(),
    creationDate: task.getCreationDate(),
    id: task.getId(),
  };
};

const getAll = function getAll() {
  return dao.getAll().then((task) => {
    let taskList = task.map((t) => map(t));
    return new Promise(
      (resolve) => resolve(taskList),
      (rejects) => rejects("err")
    );
  });
};

const validateScheduleDate = (dateStr) => {
  const regex = /^\d{4}-\d{2}-\d{2}$/;

  if (dateStr.match(regex) === null) {
    throw new Error("Error date format! YYYY-MM-DD");
  }
 
  const date = new Date(dateStr);
  const timestamp = date.getTime();
  if (typeof timestamp !== 'number' || Number.isNaN(timestamp)) {
    throw new Error("Invalid Date!");
  }
  
};

const createTask = function task(description, scheduleDate, priority, title) {
  validateScheduleDate(scheduleDate);

  const id = createId();

  const creationDate = datefns.formatISO(new Date());

  const task = new Task.Task(
    id,
    creationDate,
    title,
    description,
    scheduleDate,
    priority
  );

  return dao.save(task).then(
    (task) =>
      new Promise(
        (resolve) => resolve(map(task)),
        (reject) => reject("err")
      )
  );
};

function createId() {
  const data = new Date().valueOf().toString();
  let rand = (Math.random() * 33).toString();
  return crypto
    .createHash("sha1")
    .update(data + rand)
    .digest("hex");
}

module.exports = { getAll, createTask };
