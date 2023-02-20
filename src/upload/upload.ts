import {
  applyDecorators,
  MethodNotAllowedException,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';

// 上传类型验证
export function fileFilter(type: string) {
  return (
    req: any,
    file: any,
    callback: (error: Error | null, acceptFile: boolean) => void,
  ) => {
    console.log(file.mimetype);

    if (!file.mimetype.includes(type)) {
      // 如果不是image类型，报错
      callback(new MethodNotAllowedException('类型不允许'), false);
    } else {
      callback(null, true);
    }
  };
}

// 文件上传
export function Upload(filed = 'file', options?: MulterOptions) {
  return applyDecorators(UseInterceptors(FileInterceptor(filed, options)));
}

// 图片上传
export function ImageUpload(filed = 'file') {
  return Upload(filed, {
    limits: { fieldSize: Math.pow(1024, 2) * 3 },
    fileFilter: fileFilter('image'),
  });
}
// 文档上传
export function TxTUpload(filed = 'file') {
  return Upload(filed, {
    limits: { fieldSize: Math.pow(1024, 2) * 3 },
    fileFilter: fileFilter('text'),
  });
}
