const socketCliente = io();

socketCliente.on("sendproducst",(prod)=>{
    updateproducts(prod)
})

function updateproducts(prod){
    let contened=document.querySelector('#products-list')
    let newproductlist=""

    prod.forEach((product)=>{
        newproductlist+=`
        <article >
        <div id="productListContainer" style="border: 1 solid purple;">
            <img src="${product.thumbnails}" width="200">

        </div>

        <div>
            <h2 style="color:purple">${product.title}</h2>
        </div>
        <div>
            <h4>${product.description} </h4>
        </div>
        <div>
            <p>${product.code} </p>
            <p>${product.stock} </p>
            <p>${product.category} </p>
            <p>id:${product.id} </p>

        </div>

        <div>
            <h3>${product.price} </h3>
            <button style="background-color: #cfbcf3; color: purple; border: solid purple; margin-left: 5%; margin-bottom: 2%">Comprar</button>

        </div>

    </article>

     
        
        `
    })

    contened.innerHTML=newproductlist
}

let formu=document.querySelector("#formularioProductos")
formu.addEventListener("submit",(ev)=>{
    ev.preventDefault();

    let title=formu.elements.title.value
    let description=formu.elements.description.value
    let stock=formu.elements.stock.value
    let thumbnails=formu.elements.thumbnails.value
    let category=formu.elements.category.value
    let price=formu.elements.price.value
    let code=formu.elements.code.value

    socketCliente.emit("addedProducts",{
        title,
        description,
        code,
        price,
        stock,
        category,
        thumbnails
        
    })

    formu.reset()

})

document.querySelector("#btn-delete").addEventListener('click',()=>{
const deleteinput=document.querySelector("#id-prod")
const deleteFi=deleteinput.value
socketCliente.emit("deleteProduct",deleteFi)
deleteinput.value=""    
})

