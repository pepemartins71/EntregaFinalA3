import React from 'react';
import { Link } from 'react-router-dom';
import './PerfilStyles.css';

const Conta = () => {
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
                                    <h4>Conta</h4>
                                </div>
                            </div>
                            <div className="row" style={{ paddingLeft: '30px', marginBottom: '70px' }}>
                                <div className="form-group">
                                    <label htmlFor="nome">Nome:</label>
                                    <div className="col-sm-6">
                                        <input className="form-control" type="text" name="nome" id="nome" readOnly />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="sobrenome">Sobrenome:</label>
                                    <div className="col-sm-6">
                                        <input className="form-control" type="text" name="sobrenome" id="sobrenome" readOnly />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="genero">Gênero:</label>
                                    <div className="col-sm-6">
                                        <input className="form-control" type="text" name="genero" id="genero" readOnly />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="dataNascimento">Data de Nascimento:</label>
                                    <div className="col-sm-6">
                                        <input className="form-control" type="date" name="dataNascimento" id="dataNascimento" readOnly />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="cadastroEmail">E-mail:</label>
                                    <div className="col-sm-6">
                                        <input className="form-control" type="text" name="cadastroEmail" id="cadastroEmail" readOnly />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="cadastroSenha">Senha:</label>
                                    <div className="col-sm-6">
                                        <input className="form-control" type="text" name="cadastroSenha" id="cadastroSenha" readOnly />
                                    </div>
                                </div>

                                <div className="row" style={{ paddingLeft: '12px', marginTop: '20px' }}>
                                    <h2>Privacidade</h2>
                                    <div>
                                        <input type="checkbox" id="Público" defaultChecked /> Público
                                        <input type="checkbox" id="Privado" style={{ marginLeft: '20px' }} /> Privado
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Conta;
