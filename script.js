/* --- INICIALIZAÇÃO E LÓGICA DO FIREBASE AUTH --- */

// SUA CONFIGURAÇÃO ESPECÍFICA DO FIREBASE
const firebaseConfig = {
  apiKey: "AIzaSyAKA6yEzzJOy-5eI2Is-bo1y2fVSaOX9kI",
  authDomain: "atualizacaookanbot.firebaseapp.com",
  databaseURL: "https://atualizacaookanbot-default-rtdb.firebaseio.com",
  projectId: "atualizacaookanbot",
  storageBucket: "atualizacaookanbot.firebasestorage.app",
  messagingSenderId: "169947455035",
  appId: "1:169947455035:web:ee0aab85b08efef191c61e"
};

// Inicializa o Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

/* --- FIM DA LÓGICA DO FIREBASE --- */


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

    /* --- LÓGICA DE AUTENTICAÇÃO E ROTEAMENTO --- */

    // Referências do DOM
    const loginContainer = document.getElementById('login-container');
    const dashboardContainer = document.querySelector('.dashboard-container');
    const particlesJsEl = document.getElementById('particles-js');

    const emailInput = document.getElementById('email-input');
    const passwordInput = document.getElementById('password-input');
    
    const loginBtn = document.getElementById('login-btn');
    const logoutBtn = document.getElementById('logout-link');
    
    const toggleLink = document.getElementById('toggle-to-register');
    const formTitle = document.getElementById('form-title');
    const errorMessage = document.getElementById('auth-error-message');

    let isRegisterMode = false;

    // Alterna entre Login e Registro
    toggleLink.addEventListener('click', (e) => {
        e.preventDefault();
        isRegisterMode = !isRegisterMode;
        
        if (isRegisterMode) {
            formTitle.textContent = 'Registrar';
            loginBtn.textContent = 'Criar Conta';
            toggleLink.innerHTML = 'Já tem uma conta? <a href="#" id="toggle-to-login">Entre</a>';
        } else {
            formTitle.textContent = 'Login';
            loginBtn.textContent = 'Entrar';
            toggleLink.innerHTML = 'Não tem uma conta? <a href="#" id="toggle-to-register">Registre-se</a>';
        }
        errorMessage.style.display = 'none';
    });

    // Função para mostrar erros
    function showAuthError(message) {
        // Traduz mensagens comuns do Firebase
        let ptMessage = message;
        if (message.includes("auth/email-already-in-use")) {
            ptMessage = "Este e-mail já está em uso.";
        } else if (message.includes("auth/wrong-password")) {
            ptMessage = "Senha incorreta.";
        } else if (message.includes("auth/user-not-found")) {
            ptMessage = "Usuário não encontrado.";
        } else if (message.includes("auth/weak-password")) {
            ptMessage = "A senha deve ter pelo menos 6 caracteres.";
        } else {
             ptMessage = "Ocorreu um erro. Tente novamente.";
        }
        
        errorMessage.textContent = ptMessage;
        errorMessage.style.display = 'block';
    }

    // Ação do Botão (Login ou Registro)
    loginBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const email = emailInput.value;
        const password = passwordInput.value;
        
        if (!email || !password) {
            showAuthError("Por favor, preencha o e-mail e a senha.");
            return;
        }

        errorMessage.style.display = 'none';
        loginBtn.disabled = true;
        loginBtn.textContent = 'Carregando...';

        if (isRegisterMode) {
            // --- MODO REGISTRO ---
            auth.createUserWithEmailAndPassword(email, password)
                .then((userCredential) => {
                    // Sucesso no registro (já loga automaticamente)
                    // O 'onAuthStateChanged' cuidará de mostrar o dashboard
                })
                .catch((error) => {
                    showAuthError(error.message);
                })
                .finally(() => {
                    loginBtn.disabled = false;
                    loginBtn.textContent = 'Criar Conta';
                });
        } else {
            // --- MODO LOGIN ---
            auth.signInWithEmailAndPassword(email, password)
                .then((userCredential) => {
                    // Sucesso no login
                    // O 'onAuthStateChanged' cuidará de mostrar o dashboard
                })
                .catch((error) => {
                    showAuthError(error.message);
                })
                .finally(() => {
                    loginBtn.disabled = false;
                    loginBtn.textContent = 'Entrar';
                });
        }
    });

    // Ação de Logout
    logoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        auth.signOut();
    });

    // --- O OBSERVADOR DE AUTENTICAÇÃO ---
    // Esta é a função mais importante.
    // Ela roda automaticamente quando a página carrega e
    // sempre que o status de login/logout muda.
    auth.onAuthStateChanged((user) => {
        if (user) {
            // --- USUÁRIO ESTÁ LOGADO ---
            console.log("Usuário logado:", user.email);
            // Esconde a tela de login
            if (loginContainer) loginContainer.style.display = 'none';
            // Mostra o dashboard e as partículas
            if (dashboardContainer) dashboardContainer.style.display = 'flex';
            if (particlesJsEl) particlesJsEl.style.display = 'block';
        } else {
            // --- USUÁRIO ESTÁ DESLOGADO ---
            console.log("Usuário deslogado.");
            // Mostra a tela de login
            if (loginContainer) loginContainer.style.display = 'flex';
            // Esconde o dashboard e as partículas
            if (dashboardContainer) dashboardContainer.style.display = 'none';
            if (particlesJsEl) particlesJsEl.style.display = 'none';
        }
    });

});
