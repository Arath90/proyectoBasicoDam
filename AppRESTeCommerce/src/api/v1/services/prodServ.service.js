/**
 * Servicio para la gestión de productos y servicios.
 * Proporciona funciones para consultar la lista completa y buscar por identificadores específicos.
 * Utiliza el modelo ProdServ y gestiona errores con Boom para respuestas HTTP adecuadas.
 */

// Importa el modelo de productos/servicios desde Mongoose.
import ProdServ from '../models/ProdServ';
// Boom se usa para manejar errores HTTP de forma estructurada.
import boom from '@hapi/boom';

// -----------------------------------------------------------------------------
// Obtiene la lista completa de productos y servicios.
// Utiliza ProdServ.find() para traer todos los documentos de la colección.
// Si ocurre un error, lo lanza como error interno HTTP usando Boom.
export const getProdServList = async () => { 
  let prodServList; 
  try { 
    prodServList = await ProdServ.find(); // Consulta todos los productos/servicios.
    return(prodServList); // Devuelve el arreglo de resultados.
  } catch (error) { 
    throw boom.internal(error); // Maneja errores como HTTP 500.
  } 
};

// -----------------------------------------------------------------------------
// Obtiene un producto/servicio por identificador y tipo de clave.
// Parámetros:
//   id: valor del identificador a buscar.
//   keyType: tipo de clave ('OK' para operativa, 'BK' para negocio).
// Utiliza findOne con el campo correspondiente según el tipo.
// Si ocurre un error, lo lanza como error interno HTTP usando Boom.
export const getProdServItem = async (id, keyType) => { 
  let prodServItem; 
  try { 
    if (keyType === 'OK') { 
      prodServItem = await ProdServ.findOne({ IdProdServOK: id }); // Busca por clave operativa.
    } else if (keyType === 'BK') { 
      prodServItem = await ProdServ.findOne({ IdProdServBK: id }); // Busca por clave de negocio.
    } 
    return(prodServItem); // Devuelve el documento encontrado o null.
  } catch (error) { 
    throw boom.internal(error); // Maneja errores como HTTP 500.
  } 
};