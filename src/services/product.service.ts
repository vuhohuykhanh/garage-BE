import moment = require('moment');
import { IsNull, MoreThan } from 'typeorm';
import { AppDataSource } from '../data-source';
import { ImageUpload, Product, ProductDescription } from '../entity';
import { error, isEmptyObject, success } from '../util';

class ProductService {
  // get all
  async getAll(_, res) {
    const result = await AppDataSource.getRepository(Product).find({
      where: { deleteAt: IsNull() },
      relations: [
        'productType',
        'manufacturer',
        'accessoryType',
        'serviceType',
        'saleDescriptions',
        'cartDescriptions',
        'productDescriptions',
        'comments',
        'image',
      ],
      order: {
        saleDescriptions: {
          saleId: 'ASC',
        },
      },
    });
    return res.send(result);
  }

  //get product by manufacturer
  async getProductsByManufacturer(req, res) {
    const { manufacturerId } = req.query;
    const result = await AppDataSource.getRepository(Product).find({
      relations: [
        'productType',
        'manufacturer',
        'accessoryType',
        'serviceType',
        'saleDescriptions',
        'cartDescriptions',
        'productDescriptions',
        'comments',
        'image',
      ],
      where: {
        manufacturer: {
          id: manufacturerId,
        },
        deleteAt: IsNull(),
      },
      order: {
        saleDescriptions: {
          saleId: 'ASC',
        },
      },
    });

    if (!result) {
      return error({
        res,
        message: 'Product not found',
      });
    }
    return success({
      res,
      message: result,
    });
  }

  //get product by product type
  async getProductsByProductType(req, res) {
    const { productTypeId } = req.query;
    const result = await AppDataSource.getRepository(Product).find({
      relations: [
        'productType',
        'manufacturer',
        'accessoryType',
        'serviceType',
        'saleDescriptions',
        'cartDescriptions',
        'productDescriptions',
        'comments',
        'image',
      ],
      order: {
        id: 'ASC',
        saleDescriptions: {
          saleId: 'ASC',
        },
      },
      where: {
        productType: {
          id: productTypeId,
        },
        deleteAt: IsNull(),
      },
    });

    if (!result) {
      return error({
        res,
        message: 'Product not found',
      });
    }
    return success({
      res,
      message: result,
    });
  }

  //get product by accessory type
  async getProductsByAccessoryType(req, res) {
    const { accessoryTypeId } = req.query;
    const result = await AppDataSource.getRepository(Product).find({
      relations: [
        'productType',
        'manufacturer',
        'accessoryType',
        'serviceType',
        'saleDescriptions',
        'saleDescriptions.sale',
        'cartDescriptions',
        'productDescriptions',
        'comments',
        'image',
      ],
      where: {
        accessoryType: {
          id: accessoryTypeId,
        },
        productType: {
          name: 'Phụ kiện',
        },
        //saleDescriptions: {
        //	sale: {
        //		endTime: MoreThan((new Date()).toLocaleDateString())
        //	}
        //},
        deleteAt: IsNull(),
      },
      order: {
        saleDescriptions: {
          saleId: 'ASC',
        },
      },
    });

    if (!result) {
      return error({
        res,
        message: 'Product not found',
      });
    }
    return success({
      res,
      message: result,
    });
  }

  //get product by service type
  async getProductsByServiceType(req, res) {
    const { serviceTypeId } = req.query;
    const result = await AppDataSource.getRepository(Product).find({
      relations: [
        'productType',
        'manufacturer',
        'accessoryType',
        'serviceType',
        'saleDescriptions',
        'saleDescriptions.sale',
        'cartDescriptions',
        'productDescriptions',
        'comments',
        'image',
      ],
      where: {
        serviceType: {
          id: serviceTypeId,
        },
        productType: {
          name: 'Dịch vụ',
        },
        //saleDescriptions: {
        //	sale: {
        //		endTime: MoreThan((new Date()).toLocaleDateString())
        //	}
        //},
        deleteAt: IsNull(),
      },
      order: {
        saleDescriptions: {
          saleId: 'ASC',
        },
      },
    });

    if (!result) {
      return error({
        res,
        message: 'Product not found',
      });
    }
    return success({
      res,
      message: result,
    });
  }

