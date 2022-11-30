import { Router } from 'express';
import { imageUpload } from '../services';

const router = Router();

//get
router.get('/get-all', imageUpload.getAll);
router.get('/:filename', imageUpload.getImage);

export default router;
