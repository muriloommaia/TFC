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
<<<<<<< HEAD
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

=======

**(Neste arquivo é obrigatório deixar o nome do database como `"database": 'TRYBE_FUTEBOL_CLUBE'`)**

**É essencial usar essas 3 variáveis no arquivo acima:**

#### Variáveis:

`host: process.env.DB_HOST`

`user: process.env.DB_USER`

`password: process.env.DB_PASS`

**Com elas que iremos conseguir conectar ao banco do avaliador automático**

#### Chave JWT:

⚠️ A sua chave `JWT` de ser inserida em `app/backend/jwt.evaluation.key` e pode ser carregada no backend com o uso da biblioteca `fs`.

#### Testes de cobertura


A construção de testes de cobertura no backend deve ser feita em *TypeScript*, utilizando `mocha`, `chai` e `sinon`, na pasta `app/backend/src/tests/`, conforme o exemplo em `app/backend/src/tests/change.me.test.ts` *(aqui considerando um teste de integração)*:

```typescript
import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Seu teste', () => {
  /**
   * Exemplo do uso de stubs com tipos
   */

  // let chaiHttpResponse: Response;

  // before(async () => {
  //   sinon
  //     .stub(Example, "findOne")
  //     .resolves({
  //       ...<Seu mock>
  //     } as Example);
  // });

  // after(()=>{
  //   (Example.findOne as sinon.SinonStub).restore();
  // })

  // it('...', async () => {
  //   chaiHttpResponse = await chai
  //      .request(app)
  //      ...

  //   expect(...)
  // });

  it('Seu sub-teste', () => {
    expect(false).to.be.eq(true);
  });
});
```

Os testes devem cobrir todos os arquivos contidos em `app/backend/src`, com exceção daqueles que já foram entregues com o projeto.

Para rodar testes de cobertura no seu back-end, utilize o comando: `npm run test:coverage`

---

### Dicas

- Você pode **instalar suas aplicações (front e back)** rodando o comando `npm run install:apps`;
- Você pode rodar o avaliador **mostrando as operações que o navegador vai fazer no frontend** durante os testes E2E utilizando o comando `npm run test:browser`;
- Você pode **debugar alguns erros do avaliador** (como por exemplo a validação do banco de dados, ou da compilação do TS), onde são *printados* na tela algumas infos adicionais, utilizando o comando `npm run test:debug`;
- Você pode **subir ou descer uma aplicação do compose**, utilizando os scripts `compose:up`, `compose:down`

#### Status HTTP

Tenha em mente que todas as "respostas" devem respeitar os [status do protocolo HTTP](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Status) com base no que o REST prega.

Alguns exemplos:

  - Requisições que precisam de token mas não o receberam devem retornar um código de `status 401`;

  - Requisições que não seguem o formato pedido pelo servidor devem retornar um código de `status 400`;

  - Um problema inesperado no servidor deve retornar um código de `status 500`;

  - Um acesso ao criar um recurso, no nosso caso usuário ou partida, deve retornar um código de `status 201`.

---

## Lista Pré-Requisitos:

### Docker e Docker-compose

#### Crie os arquivos dockerfile e docker-compose
  - As pastas `frontend/` e `backend/` devem possuir um arquivo dockerfile
  - A pasta `app/` deve possuir um arquivo docker-compose
  - Os arquivos dockerfile e docker-compose devem estar configurados corretamente

  **Observação**
    Em seu projeto vai conter um arquivo docker-compose.example.yml.
    Seu service do backend no docker-compose deve ter o `depends_on` exatamente igual ao do arquivo docker-compose.example.yml.
    Use o modelo de serviço do banco de dados que está no arquivo `app/docker-compose.example.yml`, que está igual ao formato abaixo:

``` yml
version: '3.9'
services:
  frontend:
    build: ./frontend
    # ...
    depends_on:
      backend:
        condition: service_healthy
    # Os `healthcheck` devem garantir que a aplicação
    # está operacional, antes de liberar o container
    healthcheck:
      test: ["CMD", "lsof", "-t", "-i:3000"]  # Caso utilize outra porta interna para o front, altere ela aqui também
      timeout: 10s
      retries: 5
  backend:
    build: ./backend
    # ...
    depends_on:
      db:
        condition: service_healthy
    environment:
      - PORT=3001
      # Os dados abaixo se referem ao container `db`
      # Dica: Relembre aqui da comunicação interna entre containers
      - DB_USER=root
      - DB_PASS=123456
      - DB_HOST=db
      - DB_NAME=TRYBE_FUTEBOL_CLUBE
      - DB_PORT=3306
    healthcheck:
      test: ["CMD", "lsof", "-t", "-i:3001"] # Caso utilize outra porta interna para o back, altere ela aqui também
      timeout: 10s
      retries: 5
  db:
    image: mysql:8.0.21
    container_name: db
    ports:
      - 3002:3306
    environment:
      - MYSQL_ROOT_PASSWORD=123456
    restart: 'always'
    healthcheck:
      test: ["CMD", "mysqladmin" ,"ping", "-h", "localhost"] # Deve aguardar o banco ficar operacional
      timeout: 10s
      retries: 5
    cap_add:
      - SYS_NICE # Deve omitir alertas menores
```


