const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { MongoClient } = require('mongodb');
const { ObjectId } = require('mongodb');    //modulos

const controladores = {};

const URL = "mongodb://root:example@192.168.44.112:27017/"; //url de coneccion a Mongodb



const ProductoSchema = new Schema({          //Esquema del documento
    nombre: { type: String, unique: true },
    Distruibidor: { type: String, },
    Precio: { type: String, },
    Stock: { type: String, },
    link: { type: String, },
})

const modelo_producto = mongoose.model('ProductoSchema', ProductoSchema);

const cliente = new MongoClient(URL);

const dbnombre = "Stock";
const coleccion = "Stock";
let DB_coleccion = cliente.db(dbnombre).collection(coleccion); //node_prueba.Usuarios

controladores.Crear_Producto = async (req, res) => {
    try {
        const { nombre,  distribuidor, precio, stock, link  } = req.body;
     
       

        const producto = new modelo_producto();
        producto.nombre = nombre;
        producto.distribuidor = distribuidor;
        producto.precio = precio;
        producto.stock = stock;
        producto.link = link;

        let insertar_usuario = await DB_coleccion.insertOne(producto);
        console.log("id del usuario recien creado " + insertar_usuario.insertedId);
        res.send({
            Creacion: true,
            inserted_id: insertar_usuario.insertedId
        });
    } catch (error) {
        console.log("Ocurrio un error al crear un usuario" + error);
    }
}


module.exports = controladores;