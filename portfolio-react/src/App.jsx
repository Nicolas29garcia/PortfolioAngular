import Cabecalho from './Cabecalho.jsx';
import CardProjeto from './CardProjeto.jsx';
import Contato from './Contato.jsx';
import Rodape from './Rodape.jsx';
import projetos from './projetos.js';

// App: O componente raiz. Ele monta a página com os outros componentes.
function App() {
  return (
    <>
      <Cabecalho />
      <main id="conteudo" className="container" tabIndex={-1}>
        <section id="inicio" className="apresentacao" aria-labelledby="titulo-inicio">
          <div className="apresentacao-texto">
            <p className="eyebrow">Portfólio / Desenvolvimento Web</p>
            <h1 id="titulo-inicio">Nicolas<span>Henrique Garcia.</span></h1>
            <p className="intro">Estudante de informática. Aprendendo a construir para a web, do primeiro cadastro à API.</p>
            <p className="intro-secundaria">Aqui reúno projetos das aulas de Desenvolvimento Web II.</p>
            <a className="botao botao-primario" href="#projetos">Conheça os projetos <span className="seta" aria-hidden="true" /></a>
          </div>
          <aside className="formacao" aria-labelledby="titulo-formacao">
            <div className="formacao-topo">
              <p className="eyebrow" id="titulo-formacao">Formação</p>
              <span className="formacao-sigla">IFPR</span>
            </div>
            <div className="formacao-marca" aria-hidden="true"><span>NG</span></div>
            <div className="formacao-texto">
              <h2>Técnico em Informática</h2>
              <p>Integrado ao Ensino Médio</p>
              <p className="formacao-campus">IFPR — Campus Ponta Grossa</p>
            </div>
          </aside>
        </section>

        <section id="projetos" className="projetos" aria-labelledby="titulo-projetos">
          <div className="section-heading">
            <div>
              <p className="eyebrow"><span className="indice">02</span> / Projetos</p>
              <h2 id="titulo-projetos">Código colocado em prática.</h2>
            </div>
            <p>Quatro projetos de aula.<br />Diferentes partes do desenvolvimento web.</p>
          </div>
          <div className="cards">
            {projetos.map((p) => (
              <CardProjeto
                key={p.id}
                nome={p.nome}
                descricao={p.descricao}
                tecnologias={p.tecnologias}
                link_github={p.link_github}
                ano={p.ano}
              />
            ))}
          </div>
        </section>
        <Contato />
      </main>
      <Rodape />
    </>
  );
}

export default App;
