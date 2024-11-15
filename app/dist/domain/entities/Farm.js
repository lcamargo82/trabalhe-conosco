"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Producer = void 0;
class Producer {
    constructor(name, city, state, areaHectaresFarm, arableAreaHectares, vegetationAreaFarm, producer, crop, id, createdAt, updatedAt, deletedAt) {
        this.name = name;
        this.city = city;
        this.state = state;
        this.areaHectaresFarm = areaHectaresFarm;
        this.arableAreaHectares = arableAreaHectares;
        this.vegetationAreaFarm = vegetationAreaFarm;
        this.producer = producer;
        this.crop = crop;
        this.id = id;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;
    }
}
exports.Producer = Producer;
