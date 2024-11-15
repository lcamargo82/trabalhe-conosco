"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ProducerService_1 = __importDefault(require("../../application/services/ProducerService"));
class ProducerController {
    constructor() {
        this.producerService = new ProducerService_1.default();
        this.getProducer = async (req, res) => {
            try {
                const { id } = req.params;
                const producer = await this.producerService.getProducer(Number(id));
                if (!producer) {
                    res.status(404).json({ error: 'Producer not found' });
                    return;
                }
                res
                    .status(200)
                    .json({ message: 'Producer retrieved successfully', producer });
            }
            catch (error) {
                res.status(500).json({ error: 'Error retrieving producer' });
            }
        };
        this.updateProducer = async (req, res) => {
            try {
                const { id } = req.params;
                const producerData = req.body;
                const updatedProducer = await this.producerService.updateProducer(Number(id), producerData);
                if (!updatedProducer) {
                    res
                        .status(404)
                        .json({ error: 'Producer not found or failed to update' });
                    return;
                }
                res.status(200).json({
                    message: 'Producer updated successfully',
                    producer: updatedProducer,
                });
            }
            catch (error) {
                res.status(500).json({ error: 'Error updating producer' });
            }
        };
        this.deleteProducer = async (req, res) => {
            try {
                const { id } = req.params;
                const deletedProducer = await this.producerService.deleteProducer(Number(id));
                if (!deletedProducer) {
                    res
                        .status(404)
                        .json({ error: 'Producer not found or failed to delete' });
                    return;
                }
                res.status(200).json({ message: 'Producer deleted successfully' });
            }
            catch (error) {
                res.status(500).json({ error: 'Error deleting producer' });
            }
        };
    }
}
exports.default = new ProducerController();
