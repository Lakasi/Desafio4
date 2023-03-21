import express from 'express'
import { engine } from 'express-handlebars'
import { Server as SocketIOServer } from 'socket.io'
import { productsRouter } from './Routers/productsRouter.js'
import { cartsRouter } from './Routers/cartsRouter.js'
import { ProductManager } from './ProductManager.js'

const productsManager = new ProductManager('./database/productos.json')
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Incorporacion de handlebars
app.engine('handlebars', engine())
app.set('views', './views')
app.set('view engine', 'handlebars')

app.use(express.static('./public'))

/* Router para los productos */
app.use("/api/products", productsRouter)
/* Router para los carritos */
app.use("/api/carts", cartsRouter)

const httpServer = app.listen(8080)

app.get('/', async (req, res) => {
  const productos = await productsManager.getProducts()
  res.render('index', {
    products: productos.length > 0,
    productos
  })
})

//Inicializacion de socket
const io = new SocketIOServer(httpServer)

io.on('connection', async clientSocket => {
  console.log('Cliente conectado')
  io.sockets.emit('updateProducts', await productsManager.getProducts())
})

app.get('/realtimeproducts', async (req, res) => {
  res.render('realTimeProducts')
})