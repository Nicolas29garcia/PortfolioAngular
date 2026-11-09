import { useState } from 'react';

// Contato: o formulario de contato do Portfolio.
// O que a pessoa digita fica no estado: uma variavel que o React lembra e vigia.
function Contato() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [aviso, setAviso] = useState('');

  // enviar: roda quando o formulario e enviado. Por enquanto so avisa e limpa os campos.
  function enviar(e) {
    e.preventDefault();
    setAviso('Simulação concluída' + (nome ? ', ' + nome : '') + '. Mensagem com ' + mensagem.length + ' caracteres. Nenhum dado foi enviado.');
    setNome('');
    setEmail('');
    setMensagem('');
  }

  return (
    <section id="contato" className="contato" aria-labelledby="titulo-contato">
      <div className="contato-intro">
        <p className="eyebrow"><span className="indice">03</span> / Contato</p>
        <h2 id="titulo-contato">Uma ideia começa<br />com uma mensagem.</h2>
        <p>Um formulário de estudo para experimentar o que estou aprendendo em React.</p>
        <div className="nota-demo" id="nota-demo">
          <span className="eyebrow">Demonstração local</span>
          <p>Você pode testar os campos. Nenhum dado é enviado à API e nenhuma mensagem é entregue.</p>
        </div>
      </div>
      <div className="contato-formulario">
        <form onSubmit={enviar} aria-describedby="nota-demo">
          <div className="form-linha">
            <div className="campo">
              <label htmlFor="nome">Seu nome</label>
              <input id="nome" name="nome" autoComplete="name" value={nome} onChange={(e) => setNome(e.target.value)} />
            </div>
            <div className="campo">
              <label htmlFor="email">Seu e-mail</label>
              <input id="email" name="email" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
          </div>
          <div className="campo">
            <label htmlFor="mensagem">Sua mensagem</label>
            <textarea id="mensagem" name="mensagem" rows={5} aria-describedby="contagem" value={mensagem} onChange={(e) => setMensagem(e.target.value)} />
          </div>
          <div className="form-detalhes">
            <p>{nome ? `Olá, ${nome}!` : 'Escreva no seu tempo.'}</p>
            <p id="contagem">{mensagem.length} caracteres</p>
          </div>
          <button className="botao botao-primario" type="submit">Simular envio <span className="seta" aria-hidden="true" /></button>
        </form>
        <p className="aviso" role="status" aria-atomic="true">{aviso}</p>
      </div>
    </section>
  );
}

export default Contato;
