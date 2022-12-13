import { Router } from 'express';
import { productService } from '../services';

const multer  = require('multer');
const imageUpload = multer({
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

//GET
router.get('/get-all', productService.getAll); //get all products
router.get('/get-products-by-manufacturer', productService.getProductsByManufacturer); //get all products by manufacturer
router.get('/get-products-by-product-type', productService.getProductsByProductType); //get all products by product type
router.get('/get-products-by-accessory-type', productService.getProductsByAccessoryType); //get all products by accessory type
router.get('/get-products-by-service-type', productService.getProductsByServiceType); //get all products by service type
router.get('/get-products-by-manufacturer-and-accessory', productService.getProductsByManufacturerAndAccessory); //get all products by manufacturer and accessory
router.get('/get-product-by-id', productService.getProductById); //get all products

//POST
router.post('/create', imageUpload.single('image'), productService.create); // create Product

//PATCH
router.patch('/update/:id', productService.update); //update product

//Delete
router.delete('/delete/:id', productService.delete) //delete product
export default router;
