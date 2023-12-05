# Node.js API com Express, Sequelize e Uploads para Firebase
<div align='center'>

  [![Static Badge](https://img.shields.io/badge/10.2.4-white?style=flat-square&logo=npm&logoColor=%23CB3837&label=npm&labelColor=gray&color=orange)](https://docs.npmjs.com/)
  [![Static Badge](https://img.shields.io/badge/18-white?style=flat-square&logo=nodedotjs&logoColor=dark-green&label=nodejs&labelColor=gray&color=%23339933)](https://nodejs.org/en)
  [![Static Badge](https://img.shields.io/badge/app-white?style=flat-square&logo=Firebase&logoColor=yellow&label=firebase&labelColor=gray&color=%23FFCA28)](https://firebase.google.com/?hl=pt)
  [![Static Badge](https://img.shields.io/badge/orm-white?style=flat-square&logo=Sequelize&logoColor=cyan&label=sequelize%20v6&labelColor=gray&color=%2352B0E7)](https://sequelize.org/)
  [![Static Badge](https://img.shields.io/badge/js-white?style=flat-square&logo=dotenv&logoColor=yellow&label=dotenv&labelColor=grey&color=%23ECD53F)](https://www.npmjs.com/package/dotenv)

</div>

Este repositório contém uma API em Node.js construída com o framework Express, utilizando o Sequelize como ORM para interação com o banco de dados e suporte para uploads de arquivos diretamente para o Firebase Storage.

## Configuração do Ambiente

Antes de começar, certifique-se de ter o Node.js e o npm instalados em sua máquina. Além disso, é necessário configurar as variáveis de ambiente para o Firebase. Copie o arquivo `.env.sample` para um novo arquivo chamado `.env` e preencha as variáveis com suas credenciais do Firebase.

```bash
cp .env.sample .env

```

Instale as dependências do projeto com o seguinte comando:
```bash
npm install
```
Certifique-se de ter configurado corretamente o arquivo "database.js" com as configurações do seu banco de dados

## Iniciando a Aplicação

Inicie o servidor localmento com o seguinte comando:
```bash
npm start
```
