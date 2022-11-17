import { Router } from 'express';
import { userService } from '../services';

const router = Router();

//GET
router.get('/get-all', userService.getAll);
router.get('/get-user-info', userService.getUserInfo);
router.get('/get-all-user', userService.getAllUser) // get all account role user


//POST
router.post('/create', userService.create)

//PATCH - Update
router.patch('/update', userService.update)
router.patch('/update-password', userService.updatePassword)

//DELETE
router.delete('/delete/:id', userService.delete)
export default router;
