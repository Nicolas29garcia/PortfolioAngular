const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();
const PORTA = 3000;

// Deixa outra origem (o Angular na porta 4200) chamar esta API.
app.use(cors());

app.get('/', (req, res) => {
    res.send('API do Portfolio em Node: no ar');
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