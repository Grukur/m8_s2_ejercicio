import { Router } from "express";
import {findAllProductos, addProductos} from '../controllers/productos.controller.js'
import {findAllProductosCloud, addProductosCloud} from '../controllers/productosCloud.controller.js'
import upload from '../middlewares/upload.middleware.js'; //middleware base de dato
import {uploadFiles} from '../middlewares/cloud.middleware.js'; //middleware cloud

const router = Router();

// ruta findAll productos
router.get("/", findAllProductos)
router.get("/cloud", findAllProductosCloud)

//ruta post productos
router.post('/', upload, addProductos)
router.post('/cloud', uploadFiles, addProductosCloud)

export default router;