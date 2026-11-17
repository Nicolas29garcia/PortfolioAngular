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
└── setup.sql

sql/
└── usuarios.sql
```

### ⚙️ Como executar a API do zero

**1. Iniciar o MariaDB**

```bash
sudo service mariadb start
```

**2. Criar e preparar o banco de dados — apenas em instalação nova**

O `setup.sql` contém `DROP DATABASE`. **Não o execute sobre o banco atual do Codespace.** Para atualizar esta entrega, preserve o banco e os usuários existentes; instale as dependências e reinicie somente a API quando conveniente.

Na raiz do repositório:

```bash
sudo mariadb < portfolio-angular/sql/setup.sql
```

**3. Criar a tabela de usuários**

```bash
sudo mariadb dwii_db < sql/usuarios.sql
```

O arquivo `usuarios.sql` cria a tabela `usuarios`, que armazena o e-mail e o hash da senha.

**4. Instalar as dependências da API**

```bash
cd /workspaces/PortfolioAngular/api-node
npm install
```

**5. Criar o usuário administrador**

Nicolas deve executar no próprio Codespace, usando um e-mail seu. O endereço abaixo foi confirmado no histórico Git deste projeto; ele pode escolher outro e-mail próprio:

```bash
node criar-usuario.js 20241ctb0100076@estudantes.ifpr.edu.br
```

O script solicita e confirma a senha em um prompt oculto, gera `bcrypt.hash` e executa um `INSERT` parametrizado. Não passe a senha como argumento, não a envie no chat e não publique senha, hash ou token. E-mail já cadastrado é recusado sem apagar ou alterar usuários. A senha é definida exclusivamente por Nicolas.

**Pendente no Codespace:** não tive acesso ao banco existente para confirmar ou criar o dono. A conta temporária dos testes abaixo não é o dono e foi removida. Não use `dono@portfolio.dev` como identidade do projeto e não apague usuários antigos para corrigir essa configuração.

**6. Iniciar o servidor**

```bash
node server.js
```

A API utiliza o endereço base:

```text
http://localhost:3000
```

Mantenha o terminal do servidor aberto enquanto executa os testes em outro terminal.

### 🔐 Login e autenticação — Aula 24 / correção da Entrega A

O login consulta o usuário com SQL parametrizado, usa `bcrypt.compare` e emite um JWT de **30 minutos**. O middleware `autenticar` é compartilhado pelas seis escritas de projetos e tecnologias. As mensagens 401 foram aprovadas por Nicolas nesta revisão:

- Login: “Não foi possível entrar: confira seu e-mail e sua senha.”
- Sem token: “Entre na sua conta para alterar o portfólio.”
- Token inválido ou expirado: “Sua sessão não é válida. Entre novamente.”

Senha incorreta e e-mail inexistente recebem a mesma mensagem para não revelar quais e-mails estão cadastrados.

#### Ambiente e alcance das evidências reais — 17/11/2026

As respostas abaixo foram obtidas com `curl` executando o `server.js` desta correção contra **MariaDB 10.11.19-MariaDB-ubu2204 real**, em um contêiner Docker isolado no ambiente Cloud. Não foram usados mocks nem respostas copiadas do manual. O banco existente do Codespace, seus usuários e seus projetos não foram acessados para escrita.

A API de teste usou a porta **3101** e um pool `mysql2` apontado para `entrega_a_teste` por um inicializador de teste externo ao repositório. O `db.js` de produção foi preservado. Foram criadas somente tabelas novas com o esquema do projeto e registros marcados `[TESTE ENTREGA A 20261117]`. A conta `teste.entrega-a@exemplo.invalid` é exclusiva dos testes, com senha aleatória temporária, e foi removida. Senhas e tokens estão ocultos nas transcrições.

```bash
API=http://127.0.0.1:3101
```

Os sete casos numerados são os sete pedidos de autenticação exigidos no PDF. IDs são os que o banco isolado realmente gerou; não os reutilize para editar registros do Codespace. O JWT retornado teve `exp - iat = 1800` segundos. Os testes adicionais verificam a exclusão autenticada, os erros, o catálogo e as seis rejeições de escrita sem token.

##### 1. Login correto com conta temporária isolada

```bash
curl -i -X POST "$API/api/login" \
  -H "Content-Type: application/json" \
  -d '{"email":"teste.entrega-a@exemplo.invalid","senha":"<senha>"}'
