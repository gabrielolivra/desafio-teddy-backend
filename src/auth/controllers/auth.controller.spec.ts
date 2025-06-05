import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from '../services/auth.service';
import { LoginDto } from './dtos/auth.dtos';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  const mockAuthService = {
    signIn: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: mockAuthService }],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('signIn', () => {
    it('should call AuthService.signIn and return its result', async () => {
      const dto: LoginDto = { email: 'test@email.com', password: '123456' };
      const result = { access_token: 'jwt.token.here' };
      mockAuthService.signIn.mockResolvedValue(result);

      const response = await controller.signIn(dto);
      expect(authService.signIn).toHaveBeenCalledWith(dto);
      expect(response).toEqual(result);
    });
  });
});
