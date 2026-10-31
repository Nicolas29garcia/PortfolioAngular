# 💻 Portfólio Angular

Projeto desenvolvido para a disciplina de **Desenvolvimento Web II (DWII)** do **IFPR – Campus Ponta Grossa**.

## 📌 Sobre o Projeto

Portfólio pessoal desenvolvido com **Angular e Angular Material**, com integração a APIs em PHP e Node.js e banco de dados MariaDB.

O projeto apresenta meus projetos, as tecnologias utilizadas, uma página de contato para envio de mensagens ao banco de dados e uma API em Node.js para consultar, cadastrar, atualizar e excluir projetos.

## 🛠️ Tecnologias

- Angular
- Angular Material
- TypeScript
- HTML
- CSS
- PHP
- Node.js
- Express
- MariaDB
- mysql2
- bcryptjs
- jsonwebtoken
- CORS
- Git e GitHub

## ⚙️ Ambiente

- Node.js v24.14.0
- npm 11.9.0
- Angular CLI 21.2.13
- PHP 8.3.6
- MariaDB 10.11
- Express
- mysql2

## ✨ Funcionalidades

- 🏠 Página Inicial
- 👤 Página Sobre
- 💼 Página Projetos
- 📚 Página Catálogo
- 📩 Página Contato
- 🧭 Navegação com Angular Router
- 📱 Menu responsivo com Angular Material
- 🔌 Integração com API REST em PHP
- 🚀 API REST em Node.js com Express
- 📦 Consumo e envio de dados em JSON
- 🔎 Consulta de projetos por ID
- 🛠️ Consulta de tecnologias
- ➕ Cadastro de projetos
- ✏️ Atualização de projetos
- 🗑️ Exclusão de projetos
- 🔗 Links para projetos no GitHub
- 🌐 CORS habilitado
- ⚠️ Tratamento de erros HTTP
- 🗄️ Persistência dos dados no MariaDB
- 🔐 Autenticação com senha armazenada em hash
- 🎟️ Login com token JWT
- 🛡️ Middleware de autenticação para rotas protegidas

## 📩 Formulário de Contato — Aula 18

O formulário de contato foi integrado à API utilizando o método **POST**.

- Reactive Forms com `FormGroup` e `Validators`
- Validação de nome, e-mail e mensagem
- Envio dos dados em JSON
- `HttpClient` e `Observable`
- Tratamento de sucesso e erro
- Botão com estado "Enviando..."
- Limpeza do formulário após o envio
- Mensagens de erro para o usuário
- Validação também no servidor
- Dados armazenados na tabela `contatos` do MariaDB
- API responde `201 Created` em caso de sucesso e `400 Bad Request` em caso de erro

## 🔌 API em PHP

A API em PHP é utilizada nas funcionalidades que já estavam implementadas no projeto.

### Projetos

```http
GET /api/projetos.php
```

### Tecnologias

A API disponibiliza a consulta das tecnologias cadastradas no banco de dados.

```http
GET /api/tecnologias.php
```

### Banco de dados

A API em PHP utiliza o MariaDB para consultar e armazenar os dados do portfólio.

## 🚀 API em Node.js — Aulas 21 a 24

A API em Node.js foi desenvolvida com Express e integrada ao banco de dados MariaDB `dwii_db`.

Na Aula 21, foi criada a estrutura inicial da API. Na Aula 22, a consulta dos projetos foi integrada ao banco de dados. Na Aula 23, foram implementadas as operações de cadastro, atualização e exclusão. Na Aula 24, foi adicionada a autenticação por e-mail e senha, a geração de tokens JWT e a proteção das rotas de escrita.

### 📂 Estrutura dos arquivos

```text
api-node/
├── server.js
├── db.js
├── criar-usuario.js
├── package.json
├── package-lock.json
└── .gitignore

portfolio-angular/sql/
├── setup.sql
└── usuarios.sql
```

### ⚙️ Como executar a API do zero

**1. Iniciar o MariaDB**

```bash
sudo service mariadb start
```

**2. Criar e preparar o banco de dados**

Na raiz do repositório:

```bash
sudo mariadb < portfolio-angular/sql/setup.sql
```

**3. Criar a tabela de usuários**

```bash
sudo mariadb dwii_db < portfolio-angular/sql/usuarios.sql
```

O arquivo `usuarios.sql` cria a tabela `usuarios`, que armazena o e-mail e o hash da senha.

**4. Instalar as dependências da API**