## Lista de Requisitos:

### Sequelize

Para o desenvolvimento, o time de produto te deu uma imagem para construir a modelagem do banco de dados. Com essa imagem você já consegue saber como:
  - Nomear suas tabelas e colunas
  - Quais são os tipos de suas colunas
  - Relações entre tabelas

    ![Exemplo banco de dados](./diagram.png)

     ⚠️ **Atenção** ⚠️ para que os testes passem é necessário que a sua migration de `users` termine exatamente com `-create-user.js`.

#### 1 - Desenvolva em `/app/backend/src/database` nas pastas correspondentes, uma migration e um model para a tabela de `clubs`

  - O avaliador consultará os dados da tabela clubs, verificando se ela contém os dados iniciais corretos

#### 2 - Desenvolva em `/app/backend/src/database` nas pastas correspondentes, uma migration e um model para a tabela de `matchs`

  - O avaliador consultará os dados da tabela matchs, verificando se ela contém os dados iniciais corretos

#### 3 - Desenvolva em `/app/backend/src/database` nas pastas correspondentes, uma migration e um model para a tabela `users`

  - O avaliador consultará os dados da tabela users, verificando se ela contém os dados iniciais corretos
>>>>>>> parent of 75ec659... Update README.md

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

<<<<<<< HEAD
Ou então, pode utilizar o Launch da aba de `Run and Debug`, ou apertando a tecla *F5*;
=======
#### 18 - (`TDD`) Desenvolva testes que cubram no mínimo 60 por cento dos arquivos back-end em `/src` com um mínimo de 80 linhas cobertas

  **Sugestão:**
  - Crie um novo teste de integração, agora da sua rota `/matchs`, utilizando o método `TDD`, agora considerando **os contratos dos próximos três requisitos**;`


#### 19 - Desenvolva o endpoint `/matchs` de forma que os dados apareçam corretamente na tela de partidas no front-end.

  - A rota deve ser um `GET` e retorna uma lista de partidas

  - Será validado que a página apresentará todos os dados de partidas sem nenhum filtro

    Exemplo de retorno:
    ```json
    [
      {
        "id": 1,
        "homeTeam": 16,
        "homeTeamGoals": 1,
        "awayTeam": 8,
        "awayTeamGoals": 1,
        "inProgress": false,
        "homeClub": {
          "clubName": "São Paulo"
        },
        "awayClub": {
          "clubName": "Grêmio"
        }
      },
      ...
      {
        "id": 41,
        "homeTeam": 16,
        "homeTeamGoals": 2,
        "awayTeam": 9,
        "awayTeamGoals": 0,
        "inProgress": true,
        "homeClub": {
          "clubName": "São Paulo"
        },
        "awayClub": {
          "clubName": "Internacional"
        }
      }
    ]
    ```

#### 20 - Desenvolva o endpoint `/matchs` de forma que seja possível filtrar as partidas em andamento na tela de partidas do front-end

  - A rota deverá ser do tipo `GET` e retornar uma lista de partidas filtradas

  - Será validado que ao escolher a opção de partidas em andamento serão filtradas todas as partidas em andamento

  - Essa requisição deverá usar `query string` para definir o parâmetro
    ex: `matchs?inProgress=true`

  Exemplo de retorno da requisição:
  ```json
  [
    {
      "id": 41,
      "homeTeam": 16,
      "homeTeamGoals": 2,
      "awayTeam": 9,
      "awayTeamGoals": 0,
      "inProgress": true,
      "homeClub": {
        "clubName": "São Paulo"
      },
      "awayClub": {
        "clubName": "Internacional"
      }
    },
    {
      "id": 42,
      "homeTeam": 6,
      "homeTeamGoals": 1,
      "awayTeam": 1,
      "awayTeamGoals": 0,
      "inProgress": true,
      "homeClub": {
        "clubName": "Ferroviária"
      },
      "awayClub": {
        "clubName": "Avaí/Kindermann"
      }
    }
  ]
  ```

#### 21 - Desenvolva o endpoint `/matchs` de forma que seja possível filtrar as partidas finalizadas na tela de partidas do front-end

  - A rota deverá ser do tipo `GET` e retornar uma lista de partidas filtradas

  - Será validado que ao escolher a opção de partidas finalizadas serão filtradas todas as partidas finalizadas

  - Essa requisição deverá usar `query string` para definir o parâmetro
    ex: `matchs?inProgress=false`

  Exemplo de retorno da requisição:
  ```json
  [
    {
      "id": 1,
      "homeTeam": 16,
      "homeTeamGoals": 1,
      "awayTeam": 8,
      "awayTeamGoals": 1,
      "inProgress": false,
      "homeClub": {
        "clubName": "São Paulo"
      },
      "awayClub": {
        "clubName": "Grêmio"
      }
    },
    {
      "id": 2,
      "homeTeam": 9,
      "homeTeamGoals": 1,
      "awayTeam": 14,
      "awayTeamGoals": 1,
      "inProgress": false,
      "homeClub": {
        "clubName": "Internacional"
      },
      "awayClub": {
        "clubName": "Santos"
      }
    }
  ]
  ```

### Adicionar Partidas

  - Para que os requisitos de criação de partidas, é necessário que a rota `/clubs` funcione corretamente

#### 22 - (`Bônus`; `TDD`) Desenvolva testes que cubram no mínimo 80 por cento dos arquivo back-end em `/src` com um mínimo de 100 linhas cobertas

  **Sugestão:**
  - Evolua os testes de integração da sua rota `/matchs`, utilizando o método `TDD`, agora considerando **o contrato dos próximos requisitos**;`

