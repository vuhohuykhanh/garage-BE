import role from './Role.route'
import cart from './cart.route'
import sale from './sale.route'
import comment from './comment.route'
import user from './user.route'
//import bill from './bill.route'
import status from './status.route'
import product from './product.route'
import account from './account.route'
import cartType from './cartType.route'
import accessoryType from './accessoryType.route'
import productType from './productType.route'
import serviceType from './serviceType.route'
import cartDescription from './cartDescription.route'
import descriptionType from './descriptionType.route'
import saleDescription from './saleDescription.route'
import productDescription from './productDescription.route'
import manufacturer from './manufacturer.route'
import mail from './mail.route'

const router = (app) => {
	//app.use('/api/bill', bill);
	app.use('/api/cart', cart);
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