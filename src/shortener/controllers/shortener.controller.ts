import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { ShortenerService } from '../services/shortener.service';
import { CurrentUser, ICurrentUser } from 'src/shared/decorators/current-user';
import { temporaryUrlMap } from 'src/shared/cache/url-cache';
import { CreateShortenerDto } from './dtos/shortener.dtos';

@Controller()
export class ShortenerController {
  constructor(private readonly shortenerService: ShortenerService) {}

  @Get(':shortCode')
  async redirect(@Param('shortCode') shortCode: string, @Res() res) {
    const original = await this.shortenerService.getOriginalUrl(shortCode);
    const tempUrl = temporaryUrlMap.get(shortCode);
    if (tempUrl) {
      return res.redirect(tempUrl);
    }
    return res.redirect(original);
  }

  @Post('')
  async shorten(
    @Body() urlOriginal: CreateShortenerDto,
    @CurrentUser() user: ICurrentUser,
  ) {
    const shortUrl = await this.shortenerService.shortenUrl(urlOriginal, user);
    return shortUrl;
  }
}
