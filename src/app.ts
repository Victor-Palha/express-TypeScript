import express from "express";
const app = express()

app.get('/', (req, res)=>{
    return res.send("Hello From Express!")
})

app.listen(3000, ()=>{
    console.log("Express Aplication running!")
})