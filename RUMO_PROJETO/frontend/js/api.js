const API_URL = 'http://localhost:3000/api';

// Função para obter o token do localStorage
function getToken() {
    return localStorage.getItem('rumo_token');
}

// Função para fazer requisições autenticadas
async function fetchAPI(endpoint, options = {}) {
    const token = getToken();
    const headers = {
        'Content-Type': 'application/json',
        ...options.headers,
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_URL}${endpoint}`, { ...options, headers });

    if (!response.ok) {
        if (response.status === 401) {
            // Token inválido ou expirado, deslogar usuário
            logout();
        }
        throw new Error(`Erro na API: ${response.statusText}`);
    }

    return response.json();
}

// Funções de Autenticação
async function login(email, senha) {
    const data = await fetchAPI('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, senha }),
    });
    localStorage.setItem('rumo_token', data.token);
    localStorage.setItem('rumo_user_name', data.nome);
    window.location.href = 'perfil.html';
}

async function register(nome, email, senha, tipo) {
     return await fetchAPI('/auth/register', {
        method: 'POST',
        body: JSON.stringify({ nome, email, senha, tipo }),
    });
}

function logout() {
    localStorage.removeItem('rumo_token');
    localStorage.removeItem('rumo_user_name');
    window.location.href = 'login.html';
}