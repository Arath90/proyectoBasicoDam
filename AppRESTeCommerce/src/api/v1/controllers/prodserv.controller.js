//*Crear controlador para Productos y Servicios GET API 
//prodserv.controller.js
//!NOTA 6.3
/**
 * Controlador para la gestión de productos y servicios.
 * Expone endpoints para obtener la lista completa y un producto/servicio específico.
 * Utiliza los servicios definidos en ProdServServices y gestiona errores con Boom.
 */

import * as ProdServServices from '../services/prodServ.service';
import boom from '@hapi/boom';
import express from 'express'; //!se importa express pq req,res,next son parametros que se pasan automaticamente en las funciones de express
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
//-----------------------------------------------------------------------------
// Nota 7.2 Crear controlador para Productos y Servicios POST API
//-----------------------------------------------------------------------------
// Controlador POST para Productos y Servicios
/**
 *Este método maneja la creación de un nuevo producto o servicio en la colección.
 * Recibe los datos del nuevo producto/servicio en el cuerpo de la solicitud (req.body),
 * los envía al servicio correspondiente para guardarlos en la base de datos,
 * y responde al cliente con el resultado.
 *
 * Parámetros:
 * - req: Objeto de solicitud HTTP. Aquí se recibe el JSON con los datos del nuevo producto/servicio.
 * - res: Objeto de respuesta HTTP. Se usa para enviar el resultado al cliente.
 * - next: Función para pasar el control al siguiente middleware en caso de error.
 *
 * Flujo detallado:
 * 1. Obtiene el objeto con los datos del nuevo producto/servicio desde req.body.
 * 2. Llama al servicio postProdServItem para intentar guardar el registro en la base de datos y espera su respuesta.
 * 3. Valida la respuesta del servicio:
 *    - Si no se pudo crear, lanza un error 400 (badRequest) usando Boom.
 *    - Si se creó correctamente, responde con status 201 y el objeto guardado en formato JSON.
 * 4. Si ocurre cualquier error en el proceso, lo imprime en consola y lo pasa al middleware de manejo de errores.
 */

export const postProdServItem = async (req, res, next) => { 
  try { 
    // 1. Obtener los datos enviados por el cliente.
    const paProdServItem = req.body; 

    // 2. Intentar guardar el nuevo producto/servicio usando el servicio correspondiente.
    const newProdServItem = await ProdServServices.postProdServItem(paProdServItem); 

    // 3. Validar la respuesta del servicio.
    if (!newProdServItem) { 
      // Si no se pudo crear, lanzar error 400.
      throw boom.badRequest('No se pudo crear el Producto y/o Servicio.'); 
    } else { 
      // Si se creó correctamente, responder con status 201 y el objeto creado.
      res.status(201).json(newProdServItem); 
    } 
  } catch (error) { 
    // 4. Manejar cualquier error inesperado.
    console.log(error); 
    next(error); 
  } 
};
//!nota 8.2------------------------------------------------------------------
// PUT: Actualizar un Producto/Servicio por IdProdServOK (default) o IdProdServBK (?keyType=BK)
export const putProdServItem = async (req, res, next) => {
  try {
    const { id } = req.params;                 // valor de la clave (OK o BK)
    console.log('Controller id:', id);
    const keyType = req.query.keyType || 'OK'; // 'OK' | 'BK'
    console.log('keyType:', keyType);
    const body = req.body;
    console.log('Controller body:', body);
    // prioridad: header X-User -> req.user?.email -> 'system'
    const userId = req.headers['x-user'] || req.user?.email || 'system';

    const updated = await ProdServServices.putProdServItem(id, body, keyType, userId);
    console.log('Actualizado:', updated);
    if (!updated) {
      throw boom.notFound('No se encontró el Producto/Servicio a actualizar.');
    }

    res.status(200).json(updated);
  } catch (error) {
    next(error);
  }
};
//!NOTA 8.2.1---------------------------------------------------------------------------
// PUT: Upsert de items en un arreglo dentro del documento ProdServ
//upsert es una operacion que actualiza un documento si existe o lo crea si no existe 
// en este caso se hace un upsert de items en un arreglo dentro del documento ProdServ
// el arreglo se especifica en la ruta :arrayName
// los items a insertar/actualizar se pasan en el body { items: [...], matchKeys?: [...] }
export const upsertArrayItems = async (req, res, next) => {
  try {
    const { id, arrayName } = req.params;      // /prodserv/:id/array/:arrayName
    const keyType = req.query.keyType || 'OK'; // ?keyType=OK|BK
    const userId = req.user?.email || req.headers['x-user'] || 'system';

    const { items, matchKeys } = req.body;     // { items: [...], matchKeys?: [...] }

    const result = await ProdServServices.upsertArrayItemsProdServ(
      id,
      items,
      arrayName,
      matchKeys,
      keyType,
      userId
    );

    if (!result || !result.success) {
      throw boom.badImplementation('No se pudo realizar el upsert del arreglo.');
    }

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
//!NOTA 9.2---------------------------------------------------------------------------
export const deleteProdServItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    const keyType = req.query.keyType || 'OK';
    const deleted = await ProdServServices.deleteProdServItem(id, keyType);
    if (!deleted) {
      return next(boom.notFound('No se encontró el Producto y/o Servicio para eliminar.'));
    }
    res.status(200).json({ success: true, deleted });
  } catch (error) {
    next(error);
  }
};

