const express = require("express");
const router = express.Router();
const fs = require('fs').promises



const ProductManager= require('../controllers/ProductManager.js')
const productmanager = new ProductManager();
router.get("/", async(req,res)=>{
    let productsList=await(productmanager.getProducts({}))
    console.log(productsList)
    res.render("home",{productsList})
})

router.get("/realtimeproducts", async (req, res) => {
    
    res.render("realtimeproducts")
});

module.exports = router
