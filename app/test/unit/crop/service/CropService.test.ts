import { AppDataSource } from '../../../../src/infrastructure/database/data-source';
import CropService from '../../../../src/application/services/CropService';
import CropRepository from '../../../../src/infrastructure/repositories/CropRepository';
import { CropEntity } from '../../../../src/infrastructure/database/entities/CropEntity';

jest.mock('../../../../src/infrastructure/repositories/CropRepository');

describe('CropService', () => {
  let cropService: CropService;
  let mockCropRepository: jest.Mocked<CropRepository>;
  let mockCrop: CropEntity;

  beforeEach(() => {
    mockCropRepository = new CropRepository(
      AppDataSource.manager
    ) as jest.Mocked<CropRepository>;
    cropService = new CropService();
    (cropService as any).cropRepository = mockCropRepository;

    mockCrop = {
      id: 1,
      name: 'Corn',
      created_at: new Date(),
      updated_at: null,
      deleted_at: null,
      farms: [],
    } as CropEntity;
  });

  it('should fetch all crops', async () => {
    mockCropRepository.findAll.mockResolvedValue([mockCrop]);

    const crops = await cropService.getAllCrop();

    expect(crops).toEqual([mockCrop]);
    expect(mockCropRepository.findAll).toHaveBeenCalled();
  });

  it('should fetch a crop by id', async () => {
    mockCropRepository.findById.mockResolvedValue(mockCrop);

    const crop = await cropService.getCropById(1);

    expect(crop).toEqual(mockCrop);
    expect(mockCropRepository.findById).toHaveBeenCalledWith(1);
  });

  it('should create a crop', async () => {
    mockCropRepository.save.mockResolvedValue(mockCrop);

    const crop = await cropService.createCrop({ name: 'Corn' });

    expect(crop).toEqual(mockCrop);
    expect(mockCropRepository.save).toHaveBeenCalledWith(
      expect.objectContaining({ name: 'Corn' })
    );
  });

  it('should update a crop', async () => {
    mockCropRepository.findById.mockResolvedValue(mockCrop);
    mockCropRepository.save.mockResolvedValue(mockCrop);

    const updatedCrop = await cropService.updateCrop(1, {
      id: 1,
      name: 'Updated Corn',
    });

    expect(updatedCrop).toEqual(mockCrop);
    expect(mockCropRepository.findById).toHaveBeenCalledWith(1);
    expect(mockCropRepository.save).toHaveBeenCalledWith(
      expect.objectContaining({ id: 1, name: 'Updated Corn' })
    );
  });

  it('should delete a crop', async () => {
    mockCropRepository.findById.mockResolvedValue(mockCrop);
    mockCropRepository.delete.mockResolvedValue(true);

    const result = await cropService.deleteCrop(1);

    expect(result).toBe(true);
    expect(mockCropRepository.findById).toHaveBeenCalledWith(1);
    expect(mockCropRepository.delete).toHaveBeenCalledWith(1);
  });

  it('should return some other behavior', async () => {});
});
