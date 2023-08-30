let API = "http://127.0.0.1:3100"
let nombres = document.getElementById("nombres");
let distribuidor = document.getElementById("distribuidor");
let Precio = document.getElementById("Precio");
let Stock = document.getElementById("Stock").value;
let Link = document.getElementById("link");
let boton = document.getElementById("boton");
boton.addEventListener("click",async function  handle_submit(e) {
    e.preventDefault()
    let nombres_value = nombres.value;
    let distribuidor_value = distribuidor.value;
    let Precio_value = Precio.value;
    let Stock = document.getElementById("Stock").value;

    let Stock_value = Stock.value;
    let Link_value = Link.value;
    console.log(Stock)
    const respuesta = await fetch(`${API}/Crear_Producto`,{
      method:["POST"],
      headers:{"Content-Type":"application/json"
    },
    body: JSON.stringify ({
      nombre:nombres_value,
      distribuidor:distribuidor_value,
      precio:Precio_value,
      stock:Stock_value,
      link:Link_value,


    })
    })
    
        let res = await respuesta.json();
        console.log(res);

   
  })