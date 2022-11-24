import { Router } from 'express';
import { commentService } from '../services';

const router = Router();

//GET
router.get('/get-all', commentService.getAll);

//POST
router.post('/create', commentService.create);

export default router;
