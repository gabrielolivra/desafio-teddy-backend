
## Description

 Desafio desenvolvedor backend teddy

 ## Implementations 
 - NestJS - Typescript
 - Typeorm - PostgreSQL
 - Pipeline (Github Actions)
 - Docker-compose
 - Testes (Jest)
 - Lint
 - CI/CD (Github Actions)
 - Deploy (OnRender)
 - Documentação (Swagger)
 - Autenticação (JWT)
 - Monitoramento de performace e erros (Sentry)
 - Logs
 
 ## Initializing the project

## Create env file 
```bash
 $ cp .env.example .env
 ```
## Project setup

```bash
$ pnpm install
```

## Up docker-compose

```bash
$ docker-compose up -d
```


## Run migrations
```bash
# development
$ pnpm build

# watch mode
$ pnpm migration:run

```

## Compile and run the project

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Run tests

```bash
# unit tests
$ pnpm run test

```


## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
