import { AppDataSource } from '../data-source';
import { Account, Comment, Product } from '../entity';
import { error, isEmptyObject, success } from '../util';

class CommentService {
  //get-all
  async getAll(_, res) {
    const result = await AppDataSource.getRepository(Comment).find({
      relations: ['account', 'product'],
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
    const { accountId, productId, comment: commentDescripion } = req.body;

    const account = await AppDataSource.getRepository(Account).findOne({
      where: { id: accountId },
    });
    if (!account)
      return error({
        res,
        message: 'Account not found',
      });

    const product = await AppDataSource.getRepository(Product).findOne({
      where: { id: productId },
    });
    if (!product)
      return error({
        res,
        message: 'Product not found',
      });

    const commentRepo = await AppDataSource.getRepository(Comment);
    const comment = new Comment();
    comment.account = account;
    comment.product = product;
    comment.content = commentDescripion;
    await commentRepo.save(comment);
    return success({
      res,
      message: comment,
    });
  }
}

export default new CommentService();
