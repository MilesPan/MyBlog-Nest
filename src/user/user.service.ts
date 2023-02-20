import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return {
      name: '潘大王',
      age: 18,
      avator: '/public/images/avator.jpg',
      permissions: ['editor_markdown', 'article_edit', 'editor_base'],
    };
  }
}