```

Recebido:

```http
HTTP/1.1 200 OK
{"token":"<token ocultado>"}
```

##### 2. Login com senha incorreta

```bash
curl -i -X POST "$API/api/login" \
  -H "Content-Type: application/json" \
  -d '{"email":"teste.entrega-a@exemplo.invalid","senha":"<senha>"}'
```

Recebido:

```http
HTTP/1.1 401 Unauthorized
{"erro":"Não foi possível entrar: confira seu e-mail e sua senha."}
```

##### Login com e-mail inexistente: mesma resposta

```bash
curl -i -X POST "$API/api/login" \
  -H "Content-Type: application/json" \
  -d '{"email":"inexistente@exemplo.invalid","senha":"<senha>"}'
```

Recebido:

```http
HTTP/1.1 401 Unauthorized
{"erro":"Não foi possível entrar: confira seu e-mail e sua senha."}
```

##### Login sem campos obrigatórios

```bash
curl -i -X POST "$API/api/login" \
  -H "Content-Type: application/json" \
  -d '{}'
```

Recebido:

```http
HTTP/1.1 400 Bad Request
{"erro":"Informe email e senha"}
```

##### 3. POST de projeto sem token

```bash
curl -i -X POST "$API/api/projetos" \
  -H "Content-Type: application/json" \
  -d '{"nome":"[TESTE ENTREGA A 20261117]"}'
```

Recebido:

```http
HTTP/1.1 401 Unauthorized
{"erro":"Entre na sua conta para alterar o portfólio."}
```

##### 4. POST de projeto com token

```bash
curl -i -X POST "$API/api/projetos" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"nome":"[TESTE ENTREGA A 20261117]","descricao":"Registro temporário de verificação","tecnologias":"Node.js","ano":2026}'
```

Recebido:

```http
HTTP/1.1 201 Created
{"id":1}
```

##### 5. PUT de projeto com token

```bash
curl -i -X PUT "$API/api/projetos/1" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"nome":"[TESTE ENTREGA A 20261117] editado","ano":2026}'
```

Recebido:

```http
HTTP/1.1 200 OK
{"mensagem":"Projeto atualizado"}
```

##### 6. DELETE de projeto sem token

```bash
curl -i -X DELETE "$API/api/projetos/1"
```

Recebido:

```http
HTTP/1.1 401 Unauthorized
{"erro":"Entre na sua conta para alterar o portfólio."}
```

##### 7. GET público de projetos sem token

```bash
curl -i -X GET "$API/api/projetos"
```

Recebido:

```http
HTTP/1.1 200 OK
[{"id":1,"nome":"[TESTE ENTREGA A 20261117] editado","descricao":"","tecnologias":"","link_github":"","ano":2026}]
```

##### GET público de projeto pelo id

```bash
curl -i -X GET "$API/api/projetos/1"
```

Recebido:

```http
HTTP/1.1 200 OK
{"id":1,"nome":"[TESTE ENTREGA A 20261117] editado","descricao":"","tecnologias":"","link_github":"","ano":2026}
```

##### PUT de projeto sem token

```bash
curl -i -X PUT "$API/api/projetos/1" \
  -H "Content-Type: application/json" \
  -d '{"nome":"[TESTE ENTREGA A 20261117]"}'
```

Recebido:

```http
HTTP/1.1 401 Unauthorized
{"erro":"Entre na sua conta para alterar o portfólio."}
```

##### POST de projeto sem nome

```bash
curl -i -X POST "$API/api/projetos" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{}'
```

Recebido:

```http
HTTP/1.1 400 Bad Request
{"erro":"Informe pelo menos o nome do projeto"}
```

##### PUT de projeto sem nome

```bash
curl -i -X PUT "$API/api/projetos/1" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{}'
```

Recebido:

```http
HTTP/1.1 400 Bad Request
{"erro":"Informe pelo menos o nome do projeto"}
```

##### DELETE de projeto com token

```bash
curl -i -X DELETE "$API/api/projetos/1" \
  -H "Authorization: Bearer $TOKEN"
```

Recebido:

```http
HTTP/1.1 204 No Content

