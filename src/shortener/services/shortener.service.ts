import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { nanoid } from 'nanoid';
import { Repository } from 'typeorm';
import { Shortener } from '../entity/shortener.entity';

@Injectable()
export class ShortenerService {
    constructor(
        @InjectRepository(Shortener)
        private readonly shortenerRepository: Repository<Shortener>,
    ) {}

    async shortenUrl(original:string){
        const shortCode = nanoid(6)
        const shortener = this.shortenerRepository.create({
            shortCode,
            original
        })
        await this.shortenerRepository.save(shortener)
        return {shortUrl: `http://localhost:3001/api/${shortCode}`}
    }

    async getOriginalUrl(shortCode:string){
        const short = await this.shortenerRepository.findOne({
            where:{
                shortCode
            }
        })
        if(!short){
            return null
        }
        short.clicks++
        await this.shortenerRepository.save(short)
        console.log(short.original)
        return short.original
    }
}
