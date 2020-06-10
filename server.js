const express = require('express');
const database = require ('./database');
const cors = require ('cors');

const server = express();

server.use(cors());
server.use(express.json());


server.get('/', async function(request, response) {
   const dados = await database.select();
   return response.json(dados);
})

server.post('/', async function(request, response) {

    const item = request.body.item;
    const valor = request.body.valor;
    const tamanho = request.body.tamanho;
    const result = await database.create(item, valor, tamanho);
   
    return response.status(204).send();
})

server.put('/:id', async function(request, response) { 
    const id = request.params.id;
    const result = await database.update(id);
    return response.status(204).send();
})

server.delete('/:id', async function(request, response) { 
    const id = request.params.id;
    const result = await database.delete(id);
    return response.status(200).send();
})

server.listen(process.env.PORT || 3000);