"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FarmController = void 0;
class FarmController {
    constructor(farmService) {
        this.farmService = farmService;
    }
    async createFarm(req, res) {
        try {
            const data = req.body;
            const producerId = req.user.id;
            const farm = await this.farmService.createFarm(data, producerId);
            res.status(201).json(farm);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async getAllFarms(req, res) {
        try {
            const farms = await this.farmService.getAllFarms();
            res.status(200).json(farms);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async getFarmById(req, res) {
        try {
            const farm = await this.farmService.getFarmById(Number(req.params.id));
            if (!farm) {
                res.status(404).json({ message: 'Farm not found' });
            }
            else {
                res.status(200).json(farm);
            }
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async updateFarm(req, res) {
        try {
            const farm = await this.farmService.updateFarm(Number(req.params.id), req.body);
            res.status(200).json(farm);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async deleteFarm(req, res) {
        try {
            await this.farmService.deleteFarm(Number(req.params.id));
            res.status(204).send();
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}
exports.FarmController = FarmController;
