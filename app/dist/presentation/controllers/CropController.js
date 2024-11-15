"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CropService_1 = __importDefault(require("../../application/services/CropService"));
class CropController {
    constructor() {
        this.cropService = new CropService_1.default();
        this.getAllCrop = async (req, res) => {
            try {
                const crop = await this.cropService.getAllCrop();
                res.status(200).json({ message: 'Crop retrieved successfully', crop });
            }
            catch (error) {
                res.status(500).json({ error: 'Error retrieving crop' });
            }
        };
        this.getCrop = async (req, res) => {
            try {
                const { id } = req.params;
                const crop = await this.cropService.getCropById(Number(id));
                if (!crop) {
                    res.status(404).json({ error: 'Producer not found' });
                    return;
                }
                res.status(200).json({ message: 'Crop retrieved successfully', crop });
            }
            catch (error) {
                res.status(500).json({ error: 'Error retrieving crop' });
            }
        };
        this.createCrop = async (req, res) => {
            try {
                const cropData = req.body;
                const crop = await this.cropService.createCrop(cropData);
                res
                    .status(200)
                    .json({ message: 'Crop created successfully', crop: crop });
            }
            catch (error) {
                res.status(500).json({ error: 'Error creating crop' });
            }
        };
        this.updateCrop = async (req, res) => {
            try {
                const { id } = req.params;
                const cropData = req.body;
                const updatedCrop = await this.cropService.updateCrop(Number(id), cropData);
                if (!updatedCrop) {
                    res.status(404).json({ error: 'Crop not found or failed to update' });
                    return;
                }
                res.status(200).json({
                    message: 'Crop updated successfully',
                    crop: updatedCrop,
                });
            }
            catch (error) {
                res.status(500).json({ error: 'Error updating Crop' });
            }
        };
        this.deleteCrop = async (req, res) => {
            try {
                const { id } = req.params;
                const deletedCrop = await this.cropService.deleteCrop(Number(id));
                if (!deletedCrop) {
                    res.status(404).json({ error: 'Crop not found or failed to delete' });
                    return;
                }
                res.status(200).json({ message: 'Crop deleted successfully' });
            }
            catch (error) {
                res.status(500).json({ error: 'Error deleting Crop' });
            }
        };
    }
}
exports.default = new CropController();
