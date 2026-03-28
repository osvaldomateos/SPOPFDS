# Guia de Codificação Passo a Passo

## 1. Objetivo deste guia

Este guia ensina a montar este projeto manualmente, de forma humana e em ordem lógica.

A sequência foi pensada assim:

1. primeiro montar a estrutura dos arquivos;
2. depois criar o HTML;
3. depois aplicar o CSS;
4. depois escrever o conteúdo em JSON;
5. por fim, ligar tudo com JavaScript.

Essa ordem é importante porque ela reduz a confusão:

- o HTML define a estrutura;
- o CSS muda a aparência;
- o JSON guarda o conteúdo;
- o JavaScript faz a página ler o conteúdo e reagir aos cliques.

## 2. Visão geral dos arquivos

Neste projeto, usamos só estes arquivos:

- `index.html`
- `styles.css`
- `app.js`
- `content/comandos-linux.json`
- `server.mjs`

O papel de cada um:

- `index.html`: cria a página;
- `styles.css`: deixa a página legível e organizada;
- `app.js`: lê o JSON e monta as seções na tela;
- `content/comandos-linux.json`: guarda o conteúdo do objeto de aprendizagem;
- `server.mjs`: permite abrir o projeto localmente com Node.

## 3. Passo 1: criar a pasta e os arquivos

Primeiro, crie a pasta do projeto:

```text
trabalho
```

Dentro dela, crie:

```text
trabalho/
  index.html
  styles.css
  app.js
  server.mjs
  content/
    comandos-linux.json
```

Essa etapa é importante porque deixa claro, desde o começo, onde cada responsabilidade mora.

## 4. Passo 2: montar o esqueleto do HTML

### 4.1 Ideia do HTML

O HTML é a estrutura da página.

Ele não decide cor, tamanho, borda ou comportamento. Ele só diz:

- isto é um título;
- isto é um parágrafo;
- aqui ficará o conteúdo principal;
- aqui o JavaScript vai escrever a página.

### 4.2 Código do `index.html`

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Missão Terminal Linux</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="page">
    <header class="page-header">
      <p class="eyebrow">Atividade 2</p>
      <h1>Missão Terminal Linux</h1>
      <p class="page-intro">
        Objeto de aprendizagem simples sobre comandos Linux, feito em HTML, CSS e JavaScript puros.
      </p>
    </header>

    <main id="app">
      <section class="card">
        <h2>Carregando...</h2>
        <p>O conteúdo do curso está sendo lido do arquivo JSON.</p>
      </section>
    </main>
  </div>

  <script src="app.js"></script>
