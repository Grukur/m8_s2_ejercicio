import Producto from "../models/Producto.models.js";
import Usuario from "../models/Usuario.models.js";
import fs from "fs";

export const findAllProductos = async (req, res) => {
    try {
        let productos = await Producto.findAll({
            attributes: { exclude: ['createdAt', 'updatedAt'] }
        });
        res.status(200).json({
            code: 200,
            message: 'Ok',
            data: productos
        })
    } catch (error) {
        res.status(500).json({
            code: 500,
            message: 'Error al consultar los productos'
        })
    }
};

export const addProductos = async (req, res) => {
    let usuarioToken = req.usuario;
    let usuarioDB = await Usuario.findByPk(usuarioToken);
    if(!usuarioDB.admin){
        return res.status(403).json({
            code:403,
            message:`Usted no tiene los permisos necesarios para crear productos`
        })
    }

    let { nombre, descripcion, precio } = req.body;
    try {
        let productoCreado = await Producto.create({
            nombre,
            descripcion,
            precio: Number(precio),
            img: req.nombreImagen,
            rutaImagen:`/public/uploads/${req.nombreImagen}`,
            publicIdImagen: 0
        });

        res.status(201).json({
            code: 201,
            message: "Producto se cargó con éxito",
            data: productoCreado,
        });
    } catch (error) {
        console.log(`Error al crear el productoo ${error}`);
        fs.unlinkSync(req.pathImagen);
        res.status(500).send({
            code: 500,
            message: 'Error al crear el producto en la base de datos'
        })
    }
};
