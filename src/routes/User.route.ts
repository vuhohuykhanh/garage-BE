import { Router } from 'express';
import { userService } from '../services';

const router = Router();

//GET
router.get('/get-all', userService.getAll);

//POST
router.post('/create', userService.create)

//PATCH - Update
router.patch('/update', userService.update)

//DELETE
router.delete('/delete/:id', userService.delete)
export default router;
