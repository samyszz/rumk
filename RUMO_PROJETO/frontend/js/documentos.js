document.addEventListener('DOMContentLoaded', () => {
    const mainContent = document.getElementById('main-content');

    if (!getToken()) {
        mainContent.innerHTML = `
            <section class="form-container" style="text-align: center;">
                <h2>Acesso Negado</h2>
                <p>Você precisa estar logado para acessar seu cofre de documentos.</p>
                <a href="login.html" class="btn" style="margin-top: 1rem;">Fazer Login</a>
            </section>
        `;
        return;
    }

    // Se estiver logado, constrói a página
    mainContent.innerHTML = `
        <section class="page-header" style="text-align: center; margin: 2rem 0;">
            <h1>Cofre de Documentos</h1>
            <p>Adicione, visualize e gerencie seus documentos com segurança.</p>
        </section>
        <section class="form-container" style="max-width: 700px; margin: 2rem auto;">
            <h3>Adicionar Novo Documento</h3>
            <form id="add-document-form">
                </form>
        </section>
        <section id="documents-list" style="margin-top: 3rem;">
            <h2>Seus Documentos</h2>
        </section>
    `;
    
    // Agora, adicione a lógica para carregar e adicionar documentos
    const documentsList = document.getElementById('documents-list');
    const addDocumentForm = document.getElementById('add-document-form');

    async function carregarDocumentos() { /* ... código sem alterações ... */ }
    addDocumentForm.addEventListener('submit', async (e) => { /* ... código sem alterações ... */ });
    carregarDocumentos();
});