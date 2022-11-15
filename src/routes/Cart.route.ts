import { Router } from 'express';
import { cartService } from '../services';

const router = Router();

//GET
router.get('/get-all', cartService.getAll);

//POST

export default router;