</body>
</html>
```

### 4.3 Explicação linha por linha

#### `<!DOCTYPE html>`

Diz ao navegador que o documento usa HTML5.

Sem isso, o navegador pode entrar em um modo antigo de renderização.

#### `<html lang="pt-BR">`

Abre o documento HTML.

- `html`: é a raiz da página;
- `lang="pt-BR"`: informa que o idioma principal é português brasileiro.

Isso ajuda leitores de tela, mecanismos de busca e o próprio navegador.

#### `<head>`

O `head` guarda metadados da página, ou seja, informações sobre a página.

Não é a parte visível principal do conteúdo.

#### `<meta charset="UTF-8">`

Define a codificação de caracteres.

Com isso, acentos como `ção`, `á`, `ê` e `ç` funcionam corretamente.

#### `<meta name="viewport" content="width=device-width, initial-scale=1.0">`

Ajuda a página a se adaptar ao celular.

Sem isso, o navegador mobile pode mostrar tudo muito pequeno.

#### `<title>Missão Terminal Linux</title>`

Define o texto que aparece:

- na aba do navegador;
- nos favoritos;
- em parte do histórico.

#### `<link rel="stylesheet" href="styles.css">`

Conecta o HTML ao CSS.

- `link`: cria uma ligação com outro arquivo;
- `rel="stylesheet"`: diz que esse outro arquivo é uma folha de estilo;
- `href="styles.css"`: informa o caminho do arquivo CSS.

#### `<body>`

O `body` contém o que o usuário vê na tela.

Tudo que é conteúdo principal fica dentro dele.

#### `<div class="page">`

`div` é um contêiner genérico.

Ele não tem significado semântico forte; serve para organizar blocos da página.

A classe `page` será usada no CSS para controlar largura e espaçamento.

#### `<header class="page-header">`

`header` é uma área de cabeçalho.

Aqui usamos para agrupar:

- um rótulo pequeno;
- o título da página;
- a frase de apresentação.

#### `<p class="eyebrow">`

`p` significa parágrafo.

Neste caso, usamos para um pequeno texto acima do título.

#### `<h1>`

`h1` é o título principal da página.

Em geral, a página deve ter um `h1` principal.

#### `<p class="page-intro">`

Mais um parágrafo, agora com a descrição curta da proposta.

#### `<main id="app">`

`main` é a área principal do conteúdo.

O atributo `id="app"` é muito importante:

- `id` identifica um elemento único na página;
- o JavaScript vai procurar exatamente esse elemento para inserir o conteúdo.

#### `<section class="card">`

`section` representa uma seção de conteúdo.

Aqui ela aparece primeiro só como um estado inicial:

- “Carregando...”

Depois o JavaScript substitui isso pelo conteúdo real.

#### `<script src="app.js"></script>`

Conecta a página ao JavaScript.

- `script`: insere código JavaScript;
- `src="app.js"`: manda carregar o arquivo `app.js`.

Ele foi colocado no final do `body` para que o HTML já exista quando o JavaScript rodar.

## 5. Passo 3: estilizar com CSS

### 5.1 Ideia do CSS

O CSS muda a aparência da estrutura já criada no HTML.

Ele responde perguntas como:

- qual será a cor do fundo?
- qual será a largura máxima do conteúdo?
- quanto espaço haverá dentro dos cartões?
- como os botões parecerão?

### 5.2 Estrutura básica da sintaxe CSS

Exemplo:

```css
body {
  margin: 0;
  background: #f6f1e6;
}
```

Essa sintaxe tem três partes:

- `body`: seletor;
- `{ ... }`: bloco de regras;
- `margin: 0;`: declaração.

Uma declaração tem:

- propriedade: `margin`
- valor: `0`

Ela sempre termina com `;`.

### 5.3 Código principal do `styles.css`

```css
body {
  margin: 0;
  background: #f6f1e6;
  color: #1f1a17;
  font-family: Arial, Helvetica, sans-serif;
  line-height: 1.5;
}

.page {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px 14px 40px;
}

