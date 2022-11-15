import { Router } from 'express';
import { cartTypeService } from '../services';

const router = Router();

//GET
router.get('/get-all', cartTypeService.getAll);

//POST
router.post('/create', cartTypeService.create)
export default router;
