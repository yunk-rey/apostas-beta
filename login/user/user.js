// Inicializando a caixa com 1000 reais
let caixa = 1000;

// Função para carregar as apostas feitas pelo administrador
function loadApostas() {
    const adminBets = JSON.parse(localStorage.getItem('adminBets')) || [];
    const betTableBody = document.querySelector('.bet-table tbody');
    betTableBody.innerHTML = '';

    adminBets.forEach(bet => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${bet.description}</td>
            <td>${bet.team1}</td>
            <td><button class="odd-choice" onclick="selectOdd(${bet.id}, ${bet.odd1}, '${bet.team1}')">${bet.odd1}x</button></td>
            <td>${bet.team2}</td>
            <td><button class="odd-choice" onclick="selectOdd(${bet.id}, ${bet.odd2}, '${bet.team2}')">${bet.odd2}x</button></td>
            <td><button class="bet-button" onclick="prepareBet(${bet.id}, '${bet.team1}', '${bet.team2}', '${bet.description}')">Apostar</button></td>
        `;
        betTableBody.appendChild(row);
    });
}

// Função para selecionar a odd
let selectedBetId = null;
let selectedOdd = null;
let selectedTeam = null;
let selectedDescription = null;

function selectOdd(betId, odd, team) {
    selectedBetId = betId;
    selectedOdd = odd;
    selectedTeam = team;

    // Remover a classe 'selected' de todos os botões
    const allOddButtons = document.querySelectorAll('.odd-choice');
    allOddButtons.forEach(button => button.classList.remove('selected'));

    // Adicionar a classe 'selected' ao botão clicado
    const eventButton = event.target;
    eventButton.classList.add('selected');
}


// Função para preparar a aposta
function prepareBet(betId, team1, team2, description) {
    if (!selectedOdd || !selectedBetId) {
        document.getElementById('result-message').textContent = "Por favor, selecione uma odd antes de apostar.";
        document.getElementById('result-message').style.color = 'red';
        return;
    }

    const betAmount = parseFloat(document.getElementById('bet-amount').value);
    if (isNaN(betAmount) || betAmount <= 0) {
        document.getElementById('result-message').textContent = "Por favor, insira um valor válido para a aposta.";
        document.getElementById('result-message').style.color = 'red';
        return;
    }

    if (betAmount > caixa) {
        document.getElementById('result-message').textContent = "Você não tem saldo suficiente para essa aposta.";
        document.getElementById('result-message').style.color = 'red';
        return;
    }

    // Atualizar a caixa após a aposta
    caixa -= betAmount;

    // Calcular o valor do retorno
    const potentialReturn = betAmount * selectedOdd;

    // Exibir o bilhete com a descrição, time, odd e valor do retorno
    const betTicketsContainer = document.getElementById('bet-tickets-container');
    const newTicket = document.createElement('div');
    newTicket.classList.add('bet-ticket');
    newTicket.innerHTML = `
        <h3>Bilhete de Aposta</h3>
        <p>Descrição: ${description}</p>
        <p>Time: ${selectedTeam}</p>
        <p>Odd: ${selectedOdd}</p>
        <p>Valor Apostado: R$ ${betAmount.toFixed(2)}</p>
        <p>Valor do Retorno: R$ ${potentialReturn.toFixed(2)}</p>
    `;
    betTicketsContainer.appendChild(newTicket);

    // Exibir o saldo restante da caixa
    const caixaDisplay = document.getElementById('caixa');
    caixaDisplay.textContent = `Caixa: R$ ${caixa.toFixed(2)}`;

    // Limpar seleção de aposta e valor
    document.getElementById('bet-amount').value = '';
    selectedBetId = null;
    selectedOdd = null;
    selectedTeam = null;
    selectedDescription = null;
}

// Alternar entre as seções de Apostas e Bilhete
function showApostas() {
    document.getElementById('apostas').style.display = 'block';
    document.getElementById('bilhete').style.display = 'none';
    loadApostas();
}

function showBilhete() {
    document.getElementById('apostas').style.display = 'none';
    document.getElementById('bilhete').style.display = 'block';
}

// Carregar apostas ao iniciar
window.onload = () => {
    loadApostas();

    // Exibir o valor inicial da caixa
    const caixaDisplay = document.getElementById('caixa');
    caixaDisplay.textContent = `Caixa: R$ ${caixa.toFixed(2)}`;
}

