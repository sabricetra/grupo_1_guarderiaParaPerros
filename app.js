const express = require('express')
const path = require('path')
const app = express()
// Importamos los distintos enrutadores
const mainRouter = require("./src/routes/mainRouter.js")
const productosRouter = require("./src/routes/productosRouter.js")
const usersRouter = require("./src/routes/usersRouter.js")


app.use(express.static('public'))

app.set("view engine", "ejs")

app.set('views', path.resolve(__dirname, './src/views'))


app.use("/users", usersRouter);

app.use("/productos", productosRouter);

app.use("/", mainRouter)

app.listen(8000, ()=> console.log('Corriendo servidor en http://localhost:8000'))