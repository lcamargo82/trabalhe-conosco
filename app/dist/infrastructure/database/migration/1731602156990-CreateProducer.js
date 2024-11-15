"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProducer1731602156990 = void 0;
const typeorm_1 = require("typeorm");
class CreateProducer1731602156990 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'producers',
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
                    name: 'email',
                    type: 'varchar',
                },
                {
                    name: 'password',
                    type: 'varchar',
                },
                {
                    name: 'cpf_cnpj',
                    type: 'varchar',
                    isUnique: true,
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
        await queryRunner.dropTable('producers');
    }
}
exports.CreateProducer1731602156990 = CreateProducer1731602156990;
