import { Router } from "express";
import {findAllUsuario, addUsuario, login} from '../controllers/usuarios.controller.js';
import { emitToken } from "../middlewares/auth.middleware.js";

const router = Router();

// ruta findAll Usuario
router.get("/", findAllUsuario)
router.post('/', addUsuario)
router.post('/login', emitToken, login)


export default router;