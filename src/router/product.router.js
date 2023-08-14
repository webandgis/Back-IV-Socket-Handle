const Router=require('express')

const ProductsRouter=Router()

 
//ProductManager

const ProductMng=require('../controllers/ProductManager.js')

//ProductManager constante

const product= new ProductMng()

//enpoint get

ProductsRouter.get("/", async(req,res)=>{
    res.send(await product.getProducts())
})

//endpoint get by id

ProductsRouter.get("/:id", async (req, res) => {
  

    try{
        let id = req.params.id
        res.send(await product.getProductsById(id))
        

    }catch{
        res.status(500).send("Server Error")

    }
   
    })

 //endpoint put
 
 ProductsRouter.put("/:id", async(req,res)=>{
    let id=req.params.id
    let updateProduct=req.body
    res.send(await product.updateProduct(id,updateProduct))

 })
//endpoint delete by id

ProductsRouter.delete("/:id",async(req,res)=>{
    let id= req.params.id
    res.send(await product.deleteById(id))
})
   

//endpoint post
ProductsRouter.post("/", async (req, res) => {
    try {
        let newProduct = req.body;
        console.log("Received new product:", newProduct);
        res.send(await product.addedProducts(newProduct));
    } catch (error) {
        console.error("Error al procesar la data", error);
        res.status(400).send("Invalid JSON data");
    }
});
module.exports = ProductsRouter