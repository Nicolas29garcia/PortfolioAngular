const bcrypt = require('bcryptjs');
const readline = require('node:readline/promises');
const { Writable } = require('node:stream');
const pool = require('./db');

async function criar() {
  const email = process.argv[2];
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 120) {
    console.error('Uso: node criar-usuario.js seu-email (a senha será solicitada sem aparecer)');
    process.exitCode = 1;
    await pool.end();
    return;
  }
  if (process.argv[3] || !process.stdin.isTTY) {
    console.error('Digite a senha somente no prompt interativo; não a passe como argumento.');
    process.exitCode = 1;
    await pool.end();
    return;
  }

  // readline controla o terminal; a saída muda impede que os caracteres sejam exibidos.
  const saida = new Writable({ write(_texto, _encoding, concluir) { concluir(); } });
  const entrada = readline.createInterface({ input: process.stdin, output: saida, terminal: true });
  try {
    process.stdout.write('Senha escolhida por você (oculta): ');
    const senha = await entrada.question('');
    process.stdout.write('\nConfirme a senha (oculta): ');
    const confirmacao = await entrada.question('');
    process.stdout.write('\n');
    if (!senha || senha !== confirmacao || Buffer.byteLength(senha, 'utf8') > 72) {
      console.error('As senhas devem coincidir, não estar vazias e ter no máximo 72 bytes para bcrypt.');
      process.exitCode = 1;
      return;
    }
    const hash = await bcrypt.hash(senha, 10);
    const [resultado] = await pool.execute(
      'INSERT INTO usuarios (email, senha_hash) VALUES (?, ?)', [email, hash]
    );
    console.log('Usuário ' + resultado.insertId + ' criado: ' + email);
  } catch (erro) {
    console.error(erro.code === 'ER_DUP_ENTRY'
      ? 'Este e-mail já existe. Nenhum usuário foi alterado ou apagado.'
      : 'Não foi possível criar o usuário. Confira a conexão e a tabela usuarios.');
    process.exitCode = 1;
  } finally {
    entrada.close();
    await pool.end();
  }
}

criar().catch(() => { console.error('Falha ao finalizar a criação do usuário.'); process.exitCode = 1; });
