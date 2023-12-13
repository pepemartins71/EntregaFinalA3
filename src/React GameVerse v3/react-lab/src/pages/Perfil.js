import { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import SemJogo from '../images/SemJogo.png';
import './PerfilStyles.css';
import api from '../api';

const Jogo = ({ jogo, onRemoverJogo }) => {
    const { nome, id } = jogo;
    const navigate = useNavigate();

    const handleEditarJogo = () => {
        // Redireciona para a página de edição com o ID do jogo
        navigate(`/editar/${id}`);
    };

    const handleRemoverJogo = () => {
        onRemoverJogo(id); // Chama a função de remover passando o ID do jogo
    };

    return (
        <div style={{ textAlign: 'center', width: '374px' }}>
            <div className="gameCard" id={id}>
                <img src={SemJogo} className="gameImg" alt="" />
                <div>
                    <h5 className="gameTitle">{nome}</h5>
                </div>
                <button type="button" className="btn btn-lg btn-success" onClick={handleEditarJogo}>
                    <i className="bi bi-pencil-square"></i> Editar
                </button>
                <button
                    type="button"
                    className="btn btn-lg btn-danger remover-button"
                    style={{ marginLeft: '4px' }}
                    onClick={handleRemoverJogo} // Aciona a função de remover ao clicar no botão
                >
                    <i className="bi bi-trash"></i> Remover
                </button>
            </div>
        </div>
    );
};

const Perfil = () => {
    const [jogosCadastrados, setJogosCadastrados] = useState([]);

    const carregarJogos = () => {
        api.get('/obterJogos')
            .then(response => {
                setJogosCadastrados(response.data.jogos);
                console.log('Jogos obtidos:', response.data.jogos);
            })
            .catch(error => {
                console.error('Erro ao buscar jogos:', error);
            });
    };

    const removerJogo = (id) => {
        if (window.confirm('Tem certeza que deseja remover este jogo?')) {
            api.delete(`/removerJogo/${id}`)
                .then(response => {
                    console.log('Jogo removido com sucesso:', response.data);
                    carregarJogos(); // Recarrega a lista de jogos após a remoção
                })
                .catch(error => {
                    console.error('Erro ao remover jogo:', error);
                    alert('Ocorreu um erro ao remover o jogo.');
                });
        }
    };

    useEffect(() => {
        carregarJogos();
    }, []);

    return (
        <section id="game">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-2" style={{ paddingTop: '12px', paddingBottom: '12px' }}>
                        <div className="configList">
                            <div className="divisãoHorizontal">
                                <Link to="/conta">
                                    <h4>Conta</h4>
                                </Link>
                            </div>
                            <div className="divisãoHorizontal">
                                <Link to="/cadastrarJogo">
                                    <h4>Cadastrar Jogo</h4>
                                </Link>
                            </div>
                            <div className="divisãoHorizontal">
                                <Link to="/cadastroPlataforma">
                                    <h4>Cadastro Plataforma</h4>
                                </Link>
                            </div>
                            <div className="divisãoHorizontal">
                                <Link to="/">
                                    <h4>Sair</h4>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-2" style={{ paddingTop: '12px', paddingBottom: '12px', marginLeft: '102px' }}>
                        <div className="meusJogos">
                            <div className="row" style={{ marginBottom: '12px' }}>
                                <div className="col-sm-6">
                                    <h4>Meus Jogos:</h4>
                                </div>
                            </div>
                            <div className="row" id="gamePlaylist">
                                {jogosCadastrados.map((jogo) => (
                                    <Jogo key={jogo.id} jogo={jogo} onRemoverJogo={removerJogo} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Perfil;