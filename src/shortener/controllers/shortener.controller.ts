import { Body, Controller, Delete, Get, Param, Post, Put, Res, UseGuards } from '@nestjs/common';
import { ShortenerService } from '../services/shortener.service';
import { CurrentUser, ICurrentUser } from 'src/shared/decorators/current-user';
import { temporaryUrlMap } from 'src/shared/cache/url-cache';
import { CreateShortenerDto, UpdateShortenerDto } from './dtos/shortener.dtos';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller()
export class ShortenerController {
    constructor(private readonly shortenerService: ShortenerService) { }

    @Get('/my-urls')
    @UseGuards(AuthGuard)
    async getMyUrls(@CurrentUser() user: ICurrentUser) {
        return this.shortenerService.myUrls(user);
    }

    @Get(':shortCode')
    async redirect(@Param('shortCode') shortCode: string, @Res() res) {
        const original = await this.shortenerService.getOriginalUrl(shortCode);
        const tempUrl = temporaryUrlMap.get(shortCode);
        if (tempUrl) {
            return res.redirect(tempUrl);
        }
        return res.redirect(original);
    }

    @Put('/my-urls/:id')
    @UseGuards(AuthGuard)
    async updateMyUrl(
        @Param('id') id: number,
        @CurrentUser() user: ICurrentUser,
        @Body() data: UpdateShortenerDto
    ) {
        await this.shortenerService.updateMyUrl(id, user, data);
    }

    @Delete('/my-urls/:id')
    @UseGuards(AuthGuard)
    async deleteMyUrl(
        @Param('id') id: number,
        @CurrentUser() user: ICurrentUser,
    ) {
        await this.shortenerService.deleteMyUrl(id, user);
    }

    @Post('/shorten')
    async shorten(
        @Body() urlOriginal: CreateShortenerDto,
        @CurrentUser() user: ICurrentUser,
    ) {
        const shortUrl = await this.shortenerService.shortenUrl(urlOriginal, user);
        return shortUrl;
    }

}
