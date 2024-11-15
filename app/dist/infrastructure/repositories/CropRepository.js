"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("../database/data-source");
const CropEntity_1 = require("../database/entities/CropEntity");
class CropRepository {
    constructor(entityManager) {
        this.entityManager = entityManager;
        this.ormRepository = data_source_1.AppDataSource.getRepository(CropEntity_1.CropEntity);
    }
    async save(crop) {
        return this.ormRepository.save(crop);
    }
    async findByName(name) {
        return this.ormRepository.findOne({ where: { name, deleted_at: null } });
    }
    async findById(id) {
        return this.ormRepository.findOne({ where: { id, deleted_at: null } });
    }
    async update(crop) {
        const existingCrop = await this.findById(crop.id);
        if (!existingCrop) {
            throw new Error('Crop not found');
        }
        return this.ormRepository.save(crop);
    }
    async delete(id) {
        const crop = await this.findById(id);
        if (!crop) {
            return false;
        }
        crop.deleted_at = new Date();
        await this.ormRepository.save(crop);
        return true;
    }
    async findAll() {
        return this.ormRepository.find({ where: { deleted_at: null } });
    }
    async findCropsByIds(ids) {
        return this.entityManager
            .createQueryBuilder(CropEntity_1.CropEntity, 'crop')
            .where('crop.id IN (:...ids)', { ids })
            .getMany();
    }
}
exports.default = CropRepository;
