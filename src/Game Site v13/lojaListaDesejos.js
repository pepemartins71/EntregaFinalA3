function templateFavoritos(jogoImagemSrc, jogoNome, jogoSobre, jogoCategorias, gameId) {
    const urlParams = new URLSearchParams(window.location.search);
    const tipoLoja = urlParams.get('tipo');

    // Verificar se estamos na página "loja.html" e o tipo é "favoritos"
    if (tipoLoja === 'favoritos' && window.location.pathname.includes('loja.html')) {
        return `
            <div class="row">
                <div class="col-lg-6 columnLeft">
                    <div id="gamePics" style="height: 338px;">
                        <img id="jogoImagem" src="${jogoImagemSrc}" class="d-block w-100" alt="">
                    </div>
                </div>
                <div class="col-lg-6 columnRight">
                    <div class="aboutGame">
                        <h4 id="jogoNome">${jogoNome}</h4>
                        <h5>Sobre o jogo:</h5>
                        <p id="jogoSobre">${jogoSobre}</p>
                        <h5>Categorias:</h5>
                        <h5 id="jogoCategoria" style="text-align: center;">${jogoCategorias}</h5>
                        <div style="text-align: center;">
                            <button type="button" class="btn btn-lg btn-success comprar-button"
                                data-game-id="${gameId}" style="margin-top: 12px;">Visualizar
                            </button>
                            <button type="button" class="btn btn-lg btn-danger remover-button" 
                                 onclick="removerDosFavoritos('${jogoNome}')" style="margin-top: 12px;">
                                <i class="bi bi-trash"></i> Remover da Lista
                            </button>
                        </div>
                    </div>
                </div>
            </div>`;
    } else {
        return '';
    }
}

function preencherTemplateWish() {
    // Obter informações armazenadas localmente
    const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
    // Verificar se há jogos nos favoritos
    if (favoritos.length > 0) {
        // Criar uma string para armazenar todos os templates de jogos
        let jogosHTML = '';
        // Iterar sobre os favoritos e gerar o template para cada jogo
        favoritos.forEach(jogo => {
            const jogoTemplate = templateFavoritos(
                jogo.primeiraImagem,
                jogo.nome,
                jogo.sobre,
                jogo.categoria,
                jogo.id
            );

            jogosHTML += jogoTemplate; // Adicionar o template do jogo à string
        });
        // Inserir todos os templates de jogos no elemento com ID "lojaTemplate" em "loja.html"
        document.getElementById('lojaTemplate').innerHTML = jogosHTML;

        // Adicionar os event listeners aos botões "Visualizar" dos favoritos
        const visualizarButtons = document.querySelectorAll('.comprar-button');
        visualizarButtons.forEach(button => {
            button.addEventListener('click', function () {
                const gameId = this.dataset.gameId; // Obtém o ID do jogo do atributo data-game-id
                const url = `game.html?gameName=${encodeURIComponent(gameId)}`;
                window.location.href = url;
            });
        });
    }
}


function removerDosFavoritos(jogoNome) {
    // Obter os favoritos do armazenamento local
    const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
    // Filtrar a lista para remover o jogo com o nome correspondente
    const novoFavoritos = favoritos.filter(jogo => jogo.nome !== jogoNome);
    // Atualizar os favoritos no armazenamento local
    localStorage.setItem("favoritos", JSON.stringify(novoFavoritos));
    // Atualizar o conteúdo na página
    preencherTemplateWish();
    // Recarregar a página para refletir a remoção
    window.location.reload();
    alert("Jogo removido dos Favoritos!");
}
