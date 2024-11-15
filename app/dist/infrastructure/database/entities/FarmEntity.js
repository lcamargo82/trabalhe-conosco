"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FarmEntity = void 0;
const typeorm_1 = require("typeorm");
const ProducerEntity_1 = require("./ProducerEntity");
const CropEntity_1 = require("./CropEntity");
let FarmEntity = class FarmEntity {
};
exports.FarmEntity = FarmEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], FarmEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], FarmEntity.prototype, "city", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], FarmEntity.prototype, "state", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'area_hectares_farm', type: 'float' }),
    __metadata("design:type", Number)
], FarmEntity.prototype, "areaHectaresFarm", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'arable_area_hectares', type: 'float' }),
    __metadata("design:type", Number)
], FarmEntity.prototype, "arableAreaHectares", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'vegetation_area_farm', type: 'float' }),
    __metadata("design:type", Number)
], FarmEntity.prototype, "vegetationAreaFarm", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => ProducerEntity_1.ProducerEntity, (producer) => producer.farms),
    (0, typeorm_1.JoinColumn)({ name: 'producer_id' }),
    __metadata("design:type", ProducerEntity_1.ProducerEntity)
], FarmEntity.prototype, "producer", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], FarmEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at', nullable: true }),
    __metadata("design:type", Date)
], FarmEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ name: 'deleted_at', nullable: true }),
    __metadata("design:type", Date)
], FarmEntity.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => CropEntity_1.CropEntity, (crop) => crop.farms),
    (0, typeorm_1.JoinTable)({
        name: 'farm_crops',
        joinColumn: {
            name: 'farm_id',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'crop_id',
            referencedColumnName: 'id',
        },
    }),
    __metadata("design:type", Array)
], FarmEntity.prototype, "crops", void 0);
exports.FarmEntity = FarmEntity = __decorate([
    (0, typeorm_1.Entity)('farms')
], FarmEntity);
