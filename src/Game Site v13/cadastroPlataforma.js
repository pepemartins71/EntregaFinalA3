function cadastrarPlataforma() {
    const nome = document.getElementById('nome').value.trim();
    const tipo = document.getElementById('tipo').value.trim();

    if (nome !== '' && tipo !== '') {
        // Recuperar a lista de plataformas do localStorage (se existir)
        let plataformas = JSON.parse(localStorage.getItem('plataformas')) || [];

        const novaPlataforma = {
            nome,
            tipo
        };

        // Adicionar a nova plataforma à lista
        plataformas.push(novaPlataforma);

        // Armazenar a plataforma localmente
        localStorage.setItem('plataformas', JSON.stringify(plataformas));
        alert('Cadastro realizado com sucesso!');
    } else {
        alert('Por favor, preencha todos os campos!');
    }
}

// Função para adicionar opções de plataformas ao select
function adicionarPlataformasAoSelect() {
    console.log("adicionarPlataformasAoSelect chamado");
    const plataformas = JSON.parse(localStorage.getItem('plataformas')) || [];
    const selectPlataforma = document.getElementById('plataforma');

    if (plataformas.length > 0) {
        plataformas.forEach(function (plataforma) {
            const option = document.createElement('option');
            option.value = plataforma.nome;
            option.textContent = plataforma.nome;
            selectPlataforma.appendChild(option);
        });
    }
}

function removerConteudo() {
    console.log("removerConteudo chamado");
    const cadastroDiv = document.getElementById('cadastroDiv'); // Seleciona o div "cadastroDiv"
    const botaoCadastrar = document.getElementById('botaoCadastrar'); // Seleciona o botão "Cadastrar"

    // Ajustar o estilo da div 'cadastroPlataformaCard'
    const cadastroPlataformaCard = document.querySelector('.cadastroPlataformaCard');
    if (cadastroPlataformaCard) {
        cadastroPlataformaCard.style.height = '302px';
    }

    // Remove o botão de cadastrar
    if (botaoCadastrar) {
        botaoCadastrar.remove();
    }

    // Substitui o conteúdo do "cadastroDiv"
    cadastroDiv.innerHTML = `
        <label for="tipo">Plataforma:</label>
        <select class="col-12" name="plataforma" id="plataforma">
            <option value=""></option>
        </select>
    `;

    // Substitui o link de voltar
    const voltarDiv = document.getElementById('voltar');
    voltarDiv.innerHTML = `
        <a href="cadastroPlataforma.html" style="text-decoration: none;">
            <h5 style="color: black;">Voltar</h5>
        </a>
    `;

    // Adiciona as opções ao select de plataformas
    adicionarPlataformasAoSelect();

    // Remove o event listener do botão de remover
    removerButton.onclick = null;

    // Adiciona o event listener do botão de remover para a função removerPlataforma
    removerButton.onclick = removerPlataforma;
}

const removerButton = document.querySelector('.btn-danger'); // Seleciona o botão "Remover"
removerButton.onclick = removerConteudo;

function removerPlataforma() {
    console.log("removerPlataforma chamado");
    const selectPlataforma = document.getElementById('plataforma'); // Seleciona o select de plataformas
    const selectedPlatform = selectPlataforma.value; // Obtém a plataforma selecionada

    console.log("Valor da plataforma selecionada:", selectedPlatform); // Verifica o valor da plataforma selecionada

    if (selectedPlatform) {
        console.log("removerPlataforma if chamado");
        // Obtém o array de plataformas do localStorage
        let plataformas = JSON.parse(localStorage.getItem('plataformas')) || [];

        // Filtra o array para remover a plataforma selecionada
        plataformas = plataformas.filter(plataforma => plataforma.nome !== selectedPlatform);

        // Atualiza o array no localStorage
        localStorage.setItem('plataformas', JSON.stringify(plataformas));

        // Remove a opção selecionada do select
        selectPlataforma.remove(selectPlataforma.selectedIndex);

        // Exibe uma mensagem ou executa outras ações após a remoção, se necessário
        alert(`Plataforma "${selectedPlatform}" removida.`);
    }
}
