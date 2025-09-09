//-----------------------------------------------------------------------------
// Archivo: src/api/v1/routes/index.js
// Descripción:
// Este archivo centraliza la configuración de rutas para todos los endpoints de la API.
// Aquí se definen las rutas base de cada módulo (productos/servicios, órdenes, etc.)
// y se importan los archivos de rutas específicos de cada módulo.
//-----------------------------------------------------------------------------
// Funcionamiento general:
// 1. Se importa Router de Express para crear un router modular.
// 2. Se importa la configuración global (config.js) para obtener la ruta base de la API (API_URL).
// 3. Se importan los archivos de rutas de cada módulo (por ejemplo, prodServRoutes para productos/servicios).
// 4. La función routerAPI recibe la instancia principal de la app Express (app).
// 5. Se crea un router y se monta en la ruta base definida por API_URL (por ejemplo, '/api/v1').
// 6. Dentro de esa ruta base, se agregan las rutas específicas de cada módulo usando router.use().
//    - Ejemplo: '/prod-serv' para productos y servicios.
// 7. Se pueden agregar más módulos simplemente importando sus rutas y agregando router.use().
// 8. El router se retorna para que Express lo use en la aplicación principal.
// 9. Así, todos los endpoints (GET, POST, PUT, DELETE, etc.) quedan organizados y accesibles bajo la ruta base.
//-----------------------------------------------------------------------------
// Ejemplo de estructura de rutas generada:
// /api/v1/prod-serv        -> Endpoints de productos y servicios
// /api/v1/orders           -> Endpoints de órdenes (si se agregan)
//-----------------------------------------------------------------------------
//!NOTA 6.4
import { Router } from 'express'; 
import config from '../../../config/config'; 
// Import Routes 
import prodServRoutes from './prodServ.routes'; 
//import ordersRoutes from './orders.routes';

const routerAPI = (app) => { 
  const router = Router(); 
  const api = config.API_URL; 
//localhost//api/v1/inventarios/routes
// * TODOS LOS PRODUCTOS
//ocalhost//api/v1/prod-ser/
//UN PRODUCTO ESPECIFICO
//ocalhost//api/v1/prod-ser/50
  app.use(api, router); 
  // Routes 
  router.use('/prod-serv', prodServRoutes); 
  //router.use('/orders', ordersRoutes); 
  // Return Router 
  return router; 
}; 
module.exports = routerAPI;

//! este index sirve para to osea todos los endpoints de la API post get put delete traka naga ninga sapa todos we, toditos cawn.
// a pero arath? como es posible eso no tienes que agregar las rutas de cada endpoint por separado?
// si pero en este index solo se agrega la ruta base de cada modulo y luego se importa el archivo de rutas correspondiente no seas naco cawn.
// por ejemplo para productos y servicios se importa prodServ.routes.js que a su vez importa el controlador prodserv.controller.js