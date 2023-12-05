const express = require("express");

const categoria = require("../model/Categoria");

const router = express.Router();

//ROTA DE INSERÇÃO DE CATEGORIA

router.post("/categoria/cadastrarCategoria", (req, res) => {
    let { nome_categoria, obs_categoria } = req.body;

    categoria.create({ nome_categoria, obs_categoria })
        .then(() => {
            return res.status(201).json({
                errorStatus: false,
                messageStatus: "Categoria inserida com êxito!"
            });
        })
        .catch((error) => {
            return res.status(500).json({
                errorStatus: true,
                messageStatus: error
            });
        });
});

//ROTA DE LISTAGEM DE CATEGORIA
router.get("/categoria/listarCategoria", (req, res) => {
    categoria.findAll()
        .then((categorias) => {
            return res.status(200).json(categorias);
        })
        .catch((error) => {
            return res.status(500).json({
                errorStatus: true,
                messageStatus: error
            });
        });
});

//ROTA DE BUSCA DE CATEGORIA POR ID

router.get("/categoria/listarID/:codigo_categoria", (req, res) => {
    let { codigo_categoria } = req.params;

    categoria.findByPk(codigo_categoria)
        .then((categoria) => {
            if (!categoria) {
                return res.status(404).json({
                    errorStatus: true,
                    messageStatus: "Categoria não encontrada!",
                });
            } else {
                return res.status(200).json(categoria)
            }
        })
        .catch((error) => {
            return res.status(500).json({
                errorStatus: true,
                messageStatus: error
            });
        });
});

//ROTA DE ALTERAÇÃO DE CATEGORIA
router.put("/categoria/editarCategoria", (req, res) => {
    let { obs_categoria, nome_categoria, codigo_categoria } = req.body;

    categoria.update(
        { nome_categoria, obs_categoria },
        { where: { codigo_categoria } }
    )
        .then((categoria) => {
            if (categoria == !categoria) {
                return res.status(404).json({
                    errorStatus: true,
                    messageStatus: "Categoria não encontrada!",
                });
            } else {
                return res.status(200).json(`O nome da categoria correspondente pelo código ${codigo_categoria} agora é ${nome_categoria}`)
            }
        })
        .catch((error) => {
            return res.status(500).json({
                errorStatus: true,
                messageStatus: error
            });
        })
});

//ROTA DE EXCLUSÃO DE CATEGORIA
router.delete("/categoria/excluirCategoria/:codigo_categoria", (req, res) => {
    let {codigo_categoria} = req.params;

    categoria.destroy(
        { where: { codigo_categoria } }
    )
    .then((categoria) => {
        if (categoria == !categoria) {
            return res.status(404).json({
                errorStatus: true,
                messageStatus: "Categoria não encontrada!",
            });
        } else {
            return res.status(200).json(`A categoria correspondente pelo código ${codigo_categoria} foi excluída com sucesso!`)
        }
    })
    .catch((error) => {
        return res.status(500).json({
            errorStatus: true,
            messageStatus: error
        });
    })
});
module.exports = router;