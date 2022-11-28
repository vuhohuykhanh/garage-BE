import { Router } from 'express';
import { mailService } from '../services';

const router = Router();

//POST
router.post('/send-mail', mailService.sendMail);

export default router;
