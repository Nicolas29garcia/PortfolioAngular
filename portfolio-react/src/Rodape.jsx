// Rodape: componente responsável pelo rodapé do portfólio.
function Rodape() {
  return (
    <footer className="rodape container">
      <div className="rodape-identidade">
        <span className="rodape-marca" aria-hidden="true">NG<span /></span>
        <div>
          <p className="rodape-nome">Nicolas Henrique Garcia</p>
          <p>Portfólio de estudos · 2026</p>
        </div>
      </div>
      <p>IFPR — Campus Ponta Grossa</p>
      <a href="#inicio">Voltar ao início <span className="seta seta-cima" aria-hidden="true" /></a>
    </footer>
  );
}

export default Rodape;