  //get all products by manufacturer and accessory
  async getProductsByManufacturerAndAccessory(req, res) {
    const { manufacturerId, accessoryId } = req.query;
    const result = await AppDataSource.getRepository(Product).find({
      relations: [
        'productType',
        'manufacturer',
        'accessoryType',
        'serviceType',
        'saleDescriptions',
        'saleDescriptions.sale',
        'cartDescriptions',
        'productDescriptions',
        'comments',
        'image',
      ],
      where: {
        manufacturer: {
          id: manufacturerId,
        },
        accessoryType: {
          id: accessoryId,
        },
        productType: {
          name: 'Phụ kiện',
        },
        //saleDescriptions: {
        //	sale: {
        //		endTime: MoreThan((new Date()).toLocaleDateString())
        //	}
        //},
        deleteAt: IsNull(),
      },
      order: {
        saleDescriptions: {
          saleId: 'ASC',
        },
      },
    });

    if (!result) {
      return error({
        res,
        message: 'Product not found',
      });
    }
    return success({
      res,
      message: result,
    });
  }

  //get product by product id
  async getProductById(req, res) {
    const { productId } = req.query;
    const result = await AppDataSource.getRepository(Product).find({
      relations: [
        'productType',
        'manufacturer',
        'accessoryType',
        'serviceType',
        'saleDescriptions',
        'cartDescriptions',
        'productDescriptions',
        'comments',
        'image',
      ],
      where: {
        id: productId,
        deleteAt: IsNull(),
      },
    });

    if (!result) {
      return error({
        res,
        message: 'Product not found',
      });
    }
    return success({
      res,
      message: result,
    });
  }

  //create
  async create(req, res) {
    const { filename, mimetype, size } = req.file;
    const filepath = req.file.path;

    const imageRepo = await AppDataSource.getRepository(ImageUpload);
    const image = await imageRepo.save({
      filename,
      filepath,
      mimetype,
      size,
    });

    const { description, ...dataProduct } = req.body;
    const product = await AppDataSource.getRepository(Product).save({
      ...dataProduct,
      image: image,
    });

    const descriptionRepo = await AppDataSource.getRepository(
      ProductDescription
    );
    await descriptionRepo.save({
      content: description,
      product: product,
    });

    return success({
      res,
      message: 'Create product success',
    });
  }

  //update
  async update(req, res) {
    if (isEmptyObject(req.body))
      return error({
        res,
        message: 'Please fill body data',
      });
    const { id } = req.params;
    const dataUpdate = req.body;

    const productRepo = await AppDataSource.getRepository(Product);
    const product = await productRepo.findOne({
      where: {
        id: id,
        deleteAt: IsNull(),
      },
      relations: [
        'productType',
        'manufacturer',
        'accessoryType',
        'serviceType',
        'saleDescriptions',
        'cartDescriptions',
        'productDescriptions',
        'comments',
        'image',
      ],
    });

    if (!product)
      return error({
        res,
        message: 'Product not found',
      });

    const newProduct = await productRepo.save({
      ...product,
      ...dataUpdate,
    });

    return success({
      res,
      //message: newProduct,
      message: 'Update product success',
    });
  }

  //delete
  async delete(req, res) {
    const product = await AppDataSource.getRepository(Product).findOne({
      where: { id: req.params.id, deleteAt: IsNull() },
    });

    if (!product) {
      return error({
        res,
        message: 'Product not found',
      });
    }

    await AppDataSource.getRepository(Product).save({
      ...product,
      deleteAt: moment().format(),
    });

    return success({
      res,
      message: 'Delete product success',
    });
  }
}

export default new ProductService();
