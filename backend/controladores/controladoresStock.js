const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { MongoClient } = require('mongodb');
const { ObjectId } = require('mongodb');    //modulos

const controladores = {};

const URL = "mongodb://root:example@192.168.44.112:27017/"; //url de coneccion a Mongodb



const UsuarioSchema = new Schema({          //Esquema del documento
    nombre: { type: String, unique: true },
    Distruibidor: { type: String, },
    Precio: { type: String, },
    Stock: { type: String, },
})

const modelo_usuario = mongoose.model('userSchema', UsuarioSchema);

const cliente = new MongoClient(URL);

const dbnombre = "Stock";
const coleccion = "Stock";
let DB_coleccion = cliente.db(dbnombre).collection(coleccion); //node_prueba.Usuarios

controladores.Crear_Usuario = async (req, res) => {
    try {
        const { nombre, email, contraseña } = req.body;
       

        const usuario = new modelo_usuario();
        usuario.nombre = nombre;
        usuario.email = email;
        usuario.contraseña = contraseña;

        let insertar_usuario = await DB_coleccion.insertOne(usuario);
        console.log("id del usuario recien creado " + insertar_usuario.insertedId);
        res.send({
            Creacion: true,
            inserted_id: insertar_usuario.insertedId
        });
    } catch (error) {
        console.log("Ocurrio un error al crear un usuario" + error);
    }
}
controladores.Obtener_Usuario = async (req, res) => {
    try {
        console.log("llego");
        const { _id } = req.body;
        console.log(req.body);
        let Obtener_Usuario = await DB_coleccion.findOne({ "_id": new ObjectId(_id) });
        console.log(Obtener_Usuario);
        res.send(Obtener_Usuario);

    } catch (error) {
        console.log("ocurrio un error al obtener un usuario" + error);
    }
}
controladores.Modificar_Usuario = async (req, res) => {
    try {

        let { _id } = req.params;
        let { nombre, email, contraseña } = req.body;

        let filtro = { "_id": new ObjectId(_id) };
        let modificacion = { $set: { "nombre": nombre, "email": email, "contraseña": contraseña_hasheada } };
        let Documento_Encontrado = await DB_coleccion.findOne(filtro);

        await DB_coleccion.updateOne({ "_id": Documento_Encontrado._id }, modificacion);
        let Documento_Editado = await DB_coleccion.findOne({ "_id": new ObjectId(_id) });

        setTimeout(() => {
            console.log(Documento_Editado);
            res.send({ Modificacion: true });
        }, 1000);

    } catch (error) {
        console.log("Ocurrio un error al modificar un usuario" + error);
    }

}
controladores.Obtener_Usuarios = async (req, res) => {
    try {
        let Todos_Los_Documentos = await DB_coleccion.find({}).toArray();

        res.send(Todos_Los_Documentos);

    } catch (error) {
        console.log("Ocurrio un error al obtener todos los usuarios" + error);
    }
}
controladores.Borrar_Usuarios = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id);
        let Encontrar_Documento = await DB_coleccion.findOne({ "_id": new ObjectId(id) });
        console.log(Encontrar_Documento);
        setTimeout(async () => {
            let Borrar_Usuario = await DB_coleccion.deleteOne({ "_id": new ObjectId(Encontrar_Documento._id) });
            console.log(Borrar_Usuario);
        }, 1000)
        res.send({ Eliminacion: true });

    } catch (error) {
        console.log("Ocurrio un error al borrar un usuario" + error);
    }
}

module.exports = controladores;