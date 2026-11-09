// CardProjeto: um projeto do Portfolio. Os dados chegam de fora, pelas props.
// Entre chaves, no parâmetro, os nomes das props que o card usa.
function CardProjeto({ nome, descricao, tecnologias, link_github, ano }) {
  return (
    <article className="card">
      <div className="card-topo">
        <span className="numero-projeto" aria-hidden="true" />
        <p>{ano}</p>
      </div>
      <h3>{nome}</h3>
      <p className="descricao">{descricao}</p>
      <p className="meta"><span className="sr-only">Tecnologias: </span>{tecnologias}</p>
      <div className="card-rodape">
        {link_github ? (
          <a className="projeto-link" href={link_github} aria-label={`Ver no GitHub: ${nome}`}>
            Ver no GitHub <span className="seta" aria-hidden="true" />
          </a>
        ) : (
          <p className="sem-link">Repositório não informado</p>
        )}
      </div>
    </article>
  );
}

export default CardProjeto;
