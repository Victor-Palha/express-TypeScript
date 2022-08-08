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

app.listen(3000, ()=>{
    console.log("Express Aplication running!")
})