```

Sem corpo na resposta `204 No Content`.

##### GET de projeto inexistente

```bash
curl -i -X GET "$API/api/projetos/1"
```

Recebido:

```http
HTTP/1.1 404 Not Found
{"erro":"Projeto nao encontrado"}
```

##### PUT de projeto inexistente

```bash
curl -i -X PUT "$API/api/projetos/1" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"nome":"[TESTE ENTREGA A 20261117]"}'
```

Recebido:

```http
HTTP/1.1 404 Not Found
{"erro":"Projeto nao encontrado"}
```

##### DELETE de projeto inexistente

```bash
curl -i -X DELETE "$API/api/projetos/1" \
  -H "Authorization: Bearer $TOKEN"
```

Recebido:

```http
HTTP/1.1 404 Not Found
{"erro":"Projeto nao encontrado"}
```

##### POST de tecnologia sem token

```bash
curl -i -X POST "$API/api/tecnologias" \
  -H "Content-Type: application/json" \
  -d '{"nome":"[TESTE ENTREGA A 20261117]"}'
```

Recebido:

```http
HTTP/1.1 401 Unauthorized
{"erro":"Entre na sua conta para alterar o portfólio."}
```

##### PUT de tecnologia sem token

```bash
curl -i -X PUT "$API/api/tecnologias/1" \
  -H "Content-Type: application/json" \
  -d '{"nome":"[TESTE ENTREGA A 20261117]"}'
```

Recebido:

```http
HTTP/1.1 401 Unauthorized
{"erro":"Entre na sua conta para alterar o portfólio."}
```

##### DELETE de tecnologia sem token

```bash
curl -i -X DELETE "$API/api/tecnologias/1"
```

Recebido:

```http
HTTP/1.1 401 Unauthorized
{"erro":"Entre na sua conta para alterar o portfólio."}
```

##### POST de tecnologia com token

```bash
curl -i -X POST "$API/api/tecnologias" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"nome":"[TESTE ENTREGA A 20261117]","categoria":"Testes","descricao":"Registro temporário","ano_criacao":2026}'
```

Recebido:

```http
HTTP/1.1 201 Created
{"id":1}
```

##### PUT de tecnologia com token

```bash
curl -i -X PUT "$API/api/tecnologias/1" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"nome":"[TESTE ENTREGA A 20261117] '"'"' parametrizado","categoria":"Testes","ano_criacao":2026}'
```

Recebido:

```http
HTTP/1.1 200 OK
{"mensagem":"Tecnologia atualizada"}
```

##### GET público do catálogo sem token

```bash
curl -i -X GET "$API/api/tecnologias"
```

Recebido:

```http
HTTP/1.1 200 OK
[{"id":1,"nome":"[TESTE ENTREGA A 20261117] ' parametrizado","categoria":"Testes","descricao":"","ano_criacao":2026}]
```

##### POST de tecnologia sem nome

```bash
curl -i -X POST "$API/api/tecnologias" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{}'
```

Recebido:

```http
HTTP/1.1 400 Bad Request
{"erro":"Informe o nome da tecnologia com até 100 caracteres"}
```

##### POST de tecnologia nome vazio

```bash
curl -i -X POST "$API/api/tecnologias" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"nome":" "}'
```

Recebido:

```http
HTTP/1.1 400 Bad Request
{"erro":"Informe o nome da tecnologia com até 100 caracteres"}
```

##### POST de tecnologia ano inválido

```bash
curl -i -X POST "$API/api/tecnologias" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"nome":"[TESTE ENTREGA A 20261117]","ano_criacao":"2026"}'
```

Recebido:

```http
HTTP/1.1 400 Bad Request
{"erro":"Confira categoria, descrição e ano de criação da tecnologia"}
```

##### POST de tecnologia categoria inválida

```bash
curl -i -X POST "$API/api/tecnologias" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"nome":"[TESTE ENTREGA A 20261117]","categoria":123}'
```

Recebido:

```http
HTTP/1.1 400 Bad Request
{"erro":"Confira categoria, descrição e ano de criação da tecnologia"}
```

##### PUT de tecnologia sem nome

```bash
curl -i -X PUT "$API/api/tecnologias/1" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{}'
```

Recebido:

```http
HTTP/1.1 400 Bad Request
{"erro":"Informe o nome da tecnologia com até 100 caracteres"}
```

##### PUT de tecnologia com id inválido

```bash
curl -i -X PUT "$API/api/tecnologias/abc" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"nome":"[TESTE ENTREGA A 20261117]"}'
```

Recebido:

```http
HTTP/1.1 400 Bad Request
{"erro":"Informe um id de tecnologia inteiro e positivo"}
```

##### DELETE de tecnologia com id inválido

```bash
curl -i -X DELETE "$API/api/tecnologias/0" \
  -H "Authorization: Bearer $TOKEN"
