# Guia: Node e VS Code

## 1. O que você vai instalar

Para testar este projeto localmente, você precisa de:

- Node.js
- VS Code

O navegador sozinho não basta, porque este projeto lê um arquivo JSON com `fetch`.

## 2. Como instalar o Node.js no Windows

1. Abra o site oficial: `https://nodejs.org/`
2. Baixe a versão **LTS** para Windows.
3. Rode o instalador.
4. Vá clicando em `Next`.
5. Mantenha as opções padrão.
6. Conclua a instalação.

## 3. Como conferir se o Node foi instalado

Abra o terminal do Windows ou o terminal do VS Code e rode:

```powershell
node -v
```

Se tudo deu certo, vai aparecer algo como:

```text
v22.0.0
```

O número pode ser diferente. O importante é aparecer uma versão.

Se aparecer mensagem dizendo que `node` não foi reconhecido:

- feche o VS Code;
- abra o VS Code de novo;
- tente novamente.

## 4. Como abrir o projeto no VS Code

1. Abra o VS Code.
2. Clique em `File` > `Open Folder`.
3. Escolha a pasta `trabalho`.

Se você preferir abrir o repositório inteiro, também funciona, mas abrir só `trabalho` costuma ser mais simples para estudar.

## 5. Como abrir o terminal no VS Code

No VS Code, use um destes caminhos:

- menu `Terminal` > `New Terminal`
- atalho `Ctrl` + `` ` ``

O terminal deve abrir embaixo.

## 6. Como rodar o servidor local

No terminal, dentro da pasta `trabalho`, rode:

```powershell
node server.mjs
```

Se deu certo, você verá algo parecido com:

```text
Servidor local rodando em http://127.0.0.1:3000
```

## 7. Como abrir no navegador

Com o servidor rodando, abra:

```text
http://127.0.0.1:3000
```

## 8. Como parar o servidor

No terminal do VS Code, pressione:

```text
Ctrl + C
```

## 9. Fluxo de trabalho mais simples

Toda vez que quiser testar:

1. abrir a pasta `trabalho` no VS Code;
2. abrir o terminal;
3. rodar `node server.mjs`;
4. abrir `http://127.0.0.1:3000`;
5. editar os arquivos;
6. atualizar a página no navegador.

## 10. Arquivos que você vai mexer mais

- `index.html`: estrutura da página
- `styles.css`: aparência
- `app.js`: leitura do JSON e montagem do HTML
- `content/comandos-linux.json`: conteúdo do objeto de aprendizagem
