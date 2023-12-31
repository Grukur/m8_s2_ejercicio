import { Router } from "express";
import {findAllProductos, addProductos} from '../controllers/productos.controller.js'
import {findAllProductosCloud, addProductosCloud} from '../controllers/productosCloud.controller.js'
import upload from '../middlewares/upload.middleware.js'; //middleware base de dato
import {uploadFiles} from '../middlewares/cloud.middleware.js'; //middleware cloud
import  {verifyToken, validarAdmin}   from "../middlewares/auth.middleware.js";

const router = Router();

// ruta findAll productos
router.get("/", findAllProductos)
router.get("/cloud", findAllProductosCloud)

//ruta post productos
router.post('/',verifyToken, validarAdmin, upload, addProductos)
router.post('/cloud',verifyToken, validarAdmin, uploadFiles, addProductosCloud)


export default router;