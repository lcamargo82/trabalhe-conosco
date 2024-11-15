"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CropController_1 = __importDefault(require("../controllers/CropController"));
const router = (0, express_1.Router)();
/**
 * @swagger
 * tags:
 *   name: Crop
 *   description: Routes for managing crop information
 */
/**
 * @swagger
 * /crop:
 *   get:
 *     summary: Get a list of all crops
 *     tags: [Crop]
 *     responses:
 *       200:
 *         description: List of crops retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Crops retrieved successfully"
 *                 crops:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       name:
 *                         type: string
 *                         example: "Wheat"
 *                       type:
 *                         type: string
 *                         example: "Grain"
 *       500:
 *         description: Error retrieving crops
 */
router.get('/crop', CropController_1.default.getAllCrop);
/**
 * @swagger
 * /crop/{id}:
 *   get:
 *     summary: Get a specific crop by ID
 *     tags: [Crop]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the crop to retrieve
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Crop retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Crop retrieved successfully"
 *                 crop:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: "Wheat"
 *                     type:
 *                       type: string
 *                       example: "Grain"
 *       404:
 *         description: Crop not found
 *       500:
 *         description: Error retrieving crop
 */
router.get('/crop/:id', CropController_1.default.getCrop);
/**
 * @swagger
 * /crop:
 *   post:
 *     summary: Create a new crop
 *     tags: [Crop]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Corn"
 *               type:
 *                 type: string
 *                 example: "Vegetable"
 *     responses:
 *       200:
 *         description: Crop created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Crop created successfully"
 *                 crop:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 2
 *                     name:
 *                       type: string
 *                       example: "Corn"
 *                     type:
 *                       type: string
 *                       example: "Vegetable"
 *       500:
 *         description: Error creating crop
 */
router.post('/crop', CropController_1.default.createCrop);
/**
 * @swagger
 * /crop/{id}:
 *   put:
 *     summary: Update a specific crop
 *     tags: [Crop]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the crop to update
 *         required: true
 *         schema:
 *           type: integer
 *           example: 2
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Corn"
 *               type:
 *                 type: string
 *                 example: "Vegetable"
 *     responses:
 *       200:
 *         description: Crop updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Crop updated successfully"
 *                 crop:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 2
 *                     name:
 *                       type: string
 *                       example: "Corn"
 *                     type:
 *                       type: string
 *                       example: "Vegetable"
 *       404:
 *         description: Crop not found or failed to update
 *       500:
 *         description: Error updating crop
 */
router.put('/crop/:id', CropController_1.default.updateCrop);
/**
 * @swagger
 * /crop/{id}:
 *   delete:
 *     summary: Delete a specific crop
 *     tags: [Crop]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the crop to delete
 *         required: true
 *         schema:
 *           type: integer
 *           example: 2
 *     responses:
 *       200:
 *         description: Crop deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Crop deleted successfully"
 *       404:
 *         description: Crop not found or failed to delete
 *       500:
 *         description: Error deleting crop
 */
router.delete('/crop/:id', CropController_1.default.deleteCrop);
exports.default = router;
