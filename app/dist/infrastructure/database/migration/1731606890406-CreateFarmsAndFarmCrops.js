"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateFarmsAndFarmCrops1731606890406 = void 0;
const typeorm_1 = require("typeorm");
class CreateFarmsAndFarmCrops1731606890406 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'farms',
            columns: [
                {
                    name: 'id',
                    type: 'serial',
                    isPrimary: true,
                },
                {
                    name: 'city',
                    type: 'varchar',
                },
                {
                    name: 'state',
                    type: 'varchar',
                },
                {
                    name: 'area_hectares_farm',
                    type: 'float',
                },
                {
                    name: 'arable_area_hectares',
                    type: 'float',
                },
                {
                    name: 'vegetation_area_farm',
                    type: 'float',
                },
                {
                    name: 'producer_id',
                    type: 'int',
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
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'farm_crops',
            columns: [
                {
                    name: 'farm_id',
                    type: 'int',
                },
                {
                    name: 'crop_id',
                    type: 'int',
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'now()',
                },
            ],
        }));
        await queryRunner.createForeignKey('farm_crops', new typeorm_1.TableForeignKey({
            columnNames: ['farm_id'],
            referencedTableName: 'farms',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
        }));
        await queryRunner.createForeignKey('farm_crops', new typeorm_1.TableForeignKey({
            columnNames: ['crop_id'],
            referencedTableName: 'crops',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
        }));
    }
    async down(queryRunner) {
        const farmCropsTable = await queryRunner.getTable('farm_crops');
        const farmForeignKey = farmCropsTable.foreignKeys.find((fk) => fk.columnNames.indexOf('farm_id') !== -1);
        if (farmForeignKey) {
            await queryRunner.dropForeignKey('farm_crops', farmForeignKey);
        }
        const cropForeignKey = farmCropsTable.foreignKeys.find((fk) => fk.columnNames.indexOf('crop_id') !== -1);
        if (cropForeignKey) {
            await queryRunner.dropForeignKey('farm_crops', cropForeignKey);
        }
        await queryRunner.dropTable('farm_crops');
        await queryRunner.dropTable('farms');
    }
}
exports.CreateFarmsAndFarmCrops1731606890406 = CreateFarmsAndFarmCrops1731606890406;
