# 💻 Portfólio Angular

Projeto desenvolvido para a disciplina de **Desenvolvimento Web II (DWII)** do **IFPR – Campus Ponta Grossa**.

## 📌 Sobre o Projeto

Portfólio pessoal desenvolvido com **Angular e Angular Material**, com integração a uma **API em PHP** e banco de dados **MariaDB**.

O projeto apresenta meus projetos, tecnologias utilizadas e uma página de contato capaz de enviar mensagens para o banco de dados.

## 🛠️ Tecnologias

- Angular
- Angular Material
- TypeScript
- HTML
- CSS
- PHP
- MariaDB
- Git e GitHub

## ⚙️ Ambiente

- Node.js v24.14.0
- npm 11.9.0
- Angular CLI 21.2.13
- PHP 8.3.6
- MariaDB

## ✨ Funcionalidades

- 🏠 Página Inicial
- 👤 Página Sobre
- 💼 Página Projetos
- 📚 Página Catálogo
- 📩 Página Contato
- 🧭 Navegação com Angular Router
- 📱 Menu responsivo com Angular Material
- 🔌 API REST em PHP
- 📦 Consumo de dados em JSON
- 🔎 Consulta de projetos por ID
- 🛠️ Consulta de tecnologias
- 🔗 Links para projetos no GitHub
- 🌐 CORS habilitado
- ⚠️ Tratamento de erros HTTP

### 📩 Formulário de Contato — Aula 18

O formulário de contato foi integrado à API utilizando **POST**.

- Reactive Forms com `FormGroup` e `Validators`
- Validação de nome, e-mail e mensagem
- Envio dos dados em JSON
- `HttpClient` e `Observable`
- Tratamento de sucesso e erro
- Botão com estado **"Enviando..."**
- Limpeza do formulário após o envio
- Mensagens de erro para o usuário
- Validação também no servidor
- Dados armazenados na tabela `contatos` do MariaDB
- API responde `201 Created` em caso de sucesso e `400 Bad Request` em caso de erro

## 🔌 API

### Projetos

```text
GET /api/projetos.php