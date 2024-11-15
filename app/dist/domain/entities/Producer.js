"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Producer = void 0;
class Producer {
    constructor(name, email, password, cpf_cnpj, id, createdAt, updatedAt, deletedAt) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.cpf_cnpj = cpf_cnpj;
        this.id = id;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;
    }
}
exports.Producer = Producer;
