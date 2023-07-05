import app from './src/app.js';
import sequelize from './src/database/database.js';

//modelos
import './src/models/Producto.models.js';


let PORT = process.env.PORT || 3000;

const main = async() => {
    try {
        await sequelize.authenticate();
        console.log("Conexion a la base de datos establecida");
        await sequelize.sync({force:true, alter:true})


        app.listen(PORT, ()=> console.log('Servidor escuchando en puerto: ' + PORT));

    } catch(error){
        console.log('ha ocurrido un error', error)
    }
}

main()