```

Recebido:

```http
HTTP/1.1 400 Bad Request
{"erro":"Informe um id de tecnologia inteiro e positivo"}
```

##### DELETE de tecnologia com token

```bash
curl -i -X DELETE "$API/api/tecnologias/1" \
  -H "Authorization: Bearer $TOKEN"
```

Recebido:

```http
HTTP/1.1 204 No Content

```

Sem corpo na resposta `204 No Content`.

##### PUT de tecnologia inexistente

```bash
curl -i -X PUT "$API/api/tecnologias/1" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"nome":"[TESTE ENTREGA A 20261117]"}'
```

Recebido:

```http
HTTP/1.1 404 Not Found
{"erro":"Tecnologia nao encontrada"}
```

##### DELETE de tecnologia inexistente

```bash
curl -i -X DELETE "$API/api/tecnologias/1" \
  -H "Authorization: Bearer $TOKEN"
```

Recebido:

```http
HTTP/1.1 404 Not Found
{"erro":"Tecnologia nao encontrada"}
```

##### Token inválido

```bash
curl -i -X POST "$API/api/projetos" \
  -H "Authorization: Bearer $TOKEN_INVALIDO" \
  -H "Content-Type: application/json" \
  -d '{"nome":"[TESTE ENTREGA A 20261117]"}'
```

Recebido:

```http
HTTP/1.1 401 Unauthorized
{"erro":"Sua sessão não é válida. Entre novamente."}
```

##### Token expirado

```bash
curl -i -X POST "$API/api/tecnologias" \
  -H "Authorization: Bearer $TOKEN_EXPIRADO" \
  -H "Content-Type: application/json" \
  -d '{"nome":"[TESTE ENTREGA A 20261117]"}'
```

Recebido:

```http
HTTP/1.1 401 Unauthorized
{"erro":"Sua sessão não é válida. Entre novamente."}
```

#### Falhas reais do banco isolado

Uma segunda instância desta mesma API na porta 3102 foi conectada a um banco inexistente da instância MariaDB de teste. O servidor MariaDB gerou o erro real de conexão, convertido em JSON pelos `catch`. Nenhum serviço compartilhado foi interrompido. Estes comandos exigem essa configuração isolada; não altere a conexão do Codespace para reproduzi-los.

```bash
API_FALHA=http://127.0.0.1:3102
```

##### Falha real de conexão ao banco isolado: GET /api/projetos

```bash
curl -i -X GET "$API_FALHA/api/projetos"
```

Recebido:

```http
HTTP/1.1 500 Internal Server Error
{"erro":"Falha no servidor: Unknown database 'entrega_a_inexistente'"}
```

##### Falha real de conexão ao banco isolado: GET /api/tecnologias

```bash
curl -i -X GET "$API_FALHA/api/tecnologias"
```

Recebido:

```http
HTTP/1.1 500 Internal Server Error
{"erro":"Falha no servidor: Unknown database 'entrega_a_inexistente'"}
```

##### Falha real de conexão ao banco isolado: POST /api/tecnologias

```bash
curl -i -X POST "$API_FALHA/api/tecnologias" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"nome":"[TESTE ENTREGA A 20261117]"}'
```

Recebido:

```http
HTTP/1.1 500 Internal Server Error
{"erro":"Falha no servidor: Unknown database 'entrega_a_inexistente'"}
```

##### Falha real de conexão ao banco isolado: PUT /api/tecnologias/1

```bash
curl -i -X PUT "$API_FALHA/api/tecnologias/1" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"nome":"[TESTE ENTREGA A 20261117]"}'
```

Recebido:

```http
HTTP/1.1 500 Internal Server Error
{"erro":"Falha no servidor: Unknown database 'entrega_a_inexistente'"}
```

##### Falha real de conexão ao banco isolado: DELETE /api/tecnologias/1

```bash
curl -i -X DELETE "$API_FALHA/api/tecnologias/1" \
  -H "Authorization: Bearer $TOKEN"
