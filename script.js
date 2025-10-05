/* Configuração do Particles.js */
if (document.getElementById('particles-js')) {
    particlesJS("particles-js", {
        "particles": {
            "number": {
                "value": 80,
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": "#0084ff"
            },
            "shape": {
                "type": "circle"
            },
            "opacity": {
                "value": 0.5,
                "random": false
            },
            "size": {
                "value": 3,
                "random": true
            },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#0084ff",
                "opacity": 0.4,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 4,
                "direction": "none",
                "out_mode": "out",
                "bounce": false
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "grab"
                },
                "onclick": {
                    "enable": true,
                    "mode": "push"
                },
                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": 140,
                    "line_linked": {
                        "opacity": 1
                    }
                },
                "push": {
                    "particles_nb": 4
                }
            }
        },
        "retina_detect": true
    });
}


document.addEventListener('DOMContentLoaded', (event) => {
    /* --- LÓGICA DE NAVEGAÇÃO DAS FERRAMENTAS --- */
    const toolContainers = document.querySelectorAll('.tool-container');
    const menuLinks = document.querySelectorAll('.sidebar-menu a');

    const botsToolLink = document.getElementById('inicio-link');
    const ferramentasLink = document.getElementById('ferramentas-link');
    const converterLink = document.getElementById('converter-link');

    function showTool(toolId) {
        toolContainers.forEach(tool => {
            if (tool.id === toolId) {
                tool.classList.add('active');
            } else {
                tool.classList.remove('active');
            }
        });
    }

    function setActiveLink(activeLink) {
        menuLinks.forEach(link => link.classList.remove('active'));
        if (activeLink) {
            activeLink.classList.add('active');
            // Como "Início" e "Ferramentas" abrem a mesma tela, mantemos ambos ativos/inativos juntos
            if(activeLink.id === 'inicio-link' || activeLink.id === 'ferramentas-link') {
                 botsToolLink.classList.add('active');
                 ferramentasLink.classList.add('active');
                 converterLink.classList.remove('active');
            } else {
                 botsToolLink.classList.remove('active');
                 ferramentasLink.classList.remove('active');
            }
        }
    }
    
    botsToolLink.addEventListener('click', (e) => {
        e.preventDefault();
        showTool('bots-tool');
        setActiveLink(botsToolLink);
    });

    ferramentasLink.addEventListener('click', (e) => {
        e.preventDefault();
        showTool('bots-tool');
        setActiveLink(ferramentasLink);
    });

    converterLink.addEventListener('click', (e) => {
        e.preventDefault();
        showTool('converter-tool');
        setActiveLink(converterLink);
    });

    /* --- LÓGICA DO MODAL DE SUPORTE --- */
    const supportModal = document.getElementById("support-modal");
    const supportBtn = document.getElementById("support-link");
    const supportCloseBtn = supportModal ? supportModal.querySelector(".close-btn") : null;

    if (supportBtn) {
        supportBtn.onclick = function(e) {
            e.preventDefault();
            if (supportModal) supportModal.style.display = "block";
        }
    }
    if (supportCloseBtn) {
        supportCloseBtn.onclick = function() {
            if (supportModal) supportModal.style.display = "none";
        }
    }

    /* --- LÓGICA DO MODAL DE DOWNLOAD --- */
    const downloadModal = document.getElementById('download-modal');
    const downloadBtns = document.querySelectorAll('.download-btn');
    const confirmDownloadBtn = document.getElementById('confirm-download-btn');
    const cancelDownloadBtn = document.getElementById('cancel-download-btn');
    const downloadCloseBtn = downloadModal ? downloadModal.querySelector('.close-btn') : null;

    downloadBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const downloadUrl = this.getAttribute('data-url');
            if (confirmDownloadBtn) confirmDownloadBtn.href = downloadUrl;
            if (downloadModal) downloadModal.style.display = 'block';
        });
    });

    function closeDownloadModal() {
        if (downloadModal) downloadModal.style.display = 'none';
    }

    if (downloadCloseBtn) downloadCloseBtn.onclick = closeDownloadModal;
    if (cancelDownloadBtn) cancelDownloadBtn.onclick = closeDownloadModal;

    /* --- LÓGICA DO MODAL DE IMAGEM --- */
    const imageModal = document.getElementById('image-modal');
    const modalImage = document.getElementById('modal-image');
    const clickableImages = document.querySelectorAll('.clickable-image');
    const imageModalCloseBtn = imageModal ? imageModal.querySelector('.image-close-btn') : null;

    clickableImages.forEach(img => {
        img.addEventListener('click', function() {
            if (imageModal && modalImage) {
                imageModal.style.display = 'block';
                modalImage.src = this.src;
            }
        });
    });

    function closeImageModal() {
        if (imageModal) imageModal.style.display = 'none';
    }

    if (imageModalCloseBtn) imageModalCloseBtn.onclick = closeImageModal;


    /* --- LÓGICA GERAL PARA FECHAR MODAIS --- */
    window.onclick = function(event) {
        if (event.target == supportModal) {
            supportModal.style.display = "none";
        }
        if (event.target == downloadModal) {
            downloadModal.style.display = "none";
        }
        if (event.target == imageModal) {
            imageModal.style.display = "none";
        }
    }

    /* --- LÓGICA DO CONVERSOR DE FORMATOS --- */
    const inputAccounts = document.getElementById('input-accounts');
    const outputAccounts = document.getElementById('output-accounts');

    if (inputAccounts && outputAccounts) {
        inputAccounts.addEventListener('input', () => {
            const lines = inputAccounts.value.trim().split('\n');
            let result = '';
            let i = 0;
            while (i < lines.length) {
                if (lines[i].trim() === '') {
                    i++;
                    continue;
                }
                
                // Formato: 2fa, usuario, senha
                if (i + 2 < lines.length) {
                    const line1 = lines[i];
                    const line2 = lines[i+1];
                    const line3 = lines[i+2];

                     // Formato: 2fa, usuario, senha, email
                    if(i + 3 < lines.length) {
                         const line4 = lines[i+3];
                         // Heurística simples: se a 4ª linha não parece um 2FA, supõe-se o formato com email
                         if(!/^\d{6,}$/.test(line4) && line4.includes('@')) {
                            result += `${line2}\n${line3}\n`;
                            i += 4;
                            continue;
                         }
                    }

                    result += `${line2}\n${line3}\n`;
                    i += 3;
                } else {
                    i++;
                }
            }
            outputAccounts.value = result;
        });
    }
});
