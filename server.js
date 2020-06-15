const express = require('express');
const database = require ('./database');
const cors = require ('cors');

const server = express();

server.use(cors());
server.use(express.json());


server.get('/itens', async function(request, response) {
   const dados = await database.read();
   return response.json(dados);
})

server.post('/itens', async function(request, response) {

    const item = request.body.item;
    const valor = request.body.valor;
    const tamanho = request.body.tamanho;
    const result = await database.create(item, valor, tamanho);
   
    return response.status(204).send();
})

server.put('/itens/:id', async function(request, response) { 
    const id = request.params.id;
    const {item, valor, tamanho} = request.body;
    const result = await database.update(item, valor, tamanho, id);
    return response.status(204).send();
})

server.delete('/itens/:id', async function(request, response) { 
    const id = request.params.id;
    const result = await database.delete(id);
    return response.status(200).send();
})

server.listen(process.env.PORT || 3000);