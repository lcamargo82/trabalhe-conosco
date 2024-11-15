"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FarmRepository = void 0;
const data_source_1 = require("../database/data-source");
const FarmEntity_1 = require("../database/entities/FarmEntity");
class FarmRepository {
    constructor() {
        this.ormRepository = data_source_1.AppDataSource.getRepository(FarmEntity_1.FarmEntity);
    }
    async create(farm) {
        return this.ormRepository.save(farm);
    }
    async findAll() {
        return this.ormRepository.find();
    }
    async findById(id) {
        return this.ormRepository.findOneBy({ id });
    }
    async update(farm) {
        return this.ormRepository.save(farm);
    }
    async delete(id) {
        await this.ormRepository.delete(id);
    }
}
exports.FarmRepository = FarmRepository;
