const express = require("express");

const server = express();
//{id, title, tasks}
var projects = [];

var reqCount = 0;

server.use(express.json());
server.use((req, res, next) => {
    reqCount++;

    console.log(reqCount);
    return next();
});

function verificaId(req, res, next) {
    const { id } = req.params;

    var projeto = projects.find(item => item.id === id);
    if (!projeto) {
        return res.status(404).send();
    }
    req.projeto = projeto;
    return next();
}

server.post("/projects", (req, res) => {
    const { id, title } = req.body;

    var projetoNovo = { id, title, tasks: [] };
    projects.push(projetoNovo);
    return res.json(projects);
});

server.get("/projects", (req, res) => {
    return res.json(projects);
});

server.put("/projects/:id", verificaId, (req, res) => {
    const { title } = req.body;
    req.projeto.title = title;

    return res.json(projects);
});

server.delete("/projects/:id", verificaId, (req, res) => {
    const { id } = req.params;

    var index = projects.findIndex(item => item.id === id);
    if (index === -1) {
        return res.status(404).send();
    }

    projects.splice(index, 1);

    return res.json(projects);
});

server.post("/projects/:id/tasks", verificaId, (req, res) => {
    const { title } = req.body;

    req.projeto.tasks.push(title);
    return res.json(projects);
});

server.listen(3000);
