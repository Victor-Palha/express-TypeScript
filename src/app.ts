import express from "express";
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

app.listen(3000, ()=>{
    console.log("Express Aplication running!")
})