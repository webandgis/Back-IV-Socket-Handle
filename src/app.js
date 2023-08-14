const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const path = require('path');
const handlebars = require('express-handlebars');
const PORT = 8090;


//Routers



const ProductsRouter=require('./router/product.router.js')
const CartRouter=require('./router/carts.router.js')
const ViewRouter=require('./router/view.router.js')





app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(express(__dirname + "/public"))
app.use("/api/products",ProductsRouter)
app.use("/api/cart",CartRouter)
app.use("/",ViewRouter)

//congifuración handlebars

app.use(express.static(path.join(__dirname, 'public')));
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");


 http.listen(PORT,()=>{
    console.log(`Conectado desde el servidor ${PORT}`)
})
const ProductManager=require('./controllers/ProductManager.js');
const { Socket } = require('socket.io');
const productmanagerSocket = new ProductManager();


io.on("connection",async(socket)=>{
    console.log("client connect",socket.id)
    const productListSocket=await productmanagerSocket.getProducts({})
    io.emit("sendproducst",productListSocket)

    socket.on("addedProducts",async(object)=>{

    await productmanagerSocket.addedProducts(object)
    const productListSocket=await productmanagerSocket.getProducts({})
    io.emit("addedProducts",productListSocket)

    

})
socket.on("deleteProduct",async(id)=>{

    await productmanagerSocket.deleteById(id)
    const productListSocket=await productmanagerSocket.getProducts({})
    io.emit("addedProducts",productListSocket)

    

})
})