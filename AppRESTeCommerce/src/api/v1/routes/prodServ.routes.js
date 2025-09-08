//Commerce
//!NOTA 6.4
import { Router } from 'express'; 
import * as prodServController from '../controllers/prodserv.controller';
const router = Router(); 
router.get('/', prodServController.getProdServList);
router.get('/:id', prodServController.getProdServItem);
export default router;

