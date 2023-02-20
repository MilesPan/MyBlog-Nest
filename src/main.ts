import { ClassSerializerInterceptor } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import Validate from './common/validate';
import { TransformInterceptor } from './transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // 全局验证
  app.useGlobalPipes(new Validate());
  // 设置拦截器对数据包裹
  app.useGlobalInterceptors(new TransformInterceptor());
  // 设置前缀
  app.setGlobalPrefix('api');
  app.useStaticAssets('uploads', { prefix: '/uploads' });
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  await app.listen(3000);
}
bootstrap();
