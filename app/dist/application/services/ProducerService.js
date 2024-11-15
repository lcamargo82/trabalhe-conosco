"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const ProducerRepository_1 = __importDefault(require("../../infrastructure/repositories/ProducerRepository"));
const ProducerEntity_1 = require("../../infrastructure/database/entities/ProducerEntity");
const CpfCnpjValueObject_1 = __importDefault(require("../../domain/valueObjects/CpfCnpjValueObject"));
class ProducerService {
    constructor() {
        this.producerRepository = new ProducerRepository_1.default();
        this.producerRepository = new ProducerRepository_1.default();
    }
    async getProducer(id) {
        try {
            const producer = await this.producerRepository.findById(id);
            return producer;
        }
        catch (error) {
            throw new Error('Error retrieving producer: ' + error.message);
        }
    }
    async createProducer(data) {
        new CpfCnpjValueObject_1.default(data.cpf_cnpj);
        const hashedPassword = await bcrypt_1.default.hash(data.password, 10);
        const producer = new ProducerEntity_1.ProducerEntity();
        producer.name = data.name;
        producer.email = data.email;
        producer.password = hashedPassword;
        producer.cpf_cnpj = data.cpf_cnpj;
        return this.producerRepository.save(producer);
    }
    async updateProducer(id, producerData) {
        try {
            const producer = await this.producerRepository.findById(id);
            if (!producer) {
                return null;
            }
            new CpfCnpjValueObject_1.default(producerData.cpf_cnpj);
            producer.name = producerData.name;
            producer.email = producerData.email;
            producer.password = producerData.password;
            const updatedProducer = await this.producerRepository.save(producer);
            return updatedProducer;
        }
        catch (error) {
            throw new Error('Error updating producer: ' + error.message);
        }
    }
    async deleteProducer(id) {
        try {
            const producer = await this.producerRepository.findById(id);
            if (!producer) {
                return false;
            }
            await this.producerRepository.delete(id);
            return true;
        }
        catch (error) {
            throw new Error('Error deleting producer: ' + error.message);
        }
    }
}
exports.default = ProducerService;
