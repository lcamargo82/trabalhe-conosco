"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("../database/data-source");
const ProducerEntity_1 = require("../database/entities/ProducerEntity");
class ProducerRepository {
    constructor() {
        this.ormRepository = data_source_1.AppDataSource.getRepository(ProducerEntity_1.ProducerEntity);
    }
    async save(producer) {
        return this.ormRepository.save(producer);
    }
    async findByEmail(email) {
        return this.ormRepository.findOne({ where: { email, deleted_at: null } });
    }
    async findById(id) {
        return this.ormRepository.findOne({ where: { id, deleted_at: null } });
    }
    async update(producer) {
        const existingProducer = await this.findById(producer.id);
        if (!existingProducer) {
            throw new Error('Producer not found');
        }
        return this.ormRepository.save(producer);
    }
    async delete(id) {
        const producer = await this.findById(id);
        if (!producer) {
            return false;
        }
        producer.deleted_at = new Date();
        await this.ormRepository.save(producer);
        return true;
    }
    async findAll() {
        return this.ormRepository.find({ where: { deleted_at: null } });
    }
}
exports.default = ProducerRepository;
