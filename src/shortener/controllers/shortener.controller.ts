import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ShortenerService } from '../services/shortener.service';
import { CurrentUser, ICurrentUser } from '../../shared/decorators/current-user';
import { temporaryUrlMap } from '../../shared/cache/url-cache';
import { CreateShortenerDto, UpdateShortenerDto } from './dtos/shortener.dtos';
import { AuthGuard } from '../../auth/guards/auth.guard';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiBearerAuth,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';

@ApiTags('Shortener')
@Controller()
export class ShortenerController {
  constructor(private readonly shortenerService: ShortenerService) {}

  @Get('/my-urls')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Retorna todas as urls do usuário logado' })
  @ApiResponse({ status: 200, description: 'Urls retornadas com sucesso' })
  @UseGuards(AuthGuard)
  async getMyUrls(@CurrentUser() user: ICurrentUser) {
    return this.shortenerService.myUrls(user);
  }

  @Get(':shortCode')
  @ApiOperation({ summary: 'Redireciona para a url original' })
  @ApiParam({ name: 'shortCode', description: 'Código encurtado da URL' })
  @ApiResponse({
    status: 302,
    description: 'Redirecionamento para a URL original',
  })
  async redirect(@Param('shortCode') shortCode: string, @Res() res) {
    const original = await this.shortenerService.getOriginalUrl(shortCode);
    const tempUrl = temporaryUrlMap.get(shortCode);
    if (tempUrl) {
      return res.redirect(tempUrl);
    }
    return res.redirect(original);
  }

  @Put('/my-urls/:id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Atualiza a url do usuário logado' })
  @ApiParam({ name: 'id', description: 'ID da URL a ser atualizada' })
  @ApiBody({ type: UpdateShortenerDto })
  @ApiResponse({ status: 200, description: 'Url atualizada com sucesso' })
  @UseGuards(AuthGuard)
  async updateMyUrl(
    @Param('id') id: string,
    @CurrentUser() user: ICurrentUser,
    @Body() data: UpdateShortenerDto,
  ) {
    await this.shortenerService.updateMyUrl(id, user, data);
  }

  @Delete('/my-urls/:id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Deleta a url do usuário logado' })
  @ApiParam({ name: 'id', description: 'ID da URL a ser deletada' })
  @ApiResponse({ status: 200, description: 'Url deletada com sucesso' })
  @UseGuards(AuthGuard)
  async deleteMyUrl(
    @Param('id') id: string,
    @CurrentUser() user: ICurrentUser,
  ) {
    await this.shortenerService.deleteMyUrl(id, user);
  }

  @Post('/shorten')
   @ApiBearerAuth()
  @ApiOperation({
    summary:
      'Encurta a url e retorna a url encurtada. Caso o usuário esteja logado, grava ela.',
  })
  @ApiBody({ type: CreateShortenerDto })
  @ApiResponse({ status: 200, description: 'Retorna o link da url clicável' })
  async shorten(
    @Body() urlOriginal: CreateShortenerDto,
    @CurrentUser() user: ICurrentUser,
  ) {
    const shortUrl = await this.shortenerService.shortenUrl(urlOriginal, user);
    return shortUrl;
  }
}
