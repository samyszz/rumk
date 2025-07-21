const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const hubPath = path.join(__dirname, '../data/hub.json');

const lerHubData = () => {
    if (!fs.existsSync(hubPath)) return { ongs: [], guias: [] };
    const data = fs.readFileSync(hubPath);
    return JSON.parse(data);
};

// Rota para buscar dados do Hub (ONGs e guias)
router.get('/', (req, res) => {
    const hubData = lerHubData();
    res.json(hubData);
});

module.exports = router;