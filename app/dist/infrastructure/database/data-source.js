"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const _1731602156990_CreateProducer_1 = require("./migration/1731602156990-CreateProducer");
const _1731605242579_CreateCrops_1 = require("./migration/1731605242579-CreateCrops");
const _1731606890406_CreateFarmsAndFarmCrops_1 = require("./migration/1731606890406-CreateFarmsAndFarmCrops");
const ProducerEntity_1 = require("./entities/ProducerEntity");
const CropEntity_1 = require("./entities/CropEntity");
const FarmEntity_1 = require("./entities/FarmEntity");
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [ProducerEntity_1.ProducerEntity, CropEntity_1.CropEntity, FarmEntity_1.FarmEntity],
    migrations: [
        _1731602156990_CreateProducer_1.CreateProducer1731602156990,
        _1731605242579_CreateCrops_1.CreateCrops1731605242579,
        _1731606890406_CreateFarmsAndFarmCrops_1.CreateFarmsAndFarmCrops1731606890406,
    ],
    synchronize: false,
    subscribers: [],
});
