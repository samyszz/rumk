document.addEventListener('DOMContentLoaded', () => {
    // Lógica para abas (já implementada anteriormente)
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(button => { /* ... código das abas ... */ });

    // Lógica de Registro
    const registrationForms = document.querySelectorAll('.registration-form');
    registrationForms.forEach(form => {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const nome = form.querySelector('input[type="text"]').value;
            const email = form.querySelector('input[type="email"]').value;
            const senha = form.querySelector('input[type="password"]').value;
            const tipo = form.id.replace('-form', ''); // pf, ong, pj

            try {
                const result = await register(nome, email, senha, tipo);
                alert(result.message);
                window.location.href = 'login.html';
            } catch (error) {
                alert('Erro no cadastro: ' + error.message);
            }
        });
    });

    // Lógica de Login
    const loginForm = document.getElementById('login-form');
    if(loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('login-email').value;
            const senha = document.getElementById('login-senha').value;
            
            try {
                await login(email, senha);
            } catch (error) {
                alert('Falha no login. Verifique suas credenciais.');
            }
        });
    }
});