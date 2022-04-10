const express = require('express')
const path = require('path')
const app = express()

app.use(express.static('public'))

app.listen(8000, ()=> console.log('Corriendo servidor en http://localhost:8000'))


app.get("/", function(req,res){
    let htmlPath = path.join(__dirname, "/views/home.html")
    res.sendFile(htmlPath)
})

app.get("/inicia-sesion", function(req,res){
    let htmlPath = path.join(__dirname, "/views/inicia-sesion.html")
    res.sendFile(htmlPath)
})

app.post("/inicia-sesion", function(req,res){
    let htmlPath = path.join(__dirname, "/views/home.html")
    res.sendFile(htmlPath)
})

app.get("/registro", function(req,res){
    let htmlPath = path.join(__dirname, "/views/registro.html")
    res.sendFile(htmlPath)
})

app.get("/detalle-producto", function(req,res){
    let htmlPath = path.join(__dirname, "/views/detalle-producto.html")
    res.sendFile(htmlPath)
})

app.get("/carrito", function(req,res){
    let htmlPath = path.join(__dirname, "/views/carrito.html")
    res.sendFile(htmlPath)
})

app.get("/404", function(req,res){
    res.send("Error página no encontrada")
})