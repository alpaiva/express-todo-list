const express = require('express');
const port = 3000;
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const taskRouter = require('./api/router/task-router');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use('/tasks', taskRouter);

app.listen(port, () => console.log(`Servidor executando na porta ${port}`));
