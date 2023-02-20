import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@Injectable()
export class ArticleService {
  constructor(private prisma: PrismaService, private config: ConfigService) {}
  create(createArticleDto: CreateArticleDto) {
    return this.prisma.article.create({
      data: {
        title: createArticleDto.title,
        content: createArticleDto.content,
        categoryId: +createArticleDto.categoryId,
      },
    });
  }

  async findAll(args: Record<string, any>) {
    console.log(args);

    const row = this.config.get('ARTICLE_PAGE_ROW');
    const page = args.page ? +args.page : 1;
    const articles = await this.prisma.article.findMany({
      skip: (page - 1) * row,
      take: +row,
      where: {
        category: args.category ? { id: +args.category } : {},
      },
      // 关联
      include: {
        category: true,
      },
    });
    const total = await this.prisma.article.count({
      where: {
        category: args.category ? { id: +args.category } : {},
      },
    });
    return {
      meta: {
        // 当前页
        current_page: page,
        // 每页数量
        page_row: +row,
        // 总数量
        total: total,
        // 总页数
        total_page: Math.ceil(total / row),
      },
      data: articles,
    };
  }

  findOne(id: number) {
    return this.prisma.article.findFirst({
      where: { id },
    });
  }

  update(id: number, updateArticleDto: UpdateArticleDto) {
    return this.prisma.article.update({
      where: {
        id,
      },
      data: {
        title: updateArticleDto.title,
        content: updateArticleDto.content,
        categoryId: +updateArticleDto.categoryId,
      },
    });
  }

  remove(id: number) {
    return this.prisma.article.delete({
      where: {
        id,
      },
    });
  }
}
