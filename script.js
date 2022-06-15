// Variables
const baseDeDatos = [
    {
        id: 1,
        nombre: 'Maceta Cemento',
        precio: 2000,
        imagen: 'img/macetaCemento.jpg'
    },
    {
        id: 2,
        nombre: 'Estructura Hierro',
        precio: 1000,
        imagen: 'img/estructuraHierro.jpg'
    },
    {
        id: 3,
        nombre: 'Portamaceta de Hierro',
        precio: 800,
        imagen: 'img/portamacetaDeHierro.jpg'
    },
    {
        id: 4,
        nombre: 'Macetitas de Madera',
        precio: 500,
        imagen: 'img/macetitasDeHierro.jpg'
    },
    {
        id: 5,
        nombre: 'Pie de Hierro',
        precio: 500,
        imagen: 'img/piedeHierro.jpg'
    },
    {
        id: 6,
        nombre: 'Pie de Madera',
        precio: 500,
        imagen: 'img/piedeMadera.jpg'
    }


];

let carrito = [];
const divisa = '$';
const DOMitems = document.querySelector('#items');
const DOMcarrito = document.querySelector('#carrito');
const DOMtotal = document.querySelector('#total');
const DOMbotonVaciar = document.querySelector('#boton-vaciar');

// Funciones

function renderizarProductos() {
    baseDeDatos.forEach((info) => {
        // Estructura
        const miNodo = document.createElement('div');
        miNodo.classList.add('card', 'col-sm-4');
        // Body
        const miNodoCardBody = document.createElement('div');
        miNodoCardBody.classList.add('card-body');
        // Titulo
        const miNodoTitle = document.createElement('h5');
        miNodoTitle.classList.add('card-title');
        miNodoTitle.textContent = info.nombre;
        // Imagen
        const miNodoImagen = document.createElement('img');
        miNodoImagen.classList.add('img-fluid');
        miNodoImagen.setAttribute('src', info.imagen);
        // Precio
        const miNodoPrecio = document.createElement('p');
        miNodoPrecio.classList.add('card-text');
        miNodoPrecio.textContent = `${info.precio}${divisa}`;
        // Boton 
        const miNodoBoton = document.createElement('button');
        miNodoBoton.classList.add('btn', 'btn-primary');
        miNodoBoton.textContent = '+';
        miNodoBoton.setAttribute('marcador', info.id);
        miNodoBoton.addEventListener('click', anyadirProductoAlCarrito);
        // Insertamos
        miNodoCardBody.appendChild(miNodoImagen);
        miNodoCardBody.appendChild(miNodoTitle);
        miNodoCardBody.appendChild(miNodoPrecio);
        miNodoCardBody.appendChild(miNodoBoton);
        miNodo.appendChild(miNodoCardBody);
        DOMitems.appendChild(miNodo);
    });
}

/* Evento para añadir un producto al carrito de la compra*/
function anyadirProductoAlCarrito(evento) {
    carrito.push(evento.target.getAttribute('marcador'))

    renderizarCarrito();

}

/* Dibuja todos los productos guardados en el carrito*/
function renderizarCarrito() {
    DOMcarrito.textContent = '';

    const carritoSinDuplicados = [...new Set(carrito)];
    // Generamos los Nodos a partir de carrito
    carritoSinDuplicados.forEach((item) => {
        
        const miItem = baseDeDatos.filter((itemBaseDatos) => {
            
            return itemBaseDatos.id === parseInt(item);
        });
    
        const numeroUnidadesItem = carrito.reduce((total, itemId) => {
            
            return itemId === item ? total += 1 : total;
        }, 0);
       
        const miNodo = document.createElement('li');
        miNodo.classList.add('list-group-item', 'text-right', 'mx-2');
        miNodo.textContent = `${numeroUnidadesItem} x ${miItem[0].nombre} - ${miItem[0].precio}${divisa}`;
        // Boton de borrar
        const miBoton = document.createElement('button');
        miBoton.classList.add('btn', 'btn-danger', 'mx-5');
        miBoton.textContent = 'X';
        miBoton.style.marginLeft = '1rem';
        miBoton.dataset.item = item;
        miBoton.addEventListener('click', borrarItemCarrito);
        
        miNodo.appendChild(miBoton);
        DOMcarrito.appendChild(miNodo);
    });
    
    DOMtotal.textContent = calcularTotal();
}

/*Evento para borrar un elemento del carrito*/

function borrarItemCarrito(evento) {
    const id = evento.target.dataset.item;
    carrito = carrito.filter((carritoId) => {
        return carritoId !== id;
    });
    renderizarCarrito();
}

/*Calcula el precio total teniendo en cuenta los productos repetidos*/
function calcularTotal() {
    return carrito.reduce((total, item) => {
        const miItem = baseDeDatos.filter((itemBaseDatos) => {
            return itemBaseDatos.id === parseInt(item);
        });
        return total + miItem[0].precio;
    }, 0).toFixed(2);
}

/* Varia el carrito y vuelve a dibujarlo*/
function vaciarCarrito() {
    carrito = [];
    renderizarCarrito();
}

// Eventos
DOMbotonVaciar.addEventListener('click', vaciarCarrito);

// Inicio
renderizarProductos();
renderizarCarrito();

$('#myModal').on('shown.bs.modal', function () {
    $('#myInput').trigger('focus')
  })


/*API clima*/

let  API_URL = 'https://api.tomorrow.io/v4/timelines?location=-34.6037232,-58.3815931&fields=temperature&timesteps=1h&units=metric&apikey=i1CLD6IVRRNhOjI4bghO32Fk1p3aGPTP';
let infoAPI;
let lblTemperatura = document.getElementById('Temperatura');

async function ConsumirOtraAPI(){

  await fetch(API_URL)
  .then(response => response.json())
  .then(data => infoAPI = data);
  
  lblTemperatura.innerHTML ='La temperatura en Buenos Aires es de: ' +  infoAPI['data']['timelines'][0].intervals[0].values.temperature;

}  


//.then(data => console.log(data));


