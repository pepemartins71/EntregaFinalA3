document.addEventListener("DOMContentLoaded", function () {
    const inputDescricao = document.getElementById('jogoDescricao');
    const inputCategoria1 = document.getElementById('jogoCategoria1');
    const inputCategoria2 = document.getElementById('jogoCategoria2');
    const inputClassificacao = document.getElementById('jogoClassificacao');
    const btnSalvar = document.getElementById('btnSalvar');
    btnSalvar.onclick = salvarEdicao;

    const urlParams = new URLSearchParams(window.location.search);
    const gameId = urlParams.get('gameId');

    // Obter jogos salvos do armazenamento local
    const jogosSalvos = JSON.parse(localStorage.getItem('jogosSalvos')) || [];

    // Encontrar o jogo com o ID correspondente na URL
    const jogoSelecionado = jogosSalvos.find(jogo => jogo.id === gameId);

    if (jogoSelecionado) {
        // Preencher os campos com os detalhes do jogo encontrado
        inputDescricao.value = jogoSelecionado.descricao || '';
        inputCategoria1.value = jogoSelecionado.categoria1 || '';
        inputCategoria2.value = jogoSelecionado.categoria2 || '';
        inputClassificacao.value = jogoSelecionado.classificacao || '';

        // Preencher a avaliação
        const checkboxes = document.querySelectorAll('.rating-star');
        checkboxes.forEach(checkbox => {
            if (jogoSelecionado.checkboxesText.includes(checkbox.nextSibling.textContent.trim())) {
                checkbox.checked = true;
            }
        });
    }

    function salvarEdicao() {
        const inputDescricao = document.getElementById('jogoDescricao');
        const inputCategoria1 = document.getElementById('jogoCategoria1');
        const inputCategoria2 = document.getElementById('jogoCategoria2');
        const inputClassificacao = document.getElementById('jogoClassificacao');
    
        // Obter o ID do jogo da URL
        const urlParams = new URLSearchParams(window.location.search);
        const gameId = urlParams.get('gameId');
    
        // Obter jogos salvos do armazenamento local
        let jogosSalvos = JSON.parse(localStorage.getItem('jogosSalvos')) || [];
    
        // Encontrar o jogo com o ID correspondente na URL
        const jogoSelecionadoIndex = jogosSalvos.findIndex(jogo => jogo.id === gameId);
    
        if (jogoSelecionadoIndex !== -1) {
            // Atualizar os detalhes do jogo com as edições feitas
            jogosSalvos[jogoSelecionadoIndex].descricao = inputDescricao.value || '';
            jogosSalvos[jogoSelecionadoIndex].categoria1 = inputCategoria1.value || '';
            jogosSalvos[jogoSelecionadoIndex].categoria2 = inputCategoria2.value || '';
            jogosSalvos[jogoSelecionadoIndex].classificacao = inputClassificacao.value || '';
    
            // Atualizar as checkboxes de avaliação
            const checkboxes = document.querySelectorAll('.rating-star');
            const checkboxesText = [];
            checkboxes.forEach(checkbox => {
                if (checkbox.checked) {
                    checkboxesText.push(checkbox.nextSibling.textContent.trim());
                }
            });
            jogosSalvos[jogoSelecionadoIndex].checkboxesText = checkboxesText;
    
            // Salvar de volta no Local Storage
            localStorage.setItem('jogosSalvos', JSON.stringify(jogosSalvos));
    
            // Redirecionar para a página de perfil ou outra página após salvar as edições
            window.location.href = `game.html?gameName=${encodeURIComponent(gameId)}`;
        }
    }
});

const checkboxes = document.querySelectorAll('.rating-star');

checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function () {
        if (this.checked) {
            checkboxes.forEach(cb => {
                if (cb !== this) {
                    cb.checked = false;
                }
            });
        }
    });
});