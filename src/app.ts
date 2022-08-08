import express, { Request, Response} from "express";
const app = express()


app.get('/', (req, res)=>{
    return res.send("Hello From Express!")
})

//Middleware
app.use(express.json())

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

app.listen(3000, ()=>{
    console.log("Express Aplication running!")
})