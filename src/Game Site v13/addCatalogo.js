document.addEventListener("DOMContentLoaded", function () {
    const params = new URLSearchParams(window.location.search);
    const jogoId = params.get('jogo');
    const btnSalvar = document.getElementById('btnSalvar');

    btnSalvar.addEventListener('click', function () {
        const jogoDescricao = document.getElementById('jogoDescricao').value;
        const jogoCategoria1 = document.getElementById('jogoCategoria1').value;
        const jogoCategoria2 = document.getElementById('jogoCategoria2').value;
        const checkboxes = document.querySelectorAll('.rating-star');
        const jogoClassificacao = document.getElementById('jogoClassificacao').value;
    
        // Verifica se os campos estão preenchidos
        if (!jogoDescricao || !jogoCategoria1 || !jogoCategoria2 || !isCheckboxSelected(checkboxes) || !jogoClassificacao) {
            alert("Por favor, preencha todos os campos.");
        } else {
            const checkboxesText = [];
            checkboxes.forEach(checkbox => {
                if (checkbox.checked) {
                    checkboxesText.push(checkbox.nextSibling.textContent.trim());
                }
            });
    
            // Chama a função salvarDados e passa os valores como argumentos
            salvarDados(jogoDescricao, jogoCategoria1, jogoCategoria2, jogoClassificacao, checkboxesText);
            window.location.href = "usuario.html";
        }
    });

    // Função para salvar os dados do jogo no localStorage
    function salvarDados(descricao, categoria1, categoria2, classificacao, checkboxesText) {
        const jogo = {
            id: jogoId,
            descricao: descricao,
            categoria1: categoria1,
            categoria2: categoria2,
            classificacao: classificacao,
            checkboxesText: checkboxesText // Incluindo os textos dos checkboxes marcados
        };

        let jogosSalvos = JSON.parse(localStorage.getItem('jogosSalvos')) || [];
        jogosSalvos.push(jogo);

        // Salva os dados atualizados no localStorage
        localStorage.setItem('jogosSalvos', JSON.stringify(jogosSalvos));
    }

    // Função para verificar se algum checkbox está selecionado
    function isCheckboxSelected(checkboxes) {
        for (let i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i].checked) {
                return true;
            }
        }
        return false;
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
