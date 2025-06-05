import { Test, TestingModule } from '@nestjs/testing';
import { ShortenerController } from './shortener.controller';
import { ShortenerService } from '../services/shortener.service';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { CreateShortenerDto, UpdateShortenerDto } from './dtos/shortener.dtos';
import { ICurrentUser } from '../../shared/decorators/current-user';

describe('ShortenerController', () => {
  let controller: ShortenerController;
  let service: ShortenerService;

  const mockShortenerService = {
    myUrls: jest.fn(),
    getOriginalUrl: jest.fn(),
    updateMyUrl: jest.fn(),
    deleteMyUrl: jest.fn(),
    shortenUrl: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShortenerController],
      providers: [
        { provide: ShortenerService, useValue: mockShortenerService },
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue({ canActivate: jest.fn(() => true) })
      .compile();

    controller = module.get<ShortenerController>(ShortenerController);
    service = module.get<ShortenerService>(ShortenerService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getMyUrls', () => {
    it('should return user urls', async () => {
      const user: ICurrentUser = { sub: '1', email: 'a@a.com', iat: 0, exp: 0 };
      const urls = [{ id: 1, originalUrl: 'http://test.com' }];
      mockShortenerService.myUrls.mockResolvedValue(urls);

      const result = await controller.getMyUrls(user);
      expect(result).toEqual(urls);
      expect(mockShortenerService.myUrls).toHaveBeenCalledWith(user);
    });
  });

  describe('updateMyUrl', () => {
    it('should call service to update url', async () => {
      const id = '1';
      const user: ICurrentUser = { sub: '1', email: 'a@a.com', iat: 0, exp: 0 };
      const data: UpdateShortenerDto = { originalUrl: 'http://new.com' };
      mockShortenerService.updateMyUrl.mockResolvedValue(undefined);

      await controller.updateMyUrl(id, user, data);
      expect(mockShortenerService.updateMyUrl).toHaveBeenCalledWith(
        id,
        user,
        data,
      );
    });
  });

  describe('deleteMyUrl', () => {
    it('should call service to delete url', async () => {
      const id = '1';
      const user: ICurrentUser = { sub: '1', email: 'a@a.com', iat: 0, exp: 0 };
      mockShortenerService.deleteMyUrl.mockResolvedValue(undefined);

      await controller.deleteMyUrl(id, user);
      expect(mockShortenerService.deleteMyUrl).toHaveBeenCalledWith(id, user);
    });
  });

  describe('shorten', () => {
    it('should call service to shorten url', async () => {
      const dto: CreateShortenerDto = { originalUrl: 'http://test.com' };
      const user: ICurrentUser = { sub: '1', email: 'a@a.com', iat: 0, exp: 0 };
      const result = { shortUrl: 'http://short.com/abc123' };
      mockShortenerService.shortenUrl.mockResolvedValue(result);

      const response = await controller.shorten(dto, user);
      expect(response).toEqual(result);
      expect(mockShortenerService.shortenUrl).toHaveBeenCalledWith(dto, user);
    });
  });
});
