import Usuario from "../models/Usuario.models.js";
import {deleteFile} from '../middlewares/cloud.middleware.js'; //middleware cloud


export const findAllUsuario = async(req, res) => {
    try {
        let usuarios = await Usuario.findAll({
            attributes: {exclude: ["createdAt", "updatedAt"]}
        });
        res.json({code: 200, message:"OK", data: usuarios})
    } catch (error) {
        console.log()
        res.status(500).json({code: 500, message: "Error al consultar los usuarios."})
    }
};

export const addUsuario = async (req, res) => {
    let { nombre, rut, email, password } = req.body;
    try {
        let nuevoUsuario = await Usuario.create({
            nombre,
            rut,
            email,
            password
        });

        res.status(201).json({
            code: 201,
            message: `Usuario ${nombre} creado con éxito con el id ${nuevoUsuario.id}`,
        });
    } catch (error) {
        res.status(500).json({code: 500, message:"Error al crear el usuario en la base de datos."})
    }
};


export const login = (req, res) => {
    try{
        res.json({
            code: 200,
            message: `login correcto`,
            token : req.token
        })
    } catch(error){
        console.log(error)
    }
}