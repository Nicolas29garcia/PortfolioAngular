# Portfólio Angular

Projeto desenvolvido para a disciplina de Desenvolvimento Web II (DWII) do IFPR.

## Sobre o Projeto

Este projeto consiste em um portfólio pessoal desenvolvido com Angular e Angular Material.

O objetivo é apresentar meus projetos, habilidades, tecnologias utilizadas e minha evolução como desenvolvedor ao longo do curso.

Além do front-end, o projeto possui uma API em PHP conectada ao MariaDB para fornecer dados em formato JSON.

## Tecnologias Utilizadas

* Angular
* Angular Material
* TypeScript
* HTML
* CSS
* PHP
* MariaDB
* Git
* GitHub

## Ambiente Utilizado

* Node.js v24.14.0
* npm 11.9.0
* Angular CLI 21.2.13

## Funcionalidades

* Página Inicial
* Página Sobre
* Página Projetos
* Página Contato
* Navegação por rotas
* Menu responsivo com Angular Material
* API REST em PHP
* Consumo de dados em JSON
* Consulta de projetos publicados
* Consulta de projeto por ID utilizando prepare()
* Tratamento de erros com HTTP 404 e HTTP 500
* CORS habilitado

## API

### Listar todos os projetos

```text
/api/projetos.php
```

### Buscar projeto por ID

```text
/api/projetos.php?id=1
```

### Listar tecnologias

```text
/ api/tecnologias.php
```

## Como Executar a API

1. Importe o arquivo `sql/setup.sql` no MariaDB.
2. Configure as credenciais do banco em `conexao.php`.
3. Execute o servidor PHP:

```bash
/usr/bin/php -S 0.0.0.0:8000
```

4. Acesse os endpoints pelo navegador.

## Estrutura do Projeto

```text
portfolio-angular/
├── src/
├── api/
│   ├── projetos.php
│   └── tecnologias.php
├── sql/
│   └── setup.sql
├── conexao.php
└── README.md
```

## Desenvolvedor

Nicolas Henrique Garcia

IFPR – Campus Ponta Grossa

GitHub:
https://github.com/Nicolas29garcia
