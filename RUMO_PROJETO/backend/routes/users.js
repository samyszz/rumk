const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

const usuariosPath = path.join(__dirname, '../data/usuarios.json');

const lerUsuarios = () => JSON.parse(fs.readFileSync(usuariosPath));
const salvarUsuarios = (data) => fs.writeFileSync(usuariosPath, JSON.stringify(data, null, 2));

// Proteger todas as rotas de usuário
router.use(authMiddleware);

// Rota para pegar dados do perfil do usuário logado
router.get('/perfil', (req, res) => {
    const usuarios = lerUsuarios();
    const usuario = usuarios.find(u => u.id === req.user.id);
    if (!usuario) {
        return res.status(404).send('Usuário não encontrado.');
    }
    // Não enviar a senha para o frontend
    const { senha, ...perfil } = usuario;
    res.json(perfil);
});

// Rota para atualizar o perfil
router.put('/perfil', (req, res) => {
    const { nome, paisDeOrigem, bio } = req.body;
    const usuarios = lerUsuarios();
    const index = usuarios.findIndex(u => u.id === req.user.id);

    if (index === -1) {
        return res.status(404).send('Usuário não encontrado.');
    }

    // Atualiza os dados
    usuarios[index].nome = nome || usuarios[index].nome;
    usuarios[index].paisDeOrigem = paisDeOrigem || usuarios[index].paisDeOrigem;
    usuarios[index].bio = bio || usuarios[index].bio;

    salvarUsuarios(usuarios);
    res.json({ message: 'Perfil atualizado com sucesso!' });
});

module.exports = router;