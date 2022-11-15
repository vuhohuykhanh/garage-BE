import { Router } from 'express';
import { statusService } from '../services';

const router = Router();

//GET
router.get('/get-all', statusService.getAll);

//POST
router.post('/create', statusService.create);
export default router;
