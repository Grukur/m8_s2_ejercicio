import jwt from 'jsonwebtoken';
import Usuario from '../models/Usuario.models.js';

const secret = process.env['JWT_SECRET'];

export const emitToken = async(req, res, next) => {
    let {email, password} = req.body;
    let usuario = await Usuario.findOne({
        where: {email, password},
        attributes: ['id', 'nombre', 'rut', 'email']
    })

    if(!usuario){
        return res.status(401).send('Credenciais inválidas');
    }

    let token = jwt.sign(JSON.stringify(usuario), process.env.PASSWORD_SECRET)
    req.token = token;
    next();
}

export const verifyToken = (req, res, next) => {
    try{
        let token = req.headers['authorization'];
        token = token.split(' ')[1];
        console.log(token)
        if(!token.length > 0){
            throw new Error('No se ha proporcionado un token valido')
        }

        jwt.verify(token, process.env.PASSWORD_SECRET, (error, decoded) => {
            if(error){
                res.status(401).json({
                    code:401,
                    message:`Debe proporcionar un toke vaildo`
                })
            }
            req.usuario = decoded
            next()
        })
    }catch(error){
        console.log(error)
    }
}

export const validarAdmin = async(req, res, next) => {
    let usuarioToken = req.usuario;
    let usuario = await Usuario.findByPk(usuarioToken.id)
    if(!usuario){
        return res.status(400).json({code:400, message: 'Usuario ya no exiate en el sistema'})
    }
    if(!usuario.admin){
        return res.status(400).json({code:400, message: 'Usted no tiene los permisos necesarios para agregar Productos'})
    }
    next()
}

export const validarUser = async(req, res, next) => {
    try{
        let usuarioToken = req.usuario;
        let usuario = await Usuario.findByPk(usuarioToken.id);
        if(!usuario){
            return res.status(403).json({message:'El ususario no es valido'})
        }
        res.send(`<h1>Bienvenido ${usuario.nombre}</h1>`)
    }catch(error){

    }
}