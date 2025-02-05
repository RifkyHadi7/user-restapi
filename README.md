# 🚀 Introduction

Rest API for user authentication and registration using **Nest.js**, utilising module, controller, and service architecture. This application is contenerised with **Docker** as well as the **PostgreSQL** database.

### API Documentation 
#### [Postman Documentation](https://www.postman.com/spacecraft-astronaut-86332905/rest-api-user-auth-and-register/documentation/j0w4ihq/user-rest-api)

REST API documentation that contains routes, raw json requests, and case-specific response examples (such as success, created, conflict, bad request, etc.) with **Postman**



# 📂 Project Structure

    nestjs-project/
    │── db/
    │   ├── migrations/
    │   ├── typeorm.config
    │── src/
    │   ├── auth/
    │	│   ├── auth.module
    │	│   ├── auth.guard
    │	│   ├── jwt.strategy
    │   ├── users/
    │	│   ├── users.module
    │   ├── config/
    │	│   ├── app.config
    │	│   ├── database.config
    │	│   ├── responses.config
    │   ├── entities/
    │	│   ├── user.entity
    │   ├── dto/
    │	│   ├── users.dto
    │	│   ├── login.dto
    │	├── app.module
    │   ├── main.ts
    │── test/
    │   ├── app.e2e-spec
    │   ├── auth.e2e-spec
    │   ├── users.e2e-spec
    │   ├── setup
    │   ├── jest-e2e
    │── .env.example
    │── package.json
    │── tsconfig.json
    │── Dockerfile
    │── docker-compose.yaml
    │── README.md

# 📦 Installation

### Dependencies
| Dependencies | Usability |
|--|--|
| @nestjs/passport passport | Integrates Passport.js with NestJS, providing authentication utilities. |
| @nestjs/passport passport-jwt | A Passport strategy for handling JSON Web Tokens (JWT) authentication. |
| @nestjs/jwt jsonwebtoken | A NestJS module that provides utilities for handling JWTs, including signing and verifying tokens. |
| bcryptjs | A JavaScript library for hashing and comparing passwords using the bcrypt algorithm. |
| class-validator | A library for validating object properties in TypeScript, commonly used in NestJS DTOs (Data Transfer Objects). |
| class-transformer | A library for transforming plain JavaScript objects into class instances and vice versa, commonly used in NestJS for DTO serialization. |

How to install

    npm install


# ⚙️ Configuration

Make a **.env** file with **.env.example** configure your environment variables:

    #APPLICATION ENV
    DB_HOST=postgres_db #default if running on docker
    DB_PORT=5432
    DB_NAME=user-rest
    DB_USER=user
    DB_PASSWORD=password
    NODE_ENV=development
    PORT=5000
    JWT_SECRET=12345
    
    #DATABASE ENV
    POSTGRESQL_PORT=5432
    POSTGRESQL_USERNAME=user
    POSTGRESQL_DATABASE=user-rest
    POSTGRESQL_PASSWORD=password

DB and POSTGRES variables should be the same, and DB_HOST should be the services name in docker-compose.yaml (default on docker = postgres_db)

# 🔥 Running the Application

### Development

```
npm run start:dev
```

### Production

```
npm run build
npm run start:prod
```

### Running with Docker

First, make sure **Docker is installed and active** on your device, and then run the Docker compose

```
docker compose up
```

### Migration

 1. **Generate** migration file by viewing the entities directory as a table

  ```
    npm run migration:generate --name={migration_name}
  ```

2. **Run** migration file

  ```
    npm run migration:run
  ```

### Running Integration Test

Test **all** integration test file

  ```
    npm run test:e2e
  ```

or test **spesific** test file

  ```
    npm run test:e2e {file_name}
  ```

example : to run auth test

  ```
    npm run test:e2e auth
  ```
