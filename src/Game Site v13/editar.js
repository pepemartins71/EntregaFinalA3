document.addEventListener("DOMContentLoaded", function () {
    // Obtenha o nome e sobrenome do usuário do localStorage
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    if (isLoggedIn) {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        const nome = currentUser.nome;
        const sobrenome = currentUser.sobrenome;

        // Atualize o texto do link "Usuário" para exibir o nome e sobrenome
        const linkUsuario = document.getElementById('username');
        linkUsuario.innerHTML = `<i class="bi bi-person-circle icon"></i> ${nome} ${sobrenome}`;
    }

    const btnEditarNome = document.getElementById('btnEditarNome');
    const btnEditarFabricante = document.getElementById('btnEditarFabricante');
    const btnEditarPlataforma = document.getElementById('btnEditarPlataforma');
    const btnEditarCategoria = document.getElementById('btnEditarCategoria');
    const btnSalvar = document.getElementById('btnSalvar');
    const inputNome = document.getElementById('nome');
    const inputFabricante = document.getElementById('fabricanteJogo');
    const inputPlataforma = document.getElementById('plataforma');
    const inputStatus = document.getElementById('categoria');

    // Carregar dados do localStorage ao carregar a página
    const storedNome = localStorage.getItem('jogoNome');
    const storedFabricante = localStorage.getItem('jogoFabricante');
    const storedPlataforma = localStorage.getItem('jogoPlataforma');
    const storedStatus = localStorage.getItem('jogoStatus');

    if (storedNome) {
        inputNome.value = storedNome;
    }

    if (storedFabricante) {
        inputFabricante.value = storedFabricante;
    }

    if (storedPlataforma) {
        inputPlataforma.value = storedPlataforma;
    }

    if (storedStatus) {
        inputStatus.value = storedStatus;
    }

    // Aqui você pode integrar a lógica para preencher os campos com os detalhes do jogo da URL
    const urlParams = new URLSearchParams(window.location.search);
    const jogoCodificado = urlParams.get('game');

    if (jogoCodificado) {
        const jogo = JSON.parse(decodeURIComponent(jogoCodificado));
        // Preencha os campos com os detalhes do jogo, verificando se os elementos existem primeiro
        if (inputNome) {
            inputNome.value = jogo.nome;
        }
        if (inputFabricante) {
            inputFabricante.value = jogo.fabricante;
        }
        if (inputPlataforma) {
            inputPlataforma.value = jogo.plataforma;
        }
        if (inputStatus) {
            inputStatus.value = jogo.status;
        }
        // Preencha outros campos conforme necessário
    }

    btnEditarCategoria.onclick = habilitarEdicaoStatus;
    btnEditarPlataforma.onclick = habilitarEdicaoPlataforma;
    btnEditarNome.onclick = habilitarEdicaoNome;
    btnEditarFabricante.onclick = habilitarEdicaoFabricante;
    btnSalvar.onclick = botaoSalvar;

    function habilitarEdicaoStatus() {
        // Habilita a edição do campo de status
        inputStatus.disabled = false;
        // Exibe o botão 'Salvar'
        btnSalvar.style.display = 'inline-block';
    }

    function habilitarEdicaoPlataforma() {
        // Habilita a edição do campo de nome
        inputPlataforma.disabled = false;
        // Exibe o botão 'Salvar'
        btnSalvar.style.display = 'inline-block';
    }

    function habilitarEdicaoNome() {
        // Habilita a edição do campo de nome
        inputNome.readOnly = false;
        // Exibe o botão 'Salvar'
        btnSalvar.style.display = 'inline-block';
    }

    function habilitarEdicaoFabricante() {
        // Habilita a edição do campo de fabricante
        inputFabricante.readOnly = false;
        // Exibe o botão 'Salvar'
        btnSalvar.style.display = 'inline-block';
    }

    function botaoSalvar() {
        // Desabilita a edição dos campos
        inputNome.readOnly = true;
        inputFabricante.readOnly = true;
        // Habilita a desativação dos campos
        inputPlataforma.disabled = true;
        inputStatus.disabled = true;

        // Oculta o botão 'Salvar'
        btnSalvar.style.display = 'none';

        salvarEdicao();
    }

    function salvarEdicao() {
        console.log("salvarEdicao chamado");
        // Obtem os valores atuais dos campos
        const novoNome = inputNome.value;
        const novoFabricante = inputFabricante.value;
        const novaPlataforma = inputPlataforma.value;
        const novoStatus = inputStatus.value;
        // Mostra os valores atuais dos campos antes de salvar
        console.log("Valores atuais dos campos:", novoNome, novoFabricante, novaPlataforma, novoStatus);

        // Obtem o ID do jogo a ser editado a partir dos parâmetros da URL
        const urlParams = new URLSearchParams(window.location.search);
        const jogoCodificado = urlParams.get('game');

        if (jogoCodificado) {
            console.log("if chamado");
            const jogo = JSON.parse(decodeURIComponent(jogoCodificado));
            const idDoJogo = jogo.id;

            // Obtem a lista de jogos do Local Storage
            let jogosCadastrados = JSON.parse(localStorage.getItem('jogos')) || [];

            // Encontra o índice do jogo na lista com base no ID
            const index = jogosCadastrados.findIndex(jogo => jogo.id === idDoJogo);

            if (index !== -1) {
                console.log("if 2 chamado");
                // Atualiza os dados do jogo no array de jogos
                jogosCadastrados[index].nome = novoNome;
                jogosCadastrados[index].fabricante = novoFabricante;
                jogosCadastrados[index].plataforma = novaPlataforma;
                jogosCadastrados[index].status = novoStatus;

                // Salva de volta no Local Storage
                localStorage.setItem('jogos', JSON.stringify(jogosCadastrados));

                // Confirmando se a atualização foi feita corretamente
                console.log('Jogos atualizados:', JSON.parse(localStorage.getItem('jogos')));

                window.location.href = 'perfil.html';
            }
        }
    }
});

document.addEventListener("DOMContentLoaded", function () {
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

    const urlParams = new URLSearchParams(window.location.search);
    const jogoCodificado = urlParams.get('game');

    if (jogoCodificado) {
        const jogo = JSON.parse(decodeURIComponent(jogoCodificado));
        const jogoPlataforma = jogo.plataforma;

        if (jogoPlataforma) {
            const opcoesPlataforma = Array.from(selectPlataforma.options).map(option => option.value);

            if (opcoesPlataforma.includes(jogoPlataforma)) {
                selectPlataforma.value = jogoPlataforma;
            } else {
                // Se o valor não estiver nas opções, você pode adicionar o valor ao select
                const novaOpcao = document.createElement('option');
                novaOpcao.value = jogoPlataforma;
                novaOpcao.textContent = jogoPlataforma;
                selectPlataforma.appendChild(novaOpcao);
                selectPlataforma.value = jogoPlataforma;
            }
        }
    }
});
