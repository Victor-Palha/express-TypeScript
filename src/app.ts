import express, { Request, Response, NextFunction} from "express";
const app = express()


app.get('/', (req, res)=>{
    return res.send("Hello From Express!")
})

//Middleware
app.use(express.json())

//Outros middlewares
function checkUser(req: Request, res: Response, next: NextFunction){
    if(req.params.id === '1'){
        console.log("Pode Seguir!")
        next()
    }else{
        console.log("Acesso restrito")
    }
}

app.get("/api/user/:id/acess", checkUser ,(req:Request, res:Response)=>{
    return res.json({msg: "Bem-vindo!"})
})

//Middlewares para todas as rotas (nível de aplicação)
function showPath(req:Request, res:Response, next:NextFunction){
    console.log(req.path)
    next()
}
app.use(showPath)

//Rota de Post
app.post('/api/product',(req,res)=>{
    console.log(req.body)
    return res.send("Produto adicionado!")
})
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
})

//Interfaces do express
app.get('/api/interfaces', (req:Request, res:Response)=>{
    return res.send("Utilizando interfaces!")
})

//enviando Json
app.get("/api/json", (req:Request, res:Response)=>{
    return res.json({
        name: "Shirt",
        price: 30.00,
        color: "Black",
        sizes: ["p", "M", "G"]
    })
})

// Router Parameters
app.get('/api/product/:id', (req:Request, res:Response)=>{
    console.log(req.params)
    return res.send(`Product ${req.params.id}`)
})

// Rotas complexas

app.get("/api/product/:id/review/:reviewId", (req:Request, res:Response)=>{
    console.log(req.params)
    const productId = req.params.id
    const reviewId = req.params.reviewId
    return res.send(`Acessando a reviw ${reviewId} do produto ${productId}`)
})

// Router Handle
function getUser(req:Request, res:Response){
    const id = req.params.id
    console.log(`Resgatando o usuário com id: ${id}`)
    return res.send("O usuário com o id "+ id + " foi encontrado!")
}

app.get("/api/user/:id", getUser)

//Req e Res com generics
app.get("/api/user/:id/details/:name", (
    req:Request<{id:string, name:string}>, 
    res:Response<{status: boolean}>
    )=>{
        console.log(`ID ${req.params.id}`)
        console.log(`Name: ${req.params.name}`)

        return res.json({status: true})
    }
)

//Tratando erros

app.get("/api/error", (req:Request, res:Response)=>{
try {
    //Nossa lógica
    throw new Error("Algo deu errado!")
    
} catch (err: any) {
    res.status(500).json({Error: err.message})
}
})

//Servidor
app.listen(3000, ()=>{
    console.log("Express Aplication running!")
})