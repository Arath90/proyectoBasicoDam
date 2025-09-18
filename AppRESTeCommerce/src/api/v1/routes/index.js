//-----------------------------------------------------------------------------
// Archivo: src/api/v1/routes/index.js
// Descripción:
// Centraliza y versiona las rutas de la API. Monta cada módulo (prod-serv, orders, etc.)
// bajo la ruta base definida por API_URL (por ejemplo, '/api/v1').
//-----------------------------------------------------------------------------

// 1) Importar Router de Express
import { Router } from 'express';

// 2) Importar configuración global (debe exponer API_URL = '/api/v1' o similar)
import config from '../../../config/config';

// 3) Importar rutas por módulo (agregar más según crezcan los recursos)
import prodServRoutes from './prodServ.routes';
// import ordersRoutes from './orders.routes'; // ejemplo futuro

// 4) Función que registra todas las rutas v1 en la app principal de Express
const routerAPI = (app) => {
  // Crear router "raíz" para v1
  const router = Router();

  // Tomar ruta base desde config (ej. '/api/v1')
  const api = config.API_URL;

  // Ejemplos guía (comentarios de referencia):
  // localhost/api/v1/prod-serv          -> lista/CRUD de productos y servicios
  // localhost/api/v1/prod-serv/:id      -> item específico

  // 5) Montar el router raíz en la app bajo la ruta base
  app.use(api, router);

  // 6) Montar routers de cada módulo bajo el raíz v1
  router.use('/prod-serv', prodServRoutes);
  // router.use('/orders', ordersRoutes);

  // 7) Retornar el router (opcional, útil para pruebas)
  return router;
};

// 8) Exportar (elige un solo sistema de módulos en tu proyecto):
export default routerAPI;
// Si usas CommonJS en TODO el proyecto, entonces usa:
// module.exports = routerAPI;
