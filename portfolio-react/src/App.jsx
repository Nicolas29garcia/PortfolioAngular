import { Route, Routes } from 'react-router-dom';
import Cabecalho from './Cabecalho.jsx';
import Inicio from './Inicio.jsx';
import Gestao from './Gestao.jsx';
import NaoEncontrada from './NaoEncontrada.jsx';
import Rodape from './Rodape.jsx';

// O cabecalho e o rodape continuam fixos; a rota decide o miolo.
function App() {
  return (
    <>
      <Cabecalho />
      <main id="conteudo" className="container" tabIndex={-1}>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/gestao" element={<Gestao />} />
          <Route path="*" element={<NaoEncontrada />} />
        </Routes>
      </main>
      <Rodape />
    </>
  );
}

export default App;
