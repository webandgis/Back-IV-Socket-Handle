const fs = require('fs').promises



class ProductMng {
    constructor() {
        this.path = './src/models/products.json'
        this.products=[]
    }

    creationId = async () => {
        try {
            let prodUniId = false;
            let productRandomNumber;
    
            while (!prodUniId) {
                productRandomNumber = Math.floor(Math.random() * 100) + 1;
                let productRanString = productRandomNumber.toString();
    
                let idConflicts = this.products.some(product => product.id === productRanString);
    
                if (!idConflicts) {
                    prodUniId = true;
                }
            }
    
            return productRandomNumber.toString();
        } catch {
            throw new Error("Error, ID not generated");
        }
    }
    

    readProducts = async () => {

        try{
            let products = await fs.readFile(this.path, "utf-8")
            return JSON.parse(products)
        }catch{
         throw new Error("No se pueden leer los productos")
        }
      
    }

    writeProducts = async (product) => {
           try{
            await fs.writeFile(this.path, JSON.stringify(product))

           }catch{
            throw new Error("No se pudieron escribir los productos")
           }

    }

    addedProducts = async (product) => {
        let productsDesact = await this.readProducts();
        product.id = await this.creationId(product);
        let productsAdd = [...productsDesact, product];

        try {
            await this.writeProducts(productsAdd);
        } catch {
            throw new Error("El producto no pudo ser añadido");
        }
        return "Producto agregado de manera exitosa";
    }

    getProducts = async () => {

        try {
            return await this.readProducts()
        } catch {
            throw new Error("No se pudieron obtener los productos")
        }

    }

    existProduct = async (id) => {

        try{
            let products = await this.readProducts()
            return products.find((prod) => prod.id === id)
        }catch{
         throw new Error("Producto no existe")
        }
     

    }



    getProductsById = async (id) => {

        try{
            let productsId = await this.existProduct(id);

            if (!productsId) return "Product Not Found"
            return productsId;

        }catch{

            throw new Error("No se pudo encontrar el id ingresado")

        }
       
    }

    updateProduct = async (id, product) => {

        

        try{
            let productsId = await this.existProduct(id)
        if (!productsId) return "Producto no encontrado para actualizar"
        await this.deleteById(id)
        let productsDesact = await this.readProducts();
        let productUpdate = [{ ...product, id: id},...productsDesact]
        await this.writeProducts(productUpdate)

        return "El producto fue actualizado"

        }catch{
            throw new Error ("No se pudieron actualizar los productos")
        }

    }

    deleteById = async (id) => {
   

        try{
            let products = await this.readProducts()
            let productSome = products.some((prod) => prod.id === id)
            if (productSome) {
    
                let productsFilter = products.filter((prod => prod.id != id))
                await this.writeProducts(productsFilter)
                return "El producto fue eliminado"
            } else {
                return "El id proporcionado no existe"
            }
    

        }catch{
            throw new Error("No se pudieron borrar los productos con el id proporcionado")
        }
       

    }
}

module.exports = ProductMng
