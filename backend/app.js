const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const controladores = require('./controladores/controladoresStock')
let puerto = 3100;

app.use(express.urlencoded({ extended: true }))

app.use(express.json({ type: "*/*" }))

app.use(cors())



app.post('/Crear_Producto', controladores.Crear_Producto);
app.get('/Obtener_Stock', controladores.Obtner_Stock);

app.listen(puerto, () => {
    console.log("el servidor esta corriendo en el puerto " + puerto);
})
// {
//     "nombre": "Matias",
//     "email": "Matias@gmail.com",
//     "contraseña": "45678"
//   }