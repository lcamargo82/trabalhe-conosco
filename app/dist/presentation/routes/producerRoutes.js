"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ProducerController_1 = __importDefault(require("../controllers/ProducerController"));
const router = (0, express_1.Router)();
/**
 * @swagger
 * tags:
 *   name: Producer
 *   description: Routes for creating a producer
 */
/**
 * @swagger
 * /producer/{id}:
 *   get:
 *     summary: Retrieves a producer by ID
 *     tags:
 *       - Producer
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID do produtor
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Producer successfully found
 *       404:
 *         description: Producer not found
 *       500:
 *         description: Error recovering producer
 */
router.get('/producer/:id', ProducerController_1.default.getProducer);
/**
 * @swagger
 * /producer/{id}:
 *   put:
 *     summary: Update a producer by ID
 *     tags:
 *       - Producer
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID do produtor
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               cpf_cnpj:
 *                 type: string
 *     responses:
 *       200:
 *         description: Producer updated successfully
 *       404:
 *         description: Producer not found or update failed
 *       500:
 *         description: Error updating producer
 */
router.put('/producer/:id', ProducerController_1.default.updateProducer);
/**
 * @swagger
 * /producer/{id}:
 *   delete:
 *     summary: Deletes a producer by ID
 *     tags:
 *       - Producer
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID do produtor
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Producer successfully deleted
 *       404:
 *         description: Producer not found or deletion failed
 *       500:
 *         description: Error when deleting producer
 */
router.delete('/producer/:id', ProducerController_1.default.deleteProducer);
exports.default = router;