#### 23 - Desenvolva a rota `/matchs` de modo que seja possível salvar uma partida com o status de inProgress como true no banco de dados

  - A rota deverá ser do tipo `POST`, e retornar a partida inserida no banco de dados

  - Será validado que é possível salvar um jogo no banco de dados e ver o jogo na página de jogos

  - A partida só pode ser criada com token JWT validado;

  - O corpo da requisição terá o seguinte formato:
  ```json
  {
    "homeTeam": 16, // O valor deve ser o id do time
    "awayTeam": 8, // O valor deve ser o id do time
    "homeTeamGoals": 2,
    "awayTeamGoals": 2,
    "inProgress": true // a partida deve ser criada como em progresso
  }
  ```

  - caso a partida seja inserida com sucesso, deve-se retornar os dados da partida:

  ```json
  {
    "id": 1,
    "homeTeam": 16,
    "homeTeamGoals": 2,
    "awayTeam": 8,
    "awayTeamGoals": 2,
    "inProgress": true,
  }
  ```

#### 24 - Desenvolva a rota `/matchs/:id/finish` de modo que seja possível salvar uma partida com o status de inProgress como false no banco de dados

  - A rota deve ser do tipo `PATCH`

  - Será recebido o `id` pelo parâmetro da URL

  - Será validado que ao finalizar uma partida é alterado no banco de dados e na página


#### 25 - Desenvolva o endpoint `/matchs` de forma que não seja possível inserir uma partida com times iguais

  - Será validado que não é possível inserir uma partida com times iguais

  - Não deve ser possível criar uma partida com o mesmo time, exemplo: Barcelona x Barcelona, caso contrário, deve-se retornar o seguinte erro:

  ```json
  { "message": "It is not possible to create a match with two equal teams" }
  ```

#### 26 - Desenvolva o endpoint `/matchs` de forma que não seja possível inserir uma partida com time que não existe na tabela clubs

  - Será validado que não é possível inserir uma partida com time que não existe na tabela clubs

  - caso algum dos times não esteja cadastrado no banco de dados, deve-se retornar o seguinte erro:

  ```json
  { "message": "Team not found" }
  ```

### Editar Partidas

#### 27 - Desenvolva o endpoint `/matchs/:id` de forma que seja possível atualizar partidas em andamento

  - O endpoint deve ser do tipo `PATCH`;

  - Será recebido o `id` pelo parâmetro da URL;

  - Será avaliado que é possível alterar o resultado de uma partida.

  - O corpo da requisição terá o seguinte formato:
  ```json
  {
    "homeTeamGoals": 3,
    "awayTeamGoals": 1
  }
  ```

#### 28 - Desenvolva o endpoint `/matchs/:id` de forma que seja possível finalizar partidas em andamento

  - O endpoint deve ser do tipo `PATCH`

  - Será recebido o `id` pelo parâmetro da url

  - Será avaliado que é possível finalizar uma partida em andamento

