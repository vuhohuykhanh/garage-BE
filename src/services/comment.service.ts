import { AppDataSource } from '../data-source';
import { Comment } from '../entity';

class CommentService {
  async getAll(_, res) {
    const result = await AppDataSource.getRepository(Comment).find();
    return res.send(result);
  }
}

export default new CommentService();