import { Router } from 'express';
import { saleDescriptionService } from '../services';

const router = Router();

//GET
router.get('/get-all', saleDescriptionService.getAll);
router.get('/get-sale-description-by-id', saleDescriptionService.getSaleDesById);

//POST
router.post('/create', saleDescriptionService.create);

export default router;
