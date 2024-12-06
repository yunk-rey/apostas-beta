document.getElementById('logout').addEventListener('click', () => {
    window.location.href = "../../login/index.html";  // Redireciona para o login
});

const adminBetsTableBody = document.querySelector('#admin-bets-table tbody');

// Função para carregar as apostas feitas pelo administrador
function loadAdminBets() {
    const adminBets = JSON.parse(localStorage.getItem('adminBets')) || [];
    adminBetsTableBody.innerHTML = '';  // Limpa a tabela

    adminBets.forEach(bet => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${bet.id}</td>
            <td>${bet.description}</td>
            <td>${bet.team1}</td>
            <td>${bet.odd1}</td>
            <td>${bet.team2}</td>
            <td>${bet.odd2}</td>
            <td><button onclick="deleteBet(${bet.id})">Excluir</button></td>
        `;
        adminBetsTableBody.appendChild(row);
    });
}

// Função para excluir uma aposta
function deleteBet(betId) {
    const adminBets = JSON.parse(localStorage.getItem('adminBets')) || [];
    const updatedBets = adminBets.filter(bet => bet.id !== betId);
    localStorage.setItem('adminBets', JSON.stringify(updatedBets));
    loadAdminBets();  // Atualiza a tabela após a exclusão
}

// Função para adicionar uma nova aposta
document.getElementById('bet-form').addEventListener('submit', function(event) {
    event.preventDefault();  // Impede o envio padrão do formulário

    const description = document.getElementById('bet-description').value;
    const team1 = document.getElementById('bet-team1').value;
    const team2 = document.getElementById('bet-team2').value;
    const odd1 = parseFloat(document.getElementById('bet-odd1').value);
    const odd2 = parseFloat(document.getElementById('bet-odd2').value);

    // Gera um ID único para a aposta
    const newBet = {
        id: Date.now(),
        description: description,
        team1: team1,
        team2: team2,
        odd1: odd1,
        odd2: odd2
    };

    // Recupera as apostas existentes do localStorage ou cria um array vazio
    const adminBets = JSON.parse(localStorage.getItem('adminBets')) || [];
    adminBets.push(newBet);  // Adiciona a nova aposta
    localStorage.setItem('adminBets', JSON.stringify(adminBets));  // Armazena no localStorage

    loadAdminBets();  // Atualiza a tabela
    this.reset();  // Limpa o formulário
});

loadAdminBets();  // Carrega as apostas ao iniciar a página
