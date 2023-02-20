import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import _ from 'lodash';
import { Random } from 'mockjs';
const prisma = new PrismaClient();
async function run() {
  const salt = bcrypt.genSaltSync(10);
  await prisma.user.create({
    data: {
      name: 'admin',
      password: bcrypt.hashSync('123456', salt),
      role: 'admin',
    },
  });
  for (let i = 1; i <= 5; i++) {
    await prisma.category.create({
      data: { title: Random.ctitle(3, 6) },
    });
  }
  for (let i = 0; i < 50; i++) {
    await prisma.article.create({
      data: {
        title: Random.ctitle(10, 30),
        content: Random.cparagraph(30, 50),
        categoryId: _.random(1, 5),
      },
    });
  }
}
run();
