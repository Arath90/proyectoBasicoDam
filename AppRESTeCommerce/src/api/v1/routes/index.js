//Commerce
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
//TODOS LOS PRODUCTOS
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
