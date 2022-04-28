const express = require('express')
const path = require('path')
const app = express()

const mainRouter = require("./src/routes/mainRouter.js")
const productosRouter = require("./src/routes/productosRouter.js")
const usersRouter = require("./src/routes/usersRouter.js")


app.use(express.static('public'))

app.set("view engine", "ejs")

app.set('views', path.resolve(__dirname, './src/views'))

app.listen(8000, ()=> console.log('Corriendo servidor en http://localhost:8000'))


app.use("/", usersRouter)

app.use("/", productosRouter)

app.use("/", mainRouter)