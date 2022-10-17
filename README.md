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
* Para utilizar o express vamos *importar o pacote*;
    * `import express from 'express'`
* E criar ativá-lo em uma nova variável, geralmente chamada de **app**;
    * `const app = express()`
* Podemos *criar uma rota* que retorna uma mensagem;
    * ```ts
        app.get("/", (request, response)=>{
            return response.send("Hello From Express!")
        })
        ```
* Definir uma *porta* para a aplicação;
    * ```ts
        app.listen(3000, ()=>{
            console.log("Express Aplication running!")
        })
        ```
* E verificar o resultado no navegador;
    * `http://localhost:3000`
* Alguns detalhes que você deve considerar se você está lendo essa documentação:
    * Esse projeto é levando em conta que você tem algum conhecimento prévio sobre Node.js e Express.
    * Esse repositório é para você entender como utilizado o **TypeScript** utilizando o Express.

**Roteamento**
* Podemos utilizar *qualquer verbo HTTP nas rotas* do Express;
    * C: Create - POST
    * R: Read - GET
    * U: Update - PUT/PATCH
    * D: Delete - DELETE
* Vamos criar uma que funciona a base de **POST**. Para isso precisamos trafegar dados em *JSON*, podemos fazer isso ativando um *middleware*;
    * ```ts
        //Middleware
        app.use(express.json())

        //Rota de Post
        app.post('/api/product',(req,res)=>{
            console.log(req.body)
            return res.send("Produto adicionado!")
        })
        ```
        
    * Lembrando que quando vocês forem testar, ele é um metódo **POST** e recebe um *JSON* vindo da requisição!
* Iremos realizar os testes com a extensão **Thunder Client** do VsCode, porém você pode utiizar qualquer meio que preferir!;

**Rota para qualquer verbo**
* Utilizando o método **all**, podemos criar uma rota que aceita qualquer
verbo;
    * Quando utilizamos o método `req.method`, recebemos o *verbo HTTP*
* É interessante para quando um endpoint **precisa realizar várias funções**;
* Podemos criar um tratamento para entregar a resposta, dependendo do método HTTP utilizado;
    ```ts
        //Rota all
        app.all('/api/product/check', (req, res)=>{
            // tratamento
            if(req.method === "POST"){
                return res.send("Registro inserido!")
            } else if(req.method === "GET"){
                return res.send("Algum registro do banco de dados!")
            } else{
                return res.send("Não podemos realizar esta operação!")
            }
        })```
        
**Interfaces do Express**
* Para alinhar nossa aplicação ao **TypeScript** vamos adicionar novos tipos;
    * Importaremos os recursos do próprio Express.
        * `import express, { Request, Response} from "express";`
    * Então criaremos uma nova rota;
* As request podem utilizar o tipo *Request* e as respostas utilizam o tipo *Response*;
    * Isso ajuda na hora que formos escrever o código, poís o TypeScript nós mostra o que estamos fazendo de errado!
```ts
    //Interfaces
    app.get('/api/interfaces', (req:Request, res:Response)=>{
        return res.send("Utilizando interfaces!")
    })
  ```

**JSON como respostas**
* Na maioria das vezes enviamos **JSON para endpoints de API**;
* Para fazer isso com Express é facil!
* Basta enviar o JSON no *método `json`* de response;
    * ```ts
        //enviando Json
        app.get("/api/json", (req:Request, res:Response)=>{
            return res.json({
                name: "Shirt",
                price: 30.00,
                color: "Black",
                sizes: ["p", "M", "G"]
            })
        })
        ```

**Router parameters**
* Podemos pegar parâmetros de rotas com Express;
* Vamos utilizar `req.params`;
    * O `req.params` como o nome já diz, é um parametro enviado na requisição da nossa API e pode ser pego para fazer um request.
* A rota a ser criada precisa ser **dinâmica**;
* Ou seja, os parâmetros que estamos querendo receber precisam estar no
padrão: **:id**;
 ```ts
//Router Parameters
app.get('/api/product/:id', (req:Request, res:Response)=>{
    console.log(req.params)
    return res.send(`Product ${req.params.id}`)
})
```

* Podemos acessar esse rota pela seguinte URL: `http://localhost:3000/api/product/10`. O 10 no final é apenas um exemplo de parâmetro, podendo receber qualquer coisa!

**Rotas mais complexas**
* Podemos ter rotas com *mais de um parâmetro*;
* Todos os dados continuam em `req.params`;
* O padrão é: /algo/:*param1*/outracoisa/:*param2*
    * ```ts
        app.get("/api/product/:id/review/:reviewId", (req:Request, res:Response)=>{
            console.log(req.params)
            const productId = req.params.id
            const reviewId = req.params.reviewId
            return res.send(`Acessando a reviw ${reviewId} do produto ${productId}`)
        })
        ```
