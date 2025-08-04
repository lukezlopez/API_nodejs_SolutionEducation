# 📝 API de Blogging - SolutionEducation

Uma API RESTful para um sistema de blog, onde docentes podem criar, editar e excluir postagens, e alunos podem visualizá-las. Projeto desenvolvido em Node.js com Express, MongoDB, e Docker, com automação CI/CD via GitHub Actions.

---

## 📦 Tecnologias Utilizadas

* Node.js
* Express
* MongoDB (via Mongoose)
* TypeScript
* Zod (validação)
* Jest + Supertest (testes)
* Docker
* GitHub Actions (CI/CD)

---

## 🚀 Instalação e Execução Local

### Pré-requisitos

* Node.js 18+
* Docker e Docker Compose (opcional)
* MongoDB local ou cloud

### Clone o repositório

```bash
git clone https://github.com/lukezlopez/API_nodejs_SolutionEducation.git
cd API_nodejs_SolutionEducation
```

### Execute localmente (modo desenvolvimento)

```bash
npm install
npm run dev
```

---

## 📂 Estrutura do Projeto

```bash
├── src
│   ├── controller
│   │   └── post.controller.ts
│   ├── entities
│   │   └── post.model.ts
│   ├── middlewares
│   │   └── validate.ts
│   ├── routes
│   │   └── post.routes.ts
│   ├── schema
│   │   └── post.schema.ts
│   ├── app.ts
│   └── index.ts
├── test
│   └── post.test.ts
├── Dockerfile
├── docker-compose.yml
├── .github/workflows
│   └── ci.yml
├── tsconfig.json
├── jest.config.ts
└── README.md
```

---

## 📮 Endpoints da API

### GET /posts

Retorna todos os posts cadastrados.

### GET /posts/\:id

Retorna um post específico pelo ID.

### POST /posts

Cria uma nova postagem.

**Body:**

```json
{
  "title": "Título",
  "content": "Conteúdo",
  "author": "Autor"
}
```

### PUT /posts/\:id

Atualiza uma postagem existente.

### DELETE /posts/\:id

Remove uma postagem pelo ID.

### GET /posts/search?q=termo

Busca postagens por palavras-chave no título ou conteúdo.

---


## 🐳 Usando Docker

Execute o projeto com Docker:

```bash
docker-compose up --build
```

A aplicação estará disponível em `http://localhost:3000`

---

## 🔁 CI/CD com GitHub Actions

* Workflow de CI/CD configurado em `.github/workflows/ci.yml`
* Executa:

  * Instalação de dependências
  * Execução dos testes
  * Verificação de cobertura
  * Linter

---

## 🧱 Arquitetura da Aplicação

A aplicação segue uma estrutura MVC:

* **Model:** representação dos dados (Mongoose)
* **Controller:** lógica dos endpoints
* **Routes:** definição de rotas e middlewares
* **Schema:** validação com Zod
* **Middlewares:** validações reutilizáveis

---

## 🧾 Requisitos Atendidos

✅ CRUD completo de postagens
✅ Validação de dados com Zod
✅ Persistência com MongoDB
✅ Testes automatizados com cobertura
✅ Containerização com Docker
✅ CI/CD com GitHub Actions
✅ Documentação técnica
✅ Endpoint de busca implementado

---

## 📹 Apresentação

Gravação em vídeo demonstrando o funcionamento da aplicação (incluir link aqui quando estiver pronto).

---

## 🧠 Experiências e Desafios

* Integração entre validação (Zod) e MongoDB exigiu adaptação no controle de erros.
* Garantir cobertura de testes significativa com Jest e Supertest.
* Configuração de Dockerfile e workflows do GitHub Actions para automação de testes e build.
* Manter estrutura modularizada e organizada usando boas práticas com TypeScript e Express.

---
