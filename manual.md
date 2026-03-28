# Manual do Projeto

## 1. Finalidade

Este projeto é um objeto de aprendizagem simples sobre comandos Linux.

A ideia é manter tudo no nível mais básico possível:

- uma página HTML;
- um arquivo CSS;
- um arquivo JavaScript;
- um arquivo JSON com o conteúdo.

## 2. Estrutura

- `index.html`: página base.
- `styles.css`: aparência simples.
- `app.js`: lê o JSON e monta a página.
- `content/comandos-linux.json`: conteúdo do objeto de aprendizagem.
- `server.mjs`: servidor local simples para testes.
- `guia-node-vscode.md`: passo a passo para instalar Node e rodar localmente no VS Code.
- `guia-codificacao-passo-a-passo.md`: guia detalhado de como construir o projeto manualmente, do HTML ao JavaScript.

## 3. Formato do JSON

O JSON foi reduzido para este formato:

```text
title
description
sections[]
```

Cada item de `sections[]` pode ser:

- `text`
- `table`
- `quiz`

Campos:

- `text`: `title`, `text`
- `table`: `title`, `headers[]`, `rows[][]`
- `quiz`: `title`, `question`, `options[]`

Cada opção de `quiz` usa:

- `text`
- `correct`
- `feedback`

## 4. Regra de funcionamento

- a página carrega um único JSON em `content/comandos-linux.json`;
- o JavaScript percorre as seções e cria o HTML;
- nos quizzes, o clique mostra o feedback logo abaixo.

## 5. Execução

Como o conteúdo é carregado com `fetch`, o ideal é abrir por:

- GitHub Pages; ou
- servidor local simples.

Abrir `index.html` diretamente em `file://` pode bloquear a leitura do JSON.

Para testar localmente do jeito mais simples:

1. abra a pasta `trabalho` no VS Code;
2. abra o terminal integrado;
3. rode `node server.mjs`;
4. abra `http://127.0.0.1:3000`.

O guia detalhado está em `guia-node-vscode.md`.

## 6. Ordem humana de construção

Se a ideia for aprender a montar o projeto manualmente, a ordem recomendada é:

1. criar a pasta e os arquivos;
2. montar o esqueleto do `index.html`;
3. estilizar o básico em `styles.css`;
4. escrever o conteúdo em `content/comandos-linux.json`;
5. programar o carregamento e a interação em `app.js`;
6. testar com `node server.mjs`.

O passo a passo completo, com explicação de sintaxe, está em `guia-codificacao-passo-a-passo.md`.
