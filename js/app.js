const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarrito = document.querySelector('#vaciar-carrito');
const listaProductos = document.querySelector('#lista-productos')
let arrayProductos = [];

cargarEventos()
function cargarEventos(){
    listaProductos.addEventListener('click',agregarProductos);
}
function agregarProductos(e){
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')){
        const productoSeleccionado = e.target.parentElement.parentElement.parentElement;
        leerProductos(productoSeleccionado)
    } 
}

function leerProductos(producto){
    //creamos un obejeto con el contenenido del producto actual
    const infoProducto = {
        img: producto.querySelector('img').src,
        nombreProducto: producto.querySelector('h3').textContent,
        precio: producto.querySelector('.precio').textContent,
        id: producto.querySelector('.agregar-carrito').getAttribute('data-id'),
        cantidad:1
    }
    //comprobamos si hay elementos en el array
    const existe = arrayProductos.some(producto => producto.id === infoProducto.id );

    if(existe){
        //actualizamos la cantidad
        const nuevoArray = arrayProductos.map(producto => {
            if(producto.id === infoProducto.id){
                producto.cantidad++
                return producto
            }else{
                return producto
            }
        })
        arrayProductos = [...nuevoArray];
    }else{
        arrayProductos =[...arrayProductos,infoProducto];
    }
    /* console.log(arrayProductos) */
    mostrarProductos()
}

function mostrarProductos(){

    arrayProductos.forEach(producto=>{
        const fila = document.createElement('tr')
        fila.innerHTML = `
        <th>
            <img src="${producto.img} width="500" ">
        </th>
        <th> ${producto.nombreProducto} </th>
        <th> ${producto.precio} </th>
        <th> ${producto.cantidad} </th>

        `
        contenedorCarrito.appendChild(fila)
    })
}