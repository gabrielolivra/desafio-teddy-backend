import { Module } from '@nestjs/common';
import { ShortenerService } from './services/shortener.service';
import { ShortenerController } from './controllers/shortener.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shortener } from './entity/shortener.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Shortener])],
  providers: [ShortenerService],
  controllers: [ShortenerController]
})
export class ShortenerModule {}
