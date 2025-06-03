import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { nanoid } from 'nanoid';
import { Repository } from 'typeorm';
import { Shortener } from '../entity/shortener.entity';
import { ICurrentUser } from 'src/shared/decorators/current-user';
import { temporaryUrlMap } from 'src/shared/cache/url-cache';
import { CreateShortenerDto } from '../controllers/dtos/shortener.dtos';

@Injectable()
export class ShortenerService {
  constructor(
    @InjectRepository(Shortener)
    private readonly shortenerRepository: Repository<Shortener>,
  ) {}

  async shortenUrl(urlOriginal: CreateShortenerDto, user: ICurrentUser) {
    const shortCode = nanoid(6);

    if (!user) {
      temporaryUrlMap.set(shortCode, urlOriginal.originalUrl);
      return { shortUrl: `http://localhost:3001/api/${shortCode}` };
    }

    const shortener = this.shortenerRepository.create({
      shortCode,
      original: urlOriginal.originalUrl,
      user,
    });

    await this.shortenerRepository.save(shortener);

    return { shortUrl: `http://localhost:3001/api/${shortCode}` };
  }

  async getOriginalUrl(shortCode: string) {
    const short = await this.shortenerRepository.findOne({
      where: {
        shortCode,
      },
    });
    if (!short) {
      return null;
    }
    short.clicks++;
    await this.shortenerRepository.save(short);
    return short.original;
  }
}
