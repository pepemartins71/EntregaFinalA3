import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import '../App.css';
import api from '../api';

const CadastroPlataforma = () => {
    const [conteudoExibido, setConteudoExibido] = useState(true); // Estado para controlar a exibição do conteúdo
    const [plataformas, setPlataformas] = useState([]); // Estado para armazenar as plataformas
    const [plataformaSelecionada, setPlataformaSelecionada] = useState(''); // Estado para armazenar a plataforma selecionada
    const [nome, setNome] = useState('');
    const [tipo, setTipo] = useState('');

    const removerConteudo = () => {
        setConteudoExibido(false); // Atualiza o estado para ocultar o conteúdo
    };

    const onBackClick = () => {
        setConteudoExibido(true); // Retorna para a exibição do conteúdo
    };

    // Função para carregar as plataformas do banco de dados
    const carregarPlataformas = () => {
        api.get('/obterPlataformas')
            .then(response => {
                setPlataformas(response.data.plataformas);
                console.log('Plataformas obtidas:', response.data.plataformas);
            })
            .catch(error => {
                console.error('Erro ao buscar plataformas:', error);
            });
    };

    useEffect(() => {
        // Ao montar o componente, carregue as plataformas do banco de dados
        carregarPlataformas();
    }, []);

    const handleRemoverPlataforma = () => {
        if (plataformaSelecionada) {
            api.delete(`/removerPlataforma/${plataformaSelecionada}`)
                .then(response => {
                    console.log('Plataforma removida com sucesso:', response.data);
                    // Recarregue as plataformas após a remoção
                    carregarPlataformas();
                    setPlataformaSelecionada('');
                    alert(`Plataforma removida com sucesso.`);
                })
                .catch(error => {
                    console.error('Erro ao remover plataforma:', error);
                    alert('Ocorreu um erro ao remover a plataforma.');
                });
        } else {
            alert('Por favor, selecione uma plataforma para remover.');
        }
    };

    const cadastrarPlataforma = () => {
        const novaPlataforma = {
            nome,
            tipo
        };

        api.post('/cadastrarPlataforma', novaPlataforma)
            .then(response => {
                console.log('Plataforma cadastrada com sucesso!', response.data);
                window.location.reload();
            })
            .catch(error => {
                console.error('Erro ao cadastrar plataforma:', error);
                // Trate o erro adequadamente, exiba uma mensagem de erro, etc.
            });
    };

    return (
        <section id="cadastro">
            <div className="row">
                <div className="d-flex flex-wrap align-items-center justify-content-center">
                    <div className="card cadastroPlataformaCard" style={{ height: conteudoExibido ? "412px" : "302px" }}>
                        <div className="card-header">
                            <h3 className="cadastro-title">Cadastro Plataforma</h3>
                        </div>
                        <div className="card-body" style={{ marginRight: "0px" }}>
                            {conteudoExibido ? (
                                <form id="cadastroForm">
                                    <div id="cadastroDiv" className="container">
                                        <label htmlFor="nome">Nome:</label>
                                        <input className="col-12" type="text" name="nome" id="nome" placeholder="Nome da plataforma..." value={nome} onChange={e => setNome(e.target.value)} />
                                        <br />
                                        <br />
                                        <label htmlFor="tipo">Tipo de plataforma:</label>
                                        <select className="col-12" name="tipo" id="tipo" value={tipo} onChange={e => setTipo(e.target.value)}>
                                            <option value=""></option>
                                            <option value="Console">Console</option>
                                            <option value="PC">PC</option>
                                            <option value="Mobile">Mobile</option>
                                            <option value="Outro">Outro</option>
                                        </select>
                                    </div>
                                    <div id="botaoCadastrar" className="container cadastro-button">
                                        <button style={{ width: "334px" }} type="button" className="btn btn-lg btn-warning" onClick={cadastrarPlataforma}>Cadastrar</button>
                                    </div>
                                    <div id="botãoRemover" className="container cadastro-button">
                                        <button style={{ width: "334px" }} type="button" className="btn btn-lg btn-danger" onClick={removerConteudo}>Remover</button>
                                    </div>
                                    <div id="voltar" style={{ marginLeft: "185px" }}>
                                        <Link to="/perfil" style={{ textDecoration: "none", color: "black" }}>
                                            <h5 style={{ color: "black" }}>Voltar</h5>
                                        </Link>
                                    </div>
                                </form>
                            ) : (
                                <form id="cadastroForm">
                                    <div className="container">
                                        <label htmlFor="tipo">Plataforma:</label>
                                        <select className="col-12" name="tipo" id="tipo" value={plataformaSelecionada} onChange={e => setPlataformaSelecionada(e.target.value)}>
                                            <option value=""></option>
                                            {plataformas.map(plataforma => (
                                                <option key={plataforma.id} value={plataforma.id}>
                                                    {plataforma.nome}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="container cadastro-button">
                                        <button style={{ width: "334px" }} type="button" className="btn btn-lg btn-danger" onClick={handleRemoverPlataforma}>Remover</button>
                                    </div>
                                    <div className="voltar" style={{ marginReft: "185px " }}>
                                        <a href="#" onClick={onBackClick} style={{ textDecoration: "none", color: "black" }}>
                                            <h5>Voltar</h5>
                                        </a>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <footer>

            </footer>
        </section>
    );
};

export default CadastroPlataforma;