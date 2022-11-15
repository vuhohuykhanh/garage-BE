import { Router } from 'express';
import { descriptionTypeService } from '../services';

const router = Router();

//GET
router.get('/get-all', descriptionTypeService.getAll);

//POST

export default router;
