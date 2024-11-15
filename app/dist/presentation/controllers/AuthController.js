"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AuthService_1 = __importDefault(require("../../application/services/AuthService"));
const ProducerService_1 = __importDefault(require("../../application/services/ProducerService"));
class AuthController {
    constructor() {
        this.authService = new AuthService_1.default();
        this.producerService = new ProducerService_1.default();
        this.createProducer = async (req, res) => {
            try {
                const producerData = req.body;
                const producer = await this.producerService.createProducer(producerData);
                res
                    .status(200)
                    .json({ message: 'Producer created successfully', producer: producer });
            }
            catch (error) {
                res.status(500).json({ error: 'Error creating producer' });
            }
        };
        this.login = async (req, res) => {
            try {
                const { email, password } = req.body;
                const token = await this.authService.login(email, password);
                res.status(200).json({ message: 'Login successful', token: token });
            }
            catch (error) {
                res.status(401).json({ error: 'Invalid email or password' });
            }
        };
    }
}
exports.default = new AuthController();
