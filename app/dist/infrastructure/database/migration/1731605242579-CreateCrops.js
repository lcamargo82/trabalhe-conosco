"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCrops1731605242579 = void 0;
const typeorm_1 = require("typeorm");
class CreateCrops1731605242579 {
    async up(queryRunner) {
        queryRunner.createTable(new typeorm_1.Table({
            name: 'crops',
            columns: [
                {
                    name: 'id',
                    type: 'serial',
                    isPrimary: true,
                },
                {
                    name: 'name',
                    type: 'varchar',
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'now()',
                },
                {
                    name: 'updated_at',
                    type: 'timestamp',
                    isNullable: true,
                },
                {
                    name: 'deleted_at',
                    type: 'timestamp',
                    isNullable: true,
                },
            ],
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable('crops');
    }
}
exports.CreateCrops1731605242579 = CreateCrops1731605242579;
