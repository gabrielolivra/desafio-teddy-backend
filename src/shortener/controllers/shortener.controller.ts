import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { ShortenerService } from '../services/shortener.service';

@Controller()
export class ShortenerController {
constructor(private readonly shortenerService: ShortenerService){}

@Get(':shortCode')
async redirect(@Param('shortCode') shortCode:string, @Res() res){
    const original =  await this.shortenerService.getOriginalUrl(shortCode)
    return res.redirect(original)
}
@Post('')
async shorten(@Body('url') url:string){
    return this.shortenerService.shortenUrl(url)
}


}
