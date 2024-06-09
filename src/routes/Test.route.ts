import { Router } from 'express';
import { mailService } from '../services';
import { success } from '../util';

const router = Router();

//POST
router.get('/', (req, res) => success({
    res,
    message: "pong",
  }));

export default router;
