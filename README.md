# Portuguese
## Descrição do Projeto

  Este foi um dos projetos realizados enquanto estava no curso de desenvolvimento de software para web da [trybe](https://www.betrybe.com/). Aqui é desenvolvida uma API CRUD em _Typescript_, seguindo os princípios SOLID para POO, que alimenta o front-end do projeto. A cobertura de testes está em 96% no backend.
  O projeto é uma simulação de uma tabela de classificação de jogos de futebol. 
## Tecnologias utilizadas

As principais tecnologias utilizadas no projeto são:
- Typescript
- React
- Express
- Sequelize
- MYSQL
- Jest
- Mocha
- Chai
- Sinon

Além disso, as seguintes extensões foram utilizadas:

- dotenv
- express-async-errors
- joi
- jsonwebtoken

> O express-async-errors é utilizado para tratamento de erros assíncronos, bastante utilizado para o middleware de erro da aplicação

## Como instalar as dependências necessárias

Para a instalação das dependências basta utilizar:
```shell
npm install
or
yarn install
```
Faça isso na pasta geral, bem como na pasta `backend` e na `frontend`
## Importante
é necessário, na pasta de `backend` a criação do arquivo `.env` e adicionar:

```
PORT=3003
DB_USER={SEU_ROOT_MYSQL}
DB_PASS=${SUA_SENHA_MYSQL}
DB_NAME=TRYBE_FUTEBOL_CLUBE
DB_HOST=localhost
DB_PORT=3306
```

## Como Executar o projeto
```shell
npm start
or
yarn start
```


### Login
Para criar partidas, modifica-las e finaliza-las, acesse o aplicativo da seguinte maneira na tela de login

```shell
login: admin@admin.com
password: secret_admin
```

**Utilizando VS Code**
Caso esteja utilizando o VS Code, em termos de desenvolvimento você pode iniciar o servidor através do comando:
```shell
npm run dev:server
or
yarn dev:server
```

Ou então, pode utilizar o Launch da aba de `Run and Debug`, ou apertando a tecla *F5*;