## Leaderboards

  **Para construir as classificação, elas devem seguir as seguintes regras de negócios**
  - Em que:
    - `Classificação`: Posição na classificação;
    - `Time`: Nome do time;
    - `P`: Total de Pontos;
    - `J`: Total de Jogos;
    - `V`: Total de Vitórias;
    - `E`: Total de Empates;
    - `D`: Total de Derrotas;
    - `GP`: Gols marcados a favor;
    - `GC`: Gols marcados contra;
    - `SG`: Saldo total de gols;
    - `%`: Aproveitamento do time.

    <br/>

  - Toda a regra de negócio e cálculos necessários deverão ser realizados no seu back-end. A aplicação front-end apenas renderizará essas informações;

  - Para calcular o `Total de Pontos` você deve levar em consideração que:

    - O time `vitorioso`: marcará +3 pontos;
    - O time `perdedor`: marcará 0 pontos;
    - Em caso de `empate`: ambos os times marcam +1 ponto.

  - Para o campo `Aproveitamento do time (%)` que é a porcentagem de jogos ganhos, use a seguinte fórmula: `P/(J*3)*100`, onde:

    - `P`: Total de Pontos;
    - `J`: Total de Jogos.

    Obs.: O seu resultado deverá ser limitado a `duas casas decimais`.

  - O resultado deverá ser ordenado sempre de forma decrescente, levando em consideração a quantidade de pontos que o time acumulou. Em caso de empate no `Total de Pontos`, você deve levar em consideração os seguintes critérios para desempate:

  **Ordem para desempate**

  1º Total de Vitórias;
  2º Saldo de gols;
  3º Gols a favor;
  4º Gols contra.


  ⚠️ **Atenção:** ⚠️
  Por padrão, as respostas de todos os seus endpoints deverão estar em inglês, mesmo a renderização no front-end estando em português.

  **Os seguintes pontos serão avaliados:**

  ```
  - Se a lista de classificação está correta;
  - Se a regra de classificação se mantem mesmo com mudanças na classificação
  - Se a tabela de classificação tem 10 colunas;
  - Se a tabela tem uma linha para cada time;
  ```

  **Exemplo de retorno esperado:**

  ```json
  [
    {
      "name": "Palmeiras",
      "totalPoints": 13,
      "totalGames": 5,
      "totalVictories": 4,
      "totalDraws": 1,
      "totalLosses": 0,
      "goalsFavor": 17,
      "goalsOwn": 5,
      "goalsBalance": 12,
      "efficiency": 86.67
    },
    {
      "name": "Corinthians",
      "totalPoints": 12,
      "totalGames": 5,
      "totalVictories": 4,
      "totalDraws": 0,
      "totalLosses": 1,
      "goalsFavor": 12,
      "goalsOwn": 3,
      "goalsBalance": 9,
      "efficiency": 80
    },
    {
      "name": "Santos",
      "totalPoints": 11,
      "totalGames": 5,
      "totalVictories": 3,
      "totalDraws": 2,
      "totalLosses": 0,
      "goalsFavor": 12,
      "goalsOwn": 6,
      "goalsBalance": 6,
      "efficiency": 73.33
    },
    ...
  ]
  ```

### Leaderboard Home

