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

//-----------------------------------------------------------------------------
// Nota 7.1 postProdServ

//Commerce
// POST (ADD) Productos y/o Servicios.
// Recibe un objeto con la estructura del modelo ProdServ.
// Crea una nueva instancia del modelo y la guarda en la base de datos.
// Retorna el documento guardado o lanza un error si ocurre algún problema.

export const postProdServItem = async (paProdServItem) => {
	try {
		const newProdServItem = new ProdServ(paProdServItem);

		return await newProdServItem.save();//basicamente guarda el nuevo item en la base de datos y lo retorna 
    // para que pueda ser usado despues.
    /* EJEMPLO EN BASE AL MODELO DE PROD SERV
    {
      *"IdProdServOK": "PS1001",
      *"IdProdServBK": "BK1001",
      *"Name": "Producto de Ejemplo",
      *"Description": "Descripción del producto de ejemplo",
      *"Price": 29.99,
      *"Stock": 100,
      *"Category": "Electrónica"
  }

  !SON TODOS? LOS CAMPOS REQUERIDOS? NO, SOLO LOS QUE SON REQUERIDOS EN EL MODELO,
  !LOS DEMAS SON OPCIONALES Y PUEDEN SER AGREGADOS SEGUN LA NECESIDAD.
  !TAMBIEN SE PUEDEN AGREGAR CAMPOS ADICIONALES SI EL MODELO LO PERMITE.
  !ESTO ES SOLO UN EJEMPLO BASICO PARA ILUSTRAR EL USO DE LA FUNCION.
    */
	} catch (error) { //!aqui ya se maneja el erorr
  //el error en especifico es un error de validacion de mongoose directo de la libraria
  //por lo que no es necesario usar boom
		throw error;
	}
};
// PUT (MODIFY) Productos y/o Servicios

export const putProdServItem = async (id, paProdServItem, keyType = 'OK', userId = 'system') => {
  try {
    const filter = keyType === 'BK' ? { IdProdServBK: id } : { IdProdServOK: id };

    // 1) Bloquear claves
    const blocklist = ['IdProdServPK', 'IdProdServOK', 'IdProdServBK', '_id'];
    const payload = { ...paProdServItem };
    for (const k of blocklist) delete payload[k];

    // 2) Construir $set sin colisiones
    const now = new Date();
    const setOps = {};

    // 2a) Si vino detail_row en el body, lo "aplanamos"
    if (payload.detail_row && typeof payload.detail_row === 'object') {
      const allowedDetail = ['UsuarioReg', 'FechaReg', 'UsuarioMod', 'FechaUltMod', 'Activo', 'Borrado'];
      for (const [k, v] of Object.entries(payload.detail_row)) {
        if (allowedDetail.includes(k)) {
          setOps[`detail_row.${k}`] = v;
        }
      }
      delete payload.detail_row; // <-- muy importante para evitar conflicto
    }

    // 2b) El resto de campos del documento
    for (const [k, v] of Object.entries(payload)) {
      setOps[k] = v;
    }

    // 2c) Forzamos trazabilidad de modificación
    setOps['detail_row.FechaUltMod'] = now;
    setOps['detail_row.UsuarioMod'] = userId;

    // 3) Update
    const updated = await ProdServ.findOneAndUpdate(
      filter,
      { $set: setOps },
      { new: true, runValidators: true }
    );

    return updated;
  } catch (error) {
    throw boom.badImplementation(error);
  }
};
//!NOTA 8.1.1---------------------------------------------------------------------------
// Inferir claves de coincidencia si no se especifican
const defaultMatchKeysByArray = {
  cat_prod_serv_estatus: ['IdTipoGenEstatusOk', 'IdGenEstatusOk'],
  cat_prod_serv_archivos: ['IdTipoGenArchivoOK', 'IdGenArchivoOK'],
};

// Normaliza claves (por si el payload llega con variaciones)
const normalizeObj = (obj = {}) => {
  const out = { ...obj };
  // puedes agregar mapeos/normalizaciones si tus claves a veces varían
  return out;
};

/**
 * Upsert de elementos dentro de un arreglo de cat_prod_serv (estatus o archivos).
 * @param {string} id valor de la clave (OK o BK)
 * @param {Array<Object>} items elementos a upsert
 * @param {string} arrayName 'cat_prod_serv_estatus' | 'cat_prod_serv_archivos'
 * @param {Array<string>} matchKeys claves para encontrar el elemento existente (si omites, se infieren)
 * @param {string} keyType 'OK' | 'BK'
 * @param {string} userId usuario que modifica (para trazabilidad)
 */
export const upsertArrayItemsProdServ = async (
  id,
  items,
  arrayName,
  matchKeys,
  keyType = 'OK',
  userId = 'system'
) => {
  try {
    if (!Array.isArray(items) || items.length === 0) {
      throw boom.badRequest('Debes enviar un arreglo de items a upsert.');
    }

    if (!['cat_prod_serv_estatus', 'cat_prod_serv_archivos'].includes(arrayName)) {
      throw boom.badRequest('arrayName inválido.');
    }

    const now = new Date();
    const filterBase = keyType === 'BK' ? { IdProdServBK: id } : { IdProdServOK: id };
    const _matchKeys = (matchKeys && matchKeys.length > 0)
      ? matchKeys
      : defaultMatchKeysByArray[arrayName];

    let pushed = 0;
    let setted = 0;

    for (const rawItem of items) {
      const item = normalizeObj(rawItem);

      // Asegurar trazabilidad en el subdoc si no viene
      if (!item.detail_row) item.detail_row = {};
      if (!item.detail_row.FechaReg) item.detail_row.FechaReg = now;
      if (!item.detail_row.UsuarioReg) item.detail_row.UsuarioReg = userId;
      item.detail_row.FechaUltMod = now;
      item.detail_row.UsuarioMod = userId;

      // Construir elemMatch dinámico
      const elemMatch = {};
      for (const k of _matchKeys) {
        if (item[k] === undefined) {
          throw boom.badRequest(`El item no contiene la clave de coincidencia requerida: ${k}`);
        }
        elemMatch[k] = item[k];
      }

      // 1) ¿Existe ya un elemento que matchee?
      const exists = await ProdServ.findOne({
        ...filterBase,
        [arrayName]: { $elemMatch: elemMatch },
      }).lean();

      if (!exists) {
        // 2) PUSH nuevo elemento
        const pushRes = await ProdServ.updateOne(
          filterBase,
          {
            $push: { [arrayName]: item },
            $set: {
              'detail_row.FechaUltMod': now,
              'detail_row.UsuarioMod': userId,
            },
          }
        );
        if (pushRes.modifiedCount > 0) pushed += 1;
      } else {
        // 3) SET (reemplazo/actualización del elemento existente con operador posicional $)
        // Si no quieres reemplazar todo el subdoc, puedes construir $set campo por campo.
        const setRes = await ProdServ.updateOne(
          {
            ...filterBase,
            [arrayName]: { $elemMatch: elemMatch },
          },
          {
            $set: {
              // Reemplaza el subdocumento completo
              [`${arrayName}.$`]: item,
              'detail_row.FechaUltMod': now,
              'detail_row.UsuarioMod': userId,
            },
          }
        );
        if (setRes.modifiedCount > 0) setted += 1;
      }
    }

    // Devuelve el documento ya actualizado (opcional) y métricas
    const updatedDoc = await ProdServ.findOne(filterBase);
    return {
      success: true,
      arrayName,
      counts: { pushed, updated: setted },
      doc: updatedDoc,
    };
  } catch (error) {
    throw boom.badImplementation(error);
  }
};