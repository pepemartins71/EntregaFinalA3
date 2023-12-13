import React from 'react';
import './Sobre.css';

const Sobre = () => {
    return (
        <div className="about about-section">
            <div className="container mt-5">
                <h1 className="about-title">GERENCIE SEU CATÁLOGO DE JOGOS<br /> NO GAMEVERSE!</h1>
                <div className="aboutCard">
                    <p className="about-info">
                        O GameVerse é uma aplicação web desenvolvida por alunos da Universidade Unifacs de Salvador, Bahia.
                        Nosso objetivo é fornecer uma plataforma onde os usuários possam criar e gerenciar seu catálogo pessoal de jogos. Os usuários podem adicionar
                        novos jogos, plataformas, categorizar jogos, indicar se já zeraram, estão jogando, já jogaram ou não recomendam determinado jogo. O site conta
                        com um menu completo e minimalista, apresentando os principais jogos da atualidade. O usuário pode ainda gerenciar seu catálogo, removendo jogos,
                        além de ser possível adicionar aqueles que mais gostou na aba "favoritos"! Nós da GameVerse, esperamos que você possa ter uma experiência completa e sem
                        problemas em nosso site. Divirta-se!
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Sobre;