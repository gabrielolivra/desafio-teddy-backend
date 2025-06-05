import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { Shortener } from '../entity/shortener.entity';
import { ICurrentUser } from '../../shared/decorators/current-user';
import { temporaryUrlMap } from '../../shared/cache/url-cache';
import {
  CreateShortenerDto,
  UpdateShortenerDto,
} from '../controllers/dtos/shortener.dtos';
import { nanoid } from 'nanoid';

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

      return {
        shortUrl: `${process.env.URL_BASE || 'http://localhost:3000'}/${shortCode}`,
      };
    }

    const shortener = this.shortenerRepository.create({
      shortCode,
      original: urlOriginal.originalUrl,
      user: {
        id: user.sub,
      },
    });

    await this.shortenerRepository.save(shortener);

    return {
      shortUrl: `${process.env.URL_BASE || 'http://localhost:3000'}/${shortCode}`,
    };
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

  async myUrls(user: ICurrentUser) {
    if (!user) {
      throw new BadRequestException('User not found');
    }
    const shortener = await this.shortenerRepository.find({
      where: {
        user: {
          id: user.sub,
        },
      },
    });
    return shortener.map((item) => ({
      ...item,
      shortUrl: `${process.env.URL_BASE || 'http://localhost:3000'}/${item.shortCode}`,
    }));
  }

  async updateMyUrl(
    id: string,
    user: ICurrentUser,
    data: UpdateShortenerDto,
  ): Promise<void> {
    const shortener = await this.shortenerRepository.findOne({
      where: {
        id: id,
        user: {
          id: user.sub,
        },
      },
    });
    if (!shortener) {
      throw new BadRequestException('Shortener not found');
    }
    await this.shortenerRepository.update(id, {
      original: data.originalUrl,
    });
  }

  async deleteMyUrl(id: string, user: ICurrentUser): Promise<void> {
    const shortener = await this.shortenerRepository.findOne({
      where: {
        id: id,
        user: {
          id: user.sub,
        },
      },
    });

    if (!shortener) {
      throw new BadRequestException('Shortener not found');
    }
    await this.shortenerRepository.softDelete(id);
  }
}
