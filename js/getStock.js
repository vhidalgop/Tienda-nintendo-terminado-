let API = 'http://localhost:3100'
async function  GetStock() {
    const respuesta = await fetch(`${API}/Obtener_Stock`,{
        method:["GET"],
        headers:{"Content-Type":"application/json"
        },
      })
    let res = await respuesta.json();
    console.log(res);
    for (let i = 0; i < res.length; i++) {
        InsertStock(res[i].nombre,res[i].distribuidor,res[i].precio)
    }


}
GetStock();

function InsertStock(name, company, price) {
    let stockContainer = document.getElementById("StockCont");
    let container = document.createElement("div");
    container.innerHTML = `<div class="four columns">
    <div class="card">
        <a title="Pokemon" href="https://www.youtube.com/watch?v=9RbjFjYgNNg"></a>
        <div class="info-card">
            <h4>${name}</h4>
            <p>${company}</p>
            <p class="precio">
                <span class="u-pull-left">$${price}</span>
            </p>
            <a
                href="#"
                class="u-full-width button-primary button input agregar-carrito"
                data-id="1"
                >Agregar al carro</a
            >
            <a
                href="#"
                class="u-full-width button-primary button input sss"
                
                >ComprarAparte</a
            >
           
           
            
        </div>
    </div>
</div>`
    stockContainer.appendChild(container)
}