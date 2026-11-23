import { useEffect, useState } from 'react';
import API from './api.js';
import CardProjeto from './CardProjeto.jsx';
import Catalogo from './Catalogo.jsx';
import Contato from './Contato.jsx';

// A tela publica mantém os dados remotos e os componentes das Aulas 25 a 27.
function Inicio() {
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
        <section id="inicio" className="apresentacao" aria-labelledby="titulo-inicio">
          <div className="apresentacao-texto">
            <p className="eyebrow"><span className="indice">01</span> / Portfólio de estudos</p>
            <h1 id="titulo-inicio">Nicolas<span>Henrique Garcia.</span></h1>
            <p className="intro">Estudante de informática. Aprendendo a construir para a web, do primeiro cadastro à API.</p>
            <p className="intro-secundaria">Aqui reúno projetos das aulas de Desenvolvimento Web II.</p>
            <div className="apresentacao-acoes">
              <a className="botao botao-primario" href="#projetos">Ver projetos <span className="seta" aria-hidden="true" /></a>
              <a className="botao botao-secundario" href="#contato">Contato</a>
            </div>
            <p className="apresentacao-origem">IFPR <span aria-hidden="true">/</span> Campus Ponta Grossa</p>
          </div>
          <aside className="formacao" aria-labelledby="titulo-formacao">
            <div className="formacao-topo">
              <p className="eyebrow" id="titulo-formacao">Desenvolvimento Web</p>
              <span className="detalhe-tecnico">DWII / 2026</span>
            </div>
            <div className="composicao">
              <div className="geometria" aria-hidden="true"><span>NG</span></div>
              <ul className="stack" aria-label="Tecnologias presentes neste repositório">
                <li>React</li>
                <li>Node.js</li>
                <li>MariaDB</li>
              </ul>
            </div>
            <div className="formacao-texto">
              <span className="detalhe-tecnico">Em formação</span>
              <h2>Técnico em Informática</h2>
              <p>Integrado ao Ensino Médio</p>
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
              <span className="icone-atualizar" aria-hidden="true">↻</span>
              {carregando ? 'Atualizando...' : 'Atualizar projetos'}
            </button>
          </div>
          <div className="estado-remoto" role="status" aria-live="polite" aria-atomic="true">
            {carregando && <p className="estado">Carregando projetos...</p>}
            {!carregando && !erro && projetos.length === 0 && <p className="estado">Nenhum projeto publicado ainda.</p>}
            {!carregando && !erro && projetos.length > 0 && <p className="resumo-dados sucesso">{projetos.length} {projetos.length === 1 ? 'projeto publicado' : 'projetos publicados'}</p>}
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
    </>
  );
}

export default Inicio;
