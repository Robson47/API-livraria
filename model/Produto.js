/*Importação do módulo do Sequelize*/
const Sequelize = require('sequelize');

/*Importação da conexão com o banco de dados*/
const connection = require('../database/database');

/*Importação da tabela de categoria para criação da chave estrangeira
representanto a cardinalidade*/
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
            type: Sequelize.STRING,
            allowNull: false
        },
        preco_produto:{
            type: Sequelize.STRING,
            allowNull: false
        },
        imagem_produto:{
            type: Sequelize.STRING,
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

/*Implementação da  CHAVE ESTRANGEIRA - LADO N*/
Categoria.hasMany(Produtos, {
    foreignKey: 'codigo_categoria',
    sourceKey: 'codigo_categoria'
});

/*Implementação da  CHAVE PRIMÁRIA - LADO 1*/
Produtos.belongsTo(Categoria, {
    foreignKey: 'codigo_categoria',
    sourceKey: 'codigo_categoria'
});

Produtos.sync({force:false});

module.exports = Produtos;