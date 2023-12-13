var isLoggedIn;

document.addEventListener("DOMContentLoaded", function () {
    // Referência à div onde os itens serão exibidos
    var itensContainer = document.getElementById("gameList");

    // Função para preencher a div com os itens gerados
    function preencherItens() {
        const jogos = JSON.parse(localStorage.getItem('jogos')) || [];
        const jogosSalvos = JSON.parse(localStorage.getItem('jogosSalvos')) || [];

        jogosSalvos.forEach(jogoSalvo => {
            const id = jogoSalvo.id;
            const jogo = jogos.find(j => j.id === id);

            if (jogo) {
                const titulo = jogo.nome;
                const status = jogo.status;
                const descricao = jogoSalvo.descricao;
                const categoria1 = jogoSalvo.categoria1;
                const categoria2 = jogoSalvo.categoria2;

                var template = `
                    <div class="row" style="margin-bottom: 15px;">
                        <div class="col-lg-6 columnLeft" style="padding-top: 0px; padding-bottom: 0px;">
                            <div id="newGamePics" style="height: 338px; width: 600px;">
                                <img src="images/SemJogo.png" class="d-block w-100" alt="" style="height: 338px; margin-left: 80px;">
                            </div>
                        </div>
                        <div class="col-lg-6 columnRight" style="padding-top: 0px; padding-bottom: 0px;">
                            <div class="newGame">
                                <h4 id="jogoNome">${titulo}</h4>
                                <h5>Sobre o jogo:</h5>
                                <p id="jogoSobre">${descricao}</p>
                                <h5>Categorias:</h5>
                                <h5 id="jogoCategoria" style="text-align: center;">${categoria1} | ${categoria2} | ${status}</h5>
                                <div style="text-align: center;">
                                 <button type="button" class="btn btn-lg btn-success comprar-button"
                                   onclick="redirectToGamePage(this, '${titulo}')" style="margin-top: 12px;">Visualizar
                                 </button>
                               </div>
                            </div>
                        </div>
                    </div>
                `;

                // Adiciona o item gerado à div gameList
                itensContainer.innerHTML += template;
            }
        });
    }
    preencherItens()
});

function redirectToGamePage(button, gameTitle) {
    const jogoFromLocalStorage = JSON.parse(localStorage.getItem('jogos')) || [];
    const selectedJogo = jogoFromLocalStorage.find(j => j.nome === gameTitle);

    if (selectedJogo) {
        const gameId = selectedJogo.id;
        const url = `game.html?gameName=${encodeURIComponent(gameId)}`;
        window.location.href = url;
    }
}