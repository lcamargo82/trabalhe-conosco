import { Request, Response, NextFunction } from 'express';
import CropController from '../../../../src/presentation/controllers/CropController';
import CropService from '../../../../src/application/services/CropService';
import { CropEntity } from '../../../../src/infrastructure/database/entities/CropEntity';

// Mock do módulo CropService
jest.mock('../../../../src/application/services/CropService');

describe('CropController Tests', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockNext: NextFunction;

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    mockNext = jest.fn();

    // Definindo os dados mockados para os "crops"
    const mockCrops = [
      {
        id: 1,
        name: 'Milho',
        created_at: new Date(),
        updated_at: null,
        deleted_at: null,
      },
      {
        id: 2,
        name: 'Soja',
        created_at: new Date(),
        updated_at: null,
        deleted_at: null,
      },
    ];

    // Aqui mockamos a função `getAllCrop` diretamente na implementação do serviço
    (CropService.prototype.getAllCrop as jest.Mock).mockResolvedValue(mockCrops);
  });

  it('should get all crops successfully', async () => {
    // Chamando o controlador com os mocks de request e response
    await CropController.getAllCrop(
      mockRequest as Request,
      mockResponse as Response,
      mockNext
    );

    // Verificando se o status da resposta foi 200
    expect(mockResponse.status).toHaveBeenCalledWith(200);

    // Verificando se a resposta JSON contém a mensagem e os "crops" corretamente
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: 'Crop retrieved successfully',
      crop: [
        {
          id: 1,
          name: 'Milho',
          created_at: expect.any(Date),
          updated_at: null,
          deleted_at: null,
        },
        {
          id: 2,
          name: 'Soja',
          created_at: expect.any(Date),
          updated_at: null,
          deleted_at: null,
        },
      ],
    });
  });

  it('should handle errors in getAllCrops', async () => {
    // Simulando um erro na chamada do serviço
    (CropService.prototype.getAllCrop as jest.Mock).mockRejectedValue(new Error('Failed to fetch crops'));

    // Chamando o controlador
    await CropController.getAllCrop(
      mockRequest as Request,
      mockResponse as Response,
      mockNext
    );

    // Verificando se o status de erro foi chamado
    expect(mockResponse.status).toHaveBeenCalledWith(500);

    // Verificando se a resposta JSON contém o erro
    expect(mockResponse.json).toHaveBeenCalledWith({
      error: 'Error retrieving crop',
    });
  });
});
