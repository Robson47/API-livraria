//IMPORTAÇÃO DO MÓDULO DO SEQUELIZE
const sequelize = require("sequelize");

//IMPORTAÇÃO DA CONEXÃO COM O BANCO DE DADOS
const connection = require("../database/database");

const Categoria = connection.define(
    'tbl_categorias',
    {
        codigo_categoria:{
            type: sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nome_categoria:{
            type: sequelize.STRING(250),
            allowNull: false
        },
        obs_categoria:{
            type: sequelize.STRING(250),
            allowNull: false
        }
    }
);

//SICRONIZAÇÃO COM O BANCO DE DADOS (CRIA A TABELA SE CASO ESSA NÃO EXISTA)
Categoria.sync({force:false});

//EXPORTAÇÃO DO MÓDULO
module.exports = Categoria;