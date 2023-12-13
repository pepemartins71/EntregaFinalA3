import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { UserProvider } from './pages/UserContext';

// Pages
import Home from './pages/Home';
import Sobre from './pages/Sobre';
import Atendimento from './pages/Atendimento';
import Usuario from './pages/Usuario';
import Jogos from './pages/Jogos';
import Perfil from './pages/Perfil';
import Conta from './pages/Conta';
import CadastrarJogo from './pages/CadastrarJogo';
import CadastroPlataforma from './pages/CadastroPlataforma';
import Editar from './pages/Editar';

// Components
import Navbar from './components/Navbar';

function App() {
  return (
    <UserProvider>
      <div className="App">
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/usuario" element={<Usuario />} />
            <Route path="/sobre" element={<Sobre />} />
            {/* Rota para Jogos com parâmetro tipoConteudo */}
            <Route path="/jogos/:tipoConteudo" element={<Jogos />} />
            {/* Rotas separadas para Favoritos e Categorias */}
            <Route path="/jogos/favoritos" element={<Jogos tipoConteudo="favoritos" />} />
            <Route path="/jogos/categorias" element={<Jogos tipoConteudo="categorias" />} />
            <Route path="/perfil" element={<Perfil />} />
            <Route path="/conta" element={<Conta />} />
            <Route path="/cadastrarJogo" element={<CadastrarJogo />} />
            <Route path="/cadastroPlataforma" element={<CadastroPlataforma />} />
            <Route path="/editar/:id" element={<Editar />} />
            <Route path="/atendimento" element={<Atendimento />} />
          </Routes>
        </BrowserRouter>
      </div>
    </UserProvider>
  );
}

export default App;