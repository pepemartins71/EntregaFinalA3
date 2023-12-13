import { useState, useEffect } from "react";
import { Link, useParams } from 'react-router-dom';
import './PerfilStyles.css';
import api from '../api';

const Editar = () => {
    const [editandoNome, setEditandoNome] = useState(false);
    const [editandoFabricante, setEditandoFabricante] = useState(false);
    const [editandoStatus, setEditandoStatus] = useState(false);
    const [editandoPlataforma, setEditandoPlataforma] = useState(false);
    const [nomeJogo, setNomeJogo] = useState("");
    const [fabricante, setFabricante] = useState("");
    const [categoria, setCategoria] = useState('');
    const [plataformas, setPlataformas] = useState([]);
    const [jogo, setJogo] = useState({});
    const { id } = useParams();
    const [novoNome, setNovoNome] = useState("");
    const [novoFabricante, setNovoFabricante] = useState("");
    const [novaPlataforma, setNovaPlataforma] = useState("");
    const [novoStatus, setNovoStatus] = useState("");

    const salvar = () => {
        setEditandoNome(false);
        setEditandoFabricante(false);
        setEditandoPlataforma(false);
        setEditandoStatus(false);

        console.log("Novo nome:", novoNome);
        console.log("Novo fabricante:", novoFabricante);
        console.log("Nova plataforma:", novaPlataforma);
        console.log("Novo status:", novoStatus);

        const novoJogo = {
            ...jogo,
            nome: novoNome !== "" ? novoNome : jogo.nome,
            fabricante: novoFabricante !== "" ? novoFabricante : jogo.fabricante,
            plataforma_id: novaPlataforma !== "" ? novaPlataforma : jogo.plataforma_id,
            status: novoStatus !== "" ? novoStatus : jogo.status,
        };

        api.put(`/atualizarJogo/${jogo.id}`, novoJogo)
            .then(response => {
                console.log("Jogo atualizado:", response.data);
                window.location.reload();
            })
            .catch(error => {
                console.error("Erro ao atualizar jogo:", error);
                // Tratamento de erros, se necessário
            });
    };

    const carregarPlataformas = () => {
        api.get('/obterPlataformas')
            .then(response => {
                // Verifica se response.data.plataformas é um array
                if (Array.isArray(response.data.plataformas)) {
                    setPlataformas(response.data.plataformas);
                    console.log('Plataformas obtidas:', response.data.plataformas);
                } else {
                    console.error('Dados de plataformas inválidos:', response.data.plataformas);
                }
            })
            .catch(error => {
                console.error('Erro ao buscar plataformas:', error);
            });
    };

    useEffect(() => {
        carregarPlataformas();
    }, []);

    useEffect(() => {
        api.get(`/obterJogo/${id}`)
            .then(response => {
                const jogoInfo = response.data.jogo;
                setJogo(jogoInfo);
                setNomeJogo(jogoInfo.nome);
                setFabricante(jogoInfo.fabricante);
                setCategoria(jogoInfo.status);
                setNovaPlataforma(jogoInfo.plataforma_id); // Atualiza a novaPlataforma com a plataforma do jogo
                console.log('Detalhes do jogo:', jogoInfo);
            })
            .catch(error => {
                console.error('Erro ao obter detalhes do jogo:', error);
            });

        carregarPlataformas();
    }, [id]);

    const habilitarEdicaoNome = () => {
        setEditandoNome(true);
        const btnSalvar = document.getElementById('btnSalvar');
        btnSalvar.style.display = 'inline-block';
    };

    const habilitarEdicaoFabricante = () => {
        setEditandoFabricante(true);
        const btnSalvar = document.getElementById('btnSalvar');
        btnSalvar.style.display = 'inline-block';
    };

    const habilitarEdicaoStatus = () => {
        setEditandoStatus(true);
        const btnSalvar = document.getElementById('btnSalvar');
        btnSalvar.style.display = 'inline-block';
    };

    const habilitarEdicaoPlataforma = () => {
        setEditandoPlataforma(true);
        const btnSalvar = document.getElementById('btnSalvar');
        btnSalvar.style.display = 'inline-block';
    };

    return (
        <section id="default">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-2" style={{ paddingTop: '12px', paddingBottom: '12px' }}>
                        <div className="configList">
                            <div className="divisãoHorizontal">
                                <Link to="/perfil">
                                    <h4>Voltar</h4>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-10" style={{ paddingTop: '12px', paddingBottom: '12px' }}>
                        <div className="configGeral">
                            <div className="row">
                                <div className="divisãoHorizontal">
                                    <h4>Editar Jogo</h4>
                                </div>
                            </div>
                            <div className="row" style={{ paddingLeft: '30px', marginBottom: '70px' }}>
                                <div className="form-group">
                                    <label htmlFor="nome">Nome do Jogo:</label>
                                    <div className="col-sm-6">
                                        <input
                                            className="form-control"
                                            type="text"
                                            style={{ marginBottom: '10px' }}
                                            name="nome"
                                            id="nome"
                                            value={editandoNome ? novoNome !== '' ? novoNome : jogo.nome : jogo.nome}
                                            readOnly={!editandoNome}
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                setNovoNome(value);
                                            }}
                                        />
                                        <button
                                            className="btn btn-outline-secondary"
                                            type="button"
                                            style={{
                                                marginBottom: '10px',
                                                backgroundColor: 'rgb(231, 231, 231)',
                                                color: 'black',
                                                fontSize: '15px',
                                            }}
                                            onClick={habilitarEdicaoNome}
                                        >
                                            Editar
                                        </button>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="fabricanteJogo">Fabricante:</label>
                                    <div className="col-sm-6">
                                        <input
                                            className="form-control"
                                            type="text"
                                            style={{ marginBottom: '10px' }}
                                            name="fabricanteJogo"
                                            id="fabricanteJogo"
                                            value={editandoFabricante ? novoFabricante !== '' ? novoFabricante : jogo.fabricante : jogo.fabricante}
                                            readOnly={!editandoFabricante}
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                setNovoFabricante(value);
                                            }}
                                        />
                                        <button
                                            className="btn btn-outline-secondary"
                                            type="button"
                                            style={{
                                                marginBottom: '10px',
                                                backgroundColor: 'rgb(231, 231, 231)',
                                                color: 'black',
                                                fontSize: '15px',
                                            }}
                                            onClick={habilitarEdicaoFabricante}
                                        >
                                            Editar
                                        </button>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="plataforma">Plataforma:</label>
                                    <div className="col-sm-6">
                                        <select
                                            className="form-select"
                                            style={{ marginBottom: '10px' }}
                                            name="plataforma"
                                            id="plataforma"
                                            disabled={!editandoPlataforma}
                                            value={novaPlataforma}
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                setNovaPlataforma(value);
                                            }}
                                        >
                                            {plataformas.map(plataforma => (
                                                <option
                                                    key={plataforma.id}
                                                    value={plataforma.id}
                                                >
                                                    {plataforma.nome}
                                                </option>
                                            ))}
                                        </select>
                                        <button
                                            className="btn btn-outline-secondary"
                                            type="button"
                                            style={{
                                                marginBottom: '10px',
                                                backgroundColor: 'rgb(231, 231, 231)',
                                                color: 'black',
                                                fontSize: '15px',
                                            }}
                                            onClick={habilitarEdicaoPlataforma}
                                        >
                                            Editar
                                        </button>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="categoria">Categoria:</label>
                                    <div className="col-sm-6">
                                        <select
                                            className="form-select"
                                            style={{ marginBottom: '10px' }}
                                            name="categoria"
                                            id="categoria"
                                            disabled={!editandoStatus}
                                            value={editandoStatus ? novoStatus !== '' ? novoStatus : jogo.status : jogo.status}
                                            onChange={(e) => setNovoStatus(e.target.value)}
                                        >
                                            {['Jogado', 'Jogando', 'Zerado', 'Recomendo', 'Não Recomendo', 'Outro'].map(cat => (
                                                <option
                                                    key={cat}
                                                    value={cat}
                                                >
                                                    {cat}
                                                </option>
                                            ))}
                                        </select>
                                        <button
                                            className="btn btn-outline-secondary"
                                            type="button"
                                            style={{
                                                marginBottom: '10px',
                                                backgroundColor: 'rgb(231, 231, 231)',
                                                color: 'black',
                                                fontSize: '15px',
                                            }}
                                            onClick={habilitarEdicaoStatus}
                                        >
                                            Editar
                                        </button>
                                    </div>
                                </div>

                                <div className="row" style={{ paddingLeft: '30px', marginBottom: '70px' }}>
                                    <button
                                        className="btn btn-primary"
                                        type="button"
                                        id="btnSalvar"
                                        style={{ display: editandoNome || editandoFabricante || editandoPlataforma || editandoStatus ? 'inline-block' : 'none' }}
                                        onClick={salvar}
                                    >
                                        Salvar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Editar;
