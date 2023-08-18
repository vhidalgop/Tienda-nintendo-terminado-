const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const controladores = require('./controladores/controladoresStock')
let puerto = 3100;

app.use(express.urlencoded({ extended: true }))

app.use(express.json({ type: "*/*" }))

app.use(cors())



app.post('/Crear_Usuario', controladores.Crear_Usuario)

app.post('/Obtener_Usuario', controladores.Obtener_Usuario)

app.put('/Modificar_Usuario/:_id', controladores.Modificar_Usuario)

app.get('/Obtener_Usuarios', controladores.Obtener_Usuarios)

app.delete('/Borrar_Usuario/:id', controladores.Borrar_Usuarios)

app.listen(puerto, () => {
    console.log("el servidor esta corriendo en el puerto " + puerto);
})
// {
//     "nombre": "Matias",
//     "email": "Matias@gmail.com",
//     "contraseña": "45678"
//   }