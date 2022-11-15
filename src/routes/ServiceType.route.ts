import { Router } from 'express';
import { serviceTypeService } from '../services';

const router = Router();

//GET
router.get('/get-all', serviceTypeService.getAll);

//POST
router.post('/create', serviceTypeService.create);

export default router;
