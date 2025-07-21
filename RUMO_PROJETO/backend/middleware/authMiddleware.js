const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Formato "Bearer TOKEN"

    if (token == null) {
        return res.sendStatus(401); // Não autorizado
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.sendStatus(403); // Token inválido/expirado
        }
        req.user = user; // Adiciona os dados do usuário (id, nome) à requisição
        next(); // Passa para a próxima função (a rota)
    });
}

module.exports = authMiddleware;