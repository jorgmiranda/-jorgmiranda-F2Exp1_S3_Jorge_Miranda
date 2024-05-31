/*Configuración de btn para mostrar las compras*/ 
const btnCart = document.querySelector('.container-cart-icon')
const containerCartProducts = document.querySelector('.container-cart-products')

btnCart.addEventListener('click', () => {
    containerCartProducts.classList.toggle('hidden-cart')
})

/*============================= Funcionalidades carrito =========================*/ 
const cartInfo = document.querySelector('.cart-product');
const rowProduct = document.querySelector('.row-product');

// Lista de productos
const productList = document.querySelector('.card-container');

// Variable de arreglos de productos
let listaProductos = []

const valorTotal = document.querySelector('#total-pagar');
const contarProductos = document.querySelector('#contador-productos');

const cartEmpty = document.querySelector('.cart-empty');
const cartTotal = document.querySelector('.cart-total');

//Opciones de formateo de numeros
const opciones = {
    style: 'decimal', 
    minimumFractionDigits: 0, 
    maximumFractionDigits: 0  
}

productList,addEventListener('click', e => {
    if(e.target.classList.contains('btn-add-cart')){
        const producto = e.target.parentElement;
        const infoProducto = {
            cantidad: 1,
            titulo: producto.querySelector('h5').textContent,
            precio: producto.querySelector('.precio').textContent.replace('Precio: ','')
        };

        const exists = listaProductos.some(producto => producto.titulo === infoProducto.titulo);
        if(exists){
            const productos = listaProductos.map(producto => {
                if(producto.titulo === infoProducto.titulo){
                    producto.cantidad++;
                    return producto
                }else{
                    return producto
                }
            })
            listaProductos = [...productos]
        }else{
            listaProductos = [...listaProductos, infoProducto]
        }
       
        
        showHtml()
    }
    
});

rowProduct.addEventListener('click', (e) => {
    if(e.target.classList.contains('icon-close')){
        const producto = e.target.parentElement;
        const titulo = producto.querySelector('p').textContent;

        listaProductos = listaProductos.filter(
            producto => producto.titulo !== titulo
        );

        showHtml()
        console.log(listaProductos)
    }
});

//Funcion para mostrar html
const showHtml = () =>{

    if(!listaProductos.length){
        cartEmpty.classList.remove('hidden');
		rowProduct.classList.add('hidden');
		cartTotal.classList.add('hidden');
        
    }else{
        cartEmpty.classList.add('hidden');
		rowProduct.classList.remove('hidden');
		cartTotal.classList.remove('hidden');
    }

    //limpiar html
    rowProduct.innerHTML = '';

    let total = 0;
    let totalProductos = 0;

    listaProductos.forEach(producto => {
        const containerProduct = document.createElement('div');
        containerProduct.classList.add('cart-product');

        containerProduct.innerHTML = `
        <div class="info-cart-product">
            <span class="cantidad-producto-carrito">${producto.cantidad}</span>
            <p class="titulo-producto-carrito">${producto.titulo}</p>
            <span class="precio-producto-carrito">${producto.precio}</span>
        </div>
        <svg width="40" height="40" viewbox="0 0 40 40" class="icon-close">
            <path d="M 10,10 L 30,30 M 30,10 L 10,30" stroke="black" stroke-width="4" />
        </svg>
        `;

        rowProduct.append(containerProduct);

        total = total + parseInt(producto.cantidad * producto.precio.slice(1).replace('.',''))
        totalProductos = totalProductos + producto.cantidad;
    });

    valorTotal.innerText = `$${total.toLocaleString('es-ES', opciones)}`;
    contarProductos.innerText = totalProductos;
}