require('dotenv').config(); // Carrega as variáveis do .env
const express = require('express');
const cors = require('cors');
const path = require('path');

// Rotas da API
const authRoutes = require('./routes/auth');
const documentosRoutes = require('./routes/documentos');
const postsRoutes = require('./routes/posts');
const hubRoutes = require('./routes/hub');
const userRoutes = require('./routes/users'); // Nova rota de usuário

const app = express();
const PORT = 3000;

// Middlewares
app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); // Para parsing de formulários

// Servir arquivos estáticos da pasta 'uploads'
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Definindo as rotas da API
app.use('/api/auth', authRoutes);
app.use('/api/documentos', documentosRoutes);
app.use('/api/posts', postsRoutes);
app.use('/api/hub', hubRoutes);
app.use('/api/users', userRoutes); // Usando a nova rota

// Rota de teste
app.get('/', (req, res) => {
    res.send('API da R.U.M.O. está funcionando!');
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});