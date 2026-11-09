// Cabecalho: a barra de topo do Portfolio, com o nome e os links.
// Um componente e uma funcao que devolve JSX. O nome comeca com maiuscula.
function Cabecalho() {
  return (
    <header className="cabecalho container">
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <a className="identidade" href="#inicio" aria-label="Nicolas Henrique Garcia — início">
        <span className="monograma" aria-hidden="true">NG<span /></span>
        <span>Nicolas Henrique Garcia</span>
      </a>
      <nav aria-label="Navegação principal">
        <a href="#inicio"><span aria-hidden="true">01</span> Início</a>
        <a href="#projetos"><span aria-hidden="true">02</span> Projetos</a>
        <a href="#contato"><span aria-hidden="true">03</span> Contato</a>
      </nav>
    </header>
  );
}

export default Cabecalho;
