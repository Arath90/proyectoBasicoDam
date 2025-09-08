//*Crear controlador para Productos y Servicios GET API 
//!NOTA 6.3
/**
 * Controlador para la gestión de productos y servicios.
 * Expone endpoints para obtener la lista completa y un producto/servicio específico.
 * Utiliza los servicios definidos en ProdServServices y gestiona errores con Boom.
 */

import * as ProdServServices from '../services/prodServ.service';
import boom from '@hapi/boom';

// -----------------------------------------------------------------------------
// *GET: Todos los Productos/Servicios.
// Endpoint para obtener todos los productos/servicios registrados.
// Utiliza el servicio getProdServList().
// Si no hay resultados, lanza un error 404 con Boom.
// Si hay resultados, responde con status 200 y el arreglo en formato JSON.
export const getProdServList = async (req, res, next) => {
    try {
        const prodServList = await ProdServServices.getProdServList(); // Consulta todos los productos/servicios.
        if (!prodServList) {
            throw boom.notFound('No se encontraron productos/servicios registrados.'); // Error 404 si no hay datos.
        } else if (prodServList) {
            res.status(200).json(prodServList); // Responde con los datos en formato JSON.
        }
    } catch(error) {
        next(error); // Pasa el error al middleware de manejo de errores.
    }
};

// -----------------------------------------------------------------------------
// *GET: Solo un Producto/Servicio.
// Endpoint para obtener un producto/servicio específico por id y tipo de clave.
// Extrae el parámetro id de la URL y keyType de la query (por defecto 'OK').
// Utiliza el servicio getProdServItem().
// Si no hay resultado, lanza un error 404 con Boom.
// Si hay resultado, responde con status 200 y el objeto en formato JSON.
export const getProdServItem = async (req, res, next) => {
    try {
        const { id } = req.params; // Obtiene el id del producto/servicio desde la URL.
        const keyType = req.query.keyType || 'OK'; // Obtiene el tipo de clave, por defecto 'OK'.
        const prodServItem = await ProdServServices.getProdServItem(id, keyType); // Consulta el producto/servicio.
        if (!prodServItem) {
            throw boom.notFound('No se encontraron productos/servicios registrados.'); // Error 404 si no hay datos.
        } else if (prodServItem) {
            res.status(200).json(prodServItem); // Responde con el dato en formato JSON.
        } 
    } catch(error){
        next(error); // Pasa el error al middleware de manejo de errores.
    }
};

/* 
!Resumen:
!Cada función del controlador está diseñada para recibir solicitudes HTTP,
!invocar el servicio correspondiente, manejar los parámetros y errores,
!y responder con el formato y código adecuado según el resultado.
!La documentación explica el propósito, parámetros y flujo de cada endpoint.
*/