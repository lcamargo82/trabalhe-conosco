import { Request, Response, NextFunction } from 'express';
import CropController from '../../../../src/presentation/controllers/CropController';
import CropService from '../../../../src/application/services/CropService';

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

    (CropService.prototype.getAllCrop as jest.Mock).mockResolvedValue(
      mockCrops
    );
  });

  it('should get all crops successfully', async () => {
    await CropController.getAllCrop(
      mockRequest as Request,
      mockResponse as Response,
      mockNext
    );

    expect(mockResponse.status).toHaveBeenCalledWith(200);

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
    (CropService.prototype.getAllCrop as jest.Mock).mockRejectedValue(
      new Error('Failed to fetch crops')
    );

    await CropController.getAllCrop(
      mockRequest as Request,
      mockResponse as Response,
      mockNext
    );

    expect(mockResponse.status).toHaveBeenCalledWith(500);

    expect(mockResponse.json).toHaveBeenCalledWith({
      error: 'Error retrieving crop',
    });
  });
});
