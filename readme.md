## Projeto Champions

<div align="center">
<img src="./src/assets/image/image.png"/>
</div>

**Projeto Champions** é um backend Node.js construído com TypeScript para gerenciar jogadores e clubes de um jogo de futebol Bomba Patch (presumivelmente para PS2). Esta API oferece funcionalidades para criar, recuperar, atualizar e deletar jogadores e clubes.

### Funcionalidades

- **Gerenciamento de Jogadores:**
  - Criar novos jogadores
  - Recuperar todos os jogadores
  - Recuperar um jogador por ID
  - Atualizar informações de um jogador
  - Deletar um jogador
- **Gerenciamento de Clubes:**
  - Recuperar todos os clubes (potencialmente para filtrar jogadores por clube)

### Tecnologias usadas

- **express** - Framework web para construção de APIs
- **zod** - Biblioteca de validação de tipos (garante a integridade dos dados)
- **typescript** - Superconjunto tipado do JavaScript

### Endpoints da API

**Todos os endpoints têm o prefixo `/api`**

**Jogadores:**

- **GET /players** - Recupera todos os jogadores
- **GET /players/:id** - Recupera um jogador pelo seu ID
- **POST /players** - Cria um novo jogador (o corpo da requisição deve conter os dados do jogador)
- **PUT /players/:id** - Atualiza um jogador pelo seu ID (o corpo da requisição deve conter os dados atualizados do jogador)
- **DELETE /players/:id** - Deleta um jogador pelo seu ID

**Clubes:**

- **GET /clubs** - Recupera todos os clubes

**Formato dos Dados:**

A API espera dados em formato JSON para requisições e respostas. O formato específico dos dados do jogador e do clube dependerá da sua implementação específica no `playerService` e `clubService`.

### Instalação e Uso

**Pré-requisitos:**

- Node.js e npm (ou yarn) instalados em seu sistema
- Conhecimento básico de Node.js, Express e TypeScript

**Instalação:**

1. Clone este repositório:

   ```bash
   git clone https://your-repository-url.git
   ```

2. Navegue para o diretório do projeto:

   ```bash
   cd projeto-champions
   ```

3. Instale as dependências:

   ```bash
   npm install
   ```

**Executando a Aplicação:**

1. Inicie o servidor de desenvolvimento:

   ```bash
   npm run start:dev
   ```

   Isso iniciará o servidor em uma porta padrão (normalmente 3333). Você pode acessar os endpoints da API documentados abaixo.

**Construindo a Aplicação:**

1. Construa o projeto para produção:

   ```bash
   npm run dist
   ```

   Isso criará uma pasta `dist` contendo os arquivos JavaScript compilados.

2. Execute a aplicação em modo de produção (substitua `<porta>` pela porta desejada):

   ```bash
   node --env-file=.env dist/src/server.js <porta>
   ```
