import { IsNotEmpty, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateShortenerDto {
  @ApiProperty({
    description: 'URL original a ser encurtada',
    example: 'https://www.exemplo.com',
  })
  @IsNotEmpty()
  @IsUrl()
  originalUrl: string;
}

export class UpdateShortenerDto {
  @ApiProperty({
    description: 'Nova URL original para atualizar',
    example: 'https://www.novaurl.com',
  })
  @IsNotEmpty()
  @IsUrl()
  originalUrl: string;
}
