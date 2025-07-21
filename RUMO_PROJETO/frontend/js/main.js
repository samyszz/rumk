document.addEventListener('DOMContentLoaded', () => {
    // Lógica do Carrossel (apenas na index.html)
    const carouselContainer = document.querySelector('.carousel-container');
    if (carouselContainer) {
        const slides = document.querySelectorAll(".carousel-slide");
        const dots = document.querySelectorAll(".dot");
        let slideIndex = 0;

        function showSlides() {
            slides.forEach(slide => slide.style.display = "none");
            dots.forEach(dot => dot.classList.remove("active"));
            
            slideIndex++;
            if (slideIndex > slides.length) { slideIndex = 1 }
            
            slides[slideIndex - 1].style.display = "block";
            dots[slideIndex - 1].classList.add("active");
        }
        
        // Exibe o primeiro slide imediatamente
        showSlides(); 
        
        // Troca automática
        let slideInterval = setInterval(showSlides, 5000);

        // Permite clicar nos pontos para navegar
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                clearInterval(slideInterval); // Para o automático
                slideIndex = index;
                showSlides();
                slideInterval = setInterval(showSlides, 5000); // Reinicia
            });
        });
    }

    // Lógica para o Menu (em todas as páginas)
    const profileIcon = document.querySelector('.profile-icon a');
    const createAccountBtn = document.querySelector('.main-nav .btn');
    const navLinks = document.querySelector('.main-nav ul');

    if (getToken()) {
        // Logado
        if (profileIcon) profileIcon.href = 'perfil.html';
        if (navLinks) {
            navLinks.innerHTML = `
                <li><a href="index.html">Home</a></li>
                <li><a href="hub.html">Hub + Rumo</a></li>
                <li><a href="comunidade.html">Comunidade</a></li>
                <li><a href="documentos.html">Documentos</a></li>
                <li><a href="#" id="logout-btn" class="btn small">Sair</a></li>
            `;
            document.getElementById('logout-btn').addEventListener('click', (e) => {
                e.preventDefault();
                logout();
            });
        }
    } else {
        // Deslogado
        if (profileIcon) profileIcon.href = 'login.html';
    }
});