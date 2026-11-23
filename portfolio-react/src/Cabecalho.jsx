import { Link } from 'react-router-dom';

// A navegacao utiliza Link para trocar de tela sem recarregar a pagina.
function Cabecalho() {
  return (
    <header className="cabecalho container">
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <Link className="identidade" to="/" aria-label="Nicolas Henrique Garcia — início">
        <span className="monograma" aria-hidden="true">NG<span /></span>
        <span className="identidade-nome">Nicolas Henrique Garcia</span>
      </Link>
      <nav aria-label="Navegação principal">
        <Link to="/"><span aria-hidden="true">01</span> Início</Link>
        <Link to="/gestao"><span aria-hidden="true">02</span> Gestão</Link>
      </nav>
    </header>
  );
}

export default Cabecalho;
