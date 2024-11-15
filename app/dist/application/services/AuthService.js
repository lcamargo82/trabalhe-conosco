"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const ProducerRepository_1 = __importDefault(require("../../infrastructure/repositories/ProducerRepository"));
class AuthService {
    constructor() {
        this.producerRepository = new ProducerRepository_1.default();
        this.producerRepository = new ProducerRepository_1.default();
    }
    async login(email, password) {
        const producer = await this.producerRepository.findByEmail(email);
        if (!producer || !(await bcrypt_1.default.compare(password, producer.password))) {
            throw new Error('Invalid email or password');
        }
        const token = jsonwebtoken_1.default.sign({ id: producer.id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });
        return token;
    }
}
exports.default = AuthService;
