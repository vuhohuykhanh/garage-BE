import { Router } from 'express';
import { imageUpload } from '../services';

const multer  = require('multer');
const imageUploadTool = multer({
	storage: multer.diskStorage(
			{
					destination: function (req, file, cb) {
							cb(null, 'uploads/');
					},
					filename: function (req, file, cb) {
							cb(
									null,
									new Date().valueOf() + 
									'_' +
									file.originalname
							);
					}
			}
	), 
});

const router = Router();

//get
router.get('/get-all', imageUpload.getAll);
router.get('/:filename', imageUpload.getImage);

//upload image
router.post('/upload-image', imageUploadTool.single('avatar'), imageUpload.uploadImage)


export default router;
