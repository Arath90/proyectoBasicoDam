import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import config from './config/config';
//se declara la app de express y se configuran los middlewares generales y las rutas de la aplicacion.
//luego se exporta la app para que pueda ser usada en otros archivos del proyecto.
const app = express();
// estos settings son para que heroku pueda asignar el puerto dinamicamente
app.set('port', config.PORT);
// Middlewares generales
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//rutas para ver que el servidor funciona
const api = config.API_URL;
app.get(`${api}`, (req,res)=>{
    res.send(
        `<h1>RESTful running in root (página base)</h1> <p> eCommerce: <b>${api}/api-docs</b> for more information.</p>`
    );
})
//ruta de prueba para comprobar que el servidor funciona en otro path
app.get('/DrFIC', (req,res)=>{
    //send es un metodo de express para enviar una respuesta al cliente
    //en este caso se envia un html simple con un enlace a la documentacion de la api
    //se usa template string para poder insertar variables en el string
    res.send(
        `<h1>RESTful running in DrFIC (como comprobacion y prueba)</h1> <p> eCommerce: <b>${api}/api-docs</b> for more information.</p>`
    );
})
// Routes
// Swagger Docs
// Middleware para el manejo de errores
// Export App
export default app;