```bash
cd /workspaces/PortfolioAngular/api-node
npm install
```

**5. Criar o usuário administrador**

Execute o comando com o e-mail e a senha escolhidos para o dono do portfólio:

```bash
node criar-usuario.js dono@portfolio.dev <senha>
```

Substitua `<senha>` pela senha escolhida no terminal. O script utiliza `bcryptjs` para gerar o hash antes de salvar a senha no banco.

**Importante:** não publique a senha real, o hash da senha ou tokens JWT no repositório.

**6. Iniciar o servidor**

```bash
node server.js
```

A API utiliza o endereço base:

```text
http://localhost:3000
```

Mantenha o terminal do servidor aberto enquanto executa os testes em outro terminal.

### 🔐 Login e autenticação — Aula 24

A rota `POST /api/login` recebe o e-mail e a senha, verifica o usuário no banco e compara a senha informada com o hash armazenado.

Em caso de sucesso, a API retorna um token JWT. Nas rotas protegidas, o token deve ser enviado no cabeçalho `Authorization` usando o formato `Bearer`.

O middleware `autenticar` verifica o token antes de permitir a execução da rota.

#### 1. Login válido

```bash
curl -i -X POST http://localhost:3000/api/login \
  -H "Content-Type: application/json" \
  -d '{"email":"dono@portfolio.dev","senha":"<senha>"}'
```

Resposta esperada: `200 OK`, com um corpo JSON contendo `token`.

Substitua `<senha>` pela senha real do administrador somente no terminal. Não coloque a senha real no README.

#### 2. Login inválido

```bash
curl -i -X POST http://localhost:3000/api/login \
  -H "Content-Type: application/json" \
  -d '{"email":"dono@portfolio.dev","senha":"senha_incorreta"}'
```

Resposta esperada: `401 Unauthorized`.

Corpo esperado:

```json
{
  "erro": "Email ou senha invalidos"
}
```

A API utiliza a mesma mensagem para e-mail inexistente e senha incorreta, evitando revelar se determinado e-mail está cadastrado.

#### 3. Configurar o token no terminal

Depois de fazer login, copie o token retornado e configure a variável no terminal:

```bash
TOKEN='<token_recebido_no_login>'
```

O valor acima é um exemplo. Utilize o token real retornado pela API.

#### 4. POST sem token

```bash
curl -i -X POST http://localhost:3000/api/projetos \
  -H "Content-Type: application/json" \
  -d '{"nome":"Projeto de teste","ano":2026}'
```

Resposta esperada: `401 Unauthorized`.

```json
{
  "erro": "Token ausente"
}
```

#### 5. POST com token

```bash
curl -i -X POST http://localhost:3000/api/projetos \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"nome":"Projeto de teste","ano":2026}'
```

Resposta esperada: `201 Created`, com o ID gerado pelo banco de dados.

#### 6. PUT com token

```bash
curl -i -X PUT http://localhost:3000/api/projetos/20 \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"nome":"Projeto com tranca (editado)","ano":2026}'
```

Resposta esperada, caso o projeto exista: `200 OK`.

```json
{
  "mensagem": "Projeto atualizado"
}
```

O ID `20` é um exemplo baseado nos testes realizados no banco. Confira se o projeto ainda existe antes de executar o comando.

#### 7. DELETE sem token

```bash
curl -i -X DELETE http://localhost:3000/api/projetos/20
```

Resposta esperada: `401 Unauthorized`, pois a autenticação é verificada antes de a exclusão ser executada.

#### 8. GET público sem token

```bash
curl -i http://localhost:3000/api/projetos
```

Resposta esperada: `200 OK`, com a lista de projetos publicados. A consulta pública não exige token.

### 📋 Operações da API

| Método | Rota | Autenticação | Resposta de sucesso |
|---|---|---|---|
| GET | `/api/projetos` | Pública | `200 OK` |
| GET | `/api/projetos/:id` | Pública | `200 OK` |
| GET | `/api/projetos/todos` | Token obrigatório | `200 OK` |
| POST | `/api/projetos` | Token obrigatório | `201 Created` |
| PUT | `/api/projetos/:id` | Token obrigatório | `200 OK` |
| DELETE | `/api/projetos/:id` | Token obrigatório | `204 No Content` |
| POST | `/api/login` | Pública | `200 OK` |
| GET | `/api/tecnologias` | Pública | `200 OK` |
| POST | `/api/tecnologias` | Token obrigatório | `201 Created` |
| PUT | `/api/tecnologias/:id` | Token obrigatório | `200 OK` |
| DELETE | `/api/tecnologias/:id` | Token obrigatório | `204 No Content` |

