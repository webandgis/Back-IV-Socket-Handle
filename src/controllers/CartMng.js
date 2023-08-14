const fs = require('fs').promises
const ProductMng=require('./ProductManager.js')

const productAll= new ProductMng()


 class CartMng{
    constructor(){
        this.path='./src/models/carts.json'
    }
    readCarts = async () => {
        let carts = await fs.readFile(this.path, "utf-8")
        return JSON.parse(carts)
    }
    writeCarts = async (cart) => {

        await fs.writeFile(this.path, JSON.stringify(cart))

    }
   
    addedCarts= async () => {
        let cartsDesact = await this.readCarts();
        let idNum= Math.floor(Math.random()*233)
        let id= idNum.toString()
        let cartAdd = [{id:id,carts:[]},...cartsDesact];

        try {
            await this.writeCarts(cartAdd);
        } catch {
            throw new Error("El producto no pudo ser añadido");
        }
        return "Carrito agregado de manera exitosa";
    }

    existCart = async (id) => {
        let carts = await this.readCarts()
        return carts.find((cart) => cart.id === id)

    }



    getCartsById = async (id) => {
        let cartsId = await this.existCart(id);

        if (!cartsId) return "Cart Not Found"
        return cartsId;
    }

    addProductInCart = async (cartId, productId) => {
        let cartById = await this.existCart(cartId);
    
        if (!cartById) return "Cart Not Found";
    
        let productsById = await productAll.existProduct(productId);
        if (!productsById) return "Product Not Found";
    
        let cartAll = await this.readCarts();
    
        let updatedCart = { ...cartById };
    
        if (updatedCart.products && updatedCart.products.some(pro => pro.id === productId)) {
            let sumProductCart = updatedCart.products.find(prod => prod.id === productId);
            sumProductCart.cantidad += 1;
        } else {
            updatedCart.products = updatedCart.products || [];
            updatedCart.products.push({ id: productsById.id, cantidad: 1 });
        }
    
        let cartsAdded = [...cartAll.filter(cart => cart.id !== cartId), updatedCart];
        await this.writeCarts(cartsAdded);
        return "Producto agregado de manera exitosa al carrito";
    }
    


    }
    module.exports = CartMng
