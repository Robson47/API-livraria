/*IMPORTAÇÃO DO MÓDULO DO SEQUELIZE*/
const Sequelize = require('sequelize');

/*IMPORTAÇÃO DA CONEXÃO COM O BANCO DE DADOS*/
const connection = require('../database/database');

/*IMPORTAÇÃO DA TABELA CATEGORIA PARA CRIAÇÃO DE CHAVE ESTRANGEIRA REPRESENTANDO A CARDINALIDADE*/
const Categoria = require('./Categoria');

const Produtos = connection.define(
    'tbl_produtos',
    {
        codigo_produto:{
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        codigo_categoria:{
            type: Sequelize.INTEGER,
            allowNull: false
        },
        nome_produto:{
            type: Sequelize.STRING(255),
            allowNull: false
        },
        preco_produto:{
            type: Sequelize.DECIMAL(10, 2),
            allowNull: false
        },
        imagem_produto:{
            type: Sequelize.STRING(500),
            allowNull: false
        },
        imagem_produto_url:{
            type: Sequelize.STRING,
            allowNull: false
        },
        descricao_produto:{
            type: Sequelize.TEXT,
            allowNull: false
        }
    }
);

/*IMPLEMENTAÇÃO DA CHAVE ESTRANGEIRA - LADO N*/
Categoria.hasMany(Produtos, {
    foreignKey: 'codigo_categoria',
    sourceKey: 'codigo_categoria'
});

/*IMPLEMENTAÇÃO DA CHAVE PRIMÁRIA - LADO 1*/
Produtos.belongsTo(Categoria, {
    foreignKey: 'codigo_categoria',
    sourceKey: 'codigo_categoria'
});

Produtos.sync({force:false});

module.exports = Produtos;