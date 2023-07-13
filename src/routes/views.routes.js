import { Router } from "express";
import {findAllProductos, addProductos} from '../controllers/productos.controller.js'
import {findAllProductosCloud, addProductosCloud} from '../controllers/productosCloud.controller.js'
import upload from '../middlewares/upload.middleware.js'; //middleware base de dato
import {uploadFiles} from '../middlewares/cloud.middleware.js'; //middleware cloud
import  {verifyToken, validarAdmin}   from "../middlewares/auth.middleware.js";
import Usuario from "../models/Usuario.models.js";

const router = Router();

router.get("/home", (req, res) => {
    res.send('Vista Home')
})
router.get("/perfil", (req, res) => {
    res.send(`<h1>Bienvenido Usuario: </h1>`)
})


export default router;