// routes/prodserv.routes.js 

// Commerce
// --------------------------------------------------------------------------------------
// BasePath sugerido en app.js:  app.use('/api/v1/prod-serv', router)
// Este router expone operaciones CRUD para la colección "cat_prod_serv" en MongoDB.
//
// Dependencias: Express Router y capa de controladores (prodserv.controller).
// Convenciones:
//  - Identificador primario esperado: IdProdServPK (numérico o string único, según tu modelo).
//  - Manejo de errores: Boom en controladores/servicios (mapeado por middleware global).
//  - Respuestas JSON; códigos HTTP estándar.
// --------------------------------------------------------------------------------------

import { Router } from 'express';
import * as prodServController from '../controllers/prodserv.controller';

const router = Router();

/**
 * !NOTA 6.4
 * GET /
 * Lista de Productos/Servicios.
 *
 * Descripción:
 *  Retorna una colección paginada/filtrada (si el controlador lo implementa) de cat_prod_serv.
 *
 * Query params (opcionales; definidos en el controlador):
 *  - q: string de búsqueda (por descripción, SKU, etc.)
 *  - page, limit: paginación
 *  - sort, order: ordenamiento
 *
 * Respuestas:
 *  - 200 OK: { items: [...], total: number, page: number, limit: number }
 *  - 500 ERR: Boom error (se propaga al middleware de errores)
 */
router.get('/', prodServController.getProdServList);

/**
 * !NOTA 6.4
 * GET /:id
 * Obtiene un Producto/Servicio por Id.
 *
 * Params:
 *  - id: string|number (IdProdServPK o clave de negocio configurada en el controlador)
 *
 * Respuestas:
 *  - 200 OK: { ...documento }
 *  - 404 Not Found: Boom.notFound si no existe
 *  - 400 Bad Request: Boom.badRequest si el id es inválido
 */
router.get('/:id', prodServController.getProdServItem);

/**
 * !NOTA 7.3
 * POST /
 * Crea un Producto/Servicio en "cat_prod_serv".
 *
 * Flujo resumido:
 *  cliente → endpoint POST → controlador (validación) → servicio (persistencia) → BD → respuesta 201
 *
 * Body (JSON) — ejemplo mínimo:
 * {
 *   "IdProdServPK": 3,
 *   "DesProdServ": "Teclado HP",
 *   "Precio": 399.00,
 *   "Unidad": "PZA",
 *   "Activo": true
 * }
 *
 * Respuestas:
 *  - 201 Created: { ...documentoCreado }
 *  - 409 Conflict: si la PK ya existe (depende de la lógica en servicio)
 *  - 400 Bad Request: body inválido (usar Boom.badRequest)
 *  - 500 ERR: error inesperado
 */
router.post('/', prodServController.postProdServItem);

/**
 * !NOTA 8.3.1
 * PUT /:id/array/:arrayName
 * Upsert porciones de arreglos dentro del documento (ej. 'estatus' o 'archivos').
 *
 * Uso típico:
 *  - Agregar/actualizar elementos de un arreglo embebido por id o campo único.
 *
 * Params:
 *  - id: id del documento raíz (IdProdServPK o clave buscada)
 *  - arrayName: nombre del arreglo en el schema (p. ej. "estatus", "archivos")
 *
 * Body (JSON) — ejemplo:
 * {
 *   "items": [
 *     { "codigo": "ACT", "descripcion": "Activo", "fecha": "2025-09-01" }
 *   ],
 *   "matchBy": "codigo" // campo para determinar si se hace update (coincide) o push (nuevo)
 * }
 *
 * Respuestas:
 *  - 200 OK: { ...documentoActualizado } o { modifiedCount, matchedCount } según implementación
 *  - 400 Bad Request: si arrayName no existe en el schema o body inválido
 *  - 404 Not Found: si no se encontró el documento
 */
router.put('/:id/array/:arrayName', prodServController.upsertArrayItems);

/**
 * !NOTA 8.3
 * PUT /:id
 * Reemplazo/actualización de campos del documento completo por id (update por IdProdServPK|BK).
 *
 * Params:
 *  - id: id destino
 *
 * Body (JSON):
 *  - Campos permitidos a actualizar (definir whitelist en el servicio para seguridad)
 *
 * Respuestas:
 *  - 200 OK: { ...documentoActualizado }
 *  - 400 Bad Request: body inválido
 *  - 404 Not Found: id inexistente
 */
router.put('/:id', prodServController.putProdServItem);

/**
 * !NOTA 9.3
 * DELETE /:id
 * Elimina (o marca como inactivo) un Producto/Servicio.
 *
 * Params:
 *  - id: id del documento
 *
 * Respuestas:
 *  - 204 No Content: eliminación exitosa sin payload
 *  - 404 Not Found: documento no encontrado
 *  - 409 Conflict: si hay restricciones de integridad (referencias activas), opcional
 */
router.delete('/:id', prodServController.deleteProdServItem);

export default router;



