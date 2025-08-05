# 📝 API de Blogging - SolutionEducation

Uma API RESTful para um sistema de blog, onde docentes podem criar, editar e excluir postagens, e alunos podem visualizá-las. Projeto desenvolvido em Node.js com Express, MongoDB, e Docker, com automação CI/CD via GitHub Actions.

---

## 📦 Tecnologias Utilizadas

- Node.js  
- Express  
- MongoDB (via Mongoose)  
- TypeScript  
- Zod (validação)  
- Jest + Supertest (testes)  
- Docker  
- GitHub Actions (CI/CD)  

---

## 🚀 Instalação e Execução Local

### Pré-requisitos

- Node.js 18+  
- Docker e Docker Compose (opcional)  
- MongoDB local ou cloud  

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
│   │   └── authenticate.ts
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

Retorna todos os posts cadastrados. Disponível para alunos e professores.

### GET /posts/:id

Retorna um post específico pelo ID. Disponível para alunos e professores.

### POST /posts

Cria uma nova postagem. Apenas professores autenticados podem acessar.

**Body:**

```json
{
  "title": "Título",
  "content": "Conteúdo",
  "author": "Autor"
}
```

### PUT /posts/:id

Atualiza uma postagem existente. Apenas professores autenticados podem acessar.

### DELETE /posts/:id

Remove uma postagem pelo ID. Apenas professores autenticados podem acessar.

### GET /posts/search?q=termo

Busca postagens por palavras-chave no título ou conteúdo. Disponível para todos.

---

## 🔐 Autenticação e Controle de Acesso

Para diferenciar professores e alunos na aplicação, implementamos um sistema simples de autenticação via tokens no header HTTP `Authorization`. 

- **Tokens válidos**:  
  - `professor-token` — Permite criar, editar e excluir postagens.  
  - `aluno-token` — Permite apenas visualizar e buscar postagens.

- **Como usar**:  
  Inclua no header da requisição:  
  `Authorization: Bearer professor-token` (ou `aluno-token` conforme o caso)

- **Restrições**:  
  - Endpoints de criação, edição e exclusão exigem o token de professor.  
  - Alunos (token aluno-token) e requisições sem token ou com token inválido só podem acessar as operações de leitura (GET).

---

## 🧪 Testes

Execute os testes com cobertura:

```bash
npm run test:coverage
```

---

## 🐳 Usando Docker

Execute o projeto com Docker:

```bash
docker-compose up --build
```

A aplicação estará disponível em `http://localhost:3000`

---

## 🔁 CI/CD com GitHub Actions

- Workflow de CI/CD configurado em `.github/workflows/ci.yml`  
- Executa:  
  - Instalação de dependências  
  - Execução dos testes  
  - Verificação de cobertura  
  - Linter  

---

## 🧱 Arquitetura da Aplicação

A aplicação segue uma estrutura MVC:

- **Model:** representação dos dados (Mongoose)  
- **Controller:** lógica dos endpoints  
- **Routes:** definição de rotas e middlewares  
- **Schema:** validação com Zod  
- **Middlewares:** validações reutilizáveis (ex: autenticação)  

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
✅ Autenticação simples para controle de acesso professor/aluno  

---

## ⚠️ Dificuldades Encontradas

- Implementar autenticação simples e controlar permissões de acesso sem sistema completo de usuários.  
- Integrar validação Zod com Mongoose e lidar com erros de validação.  
- Configurar Docker e evitar problemas durante o build e execução do container.  
- Garantir a cobertura mínima de testes automatizados, focando nas operações críticas.  

---

## 📹 Apresentação

Gravação em vídeo demonstrando o funcionamento da aplicação (incluir link aqui quando estiver pronto).

---

## 🧠 Experiências e Desafios

Este projeto possibilitou o aprendizado de várias tecnologias e práticas modernas, como validação robusta, testes automatizados e pipeline CI/CD, além de reforçar conceitos de segurança básica via autenticação token.