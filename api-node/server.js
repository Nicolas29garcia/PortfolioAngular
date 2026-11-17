const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('./db');

const app = express();
const PORTA = process.env.PORT || 3000;

// A chave que assina os tokens. Fica aqui so ate a Aula 29, quando vai para o .env
const SEGREDO = 'troque-por-uma-frase-longa-que-so-voce-sabe';

// Deixa outra origem (o Angular na porta 4200) chamar esta API.
app.use(cors());
// Le o corpo JSON de POST e PUT e o entrega em req.body. Sem isto, req.body e undefined
app.use(express.json());

// Middleware: confere o token antes de a rota rodar. Entra so nas rotas que o chamam
function autenticar(req, res, next) {
  const cabecalho = req.headers.authorization ?? '';
  const token = cabecalho.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ erro: 'Entre na sua conta para alterar o portfólio.' });
  }
  
  try {
    req.usuario = jwt.verify(token, SEGREDO);
    next();
  } catch (erro) {
    return res.status(401).json({ erro: 'Sua sessão não é válida. Entre novamente.' });
  }
}

app.get('/', (req, res) => {
    res.send('API do Portfolio em Node: no ar');
});

// POST /api/login: confere email e senha e devolve o token. A unica rota que ve a senha.
app.post('/api/login', async (req, res) => {
  try {
    const dados = req.body;
    if (!dados || !dados.email || !dados.senha) {
      return res.status(400).json({ erro: 'Informe email e senha' });
    }
    const [linhas] = await pool.execute('SELECT id, email, senha_hash FROM usuarios WHERE email = ?', [dados.email]);
    const usuario = linhas[0];
    if (!usuario) {
      return res.status(401).json({ erro: 'Não foi possível entrar: confira seu e-mail e sua senha.' });
    }
    const confere = await bcrypt.compare(dados.senha, usuario.senha_hash);
    if (!confere) {
      return res.status(401).json({ erro: 'Não foi possível entrar: confira seu e-mail e sua senha.' });
    }
    const token = jwt.sign({ id: usuario.id, email: usuario.email }, SEGREDO, { expiresIn: '30m' });
    res.json({ token });
  } catch (erro) {
    res.status(500).json({ erro: 'Falha no servidor: ' + erro.message });
  }
});

// POST cria: os dados vem no corpo, em JSON, e o id nasce no banco.
app.post('/api/projetos', autenticar, async (req, res) => {
  try {
    const dados = req.body;
    if (!dados || !dados.nome) {
      return res.status(400).json({ erro: 'Informe pelo menos o nome do projeto' });
    }
    const sql = 'INSERT INTO projetos (nome, descricao, tecnologias, link_github, ano, status) VALUES (?, ?, ?, ?, ?, ?)';
    const [resultado] = await pool.execute(sql, [
      dados.nome, dados.descricao ?? '', dados.tecnologias ?? '',
      dados.link_github ?? '', dados.ano ?? new Date().getFullYear(), 'publicado'
    ]);
    res.status(201).json({ id: resultado.insertId });
  } catch (erro) {
    res.status(500).json({ erro: 'Falha no servidor: ' + erro.message });
  }
});

// PUT altera: o id vem no caminho (qual projeto) e os dados no corpo (o que gravar).
app.put('/api/projetos/:id', autenticar, async (req, res) => {
  try {
    const dados = req.body;
    if (!dados || !dados.nome) {
      return res.status(400).json({ erro: 'Informe pelo menos o nome do projeto' });
    }
    const sql = 'UPDATE projetos SET nome = ?, descricao = ?, tecnologias = ?, link_github = ?, ano = ? WHERE id = ?';
    const [resultado] = await pool.execute(sql, [
      dados.nome, dados.descricao ?? '', dados.tecnologias ?? '',
      dados.link_github ?? '', dados.ano ?? new Date().getFullYear(), req.params.id
    ]);
    if (resultado.affectedRows === 0) {
      return res.status(404).json({ erro: 'Projeto nao encontrado' });
    }
    res.json({ mensagem: 'Projeto atualizado' });
  } catch (erro) {
    res.status(500).json({ erro: 'Falha no servidor: ' + erro.message });
  }
});

// DELETE apaga: só precisa do id. Não há corpo no pedido, e a resposta também não tem.
app.delete('/api/projetos/:id', autenticar, async (req, res) => {
  try {
    const [resultado] = await pool.execute('DELETE FROM projetos WHERE id = ?', [req.params.id]);
    if (resultado.affectedRows === 0) {
      return res.status(404).json({ erro: 'Projeto nao encontrado' });
    }
    res.status(204).end();
  } catch (erro) {
    res.status(500).json({ erro: 'Falha no servidor: ' + erro.message });
  }
});