As rotas protegidas retornam `401 Unauthorized` quando o token está ausente, inválido ou expirado. As rotas de consulta pública permanecem acessíveis sem autenticação.

### 🔎 Projetos publicados e rascunhos

A rota pública `GET /api/projetos` retorna somente projetos com status `publicado`.

A rota protegida `GET /api/projetos/todos` permite consultar todos os projetos, inclusive os que estão em rascunho, mediante token JWT válido.

### ⏱️ Validade do token

O token JWT tem validade de **30 minutos**. Esse prazo reduz o período durante o qual um token comprometido poderia ser utilizado.

### 🔑 Sobre o segredo JWT

Nesta etapa, o segredo utilizado para assinar e verificar os tokens está definido em `server.js`. Essa abordagem é adequada apenas para o exercício e não é recomendada para produção, pois o segredo pode ser exposto no código-fonte.

Na Aula 29, o segredo será transferido para uma variável de ambiente, utilizando um arquivo `.env` que não deve ser enviado ao GitHub.

### ⚠️ O que esta API ainda não faz

- Não possui um sistema de recuperação ou redefinição de senha.
- Não possui renovação automática de tokens; após a expiração, é necessário realizar o login novamente.

## 📦 Tratamento de erros HTTP

A API utiliza códigos de status HTTP para informar o resultado das operações:

| Código | Significado |
|---|---|
| `200 OK` | Operação realizada com sucesso |
| `201 Created` | Recurso cadastrado |
| `204 No Content` | Recurso excluído com sucesso, sem corpo na resposta |
| `400 Bad Request` | Dados obrigatórios ausentes ou inválidos |
| `401 Unauthorized` | Token ausente, inválido ou expirado; ou credenciais inválidas |
| `404 Not Found` | Projeto ou tecnologia não encontrado |
| `500 Internal Server Error` | Erro interno ou falha no banco de dados |

O Express utiliza `express.json()` para interpretar o corpo das requisições enviadas em JSON.

## 🌐 Teste de CORS — Pré-voo OPTIONS

Comando utilizado:

```bash
curl -i -X OPTIONS http://localhost:3000/api/projetos/5 \
  -H "Origin: http://localhost:4200" \
  -H "Access-Control-Request-Method: DELETE"
```

O teste verifica se a API responde ao pré-voo CORS e informa os métodos HTTP permitidos.

## 🗄️ Teste com o banco de dados indisponível

Para testar o tratamento de erros, o MariaDB foi temporariamente desligado:

```bash
sudo service mariadb stop
```

Uma operação que depende do banco pode retornar `500 Internal Server Error`.

Depois, o banco foi reiniciado:

```bash
sudo service mariadb start
```

O teste verifica o tratamento da falha de conexão e a recuperação das operações após o banco ser reiniciado.

## 📚 Versionamento

O projeto é versionado com Git e hospedado no GitHub.

Repositório: [Nicolas29garcia/PortfolioAngular](https://github.com/Nicolas29garcia/PortfolioAngular)

As aulas são registradas por meio de commits no Git, identificando as alterações realizadas em cada etapa do desenvolvimento.

## 👨‍💻 Autor

Desenvolvido por **Nicolas Henrique Garcia**.

**Instituição:** IFPR — Campus Ponta Grossa  
**Curso:** Técnico em Informática Integrado ao Ensino Médio  
**Disciplina:** Desenvolvimento Web II (DWII)  
**Ano:** 2026

## 🤖 Uso de inteligência artificial

A inteligência artificial foi utilizada como apoio para revisar a documentação, compreender conceitos de autenticação, organizar os testes e auxiliar na identificação de possíveis melhorias. A implementação e os testes devem ser conferidos pelo autor.

## ⚛️ Portfólio em React — Aula 25

Nesta aula foi iniciado o desenvolvimento de uma nova versão do portfólio utilizando React e Vite, mantendo o projeto Angular existente no repositório.

O projeto React está localizado na pasta `portfolio-react/`, separado do projeto Angular e da API em Node.js.

### 📂 Estrutura do projeto React

```text
portfolio-react/
├── public/
├── src/
│   ├── App.jsx
│   ├── Cabecalho.jsx
│   ├── CardProjeto.jsx
│   ├── Rodape.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
├── package-lock.json
└── vite.config.js