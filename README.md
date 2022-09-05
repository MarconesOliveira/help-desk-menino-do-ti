# Menino_do_TI

Sistema de Help Desk voltado para a área de TI, mas que pode ser fácilmente utilizado em qualquer situação.

## Inicialização

Siga os seguintes passos para rodar a aplicação: 

1. Clonar o repositório
2. Criar na pasta raiz um arquivo .env como o seguinte: 
```
PORT=3000
JWT_SECRET=menino_do_ti

MONGO_HOST=localhost
MONGO_PORT=27017
MONGO_DB_NAME=menino_do_ti

REDIS_HOST=localhost
REDIS_PORT=6379

NEO4J_HOST=localhost
NEO4J_PORT=7687
NEO4J_USER=neo4j
NEO4J_PASSWORD=neo4j

USE_TEST_DATABASE=true
```
> Use o gerador de caracteres na pasta ***utils*** para gerar uma chave segura para ser o ***JWT_SECRET***.
3. Use o seguinte comando para instalar as dependências: 
```
npm install
```
4. Use o seguinte comando para rodar a aplicação: 
```
//Produção
npm start 
//Dev
npm run devStart 
```
5. Foram desenvolvidos testes unitários, de integração e *end-to-end* utilizando Jest, Supertest e Puppeteer:
```
//Testes
npm test 
//Rodar um teste específico
npx jest ./[caminho]/[nome_do_arquivo].test.js 
```
> Para rodar os teste ***end-to-end*** é necessário conexão com ***MongoDB*** e ***Redis***.
## Deploy
Foi feito o Deploy da aplicação no Heroku, no seguinte link:

https://menino-do-ti.herokuapp.com/

> No deploy foram utilizados **Atlas** (Cloud do MongoDB), **Redis Cloud** e **AuraDB** (Cloud do Neo4j)

Para acessar a documentação interativa feita com SwaggerUI entre no link:

https://menino-do-ti.herokuapp.com/docs/