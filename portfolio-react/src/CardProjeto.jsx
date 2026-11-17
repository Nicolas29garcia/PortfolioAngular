// CardProjeto: um projeto do Portfolio. Os dados chegam de fora, pelas props.
// Entre chaves, no parâmetro, os nomes das props que o card usa.
function CardProjeto({ nome, descricao, tecnologias, link_github, ano }) {
  const listaTecnologias = [...new Set((tecnologias ?? '').split(',').map((item) => item.trim()).filter(Boolean))];
  let link;
  try {
    const endereco = new URL(link_github);
    const exemplo = endereco.hostname === 'github.com' && endereco.pathname.startsWith('/usuario/');
    if (['https:', 'http:'].includes(endereco.protocol) && !exemplo) link = endereco.href;
  } catch {
    // Um destino ausente ou inválido aparece como texto, sem criar um link falso.
  }

  return (
    <article className="card">
      <div className="card-topo">
        <span className="numero-projeto" aria-hidden="true" />
        <p>{ano}</p>
      </div>
      <h3>{nome}</h3>
      <p className="descricao">{descricao}</p>
      <ul className="meta" aria-label={`Tecnologias de ${nome}`}>
        {listaTecnologias.map((tecnologia) => <li key={tecnologia}>{tecnologia}</li>)}
      </ul>
      <div className="card-rodape">
        {link ? (
          <a className="projeto-link" href={link} aria-label={`Ver no GitHub: ${nome}`}>
            Ver no GitHub <span className="seta" aria-hidden="true" />
          </a>
        ) : (
          <p className="sem-link">Link não disponível</p>
        )}
      </div>
    </article>
  );
}

export default CardProjeto;