// Rota para procurar um projeto pelo ID
app.get('/api/projetos/:id', async (req, res) => {
    try {
        const sql = `
            SELECT id, nome, descricao, tecnologias, link_github, ano
            FROM projetos
            WHERE id = ? AND status = 'publicado'
        `;
        const [linhas] = await pool.execute(sql, [req.params.id]);

        if (linhas.length === 0) {
            return res.status(404).json({ erro: 'Projeto nao encontrado' });
        }

        res.json(linhas[0]);
    } catch (erro) {
        res.status(500).json({ erro: 'Falha no servidor: ' + erro.message });
    }
});

// O mesmo SELECT do api/projetos.php: so os publicados, do mais novo ao mais antigo.
app.get('/api/projetos', async (req, res) => {
  try {
    const sql = "SELECT id, nome, descricao, tecnologias, link_github, ano FROM projetos WHERE status = 'publicado' ORDER BY ano DESC, id";
    const [projetos] = await pool.query(sql);
    res.json(projetos);
  } catch (erro) {
    res.status(500).json({ erro: 'Falha no servidor: ' + erro.message });
  }
});

// 3.1: Rota do catálogo de tecnologias
app.get('/api/tecnologias', async (req, res) => {
    try {
        const sql = `
            SELECT id, nome, categoria, descricao, ano_criacao
            FROM tecnologias
            ORDER BY categoria, nome
        `;
        const [linhas] = await pool.execute(sql);
        res.json(linhas);
    } catch (erro) {
        res.status(500).json({ erro: 'Falha no servidor: ' + erro.message });
    }
});

// As escritas do catálogo usam a mesma tranca e o mesmo contrato dos projetos.
function validarTecnologia(req, res, next) {
  const dados = req.body;
  if (!dados || typeof dados.nome !== 'string' || !dados.nome.trim() || dados.nome.length > 100) {
    return res.status(400).json({ erro: 'Informe o nome da tecnologia com até 100 caracteres' });
  }
  if ((dados.categoria !== undefined && (typeof dados.categoria !== 'string' || dados.categoria.length > 100)) ||
      (dados.descricao !== undefined && typeof dados.descricao !== 'string') ||
      (dados.ano_criacao !== undefined && (!Number.isInteger(dados.ano_criacao) || dados.ano_criacao < 1 || dados.ano_criacao > 9999))) {
    return res.status(400).json({ erro: 'Confira categoria, descrição e ano de criação da tecnologia' });
  }
  next();
}

function validarIdTecnologia(req, res, next) {
  if (!/^[1-9]\d*$/.test(req.params.id) || !Number.isSafeInteger(Number(req.params.id))) {
    return res.status(400).json({ erro: 'Informe um id de tecnologia inteiro e positivo' });
  }
  next();
}

app.post('/api/tecnologias', autenticar, validarTecnologia, async (req, res) => {
  try {
    const dados = req.body;
    const [resultado] = await pool.execute(
      'INSERT INTO tecnologias (nome, categoria, descricao, ano_criacao) VALUES (?, ?, ?, ?)',
      [dados.nome.trim(), dados.categoria ?? '', dados.descricao ?? '', dados.ano_criacao ?? new Date().getFullYear()]
    );
    res.status(201).json({ id: resultado.insertId });
  } catch (erro) {
    res.status(500).json({ erro: 'Falha no servidor: ' + erro.message });
  }
});

app.put('/api/tecnologias/:id', autenticar, validarIdTecnologia, validarTecnologia, async (req, res) => {
  try {
    const dados = req.body;
    const [resultado] = await pool.execute(
      'UPDATE tecnologias SET nome = ?, categoria = ?, descricao = ?, ano_criacao = ? WHERE id = ?',
      [dados.nome.trim(), dados.categoria ?? '', dados.descricao ?? '', dados.ano_criacao ?? new Date().getFullYear(), req.params.id]
    );
    if (resultado.affectedRows === 0) return res.status(404).json({ erro: 'Tecnologia nao encontrada' });
    res.json({ mensagem: 'Tecnologia atualizada' });
  } catch (erro) {
    res.status(500).json({ erro: 'Falha no servidor: ' + erro.message });
  }
});

app.delete('/api/tecnologias/:id', autenticar, validarIdTecnologia, async (req, res) => {
  try {
    const [resultado] = await pool.execute('DELETE FROM tecnologias WHERE id = ?', [req.params.id]);
    if (resultado.affectedRows === 0) return res.status(404).json({ erro: 'Tecnologia nao encontrada' });
    res.status(204).end();
  } catch (erro) {
    res.status(500).json({ erro: 'Falha no servidor: ' + erro.message });
  }
});

app.listen(PORTA, () => {
    console.log(`API no ar em http://localhost:${PORTA}`);
});
