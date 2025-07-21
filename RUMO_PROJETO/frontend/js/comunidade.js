document.addEventListener('DOMContentLoaded', () => {
    // Carregar posts na página da comunidade
    if (document.getElementById('posts-container')) {
        async function carregarPosts() { /* ... lógica de carregar posts sem alteração ... */ }
        carregarPosts();

        // Link para nova publicação
        const newPostButton = document.querySelector('.btn-new-post');
        if (newPostButton) {
            newPostButton.addEventListener('click', () => {
                if (!getToken()) {
                    alert('Você precisa estar logado para criar uma publicação.');
                    window.location.href = 'login.html';
                } else {
                    window.location.href = 'novo-post.html';
                }
            });
        }
    }

    // Lógica para o formulário de novo post
    const newPostForm = document.getElementById('new-post-form');
    if (newPostForm) {
        if (!getToken()) {
            alert('Acesso negado.');
            window.location.href = 'login.html';
            return;
        }

        newPostForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const titulo = document.getElementById('post-titulo').value;
            const conteudo = document.getElementById('post-conteudo').value;
            const topico = document.getElementById('post-topico').value;

            try {
                await fetchAPI('/posts', {
                    method: 'POST',
                    body: JSON.stringify({ titulo, conteudo, topico }),
                });
                alert('Publicação criada com sucesso!');
                window.location.href = 'comunidade.html';
            } catch (error) {
                alert('Erro ao criar publicação.');
                console.error(error);
            }
        });
    }
});