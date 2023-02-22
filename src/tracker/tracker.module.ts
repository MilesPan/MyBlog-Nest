import { Module } from '@nestjs/common';
import { TrackerService } from './tracker.service';
import { TrackerController } from './tracker.controller';
import { ArticleService } from '@/article/article.service';

@Module({
  controllers: [TrackerController],
  providers: [TrackerService, ArticleService],
})
export class TrackerModule {}
