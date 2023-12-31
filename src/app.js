import express from 'express';
import upload from 'express-fileupload';
import cors from 'cors';
import morgan from 'morgan';
import * as path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

//inportacion de rutas
import productosRoutes from './routes/productos.routes.js'
import usuariosRoutes from './routes/usuarios.routes.js'
import viewsRoutes from './routes/views.routes.js'

const app = express();

//middlewares generales
app.use(cors());
app.use(morgan('tiny'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(upload());

//Publicacion de carpeta
app.use('/public', express.static(path.resolve(__dirname, '../public/')))


//rutas
app.use('/api/v1/productos', productosRoutes)
app.use('/api/v1/usuarios', usuariosRoutes)
app.use('/', viewsRoutes)

export default app;