const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
let contador = 3;
const app = express();
const porta = 3000;
app.use(bodyParser.json());
app.set('port', porta);
app.get("/teste", (req, res, next)=>{
    res.send("Olá");
});
const clientes = [
    {id: 1,
     nome: 'João',
     email:'joao@email.com'
    },
    {id: 2,
     nome: 'Cristina',
     email: 'cristina@email.com'   
    }
]
//retrieve
app.get("/clientes", (req, res, next)=>{
    res.json(clientes);
});

app.post("/clientes", (req, res, next) => {
    const cliente = req.body;
    clientes.push({id: contador +=1, nome: cliente.nome, email: cliente.email});
    console.log(clientes);
    //res.end();
    res.status(200).json(clientes);
});
//update
app.put("/clientes", (req, res, next)=> {
    clientes.forEach((cliente) =>{
        if(cliente.id === req.body.id){
            cliente.nome = req.body.nome,
            cliente.email = req.body.email
        }
    })
});
//delete
app.delete("/clientes", (req, res, next) => {
    clientes.forEach(cliente => {
        if (cliente.id === req.body.id) {
            var index = clientes.indexOf(cliente.id);
            clientes.splice(index)
        }
    });
    res.json(clientes);
});

const server = http.createServer(app);
server.listen(3000);


