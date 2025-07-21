const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

const postsPath = path.join(__dirname, '../data/posts.json');

const lerPosts = () => {
    if (!fs.existsSync(postsPath)) return [];
    return JSON.parse(fs.readFileSync(postsPath));
};

const salvarPosts = (posts) => {
    fs.writeFileSync(postsPath, JSON.stringify(posts, null, 2));
};

// Rota PÚBLICA para buscar todos os posts
router.get('/', (req, res) => {
    const posts = lerPosts();
    res.json(posts.sort((a, b) => b.id - a.id));
});

// Rota PROTEGIDA para criar um novo post
router.post('/', authMiddleware, (req, res) => {
    const { titulo, conteudo, topico } = req.body;
    const posts = lerPosts();
    
    const novoPost = {
        id: Date.now(),
        authorId: req.user.id,
        author: req.user.nome, // Nome do usuário do token
        titulo,
        conteudo,
        topico,
        likes: 0,
        comments: [],
        createdAt: new Date().toISOString()
    };

    posts.push(novoPost);
    salvarPosts(posts);
    res.status(201).json(novoPost);
});

module.exports = router;