```

Recebido:

```http
HTTP/1.1 500 Internal Server Error
{"erro":"Falha no servidor: Unknown database 'entrega_a_inexistente'"}
```

#### Limpeza, script do dono e limites da verificação

Depois das requisições, a contagem de `projetos`, `tecnologias` e `usuarios` no banco isolado voltou a zero. Também foi testado o `criar-usuario.js` em pseudoterminal: senha oculta, criação com hash, rejeição de e-mail duplicado sem alteração e rejeição de confirmação divergente. O usuário temporário desse teste foi removido pelo e-mail reservado e ID criado. Nenhum `setup.sql` foi executado sobre banco existente.

Passaram `node --check api-node/server.js` e `node --check api-node/criar-usuario.js`. O pacote da API não oferece lint nem suíte npm configurados; seu `npm test` é apenas o placeholder original e não foi apresentado como teste aprovado.

Não foi validado o login do dono no banco do Codespace: Nicolas precisa criá-lo ou confirmar que seu e-mail próprio já existe e repetir os sete casos. Os resultados isolados acima não comprovam essa configuração pessoal.

#### Repetir no Codespace com a conta de Nicolas

Após revisar `git status --short --branch`, `git diff` e `git diff --cached`, guarde alterações pendentes antes de integrar `origin/main`. Não substitua arquivos locais sem comparar. Se estiver em `main` com árvore limpa, use `git pull --ff-only origin main`.

Terminal da API (não inicie outra cópia se a porta 3000 já estiver ocupada):

```bash
cd /workspaces/PortfolioAngular
sudo service mariadb start
cd api-node
npm ci
node server.js
```

Depois de atualizar o `server.js`, reinicie apenas o processo da API no terminal dele; não pare MariaDB nem outros serviços para simular erros. O React pode continuar rodando.

Para repetir os comandos acima, use `API=http://localhost:3000`. Faça o login com o e-mail próprio e a senha digitada somente no terminal. Para não salvar a senha no histórico, pode usar:

```bash
API=http://localhost:3000
read -r -p 'Seu e-mail: ' EMAIL_NICOLAS
read -r -s -p 'Sua senha: ' SENHA_NICOLAS
printf '\n'
LOGIN_NICOLAS=$(printf '%s\n%s' "$EMAIL_NICOLAS" "$SENHA_NICOLAS" | node -e '
let entrada = "";
process.stdin.on("data", parte => entrada += parte);
process.stdin.on("end", () => {
  const quebra = entrada.indexOf("\n");
  process.stdout.write(JSON.stringify({email: entrada.slice(0, quebra), senha: entrada.slice(quebra + 1)}));
});')
unset SENHA_NICOLAS
printf '%s' "$LOGIN_NICOLAS" | curl -i -sS -X POST "$API/api/login" \
  -H 'Content-Type: application/json' --data-binary @-
unset LOGIN_NICOLAS
read -r -s -p 'Cole o token recebido (não será exibido): ' TOKEN
printf '\n'
```

**Pendente:** o pedido acima não foi executado com a conta pessoal do dono; portanto ainda não há resposta real dele para transcrever. O token fica em variável local; nunca o publique. Refaça os sete pedidos numerados usando IDs criados por você. Na transcrição para o README, substitua senha por `<senha>` e token por `<token ocultado>`. Não reutilize os IDs 1 das evidências para alterar registros existentes. Guarde as respostas novas antes de considerar o dono e a execução no Codespace verificados.

### 📋 Operações da API

| Método | Rota | Autenticação | Resposta de sucesso |
|---|---|---|---|
| GET | `/api/projetos` | Pública | `200 OK` |
| GET | `/api/projetos/:id` | Pública | `200 OK` |
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

A rota `/api/projetos/todos` não está implementada nesta correção. Ela pertence ao nível A da entrega; esta revisão trata os requisitos de B. A documentação anterior afirmava sua existência incorretamente.

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

## 🌐 CORS e falhas de banco

A API mantém `cors()` antes das rotas. Não interrompa MariaDB compartilhado para testar erros; as respostas 500 desta revisão foram obtidas na conexão isolada descrita nas evidências da Entrega A. Os comandos de falha antigos, sem transcrições verificáveis, foram substituídos por essas evidências reais.

## Autoavaliação da Entrega A — para revisão de Nicolas

