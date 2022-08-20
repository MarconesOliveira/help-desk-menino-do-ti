# Menino_do_TI

Sistema de Help Desk voltado para a área de TI, mas que pode ser fácilmente utilizado em qualquer situação.

## Inicialização

Siga os seguintes passos para rodar a aplicação: 

1. Clonar o repositório
2. Criar na pasta raiz um arquivo .env como o seguinte: 
```
API_PORT=3000
JWT_SECRET=menino_do_ti

MONGO_HOST=localhost
MONGO_PORT=27017
MONGO_DB_NAME=menino_do_ti
```
> Use o gerador de caracteres na pasta ***utils*** para gerar uma chave segura para ser o ***JWT_SECRET***.
3. Use o seguinte comando para instalar as dependências: 
```
npm install
```
4. Use o seguinte comando para rodar a aplicação: 
```
npm start //Produção
npm run devStart //Dev
```