.card {
  margin-bottom: 16px;
  padding: 16px;
  border: 1px solid #d7c9ad;
  border-radius: 12px;
  background: #fffaf0;
}
```

### 5.4 Explicando os conceitos centrais

#### `body`

Seleciona a página inteira.

#### `margin: 0;`

Remove a margem padrão que o navegador costuma colocar nas bordas da página.

#### `background`

Define a cor de fundo.

#### `color`

Define a cor padrão do texto.

#### `font-family`

Escolhe a família tipográfica.

No exemplo:

- primeiro tenta `Arial`;
- se não houver, tenta `Helvetica`;
- se não houver, usa uma fonte genérica sem serifa (`sans-serif`).

#### `line-height`

Controla o espaçamento vertical entre linhas de texto.

#### `.page`

O ponto antes de `page` significa:

- “seletor de classe”.

Logo:

```css
.page
```

seleciona qualquer elemento com:

```html
class="page"
```

#### `max-width: 900px;`

Impede que o conteúdo fique largo demais em telas grandes.

#### `margin: 0 auto;`

Aqui:

- `0` = margem superior e inferior;
- `auto` = o navegador calcula as margens laterais e centraliza o bloco.

#### `padding`

`padding` é o espaço interno do elemento.

Exemplo:

```css
padding: 20px 14px 40px;
```

Isso significa:

- 20px em cima;
- 14px à direita;
- 40px embaixo;
- 14px à esquerda.

Quando há três valores em `padding`, a regra é:

- primeiro valor = topo;
- segundo valor = direita e esquerda;
- terceiro valor = baixo.

No projeto atual, o importante é perceber que `padding` cria respiro interno.

#### `.card`

A classe `card` estiliza cada seção como cartão.

#### `margin-bottom`

Cria espaço entre um cartão e o próximo.

#### `border`

Cria a borda:

- espessura;
- estilo;
- cor.

#### `border-radius`

Arredonda os cantos.

#### `background`

Dá a cor do cartão.

### 5.5 Box model

Vale entender este conceito desde cedo.

Todo elemento de bloco pode ser pensado assim:

1. conteúdo;
2. `padding`;
3. borda;
4. `margin`.

Em palavras:

- conteúdo = o texto ou tabela;
- `padding` = espaço interno;
- borda = contorno;
- `margin` = espaço externo.

Isso é o chamado **box model**.

## 6. Passo 4: escrever o conteúdo em JSON

### 6.1 Ideia do JSON

O JSON é o arquivo de dados.

Ele não cuida da aparência e não executa ação sozinho.

Ele só guarda informação estruturada.

### 6.2 Estrutura escolhida

```json
{
  "title": "Missão Terminal Linux",
  "description": "Texto inicial",
  "sections": []
}
```

### 6.3 Elementos básicos da sintaxe JSON

#### Objeto

Um objeto usa chaves:

```json
{
  "title": "..."
}
```

Isso significa:

- há um campo chamado `title`;
- ele possui um valor.

#### Par chave-valor

Exemplo:

```json
"title": "Missão Terminal Linux"
```

- `"title"` = nome do campo;
- `:` = separa nome e valor;
- `"Missão Terminal Linux"` = valor.

#### Array

Um array usa colchetes:

```json
"sections": []
```

Ele serve para guardar uma lista ordenada.

#### String

Texto em JSON sempre vai entre aspas duplas:

```json
"texto"
```

#### Booleano

Valores lógicos em JSON:

```json
true
false
```

Sem aspas.

### 6.4 Tipos de seção deste projeto

Cada item dentro de `sections` pode ser:

- `text`
- `table`
- `quiz`

### 6.5 Exemplo de seção `text`

```json
{
  "type": "text",
  "title": "O que você vai estudar",
  "text": "Texto da seção"
}
```

### 6.6 Exemplo de seção `table`

```json
{
  "type": "table",
  "title": "Comandos principais",
  "headers": ["Comando", "Uso"],
  "rows": [
    ["pwd", "Mostra a pasta atual"]
  ]
}
```

### 6.7 Exemplo de seção `quiz`

```json
{
  "type": "quiz",
  "title": "Pergunta 1",
  "question": "Qual comando lista o conteúdo da pasta atual?",
  "options": [
    {
      "text": "ls",
      "correct": true,
      "feedback": "Correto."
    },
    {
      "text": "pwd",
      "correct": false,
      "feedback": "Não."
    }
  ]
}
```

### 6.8 Cuidados importantes no JSON

- use sempre aspas duplas;
- não deixe vírgula sobrando no último item;
- mantenha a estrutura dos campos;
- não invente novos nomes sem ajustar o JavaScript.

## 7. Passo 5: programar o JavaScript

### 7.1 Ideia do JavaScript neste projeto

O JavaScript faz três coisas:

1. busca o JSON;
2. transforma esse JSON em HTML;
3. reage aos cliques nos botões do quiz.

### 7.2 Primeiras linhas

```js
var app = document.getElementById("app");
var data = null;
```

#### `var`

`var` cria uma variável.

Variável é um espaço com nome para guardar um valor.

#### `document.getElementById("app")`

Isso pede ao navegador:

- procure o elemento cujo `id` é `app`.

Como no HTML existe:

```html
<main id="app">
```

essa linha guarda esse elemento na variável `app`.

#### `data = null`

`null` significa:

- ainda não há dado carregado.

### 7.3 Função

Exemplo:

```js
function escapeHtml(text) {
  return String(text || "");
}
```

Uma função:

- recebe um valor;
- faz algum processamento;
- devolve um resultado.

Sintaxe:

- `function` = palavra-chave;
- `escapeHtml` = nome da função;
- `(text)` = parâmetro;
- `{ ... }` = corpo da função.

### 7.4 A função `escapeHtml`

Ela existe para evitar que texto vindo do JSON seja interpretado como HTML.

Isso é uma proteção simples e importante.

Ela troca:

- `&`
- `<`
- `>`
- aspas

pelas versões seguras em HTML.

### 7.5 A função `formatText`

Ela faz duas coisas:

1. transforma trechos entre crases em `<code>`;
2. transforma quebra de linha `\n` em `<br>`.

Isso permite escrever no JSON:

```text
Use `ls` para listar arquivos.
```

e aparecer na tela com destaque de código.

### 7.6 A função `render`

Ela monta o HTML da página inteira.

Estratégia usada:

1. criar uma variável `html`;
2. concatenar texto HTML nela;
3. no final, jogar tudo em:

```js
app.innerHTML = html;
```

#### `innerHTML`

`innerHTML` substitui o conteúdo interno de um elemento.

No caso:

- pega o elemento `main id="app"`;
- troca o conteúdo por aquilo que foi montado na string `html`.

### 7.7 Laço `for`

Exemplo:

```js
for (i = 0; i < data.sections.length; i += 1) {
  section = data.sections[i];
}
```

Esse laço significa:

- comece em `0`;
- continue enquanto `i` for menor que o tamanho da lista;
- aumente `i` de um em um.

Ele é usado para percorrer as seções do JSON.

### 7.8 Condicional `if`

Exemplo:

```js
if (section.type === "text") {
  html += "<p>...</p>";
}
```

Isso quer dizer:

- se o tipo da seção for `"text"`, renderize como texto.

O operador `===` compara valores com rigor.

### 7.9 `fetch`

Trecho:

```js
var response = await fetch("./content/comandos-linux.json");
```

`fetch` pede um arquivo pela web.

No nosso caso, ele busca:

```text
./content/comandos-linux.json
```

O `./` significa:

- “a partir da pasta atual”.

### 7.10 `async` e `await`

Trecho:

```js
async function load() {
  var response = await fetch(...);
}
```

`async` marca uma função assíncrona.

`await` significa:

- espere essa operação terminar antes de continuar.

Isso é usado porque carregar o JSON leva algum tempo, ainda que pouco.

### 7.11 `try` e `catch`

Trecho:

```js
try {
  ...
} catch (error) {
  ...
}
```

Isso significa:

- tente executar;
- se der erro, capture o erro.

Aqui isso é útil quando:

- o JSON não carrega;
- o caminho está errado;
- a página foi aberta sem servidor local.

### 7.12 Evento de clique

Trecho:

```js
document.addEventListener("click", function (event) {
  ...
});
```

Isso diz:

- escute cliques no documento;
- quando alguém clicar, execute a função.

### 7.13 `data-section` e `data-option`

No HTML gerado para os botões do quiz, usamos atributos assim:

```html
data-section="2"
data-option="1"
```

Esses atributos guardam informações para o JavaScript.

Quando a pessoa clica:

- o JavaScript descobre de qual seção veio o clique;
- e qual alternativa foi escolhida.

### 7.14 Mostrar o feedback

No clique, o código localiza:

- a seção correta;
- a opção correta;
- o parágrafo de feedback correspondente.

Depois muda:

- a classe CSS do feedback;
- o texto mostrado.

Isso é feito com:

```js
feedback.className = ...
feedback.innerHTML = ...
```

## 8. Passo 6: testar localmente

Como o JSON é carregado com `fetch`, não basta abrir o HTML por duplo clique.

Use:

```powershell
node server.mjs
```

Depois abra:

```text
http://127.0.0.1:3000
```

## 9. Ordem prática de trabalho recomendada

Se vocês forem reconstruir tudo do zero para aprender, a melhor ordem é:

1. criar `index.html` com `h1`, `p` e `main id="app"`;
2. abrir no navegador e conferir se o esqueleto aparece;
3. criar `styles.css` com cor de fundo, largura da página e estilo dos cartões;
4. conectar o CSS no HTML;
5. criar um `comandos-linux.json` bem pequeno, com uma seção de texto;
6. criar um `app.js` que só leia o JSON e escreva o título;
7. depois expandir o `app.js` para texto;
8. depois expandir para tabela;
9. depois expandir para quiz;
10. por fim, testar tudo com `node server.mjs`.

Essa ordem é boa porque cada etapa depende da anterior.

## 10. Como estudar sem se perder

Uma forma prática de estudar este projeto é:

### Primeiro dia

- entender HTML;
- entender `id` e `class`;
- entender como HTML e CSS se conectam.

### Segundo dia

- entender CSS básico;
- entender box model;
- mudar cores, bordas e espaçamentos.

### Terceiro dia

- entender JSON;
- editar o conteúdo;
- acrescentar uma nova pergunta.

### Quarto dia

- entender JavaScript básico;
- entender variável;
- entender função;
- entender `for`;
- entender `if`;
- entender evento de clique.

## 11. Regra de ouro deste projeto

Quando algo parecer complicado demais, volte para a pergunta:

“Este arquivo está cuidando de estrutura, aparência, conteúdo ou comportamento?”

Resposta:

- `index.html` = estrutura
- `styles.css` = aparência
- `comandos-linux.json` = conteúdo
- `app.js` = comportamento

Se essa separação estiver clara, o projeto fica muito mais compreensível.
