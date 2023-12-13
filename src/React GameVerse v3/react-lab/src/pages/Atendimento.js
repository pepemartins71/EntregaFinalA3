import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';

const Atendimento = () => {
    const [atendimentos, setAtendimentos] = useState([]);

    useEffect(() => {
        api.get('clientes').then(response => {
            setAtendimentos(response.data);
        });
    }, []);

    return (
        <div>
            <h1>Atendimentos</h1>
            <ul className="atendimentos">
                {atendimentos &&
                    atendimentos.map((atendimento) => (
                        <li key={atendimento.id}>
                            <h2>{atendimento.nome}</h2>
                            <p>{atendimento.email}</p>
                            <p>{atendimento.senha}</p>
                            <Link to={`/atendimento/${atendimento.id}`}>Detalhes</Link>
                        </li>
                    ))}
            </ul>
        </div>
    );
}

export default Atendimento;