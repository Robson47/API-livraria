//IMPORTAÇÃO DO MÓDULO DO SEQUELIZE
const sequelize = require("sequelize");

//CRIA A CONEXÃO COM O BANCO DE DADOS POR MEIO DO SEQUELIZE
/*
PARÂMETROS:
1° - Nome do banco de dados
2° - Usuário do banco de dados
3° - Senha do banco de dados
4° - Objeto json com dados de coniguração
    1 - Host do banco de dados
    2 - Porta lógica a ser usada
    3 - Dialeto sql a ser utilizado
    4 - Timezone
*/

const connection = new sequelize(
    "bd_api_livraria",
    "root",
    "",
    {
        host: "localhost",
        port: "3306",
        dialect: "mysql",
        timezone: "-03:00",
    }
);

module.exports = connection;