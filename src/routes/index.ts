import role from './Role.route';
import cart from './Cart.route';
import sale from './Sale.route';
import comment from './Comment.route'
import user from './User.route'
//import bill from './Bill.route'
import status from './Status.route'
import product from './Product.route'
import account from './Account.route'
import cartType from './CartType.route'
import accessoryType from './AccessoryType.route'
import productType from './ProductType.route'
import serviceType from './ServiceType.route'
import cartDescription from './CartDescription.route'
import descriptionType from './DescriptionType.route'
import saleDescription from './SaleDescription.route'
import productDescription from './ProductDescription.route'
import manufacturer from './Manufacturer.route'
import mail from './Mail.route'
import image from './ImageUpload.route'
import test from './Test.route';

const router = (app) => {
	app.use('/api/ping', test)
	//app.use('/api/bill', bill);
	app.use('/api/cart', cart);
	app.use('/api/image', image);
	app.use('/api/sale', sale);
	app.use('/api/role', role);
	app.use('/api/user', user);
	app.use('/api/status', status);
	app.use('/api/product', product);
	app.use('/api/comment', comment);
	app.use('/api/account', account);
	app.use('/api/cart-type', cartType);
	app.use('/api/product-type', productType);
	app.use('/api/service-type', serviceType);
	app.use('/api/mail', mail);
	app.use('/api/manufacturer', manufacturer);
	app.use('/api/accessory-type', accessoryType);
	app.use('/api/sale-description', saleDescription);
	app.use('/api/description-type', descriptionType);
	app.use('/api/cart-description', cartDescription);
	app.use('/api/product-description', productDescription);
}

export default router;