#APP

GYMPASS STYLE APP

## RFs (Requisitos funcionais)

- [x] Deve ser possível se cadastrar;
- [x] Deve ser possível se autenticar;
- [x] Deve ser possível obter perfil de um usuário logado;
- [ ] Deve ser possível o número de check-ins realizados pelo usuário logado;
- [x] Deve ser possível o usuário obter seu histórico de check-ins;
- [ ] Deve ser possível o usuário buscar academias próxima;
- [ ] Deve ser posssível o usuário buscar academias pelo nome;
- [x] Deve ser possível realizar check-in em uma academia;
- [ ] Deve ser possível validar o check-in de um usuário;
- [x] Deve ser possível cadastrar uma academia;

## RNs (Regras de Negócio)

- [x] O usuário não deve poder se cadastrar com um e-mail duplicado;
- [x] O usuário não pode fazer 2 check-ins no mesmo dia;
- [x] O usuário não pode fazer check-in se não estiver perto (100m) da academia;
- [ ] O check-in só pode ser validado até 20 min. após criado;
- [ ] O check-in só pode ser validado por adminstradores;
- [ ] A academia só pode ser cadastrado por administradores;

## RNFs (Requisitos não-funcionais)

- [x] A senha do usuário precisa estar criptografada;
- [x] Os dados da aplicação precisam estar persistido em um BD PostgreSQL;
- [x] Todas listas de dados precisam estar paginadas com 20 items por página;
- [ ] O usuário deve ser identificado por um JWT (JSON web Token);


```markdown
# Gympass Style App

Este é um aplicativo inspirado no estilo Gympass, desenvolvido com Node.js, Prisma e o modelo de design SOLID. Abaixo estão as instruções para configurar e executar o projeto na sua máquina local.

---

## Pré-requisitos

Antes de começar, certifique-se de ter os seguintes itens instalados na sua máquina:

- **Node.js** (versão >= 16.0.0)
- **npm** (geralmente incluído com o Node.js) ou **yarn**
- **Docker** e **Docker Compose** (para rodar o ambiente de desenvolvimento)
- **Git** (para clonar o repositório)

---

## Passo a passo para configuração

### 1. Clone o repositório

Clone o repositório em sua máquina local usando o comando abaixo:

```bash
git clone https://github.com/archiquito/api-node-prisma-solid.git
```

Entre na pasta do projeto:

```bash
cd api-node-prisma-solid
```

---

### 2. Configure o ambiente com Docker

O projeto utiliza Docker para facilitar a configuração do ambiente. Certifique-se de ter o Docker e o Docker Compose instalados.

1. Suba os containers com o seguinte comando:

```bash
docker-compose up -d
```

2. Certifique-se de que os serviços estão rodando corretamente. Você pode verificar os logs com:

```bash
docker-compose logs
```

---

### 3. Configure as variáveis de ambiente

Renomeie o arquivo `.env.example` para `.env`:

```bash
mv .env.example .env
```

Edite o arquivo `.env` e atualize as informações de conexão com o banco de dados caso necessário. O Docker já configura automaticamente o banco de dados PostgreSQL para você:

```env
DATABASE_URL=postgresql://usuario:senha@localhost:5432/nome_do_banco
```

---

### 4. Execute as migrações do Prisma

Após configurar o banco de dados, execute as migrações do Prisma para criar as tabelas necessárias:

```bash
npx prisma migrate dev
```

---

### 5. Execute o servidor

Inicie o servidor de desenvolvimento:

Se estiver usando **npm**:

```bash
npm run dev
```

Ou, se estiver usando **yarn**:

```bash
yarn dev
```

O servidor estará em execução no endereço [http://localhost:3000](http://localhost:3000).

---

## Testando a aplicação

Caso queira rodar os testes implementados no projeto, utilize o comando:

Se estiver usando **npm**:

```bash
npm test
```

Ou, se estiver usando **yarn**:

```bash
yarn test
```

---

## Tecnologias utilizadas

- **Node.js**
- **Prisma ORM**
- **PostgreSQL**
- **Docker** e **Docker Compose**
- **TypeScript**
- **JWT (JSON Web Token)** para autenticação
- **SOLID** como padrão de design

---

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests para melhorias no projeto.

---

## Licença

Este projeto está licenciado sob a [MIT License](LICENSE).

```

Essa versão inclui as instruções sobre a utilização do Docker para rodar o ambiente de desenvolvimento. Se precisar de mais ajustes ou detalhes, é só avisar!