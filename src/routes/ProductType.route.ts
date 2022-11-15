import { Router } from 'express';
import { productTypeService } from '../services';

const router = Router();

//GET
router.get('/get-all', productTypeService.getAll);

//POST
router.post('/create', productTypeService.create)
export default router;
