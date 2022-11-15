import { Router } from 'express';
import { productDescriptionService } from '../services';

const router = Router();

//GET
router.get('/get-all', productDescriptionService.getAll);

//POST

export default router;
