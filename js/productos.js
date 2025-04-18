//Base de Datos
const articulos = [
    { "id": 1, "descripcion": "Robusta", "precio": 15571, "ump": "PAQ", "caract": "light roast", "img": "../img/cafe-para-moler.webp", "stock": 10 },
    { "id": 2, "descripcion": "Liberica", "precio": 18841, "ump": "UN", "caract": "medium roast", "img": "../img/cafe-para-moler.webp", "stock": 10 },
    { "id": 3, "descripcion": "Robusta", "precio": 24734, "ump": "PAQ", "caract": "cappuccino", "img": "../img/cafe-para-moler.webp", "stock": 10 },
    { "id": 4, "descripcion": "Excelsa", "precio": 19968, "ump": "PAQ", "caract": "dark roast", "img": "../img/cafe-para-moler.webp", "stock": 10 },
    { "id": 5, "descripcion": "Robusta", "precio": 8638, "ump": "PAQ", "caract": "medium roast", "img": "../img/cafe-para-moler.webp", "stock": 10 },
    { "id": 6, "descripcion": "Catimor", "precio": 5450, "ump": "UN", "caract": "dark roast", "img": "../img/cafe-para-moler.webp", "stock": 10 },
    { "id": 7, "descripcion": "Excelsa", "precio": 6417, "ump": "KG", "caract": "dark roast", "img": "../img/cafe-para-moler.webp", "stock": 10 },
    { "id": 8, "descripcion": "Liberica", "precio": 22577, "ump": "CAP", "caract": "cappuccino", "img": "../img/cafe-para-moler.webp", "stock": 10 },
    { "id": 9, "descripcion": "Arabica", "precio": 11720, "ump": "KG", "caract": "light roast", "img": "../img/cafe-para-moler.webp", "stock": 10 },
    { "id": 10, "descripcion": "Catimor", "precio": 12764, "ump": "KG", "caract": "light roast", "img": "../img/cafe-para-moler.webp", "stock": 10 }]


let carrito = [];


function htmlClear() {
    const container = document.getElementById("container");
    container.innerHTML = ``;
}

function agregarAlCarrito(item, cant) {
    const carritoStorage = sessionStorage.getItem("carrito");
    if(carritoStorage){
        carrito = JSON.parse(carritoStorage);
        if(carrito.some(e => e.articulo.id == item.id)){
            carrito.forEach(e => {
                if(e.articulo.id == item.id){
                    e.cantidad = parseInt(e.cantidad) + cant;
                }
            });
        }else{
            carrito.push({articulo: item, cantidad: cant});
        }
    }else{
        carrito.push({articulo: item, cantidad: cant});
    }

    sessionStorage.setItem("carrito", JSON.stringify(carrito));

}


function htmlArticulos() {

    htmlClear();

    const container = document.getElementById("container");
    const section = document.createElement("section");
    section.id = "seccionParaMoler";

    const h2ParaMoler = document.createElement("h2");
    h2ParaMoler.className = "text-center text-light my-5";
    h2ParaMoler.textContent = "Para que lo muelas...";

    const divRow = document.createElement("div");
    divRow.className = "row g-3"

    articulos.forEach((articulo) => {
        const divGhCard = document.createElement("div")
        divGhCard.className = "col-12 col-md-4 col-lg-3 gh-card";

        const divCard = document.createElement("div")
        divCard.className = "card"

        const imgImg = document.createElement("img");
        imgImg.src = articulo.img;
        imgImg.className = "card-img-top";
        imgImg.alt = "cafe para moler";

        const divCardBody = document.createElement("div");
        divCardBody.className = "card-body"

        const h5Nombre = document.createElement("h5");
        h5Nombre.className = "card-title";
        h5Nombre.textContent = articulo.descripcion;

        const h6Precio = document.createElement("h6");
        h6Precio.className = "card-subtitle mb-2 text-body-secondary";
        h6Precio.textContent = "$" + parseInt(articulo.precio).toFixed(2);

        const span = document.createElement("span");
        span.textContent = "Por " + articulo.ump;

        const pCaract = document.createElement("p");
        pCaract.className = "card-text";
        pCaract.textContent = articulo.caract;

        const inputCantPedida = document.createElement("input");
        inputCantPedida.type = "number";
        inputCantPedida.min = "1";
        inputCantPedida.value = inputCantPedida.min;
        inputCantPedida.max = parseInt(articulo.stock)

        const aAlcarrito = document.createElement("a");
        aAlcarrito.className = "btn btn-primary";
        aAlcarrito.textContent = "al carrito";
        aAlcarrito.onclick = () => agregarAlCarrito(articulo, parseInt(inputCantPedida.value));

        divCardBody.append(h5Nombre, h6Precio, span, pCaract, inputCantPedida, aAlcarrito);
        divCard.append(imgImg, divCardBody);
        divGhCard.appendChild(divCard);
        divRow.appendChild(divGhCard)
    })

    section.append(h2ParaMoler, divRow);
    container.appendChild(section);

}


htmlArticulos();