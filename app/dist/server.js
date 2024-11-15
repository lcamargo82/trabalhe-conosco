"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const swaggerUi = require('swagger-ui-express');
require("dotenv/config");
const data_source_1 = require("./infrastructure/database/data-source");
const producerRoutes_1 = __importDefault(require("./presentation/routes/producerRoutes"));
const cropRoutes_1 = __importDefault(require("./presentation/routes/cropRoutes"));
const farmRoutes_1 = __importDefault(require("./presentation/routes/farmRoutes"));
const authMiddleware_1 = __importDefault(require("./infrastructure/security/authMiddleware"));
const authRoutes_1 = __importDefault(require("./presentation/routes/authRoutes"));
const swagger_config_1 = __importDefault(require("./presentation/documentation/swagger.config"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/', authRoutes_1.default);
app.use('/', authRoutes_1.default);
app.use('/api', authMiddleware_1.default);
app.use('/api', producerRoutes_1.default);
app.use('/api', cropRoutes_1.default);
app.use('/api', farmRoutes_1.default);
app.use('/api-documentation', swaggerUi.serve, swaggerUi.setup(swagger_config_1.default));
data_source_1.AppDataSource.initialize()
    .then(() => {
    console.log('Data Source has been initialized!');
    app.listen(3000, () => console.log('Server is running!'));
})
    .catch((error) => console.error('Error during Data Source initialization', error));
