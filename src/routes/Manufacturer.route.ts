import { Router } from 'express';
import { manufacturerService } from '../services';

const router = Router();

//GET
router.get('/get-all', manufacturerService.getAll);

//POST
router.post('/create', manufacturerService.create);
export default router;
