//IMPORTAÇÃO DO MÓDULO EXPRESS
const express = require("express");

//INSTÂNCIA DO MÓDULO EXPRESS
const app = express();

//CONFIGURAÇÃO PARA O EXPRESS MANIPULAR JSON
app.use(express.json());

//CONFIGURAÇÃO PARA O EXPRESS TRABALHAR COM DADOS DE FORMULÁRIO
app.use(express.urlencoded({ extended: true }));

const connection = require("./database/database");
console.log(connection);

//TESTE DE MODEL PARA A CRIAÇÃO DAS TABELAS
const CategoriaModel = require('./model/Categoria');
const LivroModel = require('./model/Livro');

//IMPORTAÇÃO DA CONTROLLER DE CATEGORIA
const CategoriaController = require("./controller/CategoriaController");
app.use("/", CategoriaController);

//IMPORTAÇÃO DA CONTROLLER DE LIVRO
const LivroController = require("./controller/LivroController");
app.use("/", LivroController);

//CRIAÇÃO DO SERVIDOR WEB DE REQUISIÇÕES E RESPOSTAS
app.listen(3000, () => {
    console.log("A API ESTÁ BEM POGGERS EM: http://localhost:3000");
});