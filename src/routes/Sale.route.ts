import { Router } from 'express';
import { saleService } from '../services';

const router = Router();

//GET
router.get('/get-all', saleService.getAll);

//POST
router.post('/create', saleService.create);

export default router;
