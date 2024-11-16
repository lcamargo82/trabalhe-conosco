import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import AuthService from '../../../../src/application/services/AuthService';
import ProducerRepository from '../../../../src/infrastructure/repositories/ProducerRepository';
import { ProducerEntity } from '../../../../src/infrastructure/database/entities/ProducerEntity';

jest.mock('bcrypt');
jest.mock('jsonwebtoken');
jest.mock('../../../../src/infrastructure/repositories/ProducerRepository');

describe('AuthService', () => {
  let authService: AuthService;
  let mockProducerRepository: jest.Mocked<ProducerRepository>;
  let mockProducer: ProducerEntity;

  beforeEach(() => {
    mockProducerRepository =
      new ProducerRepository() as jest.Mocked<ProducerRepository>;
    authService = new AuthService();
    (authService as any).producerRepository = mockProducerRepository;

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
  });

  it('should return a token if email and password are valid', async () => {
    mockProducerRepository.findByEmail.mockResolvedValue(mockProducer);
    (bcrypt.compare as jest.Mock).mockResolvedValue(true);
    (jwt.sign as jest.Mock).mockReturnValue('mockedToken');

    const token = await authService.login(
      'producer@example.com',
      'password123'
    );

    expect(token).toBe('mockedToken');
    expect(mockProducerRepository.findByEmail).toHaveBeenCalledWith(
      'producer@example.com'
    );
    expect(bcrypt.compare).toHaveBeenCalledWith('password123', 'password123');
  });

  it('should throw an error if email is not found', async () => {
    mockProducerRepository.findByEmail.mockResolvedValue(null);

    await expect(
      authService.login('invalid@example.com', 'password123')
    ).rejects.toThrow('Invalid email or password');
  });

  it('should throw an error if password is invalid', async () => {
    mockProducerRepository.findByEmail.mockResolvedValue(mockProducer);
    (bcrypt.compare as jest.Mock).mockResolvedValue(false);

    await expect(
      authService.login('test@example.com', 'wrongpassword')
    ).rejects.toThrow('Invalid email or password');
  });
});
