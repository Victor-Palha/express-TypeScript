# express-TypeScript
 Estudos de como utilizar o freamework Express do NodeJS com o TypeScript
***
# TS com Express
***
**Inicialização**
* Para iniciar um projeto com Express e TypeScript precisamos criar o
projeto com `npm init`;
* E também iniciar o TS com `npx tsc –init`;
* Após estes dois passos *vamos instalar as dependências*, algumas são
de de dev (como os tipos) e outras não (como o Express);
    * `npm install @types/express @type/node ts-node-dev typescript --save-dev`
    * `npm instal express`
        * utilizamos essa dependencias para rodar o typescript no nosso projeto enquanto está em produção
    * Criaremos uma pasta chamada de `src` onde criaremos o `app.ts` para rodar nosso projeto, então no `package-json` criaremos um comando dentro da parte de *scripts* para compilar TypeScript para JavaScript.
        * `"dev": "ts-node-dev --respawn --transpile-only src/app.ts"`.
        * agora no terminal podemos rodar a aplicação com `npm run dev`
* E por fim criamos um *script* e iniciamos a aplicação!

**Utilizando o Express**
* Para utilizar o express vamos importar o pacote;
* E criar ativá-lo em uma nova variável, geralmente chamada de app;
* Podemos criar uma rota que retorna uma mensagem;
* Definir uma porta para a aplicação;
* E verificar o resultado no navegador;

**Roteamento**
* Podemos utilizar qualquer verbo HTTP nas rotas do Express;
* Vamos criar uma que funciona a base de POST;
* Para isso precisamos trafegar dados em JSON, podemos fazer isso
ativando um middleware;
* Iremos realizar os testes com o Postman;

**Rota para qualquer verbo**
* Utilizando o método all, podemos criar uma rota que aceita qualquer
verbo;
* É interessante para quando um endpoint precisa realizar várias funções;
* Podemos criar um tratamento para entregar a resposta;

**Interfaces do Express**
* Para alinhar nossa aplicação ao TypeScript vamos adicionar novos tipos;
* As request podem utilizar o tipo Request;
* E as respostas o Response;

**JSON como respostas**
* Na maioria das vezes enviamos JSON para endpoints de API;
* Para fazer isso com Express é facil!
* Basta enviar o JSON no método json de response;

**Router parameters**
* Podemos pegar parâmetros de rotas com Express;
* Vamos utilizar req.params;
* A rota a ser criada precisa ser dinâmica;
* Ou seja, os parâmetros que estamos querendo receber precisam estar no
padrão: :id;
**Rotas mais complexas**
* Podemos ter rotas com mais de um parâmetro;
* Todos os dados continuam em req.params;
* O padrão é: /algo/:param1/outracoisa/:param2
* Teremos então: param1 e param2 em req;

**Router handler**
* Router handler é um recurso muito interessante para o Express;
* Basicamente retiramos a função anônima de uma rota e externalizamos
em uma função;
* Podemos reaproveitar essa função, ou estrutura nossa aplicação desta
maneira;

**Middleware**
* Middleware é um recurso para executar uma função entre a execução de
uma rota, por exemplo;
* O nosso app.use de json é um middleware;
* Podemos utilizar middleware para validações, por exemplo;

**Middleware para todas as rotas**
* Para criar um middleware que é executado em todas as rotas vamos
utilizar o método use;
* Criamos uma função e atrelamos ao método;
* Desta maneira todas as rotas terão ação do nosso middleware;

**Request e Response generics**
* Podemos estabelecer os argumentos que vem pelo request e vão pela
response;
* Para isso vamos utilizar os Generics de Response e Request;
* Que são as Interfaces disponibilizadas pelo Express;

**Tratando erros**
* Para tratar possíveis erros utilizamos blocos try catch;
* Desta maneira podemos detectar algum problema e retornar uma
resposta para o usuário;
* Ou até mesmo criar um log no sistema;
