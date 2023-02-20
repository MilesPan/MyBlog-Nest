import { article } from '@prisma/client';
import { Expose, Transform } from 'class-transformer';
import dayjs from 'dayjs';
export class Article {
  @Transform(({ value }) => {
    return dayjs(value).format('YYYY-MM-DD');
  })
  createdAt: string;
  @Transform(({ value }) => {
    return dayjs(value).format('YYYY-MM-DD');
  })
  updatedAt: string;
  @Expose()
  // 处理数据s
  @Transform(({ value }) => {
    return value;
  })
  title: string;
  @Expose()
  content: string;
  constructor(options: Partial<article>) {
    Object.assign(this, options);
  }
}