#### 29 - Desenvolva o endpoint `/leaderboard/home` de forma que seja possível filtrar a classificações dos times quando mandantes na tela de classificação do frontend com os dados iniciais do banco de dados

  - O endpoint deverá ser do tipo `GET` e ter o retorno como descrito no exemplo do [leaderboard](#leaderboards)

  - Será avaliado que ao fazer a requisição ao endpoint `/leaderboard/home` serão retornados os campos e valores corretos considerando os dados iniciais do banco de dados

#### 30 - Desenvolva o endpoint `/leaderboard/home`, de forma que seja possível filtrar a classificações dos times quando mandantes na tela de classificação do front-end e ao inserir a partida Corinthians 2 X 1 Internacional a tabela será atualizada

  - O retorno deve continuar como no [leaderboard](#leaderboards) e ordenar corretamente como na explicação

  - Será avaliado que após acrescentar a partida Botafogo 2 X 1 Grêmio e fazer a requisição ao endpoint `/leaderboard/home` serão retornados os campos e valores corretos

### Leaderboard away

#### 31 - Desenvolva o endpoint `/leaderboard/away`, de forma que seja possível filtrar as classificações dos times  na tela de classificação do front-end, com os dados iniciais do banco de dados

  - O endpoint deverá ser do tipo `GET` e ter o retorno como descrito no exemplo do [leaderboard](#leaderboards)

  - Será avaliado que ao fazer a requisição ao endpoint `/leaderboard/away` serão retornados os campos e valores corretos considerando os dados iniciais do banco de dados

#### 32 - Desenvolva o endpoint `/leaderboard/away` de forma que seja possível filtrar a classificações dos times na tela de classificação do front-end e ao inserir a partida Corinthians 2 X 1 Internacional a tabela seja atualizada

  - O retorno deve continuar como no [leaderboard](#leaderboards) e ordenar corretamente como na explicação

  - Será avaliado que após acrescentar a partida Botafogo 2 X 1 Grêmio e fazer a requisição ao endpoint `/leaderboard/away` serão retornados os campos e valores corretos


### Leaderboard

  - Esse endpoint irá alimentar no front-end uma tabela idêntica ao exemplo abaixo:

    | Classificação |   Time    | P  | J  | V  | E | D | GP | GC | SG | %    |
    |---------------|-----------|----|----|----|---|---|----|----|----|------|
    |      1        |Corinthians| 38 | 15 | 12 | 2 | 1 | 44 | 13 | 31 | 84.4 |


#### 33 - Desenvolva o endpoint `/leaderboard` de forma que seja possível filtrar a classificação geral dos times na tela de classificação do front-end com os dados iniciais do banco de dados

  - O endpoint deverá ser do tipo `GET` e ter o retorno como descrito no exemplo do [leaderboard](#leaderboards)

  - Será avaliado que ao fazer a requisição ao endpoint `/leaderboard` serão retornados os campos e valores corretos considerando os dados iniciais do banco de dados

#### 34 - Desenvolva o endpoint /leaderboard de forma que seja possível filtrar a classificação geral dos times na tela de classificação do front-end e ao inserir a partida Flamengo 3 X 0 Napoli-SC a tabela será atualizada

  - O retorno deve continuar como no [leaderboard](#leaderboards) e ordenar corretamente como na explicação

  - Será avaliado que após acrescentar a partida Flamengo 3 X 0 Napoli-SC e fazer a requisição ao endpoint /leaderboard serão retornados os campos e valores corretos

#### 35 - Desenvolva o endpoint /leaderboard de forma que seja possível filtrar a classificação geral dos times na tela de classificação do front-end e ao inserir a partida Minas Brasília 1 X 0 Ferroviária a tabela será atualizada

  - O retorno deve continuar como no [leaderboard](#leaderboards) e ordenar corretamente como na explicação

  - Será avaliado que após acrescentar a partida Minas Brasília 1 X 0 Ferroviária e fazer a requisição ao endpoint /leaderboard serão retornados os campos e valores corretos

## Depois de terminar o desenvolvimento

Para **"entregar"** seu projeto, siga os passos a seguir:

* Vá até a página **DO SEU** _Pull Request_, adicione a label de _"code-review"_ e marque seus colegas
  * No menu à direita, clique no _link_ **"Labels"** e escolha a _label_ **code-review**
  * No menu à direita, clique no _link_ **"Assignees"** e escolha **o seu usuário**
  * No menu à direita, clique no _link_ **"Reviewers"** e digite `students`, selecione o time `tryber/students-sd-00`

Se ainda houver alguma dúvida sobre como entregar seu projeto, [aqui tem um video explicativo](https://vimeo.com/362189205).

⚠ Lembre-se que garantir que todas as _issues_ comentadas pelo **Lint** estão resolvidas! ⚠

---

### Revisando um pull request

À medida que você e as outras pessoas que estudam na Trybe forem entregando os projetos, vocês receberão um alerta via Slack para também fazer a revisão dos Pull Requests dos seus colegas. Fiquem atentos às mensagens do "Pull Reminders" no Slack!

Use o material que você já viu sobre [Code Review](https://app.betrybe.com/course/real-life-engineer/code-review) para te ajudar a revisar os projetos que chegaram para você.

# Avisos Finais

Ao finalizar e submeter o projeto, não se esqueça de avaliar sua experiência preenchendo o formulário. Leva menos de 3 minutos!

Link: [FORMULÁRIO DE AVALIAÇÃO DE PROJETO](http://schimmel.biz)

O avaliador automático não necessariamente avalia seu projeto na ordem em que os requisitos aparecem no readme. Isso acontece para deixar o processo de avaliação mais rápido. Então, não se assuste se isso acontecer, ok?

---
>>>>>>> parent of 75ec659... Update README.md
