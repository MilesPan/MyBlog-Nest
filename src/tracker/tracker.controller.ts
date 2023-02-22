import { ArticleService } from './../article/article.service';
import { Controller, Post, Body } from '@nestjs/common';
import { TrackerService } from './tracker.service';
import { CreateTrackerDto } from './dto/create-tracker.dto';
import { Tracker } from './dto/options.dto';

@Controller()
export class TrackerController {
  constructor(
    private readonly trackerService: TrackerService,
    private readonly articleService: ArticleService,
  ) {}

  @Post('tracker')
  track(@Body() createTrackerDto: CreateTrackerDto) {
    const options: Tracker = JSON.parse(Object.keys(createTrackerDto)[0]);
    if (options.targetKey)
      return this.articleService.updateReadTimes(+options.targetKey);
  }
}
