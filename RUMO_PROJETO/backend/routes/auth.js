const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const usuariosPath = path.join(__dirname, '../data/usuarios.json');
const SECRET_KEY = 'sua-chave-secreta-muito-segura'; // Mude isso em produção!

const lerUsuarios = () => {
    const data = fs.readFileSync(usuariosPath);
    return JSON.parse(data);
};

const salvarUsuarios = (usuarios) => {
    fs.writeFileSync(usuariosPath, JSON.stringify(usuarios, null, 2));
};

// Rota de Registro
router.post('/register', async (req, res) => {
    const { nome, email, senha, tipo } = req.body;
    const usuarios = lerUsuarios();

    if (usuarios.find(u => u.email === email)) {
        return res.status(400).json({ message: 'E-mail já cadastrado.' });
    }

    const hashedPassword = await bcrypt.hash(senha, 10);
    const novoUsuario = { id: Date.now(), nome, email, senha: hashedPassword, tipo };
    
    usuarios.push(novoUsuario);
    salvarUsuarios(usuarios);

    res.status(201).json({ message: 'Usuário cadastrado com sucesso!' });
});

// Rota de Login
router.post('/login', async (req, res) => {
    const { email, senha } = req.body;
    const usuarios = lerUsuarios();
    const usuario = usuarios.find(u => u.email === email);

    if (!usuario || !await bcrypt.compare(senha, usuario.senha)) {
        return res.status(401).json({ message: 'Credenciais inválidas.' });
    }

    const token = jwt.sign({ id: usuario.id, nome: usuario.nome }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token, nome: usuario.nome });
});

module.exports = router;