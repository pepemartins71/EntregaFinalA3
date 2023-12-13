import { useState, useEffect } from "react";
import '../App.css';
import { Link } from 'react-router-dom';
import api from '../api';

const CadastrarJogo = () => {
    const [plataformas, setPlataformas] = useState([]); // Estado para armazenar as plataformas
    const [plataformaSelecionada, setPlataformaSelecionada] = useState(''); // Estado para armazenar a plataforma selecionada
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

    const cadastrarJogo = () => {
        const nome = document.getElementById('nome').value;
        const fabricante = document.getElementById('fabricante').value;
        const status = document.getElementById('status').value;

        const novoJogo = {
            nome,
            fabricante,
            plataforma_id: plataformaSelecionada, // Utiliza o estado da plataforma selecionada (id)
            status
        };

        api.post('/cadastrarJogo', novoJogo)
            .then(response => {
                console.log('Jogo cadastrado com sucesso!', response.data);
                alert('Cadastro realizado com sucesso!');
            })
            .catch(error => {
                console.error('Erro ao cadastrar jogo:', error);
                alert('Ocorreu um erro ao cadastrar o jogo.');
            });
    };


    return (
        <section id="cadastro">
            <div className="row">
                <div className="d-flex flex-wrap align-items-center justify-content-center">
                    <div className="card cadastroJogoCard">
                        <div className="card-header">
                            <h3 className="cadastro-title">Cadastro Jogo</h3>
                        </div>
                        <div className="card-body">
                            <form id="cadastroForm">
                                <div className="container">
                                    <label htmlFor="nome">Nome:</label>
                                    <input className="col-12" type="text" name="nome" id="nome" placeholder="Nome do jogo..." />
                                    <br />
                                    <br />
                                    <label htmlFor="fabricante">Fabricante:</label>
                                    <input className="col-12" type="text" name="fabricante" id="fabricante" placeholder="Fabricante do jogo..." />
                                    <br />
                                    <br />
                                    <label htmlFor="plataforma">Plataforma:</label>
                                    <select className="col-12" name="plataforma" id="plataforma" value={plataformaSelecionada} onChange={e => setPlataformaSelecionada(e.target.value)}>
                                        <option value=""></option>
                                        {plataformas.map(plataforma => (
                                            <option key={plataforma.id} value={plataforma.id}>
                                                {plataforma.nome}
                                            </option>
                                        ))}
                                        <option value="MultiPlataforma">Multi-plataformas</option>
                                    </select>
                                    <br />
                                    <br />
                                    <label htmlFor="status">Status:</label>
                                    <select className="col-12" name="status" id="status">
                                        <option value=""></option>
                                        <option value="Jogado">Jogado</option>
                                        <option value="Jogando">Jogando</option>
                                        <option value="Zerado">Zerado</option>
                                        <option value="Recomendo">Recomendo</option>
                                        <option value="NaoRecomendo">Não Recomendo</option>
                                        <option value="Outro">Outro</option>
                                    </select>
                                </div>
                                <div className="container cadastro-button">
                                    <button style={{ width: "334px" }} type="button" className="btn btn-lg btn-warning" onClick={cadastrarJogo}>Cadastrar</button>
                                </div>
                                <div id="voltar">
                                    <Link to="/perfil" style={{ textDecoration: "none", color: "black" }}>
                                        <h5 style={{ color: "black" }}>Voltar</h5>
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CadastrarJogo;