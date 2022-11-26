import { AppDataSource } from '../data-source';
import { DescriptionType, Product, ProductDescription } from '../entity';
import { error, isEmptyObject, success } from '../util';

class ProductDescriptionService {
  //get-all
  async getAll(_, res) {
    const result = await AppDataSource.getRepository(ProductDescription).find({
      relations: ['product', 'descriptionType'],
    });
    return res.send(result);
  }

  // get-by-product-id
  async getByProductId(req, res) {
    const { id } = req.params;
    const result = await AppDataSource.getRepository(ProductDescription).find({
      relations: ['product', 'descriptionType'],
      where: {
        product: {
          id,
        },
      },
    });
    return res.send(result);
  }

  //create
  async create(req, res) {
    if (isEmptyObject(req.body))
      return error({
        res,
        message: 'Please fill body data',
      });

    const { productId, descriptionTypeId, content } = req.body;

    const product = await AppDataSource.getRepository(Product).findOne({
      where: { id: productId },
    });
    if (!product)
      return error({
        res,
        message: 'Product not found',
      });

    const desType = await AppDataSource.getRepository(DescriptionType).findOne({
      where: { id: descriptionTypeId },
    });
    if (!desType)
      return error({
        res,
        message: 'Description Type not found',
      });

    const productDesRepo = await AppDataSource.getRepository(
      ProductDescription
    );
    const productDes = new ProductDescription();
    productDes.product = product;
    productDes.descriptionType = desType;
    productDes.content = content;
    await productDesRepo.save(productDes);
    return success({
      res,
      message: productDes,
    });
  }
}

export default new ProductDescriptionService();
