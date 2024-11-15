"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("../../infrastructure/database/data-source");
const CropEntity_1 = require("../../infrastructure/database/entities/CropEntity");
const CropRepository_1 = __importDefault(require("../../infrastructure/repositories/CropRepository"));
class CropService {
    constructor() {
        this.cropRepository = new CropRepository_1.default(data_source_1.AppDataSource.manager);
    }
    async getAllCrop() {
        try {
            const crop = await this.cropRepository.findAll();
            return crop;
        }
        catch (error) {
            throw new Error('Error retrieving crop: ' + error.message);
        }
    }
    async getCropById(id) {
        try {
            const crop = await this.cropRepository.findById(id);
            return crop;
        }
        catch (error) {
            throw new Error('Error retrieving crop: ' + error.message);
        }
    }
    async createCrop(data) {
        const crop = new CropEntity_1.CropEntity();
        crop.name = data.name;
        return this.cropRepository.save(crop);
    }
    async updateCrop(id, cropData) {
        try {
            const crop = await this.cropRepository.findById(id);
            if (!crop) {
                return null;
            }
            crop.name = cropData.name;
            const updatedCrop = await this.cropRepository.save(crop);
            return updatedCrop;
        }
        catch (error) {
            throw new Error('Error updating crop: ' + error.message);
        }
    }
    async deleteCrop(id) {
        try {
            const crop = await this.cropRepository.findById(id);
            if (!crop) {
                return false;
            }
            await this.cropRepository.delete(id);
            return true;
        }
        catch (error) {
            throw new Error('Error deleting crop: ' + error.message);
        }
    }
}
exports.default = CropService;
