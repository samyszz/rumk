document.addEventListener('DOMContentLoaded', () => {
    if (!getToken()) {
        window.location.href = 'login.html';
        return;
    }

    // Lógica para a página de visualização de perfil
    const perfilContainer = document.getElementById('perfil-container');
    if (perfilContainer) {
        async function carregarPerfil() {
            try {
                const perfil = await fetchAPI('/users/perfil');
                perfilContainer.innerHTML = `
                    <div class="post-card">
                        <div class="post-content">
                            <h1>${perfil.nome}</h1>
                            <p><strong>Email:</strong> ${perfil.email}</p>
                            <p><strong>País de Origem:</strong> ${perfil.paisDeOrigem || 'Não informado'}</p>
                            <p><strong>Bio:</strong> ${perfil.bio || 'Nenhuma biografia adicionada.'}</p>
                            <a href="editar-perfil.html" class="btn" style="margin-top: 1rem;">Editar Perfil</a>
                        </div>
                    </div>
                `;
            } catch (error) {
                perfilContainer.innerHTML = '<p>Erro ao carregar o perfil.</p>';
            }
        }
        carregarPerfil();
    }

    // Lógica para o formulário de edição
    const editProfileForm = document.getElementById('edit-profile-form');
    if (editProfileForm) {
        // Primeiro, preenche o formulário com os dados atuais
        async function preencherFormulario() {
            try {
                const perfil = await fetchAPI('/users/perfil');
                document.getElementById('profile-nome').value = perfil.nome;
                document.getElementById('profile-pais').value = perfil.paisDeOrigem || '';
                document.getElementById('profile-bio').value = perfil.bio || '';
            } catch (error) {
                console.error('Erro ao buscar dados para edição.');
            }
        }
        preencherFormulario();

        // Depois, adiciona o evento de submit
        editProfileForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const nome = document.getElementById('profile-nome').value;
            const paisDeOrigem = document.getElementById('profile-pais').value;
            const bio = document.getElementById('profile-bio').value;

            try {
                await fetchAPI('/users/perfil', {
                    method: 'PUT',
                    body: JSON.stringify({ nome, paisDeOrigem, bio }),
                });
                alert('Perfil atualizado com sucesso!');
                window.location.href = 'perfil.html';
            } catch (error) {
                alert('Erro ao atualizar o perfil.');
            }
        });
    }
});