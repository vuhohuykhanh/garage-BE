import { Router } from 'express';
import { saleDescriptionService } from '../services';

const router = Router();

//GET
router.get('/get-all', saleDescriptionService.getAll);

//POST
router.post('/create', saleDescriptionService.create);

export default router;
