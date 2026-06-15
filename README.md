# Portfólio Angular

Projeto desenvolvido para a disciplina de Desenvolvimento Web II.

## Sobre o projeto

Este projeto foi criado utilizando Angular e Angular Material para a construção de um portfólio pessoal.

O objetivo é apresentar meus projetos, atividades acadêmicas e minha evolução como desenvolvedor.

Além do front-end em Angular, o projeto conta com uma API em PHP conectada ao MariaDB, responsável por fornecer os dados dos projetos e tecnologias em formato JSON.

## Tecnologias utilizadas

* Angular
* Angular Material
* TypeScript
* HTML
* CSS
* PHP
* MariaDB
* Git e GitHub

## Ambiente utilizado

* Node.js v24.14.0
* npm 11.9.0
* Angular CLI 21.2.13

## API

A API foi desenvolvida em PHP e fornece dados em JSON para serem consumidos pelo Angular.

### Endpoints disponíveis

Todos os projetos publicados:

```text
/api/projetos.php
```

Projeto específico por ID:

```text
/api/projetos.php?id=1
```

Catálogo de tecnologias:

```text
/api/tecnologias.php
```

### Como executar a API

1. Importe o arquivo `sql/setup.sql` no MariaDB.
2. Configure as credenciais do banco no arquivo `conexao.php`.
3. Execute o servidor PHP:

```bash
/usr/bin/php -S 0.0.0.0:8000
```

## Funcionalidades

* Portfólio desenvolvido com Angular
* Navegação por rotas
* Angular Material
* API PHP com MariaDB
* Endpoints JSON
* Consulta de projeto por ID utilizando `prepare()`
* Tratamento de erros com HTTP 404 e HTTP 500
* CORS habilitado

## Desenvolvedor

Nicolas Henrique Garcia

IFPR - Campus Ponta Grossa

GitHub:
https://github.com/Nicolas29garcia
