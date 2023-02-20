import { Controller, Post, UploadedFile } from '@nestjs/common';
import { ImageUpload } from './upload';
@Controller('upload')
export class UploadController {
  @Post('image')
  @ImageUpload()
  image(@UploadedFile() file: Express.Multer.File) {
    return {
      // url: `http://localhost:3000/${file.path}`,
      url: `http://43.138.209.77:4321/${file.path}`,
    };
  }
}
