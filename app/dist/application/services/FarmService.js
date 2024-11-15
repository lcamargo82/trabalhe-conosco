"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FarmEntity_1 = require("../../infrastructure/database/entities/FarmEntity");
class FarmService {
    constructor(farmRepository, producerRepository, cropRepository) {
        this.farmRepository = farmRepository;
        this.producerRepository = producerRepository;
        this.cropRepository = cropRepository;
    }
    async getAllFarms() {
        try {
            const farms = await this.farmRepository.findAll();
            return farms;
        }
        catch (error) {
            throw new Error('Error retrieving farms: ' + error.message);
        }
    }
    async createFarm(data, producerId) {
        this.validateFarmArea(data);
        const producer = await this.producerRepository.findById(producerId);
        if (!producer) {
            throw new Error('Producer not found');
        }
        const crops = await this.cropRepository.findCropsByIds(data.crop);
        const farm = new FarmEntity_1.FarmEntity();
        farm.producer = producer;
        farm.crops = crops;
        Object.assign(farm, data);
        const createdFarm = await this.farmRepository.create(farm);
        return createdFarm;
    }
    async getFarmById(id) {
        try {
            const farm = await this.farmRepository.findById(id);
            return farm;
        }
        catch (error) {
            throw new Error('Error retrieving farm: ' + error.message);
        }
    }
    async updateFarm(id, data) {
        try {
            const farm = await this.getFarmById(id);
            if (!farm)
                throw new Error('Farm not found');
            this.validateFarmArea(data);
            if (data.crop && data.crop.length > 0) {
                const crops = await this.cropRepository.findCropsByIds(data.crop);
                farm.crops = crops;
            }
            Object.assign(farm, data);
            const updatedFarm = await this.farmRepository.update(farm);
            return updatedFarm;
        }
        catch (error) {
            throw new Error('Error updating farm: ' + error.message);
        }
    }
    async deleteFarm(id) {
        try {
            const farm = await this.farmRepository.findById(id);
            if (!farm) {
                return false;
            }
            farm.deletedAt = new Date();
            await this.farmRepository.update(farm);
            farm.crops = [];
            await this.farmRepository.update(farm);
            return true;
        }
        catch (error) {
            throw new Error('Error deleting farm: ' + error.message);
        }
    }
    validateFarmArea(data) {
        const { areaHectaresFarm, arableAreaHectares, vegetationAreaFarm } = data;
        if (arableAreaHectares + vegetationAreaFarm > areaHectaresFarm) {
            throw new Error('A soma das áreas agrícolas e de vegetação não pode ser maior que a área total da fazenda.');
        }
    }
}
exports.default = FarmService;