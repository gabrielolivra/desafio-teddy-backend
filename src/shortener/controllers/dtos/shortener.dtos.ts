import { IsNotEmpty, IsUrl } from 'class-validator';

export class CreateShortenerDto {
  @IsNotEmpty()
  @IsUrl()
  originalUrl: string;
}

export class UpdateShortenerDto {
  @IsNotEmpty()
  @IsUrl()
  originalUrl: string;
}


