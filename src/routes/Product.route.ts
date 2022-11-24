import { Router } from 'express';
import { productService } from '../services';

const router = Router();

//GET
router.get('/get-all', productService.getAll); //get all products
router.get('/get-products-by-manufacturer', productService.getProductsByManufacturer); //get all products
router.get('/get-products-by-product-type', productService.getProductsByProductType); //get all products
router.get('/get-products-by-accessory-type', productService.getProductsByAccessoryType); //get all products
router.get('/get-products-by-service-type', productService.getProductsByServiceType); //get all products
router.get('/get-product-by-id', productService.getProductById); //get all products

//POST
router.post('/create', productService.create); // create Product

//PATCH
router.patch('/update/:id', productService.update); //update product

//Delete
router.delete('/delete/:id', productService.delete) //delete product
export default router;
