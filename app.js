const express = require('express')
const session = require('express-session');
const path = require('path')
const app = express()
// Importamos los distintos enrutadores
const mainRouter = require("./src/routes/mainRouter.js")
const productosRouter = require("./src/routes/productosRouter.js")
const usersRouter = require("./src/routes/usersRouter.js")
const recordameMiddleware=require('./middlewares/recordameMiddleware')



// Habilita metodos Put/Patch/Delete
const methodOverride = require("method-override")
app.use(methodOverride("_method"))



app.use(express.static('public'))


app.set("view engine", "ejs")

app.set('views', path.resolve(__dirname, './src/views'))


// captura lo que viene en un formulario en un objeto literal y puedo usarlo con json
app.use(express.urlencoded({extended : false}))
app.use(express.json())

app.use(session({
    secret: "secreto",
    resave: true,
    saveUninitialized: true
}));

app.use("/users", usersRouter);

app.use("/productos", productosRouter);

app.use("/", mainRouter)
//error 404//
app.use((req,res,next)=>{
    res.status(404).render("error-404");

})



app.listen(8000, ()=> console.log('Corriendo servidor en http://localhost:8000'))