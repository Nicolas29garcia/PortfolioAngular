import { useEffect, useState } from 'react';
import API from './api.js';
import Cabecalho from './Cabecalho.jsx';
import CardProjeto from './CardProjeto.jsx';
import Catalogo from './Catalogo.jsx';
import Contato from './Contato.jsx';
import Rodape from './Rodape.jsx';

// App: O componente raiz. Ele monta a página com os outros componentes.
function App() {
  const [projetos, setProjetos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  async function buscarProjetos() {
    try {
      if (!API) throw new Error('endereço da API ainda não configurado');
      const resposta = await fetch(API + '/api/projetos');
      if (!resposta.ok) {
        throw new Error('a API respondeu HTTP ' + resposta.status);
      }
      const dados = await resposta.json();
      if (!Array.isArray(dados)) throw new Error('a API não retornou uma lista');
      setProjetos(dados);
    } catch (falha) {
      setProjetos([]);
      setErro('Não deu para carregar os projetos: ' + falha.message + '.');
    } finally {
      setCarregando(false);
    }
  }

  function atualizarProjetos() {
    setCarregando(true);
    setErro('');
    buscarProjetos();
  }

  // [] inicia a busca na montagem; o botão reutiliza a mesma função.
  useEffect(() => {
    // oxlint-disable-next-line react/set-state-in-effect -- A Aula 27 sincroniza dados remotos por uma função assíncrona.
    buscarProjetos();
  }, []);

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
            <button className="botao botao-secundario" type="button" onClick={atualizarProjetos} disabled={carregando}>
              {carregando ? 'Atualizando...' : 'Atualizar projetos'}
            </button>
          </div>
          <div className="estado-remoto" role="status" aria-live="polite" aria-atomic="true">
            {carregando && <p className="estado">Carregando projetos...</p>}
            {!carregando && !erro && projetos.length === 0 && <p className="estado">Nenhum projeto publicado ainda.</p>}
            {!carregando && !erro && projetos.length > 0 && <p className="resumo-dados">{projetos.length} projeto(s) recebido(s).</p>}
          </div>
          {erro && <p className="estado erro" role="alert">{erro}</p>}
          <div className="cards" aria-busy={carregando}>
            {!carregando && !erro && projetos.map((p) => (
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
        <Catalogo />
        <Contato />
      </main>
      <Rodape />
    </>
  );
}

export default App;
