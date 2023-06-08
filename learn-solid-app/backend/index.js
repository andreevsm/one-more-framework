const express = require("express");
const cors = require('cors')
const bodyParser = require('body-parser')


const app = express();

app.use(bodyParser.json())
app.use(cors({ origin: '*' }));

let id = 1;
let tasks = [
  {
    id: 1,
    cratedAt: new Date(),
    isDone: false,
    title: 'Моя первая задача',
    description: "Небольшое пояснение к задаче"
  }
];

app.get("/tasks", (request, response) => {
    response.send(tasks);
});

app.post("/tasks", (request, response) => {
  tasks = [{ ...request.body, id: ++id }, ...tasks]
  response.send(tasks);
});

app.listen(3000);
