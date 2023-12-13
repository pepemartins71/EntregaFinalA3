import React, { useState } from 'react';
import './JogosStyles.css';

const Jogos = ({ tipoConteudo }) => {
    return (
        <div>
            {tipoConteudo === 'favoritos' && (
                <div>
                    <div style={{ textAlign: 'center' }}>
                        <h4 style={{ marginTop: '12px' }}>Favoritos ⭐</h4>
                    </div>
                    <div className="d-flex flex-wrap align-items-center justify-content-center">
                        <form className="col-11" role="search">
                            <input className="form-control" type="search" placeholder="Pesquisa" aria-label="Pesquisa" />
                        </form>
                    </div>
                </div>
            )}

            {tipoConteudo === 'categorias' && (
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-2" style={{ paddingTop: '12px', paddingBottom: '12px' }}>
                            <div className="categoriasJogo">
                                <div className="categoriasTitulo">
                                    <h4>Categorias de Jogos</h4>
                                    <form role="search">
                                        <input className="form-control me-2" type="search" placeholder="Pesquisa" aria-label="Pesquisa" />
                                    </form>
                                </div>
                                <div className="divisãoHorizontal"></div>
                                <div>
                                    <h4 style={{ textAlign: 'center' }}>Filtrar</h4>
                                    <div className="categoriaAdiciona" style={{ marginTop: '12px', paddingLeft: '12px' }}>
                                        <div><input type="checkbox" id="Battle Royale" /> Battle Royale</div>
                                        <div><input type="checkbox" id="FPS" /> FPS</div>
                                        <div><input type="checkbox" id="Multiplayer" /> Multiplayer</div>
                                        <div><input type="checkbox" id="Sandbox" /> Sandbox</div>
                                        <div><input type="checkbox" id="Sobrevivência" /> Sobrevivência</div>
                                        <div><input type="checkbox" id="Esporte" /> Esporte</div>
                                        <div><input type="checkbox" id="Mundo Aberto" /> Mundo Aberto</div>
                                        <div><input type="checkbox" id="Plataforma" /> Plataforma</div>
                                        <div><input type="checkbox" id="Simulação" /> Simulação</div>
                                        <div><input type="checkbox" id="Ação" /> Ação</div>
                                        <div><input type="checkbox" id="Recomendado" /> Recomendado</div>
                                        <div><input type="checkbox" id="Não Recomendado" /> Não Recomendado</div>
                                        <div><input type="checkbox" id="Novidade" /> Novidade</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-10 jogosFiltrados" id="jogosCategoria">

                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Jogos;