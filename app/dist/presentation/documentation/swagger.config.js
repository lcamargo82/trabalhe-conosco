"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const isProduction = process.env.NODE_ENV === 'production';
const routeExtension = isProduction ? '*.js' : '*.ts';
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Brian Agriculture API',
            version: '1.0.0',
            description: 'API para gerenciamento',
        },
        servers: [
            {
                url: process.env.URL,
            },
        ],
    },
    apis: [path_1.default.resolve(__dirname, `../routes/${routeExtension}`)],
};
const swaggerDocs = (0, swagger_jsdoc_1.default)(swaggerOptions);
exports.default = swaggerDocs;
