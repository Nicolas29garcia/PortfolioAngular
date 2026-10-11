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

## 🚀 API em Node.js — Aula 21, Aula 22 e Aula 23

A API em Node.js foi desenvolvida com Express e integrada ao banco de dados MariaDB `dwii_db`.

Na Aula 21, foi criada a estrutura inicial da API. Na Aula 22, a consulta dos projetos foi integrada ao banco de dados. Na Aula 23, foram implementadas e testadas as operações de cadastro, atualização e exclusão de projetos.

### 📂 Localização

```text
api-node/
├── server.js
├── package.json
└── package-lock.json
```

### ⚙️ Como executar a API

Inicie o MariaDB:

```bash
sudo service mariadb start
```

Entre na pasta da API:

```bash
cd /workspaces/PortfolioAngular/api-node
```

Inicie o servidor:

```bash
node server.js
```

A API utiliza o endereço base:

```text
http://localhost:3000
```

**Importante:** mantenha o terminal do servidor aberto enquanto executa os testes em outro terminal.

### 📋 Operações disponíveis

| Método | Rota | Descrição | Resposta de sucesso |
|---|---|---|---|
| GET | `/api/projetos` | Lista projetos publicados | `200 OK` |
| GET | `/api/projetos/:id` | Consulta projeto por ID | `200 OK` |
| POST | `/api/projetos` | Cadastra um projeto | `201 Created` |
| PUT | `/api/projetos/:id` | Atualiza um projeto | `200 OK` |
| DELETE | `/api/projetos/:id` | Exclui um projeto | `204 No Content` |

### 1. GET — Listar projetos publicados

Comando:

```bash
curl -i http://localhost:3000/api/projetos
```

Resposta esperada quando a consulta é realizada:

```http
HTTP/1.1 200 OK
```

O corpo da resposta contém os projetos publicados em formato JSON.

### 2. GET — Consultar projeto por ID

Comando:

```bash
curl -i http://localhost:3000/api/projetos/5
```

Resposta esperada quando o projeto existe e está publicado:

```http
HTTP/1.1 200 OK
```

O corpo da resposta contém os dados do projeto em JSON.

Se o projeto não existir ou não estiver publicado, a API poderá responder `404 Not Found`.

### 3. POST — Cadastrar projeto

Comando:

```bash
curl -i -X POST http://localhost:3000/api/projetos \
  -H "Content-Type: application/json" \
  -d '{"nome":"Projeto de teste 2","ano":2026}'
```

Resposta de sucesso:

```http
HTTP/1.1 201 Created
```

Exemplo de corpo:

```json
{
  "id": 14
}
```

O ID retornado é gerado pelo banco de dados. O número acima é apenas ilustrativo: os IDs `13` e `14` utilizados nos testes anteriores foram excluídos.

#### Validação do nome

Comando:

```bash
curl -i -X POST http://localhost:3000/api/projetos \
  -H "Content-Type: application/json" \
  -d '{"ano":2026}'
```

Resposta:

```http
HTTP/1.1 400 Bad Request
```

Corpo:

```json
{
  "erro": "Informe pelo menos o nome do projeto"
}
```

Essa validação impede que a API cadastre um projeto sem nome.

### 4. PUT — Atualizar projeto

Comando de exemplo:

```bash
curl -i -X PUT http://localhost:3000/api/projetos/5 \
  -H "Content-Type: application/json" \
  -d '{"nome":"API de Clima Atualizada","ano":2026}'
```

Resposta quando a atualização é realizada:

```http
HTTP/1.1 200 OK
```

Corpo:

```json
{
  "mensagem": "Projeto atualizado"
}
```

**Teste com ID inexistente**

Comando executado:

```bash
curl -i -X PUT http://localhost:3000/api/projetos/999 \
  -H "Content-Type: application/json" \
  -d '{"nome":"Projeto de teste","ano":2026}'
```

