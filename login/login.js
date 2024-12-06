const loginForm = document.getElementById('login-form');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const loginError = document.getElementById('login-error');

// Credenciais
const credentials = {
    admin: { username: "admin", password: "1234" },
    user: { username: "user", password: "1234" }
};

loginForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const username = usernameInput.value;
    const password = passwordInput.value;

    if (username === credentials.admin.username && password === credentials.admin.password) {
        window.location.href = "admin/admin.html";  // Redireciona para a página do Admin na pasta 'admin'
    } else if (username === credentials.user.username && password === credentials.user.password) {
        window.location.href = "user/user.html";  // Redireciona para a página do Usuário na pasta 'user'
    } else {
        loginError.classList.remove('hidden');
    }
    
});
