document.addEventListener('DOMContentLoaded', () => {
    // =======================================================
    // 1. CONFIGURAÇÃO DO FIREBASE (COM A SUA CHAVE)
    // =======================================================
    const firebaseConfig = {
      apiKey: "AIzaSyADkjUglYQfFDoHZTBSPEajGabS0W5fFKQ",
      authDomain: "sistema-login-python.firebaseapp.com",
      projectId: "sistema-login-python",
      storageBucket: "sistema-login-python.appspot.com",
      messagingSenderId: "1043455950430",
      appId: "1:1043455950430:web:9863511feb299fc9c73ecf"
    };

    // Inicializa o Firebase
    firebase.initializeApp(firebaseConfig);
    const auth = firebase.auth();
    const db = firebase.firestore();

    // =======================================================
    // 2. ELEMENTOS DO DOM
    // =======================================================
    const landingPage = document.getElementById('landing-page');
    const loginPage = document.getElementById('login-page');
    const registerPage = document.getElementById('register-page');
    const dashboardPage = document.getElementById('dashboard-page');

    const gotoLoginBtn = document.getElementById('goto-login');
    const gotoRegisterBtn = document.getElementById('goto-register');
    
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');

    const logoutButton = document.getElementById('logout-button');

    const loginError = document.getElementById('login-error');
    const registerError = document.getElementById('register-error');
    const userEmailDisplay = document.getElementById('user-email-display');

    // =======================================================
    // 3. LÓGICA DE NAVEGAÇÃO E AUTENTICAÇÃO
    // =======================================================
    const showPage = (pageToShow) => {
        [landingPage, loginPage, registerPage, dashboardPage].forEach(page => page.classList.add('hidden'));
        pageToShow.classList.remove('hidden');
    };

    auth.onAuthStateChanged(user => {
        if (user) {
            userEmailDisplay.textContent = user.email;
            showPage(dashboardPage);
        } else {
            showPage(landingPage);
        }
    });

    gotoLoginBtn.addEventListener('click', () => showPage(loginPage));
    gotoRegisterBtn.addEventListener('click', () => showPage(registerPage));
    
    logoutButton.addEventListener('click', () => auth.signOut());

    // =======================================================
    // 4. NOVA LÓGICA DE CADASTRO (COM NOME DE USUÁRIO)
    // =======================================================
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        registerError.textContent = '';
        const username = registerForm['reg-username'].value.trim();
        const email = registerForm['reg-email'].value.trim();
        const password = registerForm['reg-password'].value;

        if (username.includes('/') || username.includes(' ')) {
            registerError.textContent = "Nome de usuário não pode conter espaços ou '/'.";
            return;
        }

        try {
            // Passo 1: Verificar se o nome de usuário já existe no Firestore
            const userDocRef = db.collection('usuarios').doc(username);
            const userDoc = await userDocRef.get();

            if (userDoc.exists) {
                registerError.textContent = "Este nome de usuário já está em uso.";
                return;
            }

            // Passo 2: Criar o usuário no Firebase Auth (com e-mail e senha)
            const userCredential = await auth.createUserWithEmailAndPassword(email, password);
            const user = userCredential.user;

            // Passo 3: Criar o documento do usuário no Firestore com a estrutura desejada
            await userDocRef.set({
                email: email, // Armazenamos o email para a lógica de login
                hwid: "Ainda não definido",
                licenca_validade: "Ainda não definida",
                licenca_validade_MONTADOR: "21 de setembro de 2025 às 00:00:00 UTC-3", // Exemplo
                privacy_hide_ranking: false,
                privacy_hide_stats: false,
                privacy_ranking_last_changed: null,
                privacy_stats_last_changed: null,
                trial_used: false,
                ultimo_login: firebase.firestore.FieldValue.serverTimestamp()
                // NUNCA ARMAZENAR A SENHA AQUI!
            });

            registerForm.reset();
            // O onAuthStateChanged cuidará do redirecionamento

        } catch (error) {
            // Trata erros comuns, como e-mail já em uso pelo Auth
            if (error.code === 'auth/email-already-in-use') {
                registerError.textContent = 'Este e-mail já está em uso.';
            } else {
                registerError.textContent = 'Falha no cadastro: ' + error.message;
            }
        }
    });

    // =======================================================
    // 5. NOVA LÓGICA DE LOGIN (COM NOME DE USUÁRIO)
    // =======================================================
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        loginError.textContent = '';
        const username = loginForm['login-username'].value.trim();
        const password = loginForm['login-password'].value;

        try {
            // Passo 1: Buscar o documento do usuário no Firestore pelo nome de usuário
            const userDocRef = db.collection('usuarios').doc(username);
            const userDoc = await userDocRef.get();

            if (!userDoc.exists) {
                loginError.textContent = "Usuário ou senha inválidos.";
                return;
            }

            // Passo 2: Obter o e-mail associado a esse nome de usuário
            const userData = userDoc.data();
            const email = userData.email;

            if (!email) {
                loginError.textContent = "Erro de configuração da conta. Contate o suporte.";
                return;
            }

            // Passo 3: Usar o e-mail e a senha para fazer login de forma segura com o Firebase Auth
            await auth.signInWithEmailAndPassword(email, password);

            // Passo 4 (Opcional): Atualizar o campo 'ultimo_login'
            await userDocRef.update({
                ultimo_login: firebase.firestore.FieldValue.serverTimestamp()
            });

            loginForm.reset();
            // O onAuthStateChanged cuidará do redirecionamento

        } catch (error) {
            loginError.textContent = "Usuário ou senha inválidos.";
        }
    });
});