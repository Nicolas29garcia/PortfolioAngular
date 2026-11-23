import { useEffect, useState } from 'react';
import API from './api.js';
import NovoProjeto from './NovoProjeto.jsx';

// A area /gestao exige o token para cada pedido de escrita.
function Gestao() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [token, setToken] = useState(() => localStorage.getItem('token') || '');
  const [erro, setErro] = useState('');
  const [aviso, setAviso] = useState('');
  const [entrando, setEntrando] = useState(false);
  const [projetos, setProjetos] = useState([]);
  const [carregandoProjetos, setCarregandoProjetos] = useState(true);
  const [erroProjetos, setErroProjetos] = useState('');
  const [excluindoId, setExcluindoId] = useState(null);
  const [projetoEmEdicao, setProjetoEmEdicao] = useState(null);

  function sessaoExpirada(mensagem) {
    localStorage.removeItem('token');
    setToken('');
    setSenha('');
    setProjetoEmEdicao(null);
    setAviso('');
    setErro(mensagem || 'Sua sessão não é válida. Entre novamente.');
  }

  async function entrar(e) {
    e.preventDefault();
    setErro('');
    setEntrando(true);
    try {
      if (!API) throw new Error('endereço da API ainda não configurado');
      const resposta = await fetch(API + '/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha }),
      });
      const dados = await resposta.json().catch(() => ({}));
      if (!resposta.ok) throw new Error(dados.erro || 'a API respondeu HTTP ' + resposta.status);
      if (!dados.token) throw new Error('a API não devolveu um token');
      localStorage.setItem('token', dados.token);
      setToken(dados.token);
      setSenha('');
      setAviso('');
    } catch (falha) {
      setErro('Não deu para entrar: ' + falha.message);
    } finally {
      setEntrando(false);
    }
  }

  function sair() {
    localStorage.removeItem('token');
    setToken('');
    setSenha('');
    setProjetoEmEdicao(null);
    setErro('');
    setAviso('');
  }

  // A lista da gestao vem da mesma API da pagina publica.
  useEffect(() => {
    if (!token) return;
    let ativo = true;
    async function carregar() {
      try {
        const resposta = await fetch(API + '/api/projetos');
        if (!resposta.ok) throw new Error('a API respondeu HTTP ' + resposta.status);
        const dados = await resposta.json();
        if (!Array.isArray(dados)) throw new Error('a API não retornou uma lista');
        if (ativo) {
          setProjetos(dados);
          setErroProjetos('');
        }
      } catch (falha) {
        if (ativo) {
          setProjetos([]);
          setErroProjetos('Não deu para carregar os projetos: ' + falha.message);
        }
      } finally {
        if (ativo) setCarregandoProjetos(false);
      }
    }
    // oxlint-disable-next-line react/set-state-in-effect -- Dados remotos sao carregados ao entrar na gestao.
    carregar();
    return () => { ativo = false; };
  }, [token]);

  async function atualizarLista() {
    setCarregandoProjetos(true);
    setErroProjetos('');
    try {
      const resposta = await fetch(API + '/api/projetos');
      if (!resposta.ok) throw new Error('a API respondeu HTTP ' + resposta.status);
      const dados = await resposta.json();
      if (!Array.isArray(dados)) throw new Error('a API não retornou uma lista');
      setProjetos(dados);
    } catch (falha) {
      setErroProjetos('Não deu para atualizar os projetos: ' + falha.message);
    } finally {
      setCarregandoProjetos(false);
    }
  }

  function projetoSalvo(mensagem) {
    setAviso(mensagem);
    setProjetoEmEdicao(null);
    atualizarLista();
  }

  async function excluir(projeto) {
    setAviso('');
    setErroProjetos('');
    setExcluindoId(projeto.id);
    try {
      const resposta = await fetch(API + '/api/projetos/' + projeto.id, {
        method: 'DELETE',
        headers: { Authorization: 'Bearer ' + token },
      });
      if (resposta.status === 401) {
        const dados = await resposta.json().catch(() => ({}));
        sessaoExpirada(dados.erro);
        return;
      }
      if (!resposta.ok) {
        const dados = await resposta.json().catch(() => ({}));
        throw new Error(dados.erro || 'a API respondeu HTTP ' + resposta.status);
      }
      // DELETE 204 nao tem JSON no corpo; a lista muda sem F5.
      setProjetos((anteriores) => anteriores.filter((item) => item.id !== projeto.id));
      if (projetoEmEdicao?.id === projeto.id) setProjetoEmEdicao(null);
      setAviso('Projeto ' + projeto.id + ' excluído.');
    } catch (falha) {
      setErroProjetos('Não deu para excluir: ' + falha.message);
    } finally {
      setExcluindoId(null);
    }
  }

  if (!token) {
    return (
      <section className="gestao" aria-labelledby="titulo-gestao">
        <p className="eyebrow"><span className="indice">05</span> / Área administrativa</p>
        <h2 id="titulo-gestao">Gestão</h2>
        <p className="gestao-texto">Entre com seu e-mail e senha para administrar os projetos.</p>
        <form className="gestao-login gestao-formulario" onSubmit={entrar}>
          <div className="campo">
            <label htmlFor="gestao-email">E-mail</label>
            <input id="gestao-email" name="email" type="email" autoComplete="username" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="campo">
            <label htmlFor="gestao-senha">Senha</label>
            <input id="gestao-senha" name="senha" type="password" autoComplete="current-password" value={senha} onChange={(e) => setSenha(e.target.value)} required />
          </div>
          <button className="botao botao-primario" type="submit" disabled={entrando}>{entrando ? 'Entrando...' : 'Entrar'}</button>
          {erro && <p className="estado erro" role="alert">{erro}</p>}
        </form>
      </section>
    );
  }

  return (
    <section className="gestao" aria-labelledby="titulo-gestao">
      <p className="eyebrow"><span className="indice">05</span> / Área administrativa</p>
      <div className="gestao-topo">
        <div>
          <h2 id="titulo-gestao">Gestão</h2>
          <p className="gestao-texto">Você entrou. O token está guardado.</p>
        </div>
        <button className="botao botao-secundario" type="button" onClick={sair}>Sair</button>
      </div>
      {aviso && <p className="estado gestao-sucesso" role="status">{aviso}</p>}
      <div className="gestao-grid">
        <NovoProjeto
          key={projetoEmEdicao?.id ?? 'novo'}
          token={token}
          projetoEmEdicao={projetoEmEdicao}
          cancelarEdicao={() => setProjetoEmEdicao(null)}
          onSalvo={projetoSalvo}
          onSessaoExpirada={sessaoExpirada}
        />
        <div className="gestao-lista">
          <div className="gestao-lista-titulo">
            <h3>Projetos cadastrados</h3>
            <button type="button" className="botao botao-secundario" onClick={atualizarLista} disabled={carregandoProjetos}>
              {carregandoProjetos ? 'Atualizando...' : 'Atualizar lista'}
            </button>
          </div>
          {carregandoProjetos && <p className="estado" role="status">Carregando projetos...</p>}
          {erroProjetos && <p className="estado erro" role="alert">{erroProjetos}</p>}
          {!carregandoProjetos && !erroProjetos && projetos.length === 0 && <p className="estado">Nenhum projeto cadastrado ainda.</p>}
          {!carregandoProjetos && !erroProjetos && projetos.length > 0 && (
            <ul className="gestao-projetos">
              {projetos.map((projeto) => (
                <li key={projeto.id}>
                  <div className="gestao-projeto-dados">
                    <strong>{projeto.nome}</strong>
                    <small>#{projeto.id} · {projeto.ano}</small>
                  </div>
                  <div className="gestao-acoes">
                    <button className="botao botao-secundario" type="button" onClick={() => { setProjetoEmEdicao(projeto); setAviso(''); }}>
                      Editar
                    </button>
                    <button className="botao botao-secundario botao-excluir" type="button" disabled={excluindoId !== null} onClick={() => excluir(projeto)}>
                      {excluindoId === projeto.id ? 'Excluindo...' : 'Excluir'}
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}

export default Gestao;
