import { Router } from 'express';
import { cartDescriptionService } from '../services';

const router = Router();

//GET
router.get('/get-all', cartDescriptionService.getAll);
router.get('/get-cart-description-by-cart-id', cartDescriptionService.getCartDescriptionByCartId)

//POST
router.post('/create', cartDescriptionService.create)

//PATCH
router.patch('/add', cartDescriptionService.addCartDescription)
router.patch('/confirm', cartDescriptionService.confirmCartDescription)

//DETELE
router.delete('/delete/:id', cartDescriptionService.delete)
export default router;
