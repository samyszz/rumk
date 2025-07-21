const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const documentosPath = path.join(__dirname, '../data/documentos.json');

const lerDocumentos = () => {
    if (!fs.existsSync(documentosPath)) return [];
    const data = fs.readFileSync(documentosPath);
    return JSON.parse(data);
};

const salvarDocumentos = (documentos) => {
    fs.writeFileSync(documentosPath, JSON.stringify(documentos, null, 2));
};

// Rota para buscar todos os documentos (simulando para um usuário)
router.get('/', (req, res) => {
    // Em uma aplicação real, você filtraria pelo ID do usuário (req.user.id)
    const documentos = lerDocumentos();
    res.json(documentos);
});

// Rota para adicionar um novo documento
router.post('/', (req, res) => {
    const { nome, tipo, dataValidade } = req.body;
    const documentos = lerDocumentos();
    
    const novoDocumento = {
        id: Date.now(),
        // userId: req.user.id, // Adicionar em uma aplicação real
        nome,
        tipo,
        dataValidade,
        dataUpload: new Date().toISOString()
    };

    documentos.push(novoDocumento);
    salvarDocumentos(documentos);
    res.status(201).json(novoDocumento);
});

module.exports = router;