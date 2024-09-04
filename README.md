# Blog Pessoal com Strapi

Este projeto é um blog pessoal desenvolvido com Strapi, utilizando MySQL como banco de dados e Docker para facilitar o gerenciamento do ambiente.

## Tecnologias Utilizadas

- **Node** na versão **>=18.0.0 <=20.x.x**
- **Strapi** na versão 4
- **MySQL** como banco de dados
- **Docker** para gerenciamento de contêineres

## Pré-requisitos

- [Docker](https://www.docker.com/get-started) instalado na máquina
- [Docker Compose](https://docs.docker.com/compose/install/) instalado
- [Node >= v18.0.0](https://nodejs.org/en) instalado na máquina

## Como Rodar o Projeto

### Passo 1: Configurar as Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto e adicione as seguintes variáveis:

```
HOST=0.0.0.0
PORT=1337
APP_KEYS=tobemodified1,tobemodified2,tobemodified3, tobemodified4
ADMIN_JWT_SECRET=tobemodified
TRANSFER_TOKEN_SALT=tobemodified
# Database
DATABASE_CLIENT=mysql
DATABASE_HOST=127.0.0.1
DATABASE_PORT=3306
DATABASE_NAME=seu_nome_do_banco
DATABASE_USERNAME=seu_usuario
DATABASE_PASSWORD=sua_senha
DATABASE_SSL=false
JWT_SECRET=tobemodified
```

### Passo 2: Iniciar o Contêiner do Banco de Dados

Para iniciar o contêiner do MySQL, execute o comando abaixo na raiz do projeto:

```
docker compose up -d
```

Isso vai criar e iniciar o contêiner do MySQL em segundo plano.

### Passo 3: Iniciar o Strapi
Agora, com o banco de dados em execução, você pode iniciar o Strapi com o comando:

```
npm run develop
```

### Possíveis erros

Caso sua aplicação apresente esse erro durante a execução do projeto:

```
Error: ER_NOT_SUPPORTED_AUTH_MODE: Client does not support authentication protocol requested by server; consider upgrading MySQL 
```

Esse erro ocorre porque o cliente MySQL que você está utilizando não suporta o método de autenticação padrão usado pelo servidor MySQL. Esse problema é comum ao usar versões mais recentes do MySQL (como o MySQL 8.0), que introduzem um novo método de autenticação (caching_sha2_password) que não é suportado por clientes MySQL mais antigos ou por alguns pacotes de software.

#### Soluções possíveis

Alterar o método de autenticação do usuário MySQL
Acesse o contêiner MySQL:

Primeiro, você precisa acessar o contêiner Docker do MySQL. Use o comando abaixo para entrar no shell do MySQL:

```
docker exec -it mysql mysql -u root -p
```
Isso pedirá a senha do root do MySQL que você configurou na criação do banco.

Alterar o método de autenticação para ```mysql_native_password```:

Depois de acessar o MySQL, altere o método de autenticação do usuário admin para mysql_native_password com os seguintes comandos:

```sql
ALTER USER 'admin'@'%' IDENTIFIED WITH mysql_native_password BY '100senha';
FLUSH PRIVILEGES;
```
Esse comando altera o método de autenticação para o usuário admin e atualiza os privilégios. Saia do MySQL usando ```exit``` e reinicie o seu contêiner MySQL:

```
docker compose restart mysql
```

Após esses passos é só rodar a aplicação novamente:

```
npm run develop
```
