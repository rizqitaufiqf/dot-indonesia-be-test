# To-Do App

## 📜Contents

- To-Do app contents
  - [🚀 Demo App](#demo-app)
  - [🔍 Stacks](#stacks)
  - [🛠️ Installation](#️installation)
    - [🐳 Docker](#docker)
    - [🖥️ Local Machine](#️-local-machine)

## [🚀 Demo App](https://todo.rizqitaufiq.my.id/docs)

## 🔍 Stacks

Application Stacks:

- NestJS
- Postgresql
- TypeORM
- Docker
- Docker Compose
- Sentry (track errors and monitor performance)

## 🛠️ Installation

### 🐳 Docker

To run this app (using Docker), follow this steps:

1. Make sure you have Docker and Docker Compose installed and configured on your system.
2. Clone this repo and navigate to the project directory:

```bash
git clone https://github.com/rizqitakufiqf/dot-indonesia-be-test.git && cd dot-indonesia-be-test
```

3. Create a .env file from env_example and set it up based on your configurations.

4. Open your terminal and run the following command (this will create the database, web service, and pgAdmin). You can disable unnecessary Docker services if you want, but don't forget to configure your environment:

```bash
docker compose --env-file .env up -d
```

if you want to make sure to see the logs from the server run:

```bash
docker logs dot-indonesia-test-db -f
```

Wait for the server's container to connect and initialize.

5. You are good to go! open the http://localhost:3000/docs to see the API Documentations.

### 🖥️ Local Machine

To run this app on your Local Machine, follow this step:

1. Make sure you have Makefile, Docker and Docker Compose installed and configured on your system.
2. Clone this repo and navigate to the project directory:

```bash
git clone https://github.com/rizqitaufiqf/dot-indonesia-be-test.git && cd dot-indonesia-be-test
```

3. Create a `.env` file from `env_example` and set it up based on your configurations.

4. Open your terminal and run to install all dependencies:

```bash
npm install
```

5. Build the server

```bash
npm run build
```

6. Migrate the database

```bash
npm run migration:run
```

7. Start server

```bash
npm run start
```

7. You are good to go! open the http://localhost:3000/docs to see the API Documentation.
8. If you want to run the server in development, you can use:

```bash
npm run start:dev
```
