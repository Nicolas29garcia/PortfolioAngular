import { useState } from 'react';
import API from './api.js';

// Calculado fora da renderização para manter o componente puro.
const ANO_ATUAL = new Date().getFullYear();

// Cadastro e edicao usam o mesmo contrato de cinco campos da API Node.
function NovoProjeto({ token, projetoEmEdicao, cancelarEdicao, onSalvo, onSessaoExpirada }) {
  const [nome, setNome] = useState(projetoEmEdicao?.nome ?? '');
  const [descricao, setDescricao] = useState(projetoEmEdicao?.descricao ?? '');
  const [tecnologias, setTecnologias] = useState(projetoEmEdicao?.tecnologias ?? '');
  const [ano, setAno] = useState(String(projetoEmEdicao?.ano ?? ANO_ATUAL));
  const [linkGithub, setLinkGithub] = useState(projetoEmEdicao?.link_github ?? '');
  const [erro, setErro] = useState('');
  const [salvando, setSalvando] = useState(false);

  async function salvar(e) {
    e.preventDefault();
    setErro('');
    setSalvando(true);
    const editando = Boolean(projetoEmEdicao);
    const caminho = editando ? '/api/projetos/' + projetoEmEdicao.id : '/api/projetos';

    try {
      if (!API) throw new Error('endereço da API ainda não configurado');
      const resposta = await fetch(API + caminho, {
        method: editando ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
        body: JSON.stringify({
          nome: nome.trim(),
          descricao,
          tecnologias,
          ano: Number(ano),
          link_github: linkGithub.trim(),
        }),
      });
      const dados = await resposta.json().catch(() => ({}));
      if (resposta.status === 401) {
        onSessaoExpirada(dados.erro || 'Sua sessão não é válida. Entre novamente.');
        return;
      }
      if (!resposta.ok) throw new Error(dados.erro || 'a API respondeu HTTP ' + resposta.status);

      if (!editando) {
        setNome('');
        setDescricao('');
        setTecnologias('');
        setAno(String(new Date().getFullYear()));
        setLinkGithub('');
      }
      onSalvo(editando ? 'Projeto atualizado.' : 'Projeto ' + dados.id + ' cadastrado.');
    } catch (falha) {
      setErro('Não deu para salvar: ' + falha.message);
    } finally {
      setSalvando(false);
    }
  }

  return (
    <form id="form-projeto" className="gestao-formulario" onSubmit={salvar}>
      <h3>{projetoEmEdicao ? 'Editar projeto' : 'Novo projeto'}</h3>
      <div className="campo">
        <label htmlFor="projeto-nome">Nome</label>
        <input id="projeto-nome" name="nome" value={nome} onChange={(e) => setNome(e.target.value)} maxLength={255} required />
      </div>
      <div className="campo">
        <label htmlFor="projeto-descricao">Descrição</label>
        <textarea id="projeto-descricao" name="descricao" value={descricao} onChange={(e) => setDescricao(e.target.value)} rows={4} />
      </div>
      <div className="campo">
        <label htmlFor="projeto-tecnologias">Tecnologias</label>
        <input id="projeto-tecnologias" name="tecnologias" value={tecnologias} onChange={(e) => setTecnologias(e.target.value)} placeholder="React, Node.js, MariaDB" />
      </div>
      <div className="form-linha">
        <div className="campo">
          <label htmlFor="projeto-ano">Ano</label>
          <input id="projeto-ano" name="ano" type="number" min="1900" max="2100" step="1" value={ano} onChange={(e) => setAno(e.target.value)} required />
        </div>
        <div className="campo">
          <label htmlFor="projeto-link">Link do GitHub</label>
          <input id="projeto-link" name="link_github" type="url" value={linkGithub} onChange={(e) => setLinkGithub(e.target.value)} placeholder="https://github.com/..." />
        </div>
      </div>
      <div className="gestao-acoes">
        <button className="botao botao-primario" type="submit" disabled={salvando}>
          {salvando ? 'Salvando...' : projetoEmEdicao ? 'Salvar alterações' : 'Salvar projeto'}
        </button>
        {projetoEmEdicao && (
          <button className="botao botao-secundario" type="button" onClick={cancelarEdicao} disabled={salvando}>Cancelar edição</button>
        )}
      </div>
      {erro && <p className="estado erro" role="alert">{erro}</p>}
    </form>
  );
}

export default NovoProjeto;
