import { Router } from 'express';
import { accessoryTypeService } from '../services';

const router = Router();

//GET
router.get('/get-all', accessoryTypeService.getAll);

//POST
router.post('/create', accessoryTypeService.create);

export default router;
