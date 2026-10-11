const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();
const PORTA = 3000;

// Deixa outra origem (o Angular na porta 4200) chamar esta API.
app.use(cors());
// Le o corpo JSON de POST e PUT e o entrega em req.body. Sem isto, req.body e undefined
app.use(express.json());

app.get('/', (req, res) => {
    res.send('API do Portfolio em Node: no ar');
});

// POST cria: os dados vem no corpo, em JSON, e o id nasce no banco.
app.post('/api/projetos', async (req, res) => {
  try {
    const dados = req.body;
    console.log(dados);
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
app.put('/api/projetos/:id', async (req, res) => {
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
app.delete('/api/projetos/:id', async (req, res) => {
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

app.listen(PORTA, () => {
    console.log(`API no ar em http://localhost:${PORTA}`);
});