Resposta recebida:

```http
HTTP/1.1 404 Not Found
```

Corpo:

```json
{
  "erro": "Projeto nao encontrado"
}
```

Esse teste confirma que a API retorna `404 Not Found` quando o projeto informado não existe.

### 5. DELETE — Excluir projeto

Comando de exemplo:

```bash
curl -i -X DELETE http://localhost:3000/api/projetos/14
```

Resposta na primeira exclusão de um projeto existente:

```http
HTTP/1.1 204 No Content
```

A resposta não possui corpo.

Ao executar novamente o comando com o mesmo ID, a API deve responder:

```http
HTTP/1.1 404 Not Found
```

Corpo:

```json
{
  "erro": "Projeto nao encontrado"
}
```

**Observação:** utilize um ID de teste existente para a primeira exclusão. Os IDs `13` e `14` usados anteriormente já foram excluídos durante os testes da Aula 23.

### 🌐 Teste de CORS — Pré-voo OPTIONS

Comando utilizado:

```bash
curl -i -X OPTIONS http://localhost:3000/api/projetos/5 \
  -H "Origin: http://localhost:4200" \
  -H "Access-Control-Request-Method: DELETE"
```

Resposta recebida:

```http
HTTP/1.1 204 No Content
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET,HEAD,PUT,PATCH,POST,DELETE
```

O teste confirma que a API responde ao pré-voo CORS e informa os métodos HTTP permitidos.

### 🗄️ Teste com o banco de dados indisponível

Para testar o tratamento de erros, o MariaDB foi temporariamente desligado:

```bash
sudo service mariadb stop
```

Uma operação de escrita retornou:

```http
HTTP/1.1 500 Internal Server Error
```

O corpo JSON apresentou um erro de conexão com o banco de dados.

Depois, o banco foi reiniciado:

```bash
sudo service mariadb start
```

Uma nova operação de cadastro respondeu `201 Created`, e o projeto de teste foi excluído com sucesso, retornando `204 No Content`.

Esse teste demonstrou que a API trata a falha de conexão e voltou a realizar operações após o banco ser reiniciado, sem precisar reiniciar o processo Node.js.

## 📦 Tratamento de erros HTTP

A API utiliza códigos de status HTTP para informar o resultado das operações:

| Código | Significado |
|---|---|
| `200 OK` | Operação realizada com sucesso |
| `201 Created` | Projeto cadastrado |
| `204 No Content` | Projeto excluído com sucesso |
| `400 Bad Request` | Dados obrigatórios ausentes ou inválidos |
| `404 Not Found` | Projeto ou rota não encontrado |
| `500 Internal Server Error` | Erro interno ou falha no banco de dados |

O Express utiliza `express.json()` para interpretar o corpo das requisições enviadas em JSON.

## 🔐 Próxima etapa — Aula 24

Na Aula 24, a API em Node.js será ampliada com autenticação e autorização, incluindo:

- Cadastro e armazenamento seguro de senhas com `bcrypt`
- Rota `POST /api/login`
- Geração de token JWT
- Middleware de autenticação
- Proteção das rotas POST, PUT e DELETE
- Resposta `401 Unauthorized` para requisições de escrita sem autorização
- Manutenção das rotas GET públicas

## 📚 Versionamento

O projeto é versionado com Git e hospedado no GitHub.

Repositório: [Nicolas29garcia/PortfolioAngular](https://github.com/Nicolas29garcia/PortfolioAngular)

A Aula 23 foi registrada em um commit que inclui as alterações do `server.js`, deste README e do serviço Angular.

## 👨‍💻 Autor

Desenvolvido por **Nicolas Henrique Garcia**.

**Instituição:** IFPR — Campus Ponta Grossa  
**Curso:** Técnico em Informática Integrado ao Ensino Médio  
**Disciplina:** Desenvolvimento Web II (DWII)  
**Ano:** 2026
