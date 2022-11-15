import { Router } from 'express';
import { roleService } from '../services';

const router = Router();

//GET
router.get('/get-all', roleService.getAll);

//POST
router.post('/create', roleService.create);

export default router;
