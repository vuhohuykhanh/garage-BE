import { Router } from 'express';
import { cartDescriptionService } from '../services';

const router = Router();

//GET
router.get('/get-all', cartDescriptionService.getAll);

//POST

export default router;
