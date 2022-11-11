const carrito = document.getElementById('carro');
const juegos = document.getElementById('lista-juegos');
const listajuegos = document.querySelector('#lista-carrito tbody');
const vaciaCarritoBtn = document.getElementById('vaciar-carrito');
const sss = document.querySelector('.sss');

cargarEventListeners();

function cargarEventListeners() {
    juegos.addEventListener('click', comprarjuego);
    carrito.addEventListener('click', eliminarjuego);
    vaciaCarritoBtn.addEventListener('click', vaciarCarrito);
    document.addEventListener('DOMContentLoaded', leerLocalStorage)
    sss.addEventListener('click', ComprarAparte);
}

function comprarjuego(e) {
    e.preventDefault();
    if (e.target.classList.contains('agregar-carrito')) {
        const juego = e.target.parentElement.parentElement;
        LeerDatosJuego(juego);
    }
}

function LeerDatosJuego(juego) {
    const infojuego = {
        imagen: juego.querySelector('img').src,
        titulo: juego.querySelector('h4').textContent,
        precio: juego.querySelector('.precio span').textContent,
        id: juego.querySelector('a').getAttribute('date-id'),
    }
    insertarCarrito(infojuego);
}

function insertarCarrito(juego) {
    const row = document.createElement('tr');
    row.innerHTML = `
    <td>
            <img src="${juego.imagen}" width=100>
        </td>
        <td>${juego.titulo}</td>
        <td>${juego.precio}</td>
        <td>
            <a href="#" class="borrar-juego" data-id="${juego.id}">x</a><
        </td>
    `;
    listajuegos.appendChild(row);
    guardarJuegoLocalStorage(juego);
}

function ComprarAparte (){
    window.open("https://mpago.la/2n4bNj1", "_blank");
}

function eliminarjuego(e) {
    e.preventDefault();

    let juego,
        juegoId;
    if (e.target.classList.contains('borrar-juego')) {
        e.target.parentElement.parentElement.remove();
        juego = e.target.parentElement.parentElement;
        juegoId = juego.querySelector('a').getAttribute('data-id');
    }
    eliminarjuegoLocalStorage(juegoId);
}

function vaciarCarrito() {
    while (listajuegos.firstChild) {
        listajuegos.removeChild(listajuegos.firstChild);
    }
    vaciarLocalStorage();
    return false;

}

function guardarJuegoLocalStorage(juego) {
    let juegos;
    juegos = obtenerjuegosLocalStorage();
    juegos.push(juego);
    localStorage.setItem('juegos', JSON.stringify(juegos))
}

function obtenerjuegosLocalStorage() {
    let juegosLS;
    if (localStorage.getItem('juegos') === null) {
        juegosLS = [];

    } else {
        juegosLS = JSON.parse(localStorage.getItem('juegos'));

    }
    return juegosLS;
}

function leerLocalStorage() {
    let juegosLS;
    juegosLS = obtenerjuegosLocalStorage();
    juegosLS.forEach(function (juego) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${juego.imagen}" width=100>
            </td>
            <td>${juego.titulo}</td>
            <td>${juego.precio}</td>
            <td>
                <a href="#" class="borrar-juego" data-id="${juego.id}>x</a>
            </td>

        `;
        listajuegos.appendChild(row)
    });


}

function eliminarjuegoLocalStorage(juego) {
    let juegosLS;
    juegosLS = obtenerjuegosLocalStorage();
    juegosLS.forEach(function (juegosLS, index) {
        if (juegosLS.id === juego) {
            juegosLS.splice(index, 1)
        }
    });
    localStorage.setItem('juegos', JSON.stringify(juegosLS));
}

function vaciarLocalStorage() {
    localStorage.clear();
}