# Projeto Serasa Experian - Brain Agriculture

Este projeto é uma API desenvolvida em Node e Express. A seguir, estão as instruções para configurar e executar o projeto em um ambiente Docker.

## Pré-requisitos

- Docker
- Docker Compose

## Instruções

### 1. Clone o repositório do GitHub

Clone o repositório para sua máquina local:

```bash
git git@github.com:lcamargo82/trabalhe-conosco.git
```

### 2. Acesse a pasta do projeto

Acesse a pasta do projeto para configurar o env:

```bash
cd trabalhe-conosco 
```

### 3. Configure o .env

Copie o arquivo env.exemple para .env:

```bash
cp env.example .env
```

### 4. Fazer o build do container

Faça o buid do container e suba a aplicação:

```bash
docker-compose up --build -d
```

### 5. Instalação das dependências

Instale as dependências da aplicação:

```bash
docker exec -it js_dev_container sh -c "cd /app/app && npm install"
```

### 6. Incia o server

Incia o server da aplicação:
```bash
docker exec -it js_dev_container sh -c "cd /app/app && npm run dev"
```

### 7. Rodar os migrations

Fazer as migrations:
```bash
docker exec -it js_dev_container sh -c "cd /app/app && npm run typeorm migration:run -- -d ./src/infrastructure/database/data-source.ts"
```

## Documentaçào para testes Postman
Na raiz do projeto está disponibilizado um arquivo, serasa.postman_collection, para ser importado no Postman.

## Acesso à API - Desenvolvimento
A API estará disponível em http://localhost:3000.

## Acesso à documentação - Desenvolvimento
A API estará disponível em http://localhost:3000/api-documentation.

## Acesso à API - Produção
A API estará disponível em https://trabalhe-conosco.onrender.com.

## Acesso à documentação - Produção
A API estará disponível em https://trabalhe-conosco.onrender.com/api-documentation.

## Observações
- Certifique-se de que suas portas no Docker não estejam em conflito com outras aplicações.
- Configure as variáveis de ambiente no arquivo .env conforme necessário para sua aplicação.

----------------------------------------------------------------------------------------------------------------------------------------
# Teste - Brain Agriculture

O teste tem como objetivo acurar as habilidades do candidato em resolver alguns problemas relacionados à lógica de programação, regra de negócio e orientação à objetos.

O mesmo consiste em um cadastro de produtor rural com os seguintes dados:

1.  CPF ou CNPJ
2.  Nome do produtor
3.  Nome da Fazenda
4.  Cidade
5.  Estado
6.  Área total em hectares da fazenda
7.  Área agricultável em hectares
8.  Área de vegetação em hectares
9.  Culturas plantadas (Soja, Milho, Algodão, Café, Cana de Açucar)

# Requisitos de negócio

- O usuário deverá ter a possibilidade de cadastrar, editar, e excluir produtores rurais.
- O sistema deverá validar CPF e CNPJ digitados incorretamente.
- A soma de área agrícultável e vegetação, não deverá ser maior que a área total da fazenda
- Cada produtor pode plantar mais de uma cultura em sua Fazenda.

# Requisitos técnicos

- O desenvolvedor back-end deve:
  - Salvar os dados em um banco de dados Postgres usando o NodeJS como layer de Backend, e entregar os endpoints para cadastrar, editar, e excluir produtores rurais, além do endpoint que retorne os totais para o dashboard.
  - A criação das estruturas de dados "mockados" faz parte da avaliação.

  Desejável:
  - TypeScript
  - Conceitos como SOLID, KISS, Clean Code, API Contracts, Tests, Layered Architecture

  Bonus:
  - Aplicação disponibilizada em algum cloud provider de sua preferência

- O desenvolvedor full-stack deve realizar ambos, e concluir a integração.
  > Não envie a solução como anexo, suba os fontes para seu Github (ou outro repositório) e envie o link para o avaliador.