* Teremos então: id como o primeiro parametro e reviewId como segundo parametro para nosso request;

**Router handler**
* *Router handler* é um recurso muito interessante para o Express;
* Basicamente retiramos a função anônima de uma rota e *externalizamos em uma função*;
    * Isso quer dizer que podemos fazer a função antes de criarmos a rota, então chamaremos a função dentro da rota!
    * Exemplo: 
        * ```ts
            function getUser(req:Request, res:Response){
                const id = req.params.id
                console.log(`Resgatando o usuário com id: ${id}`)
                return res.send("O usuário com o id "+ id + " foi encontrado!")
            }

            app.get("/api/user/:id", getUser)
           ```
            
* Podemos reaproveitar essa função, ou estrutura nossa aplicação desta
maneira;

**Middleware**
* *Middleware* é um recurso para executar uma função entre a execução de
uma rota, por exemplo;
* O nosso `app.use(express.json())` é um middleware;
    * Porém ele é um middleware em nível de aplicação, ou seja, todas as rotas passam por ele antes de realizar suas funções. Mas existem middlewares que vão ser usadas em apenas determinadas rotas!
* Podemos utilizar middleware para *validações*, por exemplo;
* Antes de começarmos com o middleware, temos que chamar o *tipo dele para o TypeScript*, isso porque as funções de middleware tem um novo parametro, que é o `next`. Então vamos chamar o tipo dele:
    * `import express, { Request, Response, NextFunction} from "express";`
* Agora, um middleware pode lembrar uma função *Router Handler*, porém com um parametro adicional, que é o `Next`;
* Agora vamos criar nosso middleware e chamar para dentro de uma rota:
    * ```ts
        //Middleware
        function checkUser(req: Request, res: Response, next: NextFunction){
            if(req.params.id === '1'){
                console.log("Pode Seguir!")
                next()
            }else{
                console.log("Acesso restrito")
            }
        }
        //Rota utilizando o Middleware
        app.get("/api/user/:id/acess", checkUser ,(req:Request, res:Response)=>{
            return res.json({msg: "Bem-vindo!"})
        })
       ```
        
* Dentro da rota, como **segundo parametro passamos a função de middleware**, e ela vai ser chamada antes da execução na próxima função!

**Middleware para todas as rotas**
* Para criar um middleware que é executado em todas as rotas vamos
utilizar o método `use`;
* *Criamos uma função* e atrelamos ao método;
* Desta maneira *todas as rotas* terão ação do nosso middleware;
```ts
//Criando middleware
function showPath(req:Request, res:Response, next:NextFunction){
    console.log(req.path)
    next()
}
//Utilizando método use para ele ser usado em TODAS as rotas
app.use(showPath)
```

* Lembrando que todas as funções de middleware, devem utilizar o `next` no final, se não, ele não vai destravar para o usuário ir para as rotas!

**Request e Response generics**
* Podemos estabelecer os *argumentos que vem pelo request e vão pela response*;
* Para isso vamos utilizar os *Generics* de Response e Request;
* Que são as *Interfaces* disponibilizadas pelo Express;
```ts
app.get("/api/user/:id/details/:name", (
    req:Request<{id:string, name:string}>, 
    res:Response<{status: boolean}>
    )=>{
        console.log(`ID ${req.params.id}`)
        console.log(`Name: ${req.params.name}`)

        return res.json({status: true})
    }
)
```

* Vamos por partes agora!
    * Primeiramente criamos uma rota que recebe 2 parametros, sendo eles o `id` e o `name`
    * Agora vamos tipar o `Req` para ele receber um objeto, que vai ser o id e o name, ambos sendo string!
    * Depois passamos um objeto para o Response para ele receber um objeto que tem apenas um atributo que receber um *boolean*

**Tratando erros**
* Para tratar possíveis erros utilizamos *blocos try catch*;
* Desta maneira *podemos detectar algum problema* e retornar uma
resposta para o usuário;
* Ou até mesmo *criar um log* no sistema;
```ts
app.get("/api/error", (req:Request, res:Response)=>{
try {
    //Nossa lógica
    throw new Error("Algo deu errado!")
    
} catch (err: any) {
    res.status(500).json({Error: err.message})
}
})
```

* No exemplo acima, criamos um erro propósital dentro do bloco `try`, assim forçamos ele a entrar dentro do `catch`.
* Depois disso tratamos o erro tipando ele como `any` e colocando status code dele para 500 (erro interno do servidor) e depois passamos uma mensagem para sinalizar que algo aconteceu!
