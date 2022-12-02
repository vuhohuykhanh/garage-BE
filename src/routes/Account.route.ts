import { Router } from 'express';
import { accountService } from '../services';

const router = Router();
// GET
router.get('/get-all', accountService.getAll);  //get all account
router.get('/get-all-user', accountService.getAllUser);  //get all account

//POST
router.post('/sign-up', accountService.signUp)	// sign up
router.post('/sign-in', accountService.signIn)	// sign in
router.post('/sign-in-admin', accountService.signInAdmin)	// sign in
router.post('/forgot-password', accountService.forgotPassword)	// forgot password


export default router;
