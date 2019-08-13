const express = require("express");

const server = express();
server.use(express.json()); //para ele saber q deve usar json nas requisicoes

const usuarios = ["abc", "def", "nop"];

function logExpress(req, res, next) {
    console.log(req.ip);
    return next();
}

server.use(logExpress);

server.get("/users", (req, res) => {
    return res.json(usuarios);
});

server.get("/users/:index", (req, res) => {
    const { index } = req.params;
    return res.json(usuarios[index]);
});

server.post("/users", (req, res) => {
    const { name } = req.body;

    usuarios.push(name);
    return res.json(usuarios);
});

server.put("/users/:index", (req, res) => {
    const { index } = req.params;
    const { name } = req.body;

    usuarios[index] = name;
    return res.json(usuarios);
});

server.delete("/users/:index", (req, res) => {
    const { index } = req.params;
    usuarios.splice(index, 1);

    return res.json(usuarios);
});

server.listen(3000);
