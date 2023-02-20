import { Auth } from '@/auth/decorators/auth.decorator';
import { Role } from '@/auth/enum';
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Article } from './entities/article.entities';

@Controller('article')
// 全局开启了，这里就不用写了
// @UseInterceptors(ClassSerializerInterceptor)
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post()
  @Auth(Role.EDITER, Role.ADMIN)
  create(@Body() createArticleDto: CreateArticleDto) {
    return this.articleService.create(createArticleDto);
  }
  @Get()
  findAll(@Query() args = {}) {
    return this.articleService.findAll(args);
  }

  @Get(':id')
  // 默认什么都不返回，但是可以去entities中定义返回哪些字段
  // @SerializeOptions({ strategy: 'excludeAll' })
  async findOne(@Param('id') id: string) {
    const r = await this.articleService.findOne(+id);
    return new Article(r);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateArticleDto: UpdateArticleDto) {
    return this.articleService.update(+id, updateArticleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.articleService.remove(+id);
  }
}