**B pretendido, condicionado à configuração e conferência do dono no Codespace.** As escritas de catálogo e a tranca estão em `api-node/server.js`; a validade de 30 minutos e as mensagens 401 estão no mesmo arquivo e nas seções de autenticação/validade deste README; os sete pedidos e os testes adicionais estão em “Login e autenticação — Aula 24 / correção da Entrega A”. O hash e o prompt oculto estão em `api-node/criar-usuario.js`; os dois limites reais estão em “O que esta API ainda não faz”. Não declaro B plenamente comprovado enquanto faltar conferir o dono com e-mail próprio no banco existente. Não foi implementado o nível A nem reescrito o histórico.

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
```

### Aula 26: estado, lista e formulario

Na Aula 26, os projetos saíram do `App.jsx` para `src/projetos.js`, desenhados com `map` e `key` pelo `id`. Na Aula 27, essa lista fixa foi removida e substituída pela API.

O formulario de contato (`src/Contato.jsx`) guarda o que a pessoa digita no estado, com `useState`.
Ele ainda nao envia nada: avisa e limpa os campos. O envio de verdade chega com a API.

### Aula 27: efeito e dado remoto

O React busca `GET /api/projetos` no `App.jsx` e `GET /api/tecnologias` no `Catalogo.jsx`. Cada lista começa em `[]` e tem seus próprios estados de carregamento e erro. As funções de busca são chamadas pelo `useEffect` com dependências `[]`, verificam `resposta.ok` antes de `resposta.json()` e encerram a espera no `finally`, tanto no sucesso quanto na falha.

Os cards reutilizáveis continuam recebendo props e sendo renderizados com `map` e `key={p.id}`. O catálogo usa uma lista com `key` pelo `id`. Há botões para atualizar cada lista e mensagens de lista vazia, exibidas somente depois da espera e sem erro. O arquivo `portfolio-react/src/projetos.js` foi removido; uma falha não é substituída por dados fixos.

O formulário da Aula 26 mantém nome, e-mail e mensagem controlados, saudação, contador, aviso e limpeza após a simulação. Nenhuma mensagem é enviada. Rotas React, login e operações de escrita da Aula 28 não foram adicionados.

#### Endereço da API

O endereço fica centralizado em `portfolio-react/src/api.js`, sem barra final: `https://refactored-capybara-wr64g4qp54xph54g5-3000.app.github.dev`. Após o dono confirmar por captura a porta 3000 pública e o servidor em execução, as duas consultas responderam HTTP 200 em 17/11/2026: 11 projetos e 6 tecnologias. O endereço vazio que causava o erro de configuração foi corrigido. Nenhum registro ou banco foi alterado.

No Codespace deste repositório, inicie a API e abra o painel **PORTS**. Na linha **3000**, escolha **Port Visibility → Public**, copie o **Forwarded Address** e cole esse endereço real em `src/api.js`. A porta 5173 abre o React; não confunda os dois endereços.

#### Iniciar os programas no Codespace existente

Primeiro confira alterações locais; não substitua arquivos pendentes. Não execute novamente `setup.sql` ou scripts de criação de usuário em um banco existente. Os comandos de preparação do zero documentados nas aulas anteriores não são necessários para a Aula 27.

Terminal da API:

```bash
cd /workspaces/PortfolioAngular
sudo service mariadb start
cd api-node
npm ci
node server.js
```

Terminal do React:

```bash
cd /workspaces/PortfolioAngular/portfolio-react
npm ci
npm run dev -- --host 0.0.0.0
```

Se a API já estiver rodando, reutilize o serviço. Em outro terminal, confira as consultas públicas sem alterar registros:

Use os comandos de GET público de projetos e catálogo com as respostas registradas na seção “Login e autenticação — Aula 24 / correção da Entrega A”, ajustando `API=http://localhost:3000` no Codespace.

Validação do React:

```bash
cd /workspaces/PortfolioAngular/portfolio-react
npm run build
npm run lint
```

#### Atualizar o Codespace sem perder alterações

Na raiz, inspecione a branch e o conteúdo local antes de atualizar:

```bash
cd /workspaces/PortfolioAngular
git status --short --branch
git diff
git diff --cached
git log -3 --oneline
git fetch origin
git diff HEAD..origin/main -- README.md portfolio-react
```

Se estiver em `main` e a árvore estiver limpa, execute `git pull --ff-only origin main`. Se houver alterações pendentes, guarde-as primeiro:

```bash
git stash push -u -m "Alterações locais antes da Aula 27"
git stash list
git pull --ff-only origin main
git stash apply 'stash@{0}'
git status --short
```

