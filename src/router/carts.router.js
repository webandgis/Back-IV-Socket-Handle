const Router=require('express')
const CartRouter=Router()

//CartManager

const CartMng=require('../controllers/CartMng.js')

//Clase

const carts= new CartMng()

//endpoint post

CartRouter.post("/",async (req,res)=>{
    res.send(await carts.addedCarts())
   
})
//endpoint get

CartRouter.get("/", async(req,res)=>{
    res.send(await carts.readCarts())
})

//get ny id

CartRouter.get("/:id",async(req,res)=>{
    res.send(await carts.getCartsById(req.params.id))
})

// post
CartRouter.post("/:cid/products/:pid",async(req,res)=>{
    let cartId=req.params.cid
    let productId=req.params.pid
    res.send(await carts.addProductInCart(cartId,productId))
})
module.exports = CartRouter