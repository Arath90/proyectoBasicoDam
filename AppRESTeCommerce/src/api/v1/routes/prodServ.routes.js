//Commerce
//!NOTA 6.4
import { Router } from 'express'; 
import * as prodServController from '../controllers/prodserv.controller';
const router = Router(); 
router.get('/', prodServController.getProdServList);
router.get('/:id', prodServController.getProdServItem);
export default router;
//!NOTA 7.3
// POST (ADD) Productos y/o Servicios.
// Esta ruta permite crear un nuevo producto o servicio en la colección "cat_prod_serv" de MongoDB.
// 
// Detalle de funcionamiento:
// *1. El endpoint POST '/' recibe una solicitud HTTP con los datos del nuevo producto/servicio en el cuerpo (req.body).
// *2. Llama al controlador postProdServItem, que se encarga de procesar y validar los datos recibidos.
// *3. El controlador envía los datos al servicio correspondiente para guardarlos en la base de datos.
// *4. Si la creación es exitosa, responde al cliente con status 201 (Created) y el objeto creado en formato JSON.
// *5. Si ocurre algún error (por ejemplo, datos inválidos o problemas de conexión), el controlador usa Boom para generar un error HTTP adecuado y lo pasa al middleware de manejo de errores.
// 
// Ejemplo de uso:
// POST /api/v1/prod-serv
// Body (JSON):
// {
//   "IdProdServPK": 3,
//   "DesProdServ": "Teclado HP",
//   ...
// }
// en resumen en base a los pasos de arriba: cliente -> endpoint POST -> controlador -> servicio -> base de datos -> respuesta al cliente
// asi que aqui precisasmente solo se agrega la ruta al router y se indica que use el controlador postProdServItem
// que es el que maneja la logica de crear un nuevo producto o servicio con el codigo prodServ.controller.js 
// !llamando a la funcion postProdServItem

router.post('/', prodServController.postProdServItem);