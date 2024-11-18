import ProducerService from '../../../../src/application/services/ProducerService';
import ProducerRepository from '../../../../src/infrastructure/repositories/ProducerRepository';
import CpfCnpjValueObject from '../../../../src/domain/valueObjects/CpfCnpjValueObject';
import { ProducerEntity } from '../../../../src/infrastructure/database/entities/ProducerEntity';

jest.mock('../../../../src/infrastructure/repositories/ProducerRepository');
jest.mock('../../../../src/domain/valueObjects/CpfCnpjValueObject');

describe('ProducerService', () => {
  let producerService: ProducerService;
  let mockProducerRepository: jest.Mocked<ProducerRepository>;
  let mockCpfCnpjValueObject: jest.Mocked<CpfCnpjValueObject>;

  beforeEach(() => {
    mockProducerRepository = new ProducerRepository() as jest.Mocked<ProducerRepository>;
    mockCpfCnpjValueObject = new CpfCnpjValueObject('') as jest.Mocked<CpfCnpjValueObject>;
    producerService = new ProducerService(mockProducerRepository);
  });

  describe('getProducer', () => {
    it('should return a producer when found', async () => {
      const mockProducer = new ProducerEntity();
      mockProducer.id = 1;
      mockProducer.name = 'Test Producer';
      mockProducer.email = 'test@producer.com';
      mockProducer.cpf_cnpj = '12345678901';
      
      mockProducerRepository.findById.mockResolvedValue(mockProducer);

      const result = await producerService.getProducer(1);

      expect(result).toEqual(mockProducer);
      expect(mockProducerRepository.findById).toHaveBeenCalledWith(1);
    });

    it('should return null if producer is not found', async () => {
      mockProducerRepository.findById.mockResolvedValue(null);

      const result = await producerService.getProducer(999);

      expect(result).toBeNull();
      expect(mockProducerRepository.findById).toHaveBeenCalledWith(999);
    });
  });

  describe('updateProducer', () => {
    it('should update and return a producer', async () => {
      const producerDTO = {
        id: 1,
        name: 'Updated Producer',
        email: 'updated@producer.com',
        password: 'newpassword',
        cpf_cnpj: '12345678901',
      };

      const mockProducer = new ProducerEntity();
      mockProducer.id = 1;
      mockProducer.name = 'Old Producer';
      mockProducer.email = 'old@producer.com';
      mockProducer.cpf_cnpj = '12345678901';
      mockProducer.password = 'oldpassword';

      mockProducerRepository.findById.mockResolvedValue(mockProducer);
      mockProducerRepository.save.mockResolvedValue(mockProducer);

      const result = await producerService.updateProducer(1, producerDTO);

      expect(result).toEqual(mockProducer);
      expect(mockProducerRepository.save).toHaveBeenCalledWith(mockProducer);
    });

    it('should return null if producer is not found', async () => {
      mockProducerRepository.findById.mockResolvedValue(null);

      const result = await producerService.updateProducer(999, { 
        id: 999,
        name: 'Updated', 
        email: 'updated@example.com', 
        password: 'newpassword', 
        cpf_cnpj: '12345678901' 
      });

      expect(result).toBeNull();
      expect(mockProducerRepository.findById).toHaveBeenCalledWith(999);
    });
  });

  describe('deleteProducer', () => {
    it('should delete a producer', async () => {
      const mockProducer = new ProducerEntity();
      mockProducer.id = 1;
      mockProducer.name = 'Producer to delete';

      mockProducerRepository.findById.mockResolvedValue(mockProducer);
      mockProducerRepository.delete.mockResolvedValue(undefined);

      const result = await producerService.deleteProducer(1);

      expect(result).toBe(true);
      expect(mockProducerRepository.delete).toHaveBeenCalledWith(1);
    });

    it('should return false if producer is not found', async () => {
      mockProducerRepository.findById.mockResolvedValue(null);

      const result = await producerService.deleteProducer(999);

      expect(result).toBe(false);
      expect(mockProducerRepository.findById).toHaveBeenCalledWith(999);
    });
  });
});
