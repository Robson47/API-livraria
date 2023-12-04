const express = require('express');
const app = express();
const router = express.Router();
const upload = require('../helpers/upload/uploadImg');
const produto = require('../model/Produto');
const { initializeApp, FirebaseError } = require('firebase/app');
const { getStorage, ref, getDownloadURL, uploadBytes, listAll, deleteObject } = require('firebase/storage');
const deleteImage = require('../helpers/upload/deleteImagem');

require("dotenv").config()

const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID,
    measurementId: process.env.MEASUREMENT_ID
};

console.log(firebaseConfig);

const firebaseApp = initializeApp(firebaseConfig);

const storage = getStorage(firebaseApp);

router.post('/prod/cadastrarProduto', upload.array('files', 1), (req, res) => {
    const { nome_produto, preco_produto, descricao_produto, codigo_categoria } = req.body;
    const files = req.files;

    console.log(req);

    let imagem_produto, imagem_produto_url;
    let cont = 0;

    files.forEach(file => {
        const fileName = Date.now().toString() + '-' + file.originalname;
        const fileRef = ref(storage, fileName);

        uploadBytes(fileRef, file.buffer)
            .then((snapshot) => {
                imageRef = ref(storage, snapshot.metadata.name);
                getDownloadURL(imageRef)
                    .then((urlFinal) => {
                        if (cont == 0) {
                            imagem_produto = fileName;
                            imagem_produto_url = urlFinal;
                            cont++;
                            console.log('Nome da imagem peq ' + imagem_produto);
                            console.log('URL da imagem peq ' + imagem_produto_url);
                        } 
                        if (imagem_produto) {
                            //GRAVAÇÃO DOS ProdutoS NO BANCO DE DADOS
                            produto.create({ nome_produto, preco_produto, imagem_produto, imagem_produto_url, descricao_produto, codigo_categoria })
                                .then(() => {
                                    return res.status(201).json({
                                        erroStatus: false,
                                        mensagemStatus: 'Produto inserido com sucesso.'
                                    });
                                }
                                ).catch((erro) => {
                                    return res.status(400).json({
                                        erroStatus: true,
                                        erroMensagem: erro
                                    });
                                });
                        }
                    })
            })
            .catch((error) => {
                res.send('Erro: ' + error)
            });
    });
});

router.get('/prod/listarProduto', (req, res) => {

    produto.findAll()
        .then((produto) => {
            return res.status(200).json(produto)
        }).catch((erro) => {
            return res.status(400).json({
                erroStatus: true,
                erroMensagem: erro
            });
        });
});

router.get('/prod/listarProdutoCodigo/:codigo_produto', (req, res) => {

    const { codigo_produto } = req.params

    produto.findByPk(codigo_produto)
        .then((produto) => {
            return res.status(200).json(produto)
        }).catch((erro) => {
            return res.status(400).json({
                erroStatus: true,
                erroMensagem: erro
            });
        });
});

router.delete('/prod/excluirProduto/:codigo_produto', (req, res) => {

    const { codigo_produto } = req.params;

    produto.findByPk(codigo_produto)
        .then((produto) => {
            deleteImage(produto.imagem_produto);
            produto.destroy({
                where: { codigo_produto }
            })
                .then(() => {
                    return res.status(200).json({
                        erroStatus: false,
                        mensagemStatus: 'Produto excluído com sucesso'
                    });
                })
                .catch((erro) => {
                    return res.status(400).json({
                        erroStatus: true,
                        mensagemStatus: erro
                    });
                });
        });
});

router.put('/prod/editarProduto', (req, res) => {

    const { nome_produto, preco_produto, descricao_produto, imagem_produto, imagem_produto_url, codigo_categoria, codigo_produto } = req.body;
    /** UPDATE SEM IMAGEM **/
    produto.update({ nome_produto, preco_produto, descricao_produto, imagem_produto, imagem_produto_url, codigo_categoria, codigo_produto },
        { where: { codigo_produto } }
    ).then(
        () => {
            return res.status(200).json({
                erroStatus: false,
                mensagemStatus: 'Produto alterado com sucesso.'
            });
        }).catch((erro) => {
            return res.status(400).json({
                erroStatus: true,
                erroMensagem: erro
            });
        });
});

module.exports = router;