Use o stash recém-criado; não aplique um stash antigo se o comando não tiver criado nenhum. `apply` conserva a cópia guardada. Se houver conflitos, resolva preservando as duas versões antes de continuar. Se houver commits locais divergentes ou outra branch ativa, examine o histórico antes de integrar; não use reset destrutivo ou force push. Esta execução trabalhou em clone separado de `main`, a partir de `917dc2b`; o conteúdo pendente do Codespace não estava acessível e não foi sobrescrito.

#### Verificações desta implementação

- `npm ci`, `npm run build` e `npm run lint` executados no ambiente Cloud. A regra `react/set-state-in-effect` possui exceção documentada apenas nas duas chamadas de busca assíncrona do padrão exigido pela aula; as demais verificações permanecem ativas.
- Navegador Chromium com Playwright: configuração ausente, sucesso, espera controlada, HTTP 404/500 (inclusive corpo HTML), falha de conexão, resposta com formato inválido, lista vazia, recuperação pelo botão, independência das consultas, formulário e navegação.
- Esses cenários de rede foram **simulados por interceptação de requisições somente no navegador**. Os projetos de teste vieram do histórico deste próprio repositório. Nenhum serviço compartilhado foi interrompido e nenhum registro foi alterado.
- Sem rolagem horizontal nos testes de 1440, 1024, 768, 390 e 320 px. Conferidos foco visível, atalho para conteúdo, movimento reduzido e ausência de exceções JavaScript nos cenários de interface.
- **Consultas reais após a correção:** `GET /api/projetos` e `GET /api/tecnologias` responderam HTTP 200, com 11 projetos e 6 tecnologias. A resposta dos projetos incluiu `Access-Control-Allow-Origin: *`. As verificações de falha descritas acima continuam sendo simuladas, sem interrupção dos serviços.
- A tentativa de teste direto no Chromium do ambiente Cloud encontrou `net::ERR_CERT_AUTHORITY_INVALID` ao acessar a API. O terminal recebeu os dados reais com TLS verificado, mas o teste visual com a API real não foi concluído nesse navegador. Não foi desabilitada a validação de certificados. As capturas abaixo continuam sendo anteriores à correção ou simuladas.

#### Redesign da Aula 27 — commit separado

O CSS do React foi reescrito com variáveis para fundo `#080D18`, superfícies `#111B2E`, texto `#EAF0FA` e destaque `#45D6E8`. O nome, a formação e a descrição de Nicolas foram preservados. A apresentação ganhou duas ações e uma composição geométrica com as iniciais NG e tecnologias presentes no repositório. Os projetos usam etiquetas de tecnologias, o catálogo tem uma lista compacta própria e o contato fica em duas colunas no desktop.

Foram mantidos foco de teclado visível, atalho para conteúdo, mensagens textuais de estado e respeito a `prefers-reduced-motion`. Links de projetos só são criados para endereços HTTP/HTTPS válidos, excluindo os destinos de exemplo `github.com/usuario/`; os dados recebidos não são alterados. As cores de erro e confirmação são acompanhadas por texto e indicadores.

Após o redesign, build e lint passaram e os cenários de interface foram repetidos no Chromium com Playwright. O formulário também foi exercitado no Chrome compartilhado. Em 320 px foram conferidos formulário, navegação, textos longos e links inválidos. Não houve rolagem horizontal, exceções JavaScript, avisos de `key` ou requisições de escrita nos testes.

Capturas de página inteira em `docs/aula-27/`:

| Situação | Desktop (1440 px) | Celular (390 px) | Celular (320 px) |
|---|---|---|---|
| Registro anterior à correção, endereço pendente | [Desktop](docs/aula-27/desktop-api-pendente.png) | [390 px](docs/aula-27/celular-390-api-pendente.png) | [320 px](docs/aula-27/celular-320-api-pendente.png) |
| Prévia **simulada**, com respostas interceptadas | [Desktop simulado](docs/aula-27/desktop-simulado.png) | [390 px simulado](docs/aula-27/celular-390-simulado.png) | [320 px simulado](docs/aula-27/celular-320-simulado.png) |

As prévias simuladas usam os projetos do antigo `projetos.js` deste próprio repositório e tecnologias lidas do seu arquivo SQL, sem executar esse SQL. São evidências do layout, **não** dos registros atuais do banco. Esses dados não estão no aplicativo nem são usados como fallback.

## 🤖 Uso de inteligência artificial

IA utilizada na Aula 27 e no redesign, e para corrigir a API da Entrega A, organizar evidências e executar testes com MariaDB isolado. Nicolas deve revisar o código e concluir a configuração do dono no Codespace.
