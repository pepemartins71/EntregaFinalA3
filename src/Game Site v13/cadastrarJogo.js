function cadastrarJogo() {
    const nome = document.getElementById('nome').value;
    const fabricante = document.getElementById('fabricante').value;
    const plataforma = document.getElementById('plataforma').value;
    const status = document.getElementById('status').value;

    // Recuperar a lista de jogos do localStorage (se existir)
    let jogos = JSON.parse(localStorage.getItem('jogos')) || [];

    const novoJogo = {
        id: gerarIdUnico(), // Adiciona um ID único para o novo jogo
        nome,
        fabricante,
        plataforma,
        status
    };

    // Adicionar o novo jogo à lista
    jogos.push(novoJogo);

    // Armazenar o jogo localmente (pode usar LocalStorage ou Cookies)
    localStorage.setItem('jogos', JSON.stringify(jogos));
    alert('Cadastro realizado com sucesso!');
}

function gerarIdUnico() {
    return '_' + Math.random().toString(36).substr(2, 9); // Gera um ID único
}

document.addEventListener("DOMContentLoaded", function () {
    const plataformas = JSON.parse(localStorage.getItem('plataformas')) || [];

    if (plataformas.length > 0) {
        const selectPlataforma = document.getElementById('plataforma');

        plataformas.forEach(function (plataforma) {
            const option = document.createElement('option');
            option.value = plataforma.nome;
            option.textContent = plataforma.nome;
            selectPlataforma.appendChild(option);
        });
    }
});