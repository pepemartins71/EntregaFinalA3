function preencher_jogoCadastrado(titulo, id) {
    var template = `
    <div style="text-align: center; width: 374px;">
        <div class="gameCard" id="${id}">
            <img src="images/SemJogo.png" class="gameImg" alt="">
            <div>
                <h5 class="gameTitle">${titulo}</h5>
            </div>
          
            <button type="button" class="btn btn-lg btn-success" onclick="redirectToEditPage(this, '${titulo}')"><i class="bi bi-pencil-square"></i> Editar</button>
            <button type="button" class="btn btn-lg btn-danger remover-button" onclick="removerJogo('${id}')"><i class="bi bi-trash"></i> Remover</button>
        </div>
    </div>
    `;
    return template;
}

function removerJogo(id) {
    console.log("removerJogo chamado");
    let jogosCadastrados = JSON.parse(localStorage.getItem('jogos')) || [];
    
    // Encontra o índice do jogo com o id correspondente
    const index = jogosCadastrados.findIndex(jogo => jogo.id === id);
    
    if (index !== -1) {
        jogosCadastrados.splice(index, 1); // Remove o jogo com o id especificado
        localStorage.setItem('jogos', JSON.stringify(jogosCadastrados)); // Atualiza os jogos no localStorage

        // Atualiza a exibição removendo o jogo da página
        const jogoRemovido = document.getElementById(id);
        if (jogoRemovido) {
            jogoRemovido.remove(); // Remove o jogo da interface
        }
    }
}

function redirectToEditPage(button, gameTitle) {
    // Recuperar a lista de jogos cadastrados do localStorage
    const jogosCadastrados = JSON.parse(localStorage.getItem('jogos')) || [];

    // Encontrar o jogo com base no título
    const jogoEncontrado = jogosCadastrados.find(jogo => jogo.nome === gameTitle);

    if (jogoEncontrado) {
        // Codificar o jogo para a URL e redirecionar para a página de edição
        const jogoCodificado = encodeURIComponent(JSON.stringify(jogoEncontrado));
        const url = `editar.html?game=${jogoCodificado}`;
        window.location.href = url;
    }
}