import { Router } from 'express';
import { saleService } from '../services';

const router = Router();

//GET
router.get('/get-all', saleService.getAll);

//POST

export default router;
