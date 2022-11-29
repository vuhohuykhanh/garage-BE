import { Router } from 'express';
import { cartService } from '../services';

const router = Router();

//GET
router.get('/get-all', cartService.getAll);
router.get('/get-all-with-delete', cartService.getAllWithDelete);
router.get('/get-cart-by-user-id', cartService.getCartByUserId);

//POST
router.post('/create', cartService.create);

//PATCH
router.patch('/update/:id', cartService.update);
router.patch('/update-status/:id', cartService.updateStatus);

//DELETE
router.delete('/delete/:id', cartService.delete);
router.delete('/delete-soft/:id', cartService.deleteSoft);

export default router;
