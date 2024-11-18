import { Request, Response, NextFunction } from 'express';
import AuthController from '../../../../src/presentation/controllers/AuthController';
import ProducerService from '../../../../src/application/services/ProducerService';
import AuthService from '../../../../src/application/services/AuthService';
import { ProducerEntity } from '../../../../src/infrastructure/database/entities/ProducerEntity';
import ProducerRepository from '../../../../src/infrastructure/repositories/ProducerRepository';

jest.mock('../../../../src/application/services/ProducerService');
jest.mock('../../../../src/application/services/AuthService');

describe('AuthController Tests', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockNext: NextFunction;
  let mockProducer: ProducerEntity;
  let mockProducerRepository: jest.Mocked<ProducerRepository>;
  let producerService: ProducerService;
  let authService: AuthService;

  beforeEach(() => {
    mockProducerRepository = new ProducerRepository() as jest.Mocked<ProducerRepository>;

    producerService = new ProducerService(mockProducerRepository);

    authService = new AuthService();
    (authService as any).producerRepository = mockProducerRepository;

    mockRequest = {};
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    mockNext = jest.fn();

    mockProducer = {
      id: 1,
      name: 'Producer Name',
      email: 'producer@example.com',
      password: 'password123',
      cpf_cnpj: '51255212055',
      created_at: new Date(),
      updated_at: null,
      deleted_at: null,
    } as ProducerEntity;

    (ProducerService.prototype.createProducer as jest.Mock).mockResolvedValue(mockProducer);
  });

  it('should create a producer successfully', async () => {
    mockRequest.body = {
      name: 'Producer Name',
      email: 'producer@example.com',
      password: 'password123',
      cpf_cnpj: '51255212055',
    };

    await AuthController.createProducer(
      mockRequest as Request,
      mockResponse as Response,
      mockNext
    );

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: 'Producer created successfully',
      producer: mockProducer,
    });
  });

  it('should handle errors in createProducer', async () => {
    const error = new Error('Failed to create producer');
    (ProducerService.prototype.createProducer as jest.Mock).mockRejectedValue(error);

    await AuthController.createProducer(
      mockRequest as Request,
      mockResponse as Response,
      mockNext
    );

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({
      error: 'Error creating producer',
    });
  });

  it('should handle login successfully', async () => {
    mockRequest.body = {
      email: 'producer@example.com',
      password: 'password123',
    };

    const mockToken = 'mock.jwt.token';

    (AuthService.prototype.login as jest.Mock).mockResolvedValue(mockToken);

    await AuthController.login(
      mockRequest as Request,
      mockResponse as Response,
      mockNext
    );

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: 'Login successful',
      token: mockToken,
    });
  });

  it('should handle errors in login', async () => {
    const error = new Error('Invalid credentials');
    (AuthService.prototype.login as jest.Mock).mockRejectedValue(error);

    await AuthController.login(
      mockRequest as Request,
      mockResponse as Response,
      mockNext
    );

    expect(mockResponse.status).toHaveBeenCalledWith(401);
    expect(mockResponse.json).toHaveBeenCalledWith({
      error: 'Invalid email or password',
    });
  });
});
