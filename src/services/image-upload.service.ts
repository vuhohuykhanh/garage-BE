import path = require('path');
import { AppDataSource } from '../data-source';
import { ImageUpload } from '../entity';
import { error, success } from '../util';

class ImageUploadService {

	async getAll(_, res) {
		const listImage = await AppDataSource.getRepository(ImageUpload).find();
		return success({
			res,
			message: listImage,
		})
	}

  async getImage(req, res) {
		const {filename} = req.params;
		const imageRepo = await AppDataSource.getRepository(ImageUpload);
		const image = await imageRepo.findOne({
			where: {
				filename: filename,
			}
		})
		
		if (!image) return error({
			res,
			message: "Image not found"
		})

		const dirname = path.resolve();
		const fullfilepath = path.join(dirname, image.filepath);

		return res.sendFile(fullfilepath)
  }
}

export default new ImageUploadService();
