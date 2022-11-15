import { Router } from 'express';
import { productService } from '../services';

const router = Router();

//GET
router.get('/get-all', productService.getAll);

//POST

export default router;
