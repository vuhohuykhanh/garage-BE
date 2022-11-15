import { Router } from 'express';
import { saleDescriptionService } from '../services';

const router = Router();

//GET
router.get('/get-all', saleDescriptionService.getAll);

//POST

export default router;
