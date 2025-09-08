import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import config from './config/config';
import routeAPI from './api/v1/routes/index.js';
//se declara la app de express y se configuran los middlewares generales y las rutas de la aplicacion.
//luego se exporta la app para que pueda ser usada en otros archivos del proyecto.
const app = express();
//FIC: Establece la conexion a la BD 
import { mongoose } from './config/database.config';
// Settings ------------------------------------------------------------------------------------
// estos settings son para que heroku pueda asignar el puerto dinamicamente
app.set('port', config.PORT); //se establece el puerto en el que se ejecutara el servidor, desde config.js
// Middlewares generales-------------------------------------------------------------------------
app.use(cors());//cors es un middleware que permite el acceso a la api desde cualquier origen (dominio) y con cualquier metodo (GET, POST, PUT, DELETE, etc)

app.use(morgan('dev'));//morgan es un middleware que muestra en consola las peticiones que llegan al servidor, asi como su metodo y su estado (200, 404, 500, etc).

app.use(express.json());//express.json es un middleware que permite recibir datos en formato json en el body de las peticiones

app.use(express.urlencoded({ extended: false }));//express.urlencoded es un middleware que permite recibir datos en formato urlencoded en el body de las peticiones
//configuracion de las rutas de la aplicacion--------------------------------------------------
//rutas para ver que el servidor funciona
const api = config.API_URL; //ruta base de la api desde config.js 
app.get(`${api}`, (req,res)=>{//que es este monton de simbolos? es una template string, permite insertar variables en un string usando ${variable}
    res.send(
        `<h1>RESTful running in root (página base)</h1> <p> eCommerce: <b>${api}/api-docs</b> for more information.</p>`
    );
})
//ruta de prueba para comp
// robar que el servidor funciona en otro path
app.get('/DrFIC', (req,res)=>{
    //send es un metodo de express para enviar una respuesta al cliente
    //en este caso se envia un html simple con un enlace a la documentacion de la api
    //se usa template string para poder insertar variables en el string
    res.send(
        `<h1>RESTful running in DrFIC (como comprobacion y prueba)</h1> <p> eCommerce: <b>${api}/api-docs</b> for more information.</p>`
    );
    //express es el nucleo de la  API, y morgan es un middleware que permite ver en consola las peticiones que llegan al servidor
    //cors es otro middleware que permite el acceso a la api desde cualquier origen (dominio) y con cualquier metodo (GET, POST, PUT, DELETE, etc)
    //express.json es un middleware que permite recibir datos en formato json en el body de las peticiones
    //express.urlencoded es un middleware que permite recibir datos en formato urlencoded en el body de las peticiones

})
//exportacion de la app para que pueda ser usada en otros archivos del proyecto
export default app;

// Routes 
//!NOTA 6.4
routeAPI(app);
