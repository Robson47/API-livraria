const express = require('express');
const app = express();
const router = express.Router();
const upload = require('../helper/upload/uploadImg');
const livro = require('../model/Livro');

const { initializeApp, FirebaseError } = require('firebase/app');
const { getStorage, ref, getDownloadURL, uploadBytes, listAll, deleteObject } = require('firebase/storage');

require('dotenv').config();

const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID,
    measurementId: process.env.MEASUREMENT_ID
};

const firebaseApp = initializeApp(firebaseConfig);

const storage = getStorage(firebaseApp);

router.post('/livro/cadastrarLivro', upload.array('files', 2), (req, res) => {
    const { titulo, preco, detalhes, codigo_categoria } = req.body;
    const files = req.files;

    let imagem_peq_url, imagem_grd_url, imagem_peq, imagem_grd;
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
                            imagem_peq = fileName;
                            imagem_peq_url = urlFinal;
                            cont++;
                            console.log('Nome da imagem peq ' + imagem_peq);
                            console.log('URL da imagem peq ' + imagem_peq_url);
                        } else {
                            imagem_grd = fileName;
                            imagem_grd_url = urlFinal;
                            console.log('Nome da imagem grd ' + imagem_grd);
                            console.log('URL da imagem grd ' + imagem_grd_url);
                        }

                        if (imagem_peq && imagem_grd) {
                            //GRAVAÇÃO DOS LIVROS NO BANCO DE DADOS
                            livro.create({ titulo, preco, imagem_peq, imagem_grd, imagem_peq_url, imagem_grd_url, detalhes, codigo_categoria })
                                .then(() => {
                                    return res.status(201).json({
                                        erroStatus: false,
                                        mensagemStatus: 'Livro inserido com sucesso.'
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

router.get('/livro/listarLivro', (req, res) => {

    livro.findAll()
        .then((livros) => {
            return res.status(200).json(livros)
        }).catch((erro) => {
            return res.status(400).json({
                erroStatus: true,
                erroMensagem: erro
            });
        });
});

router.get('/livro/listarLivroCodigo/:codigo_livro', (req, res) => {

    const { codigo_livro } = req.params

    livro.findByPk(codigo_livro)
        .then((livro) => {
            return res.status(200).json(livro)
        }).catch((erro) => {
            return res.status(400).json({
                erroStatus: true,
                erroMensagem: erro
            });
        });
});

router.delete('/livro/excluirLivro/:codigo_livro', (req, res) => {

    const { codigo_livro } = req.params;

    livro.findByPk(codigo_livro)
        .then(
            livro.destroy({
                where: { codigo_livro }
            })).then(
                () => {
                    return res.status(200).json({
                        erroStatus: false,
                        mensagemStatus: 'Livro excluído com sucesso.'
                    });

                }).catch((erro) => {
                    return res.status(400).json({
                        erroStatus: true,
                        erroMensagem: erro
                    });
                });

});

router.put('/livro/editarLivro', (req, res) => {

    const { titulo, preco, detalhes, imagem_grd, imagem_peq, codigo_categoria, codigo_livro } = req.body;
    /** UPDATE SEM IMAGEM **/
    livro.update({ titulo, preco, detalhes, imagem_grd, imagem_peq, codigo_categoria, codigo_livro },
        { where: { codigo_livro } }
    ).then(
        () => {
            return res.status(200).json({
                erroStatus: false,
                mensagemStatus: 'Livro alterado com sucesso.'
            });
        }).catch((erro) => {
            return res.status(400).json({
                erroStatus: true,
                erroMensagem: erro
            });
        });
});

module.exports = router;