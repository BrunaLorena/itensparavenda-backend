const express = require('express');

const server = express();

server.use(express.json());

const itens = [
    { item:'Bolo de chocolate', valor: 20.00 , tamanho :'Médio'},
    { item:'Bolo de limão', valor: 10.00 , tamanho :'Pequeno'},
    { item:'Torta de frango', valor: 40.00 , tamanho :'Grande'},
]

server.get('/itens', function(request, response) {
    response.json(itens);
})

server.post('/itens', function(request, response) {
    const {item, valor, tamanho} = request.body;
   
    itens.push({item, valor, tamanho});
    response.status(204).send();
})

server.put('/itens/:id',function(request, response) {

    const {id} = request.params;
    const {item, valor, tamanho} = request.body;

    for(let i = 0; i< itens.length; i++){
        if(itens[i].item == id){
            itens[i].item = item;
            itens[i].valor = valor;
            itens[i].tamanho = tamanho;
            break;
        }
    }

    return response.status(204).send();
})

server.delete('/itens/:id', function(request, response){

     const {id} = request.params;

 for(let i = 0; i< itens.length; i++){
        if(itens[i].item == id){
          itens.splice(i, 1);
          break;
        }
    }

    return response.status(204).send();
})

server.listen(process.env.PORT || 3000);