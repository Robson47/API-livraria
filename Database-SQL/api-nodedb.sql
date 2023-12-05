CREATE DATABASE api_produtos;
USE api_produtos;

CREATE TABLE tbl_produtos(
	codigo_produto INT PRIMARY KEY AUTO_INCREMENT,
    codigo_categoria INT NOT NULL,
    nome_produto VARCHAR(255) NOT NULL,
    preco_produto DECIMAL(10, 2) NOT NULL,
    imagem_produto VARCHAR(500) NOT NULL,
    imagem_produto_url VARCHAR(500) NOT NULL,
    descricao_produto TEXT NOT NULL,
    createdAt DATETIME,
    updatedAt DATETIME
);

CREATE TABLE tbl_categorias(
	codigo_categoria INT PRIMARY KEY AUTO_INCREMENT,
    nome_categoria VARCHAR(255) NOT NULL,
	obs_categoria TEXT NOT NULL,
    createdAt DATETIME,
    updatedAt DATETIME
);

ALTER TABLE tbl_produtos ADD CONSTRAINT fk_codigo_categoria FOREIGN KEY(codigo_categoria) REFERENCES tbl_categorias(codigo_categoria);