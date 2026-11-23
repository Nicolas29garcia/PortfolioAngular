import { Link } from 'react-router-dom';

// Enderecos sem rota nao deixam o conteudo do portfolio em branco.
function NaoEncontrada() {
  return (
    <section className="nao-encontrada" aria-labelledby="titulo-nao-encontrada">
      <p className="eyebrow"><span className="indice">404</span> / Endereço desconhecido</p>
      <h1 id="titulo-nao-encontrada">Página não encontrada</h1>
      <p>O endereço informado não corresponde a nenhuma página deste portfólio.</p>
      <Link className="botao botao-primario" to="/">Voltar para o início</Link>
    </section>
  );
}

export default NaoEncontrada;
