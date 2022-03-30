<<<<<<< HEAD
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
=======
### Termos e acordos

Ao iniciar este projeto, você concorda com as diretrizes do Código de Ética e Conduta e do Manual da Pessoa Estudante da Trybe.

---

# Boas vindas ao repositório do TFC - Trybe Futebol Clube! ⚽️

Você já usa o GitHub diariamente para desenvolver os exercícios, certo? Agora, para desenvolver os projetos, você deverá seguir as instruções a seguir. Fique atento a cada passo, e se tiver qualquer dúvida, nos envie por Slack! #vqv 🚀

Aqui você vai encontrar os detalhes de como estruturar o desenvolvimento do seu projeto a partir deste repositório, utilizando uma branch específica e um Pull Request para colocar seus códigos.

---

# Sumário

- [Boas vindas ao repositório do TFC - Trybe Futebol Clube! ⚽️](#boas-vindas-ao-repositório-do-tfc---trybe-futebol-clube-️)
- [Habilidades](#habilidades)
- [Entregáveis](#entregáveis)
  - [O que deverá ser desenvolvido](#o-que-deverá-ser-desenvolvido)
  - [Desenvolvimento](#desenvolvimento)
    - [Data de Entrega](#data-de-entrega)
- [Instruções para entregar seu projeto:](#instruções-para-entregar-seu-projeto)
    - [Antes de começar a desenvolver](#antes-de-começar-a-desenvolver)
    - [Durante o desenvolvimento](#durante-o-desenvolvimento)
- [Como desenvolver](#como-desenvolver)
  - [Linter](#linter)
- [Requisitos do projeto:](#requisitos-do-projeto)
  - [Antes de começar:](#antes-de-começar)
    - [⚠️ Leia-os atentamente e siga à risca o que for pedido. ⚠️](#️-leia-os-atentamente-e-siga-à-risca-o-que-for-pedido-️)
    - [👀 Observações importantes:](#-observações-importantes)
      - [⚠️ **Inicie seu `docker-compose` antes de testar localmente!** ⚠️](#️-inicie-seu-docker-compose-antes-de-testar-localmente-️)
      - [Variáveis de ambiente](#variáveis-de-ambiente)
      - [Variáveis:](#variáveis)
      - [Chave JWT:](#chave-jwt)
      - [Testes de cobertura](#testes-de-cobertura)
    - [Dicas](#dicas)
      - [Status HTTP](#status-http)
  - [Lista Pré-Requisitos:](#lista-pré-requisitos)
    - [Docker e Docker-compose](#docker-e-docker-compose)
      - [Crie os arquivos dockerfile e docker-compose](#crie-os-arquivos-dockerfile-e-docker-compose)
  - [Lista de Requisitos:](#lista-de-requisitos)
    - [Sequelize](#sequelize)
      - [1 - Desenvolva em /app/backend/src/database nas pastas correspondentes, uma migration e um model para a tabela de clubs](#1---desenvolva-em-appbackendsrcdatabase-nas-pastas-correspondentes-uma-migration-e-um-model-para-a-tabela-de-clubs)
      - [2 - Desenvolva em /app/backend/src/database nas pastas correspondentes, uma migration e um model para a tabela de matchs](#2---desenvolva-em-appbackendsrcdatabase-nas-pastas-correspondentes-uma-migration-e-um-model-para-a-tabela-de-matchs)
      - [3 - Desenvolva em /app/backend/src/database nas pastas correspondentes, uma migration e um model para a tabela de users](#3---desenvolva-em-appbackendsrcdatabase-nas-pastas-correspondentes-uma-migration-e-um-model-para-a-tabela-de-users)
    - [Login](#login)
      - [4 - (`TDD`) Desenvolva testes que cubram no mínimo 5 por cento dos arquivo backend em /src com um mínimo de 7 linhas cobertas](#4---tdd-desenvolva-testes-que-cubram-no-mínimo-5-por-cento-dos-arquivo-backend-em-src-com-um-mínimo-de-7-linhas-cobertas)
      - [5 - Desenvolva o endpoint /login no backend de maneira ele permita o acesso com dados válidos no frontend](#5---desenvolva-o-endpoint-login-no-backend-de-maneira-ele-permita-o-acesso-com-dados-válidos-no-frontend)
      - [6 - (`TDD`) Desenvolva testes que cubram no mínimo 10 por cento dos arquivo backend em /src com um mínimo de 19 linhas cobertas](#6---tdd-desenvolva-testes-que-cubram-no-mínimo-10-por-cento-dos-arquivo-backend-em-src-com-um-mínimo-de-19-linhas-cobertas)
      - [7 - Desenvolva o endpoint /login no backend de maneira ele não permita o acesso com um email inválido no frontend](#7---desenvolva-o-endpoint-login-no-backend-de-maneira-ele-não-permita-o-acesso-com-um-email-inválido-no-frontend)
      - [8 - (`TDD`) Desenvolva testes que cubram no mínimo 15 por cento dos arquivo backend em /src com um mínimo de 25 linhas cobertas](#8---tdd-desenvolva-testes-que-cubram-no-mínimo-15-por-cento-dos-arquivo-backend-em-src-com-um-mínimo-de-25-linhas-cobertas)
      - [9 - Desenvolva o endpoint /login no backend de maneira ele não permita o acesso com uma senha inválida no frontend](#9---desenvolva-o-endpoint-login-no-backend-de-maneira-ele-não-permita-o-acesso-com-uma-senha-inválida-no-frontend)
      - [10 - (`TDD`) Desenvolva testes que cubram no mínimo 20 por cento dos arquivo backend em /src com um mínimo de 35 linhas cobertas](#10---tdd-desenvolva-testes-que-cubram-no-mínimo-20-por-cento-dos-arquivo-backend-em-src-com-um-mínimo-de-35-linhas-cobertas)
      - [11 - Desenvolva o endpoint /login no backend de maneira ele não permita o acesso sem informar um email no frontend](#11---desenvolva-o-endpoint-login-no-backend-de-maneira-ele-não-permita-o-acesso-sem-informar-um-email-no-frontend)
      - [12 - (`TDD`) Desenvolva testes que cubram no mínimo 30 por cento dos arquivo backend em /src com um mínimo de 45 linhas cobertas](#12---tdd-desenvolva-testes-que-cubram-no-mínimo-30-por-cento-dos-arquivo-backend-em-src-com-um-mínimo-de-45-linhas-cobertas)
      - [13 - Desenvolva o endpoint /login no backend de maneira ele não permita o acesso sem informar uma senha no frontend](#13---desenvolva-o-endpoint-login-no-backend-de-maneira-ele-não-permita-o-acesso-sem-informar-uma-senha-no-frontend)
      - [14 - Desenvolva o endpoint /login/validate no backend de maneira ele retorne os dados corretamente no frontend](#14---desenvolva-o-endpoint-loginvalidate-no-backend-de-maneira-ele-retorne-os-dados-corretamente-no-frontend)
    - [Jogos](#jogos)
      - [15 - (`TDD`) Desenvolva testes que cubram no mínimo 45 por cento dos arquivo backend em /src com um mínimo de 70 linhas cobertas](#15---tdd-desenvolva-testes-que-cubram-no-mínimo-45-por-cento-dos-arquivo-backend-em-src-com-um-mínimo-de-70-linhas-cobertas)
      - [16 - Desenvolva o endpoint /clubs no backend de forma que ele possa retornar todos os times corretamente](#16---desenvolva-o-endpoint-clubs-no-backend-de-forma-que-ele-possa-retornar-todos-os-times-corretamente)
      - [17 - Desenvolva o endpoint /clubs/:id no backend de forma que ele possa retornar dados de um time específico](#17---desenvolva-o-endpoint-clubsid-no-backend-de-forma-que-ele-possa-retornar-dados-de-um-time-específico)
      - [18 - (`TDD`) Desenvolva testes que cubram no mínimo 60 por cento dos arquivo backend em /src com um mínimo de 80 linhas cobertas](#18---tdd-desenvolva-testes-que-cubram-no-mínimo-60-por-cento-dos-arquivo-backend-em-src-com-um-mínimo-de-80-linhas-cobertas)
      - [19 - Desenvolva o endpoint `/matchs` de forma que os dados apareçam corretamente na tela de partidas no frontend](#19---desenvolva-o-endpoint-matchs-de-forma-que-os-dados-apareçam-corretamente-na-tela-de-partidas-no-frontend)
      - [20 - Desenvolva o endpoint `/matchs` de forma que seja possível filtrar as partidas em andamento na tela de partidas do frontend](#20---desenvolva-o-endpoint-matchs-de-forma-que-seja-possível-filtrar-as-partidas-em-andamento-na-tela-de-partidas-do-frontend)
      - [21 - Desenvolva o endpoint `/matchs` de forma que seja possível filtrar as partidas finalizadas na tela de partidas do frontend](#21---desenvolva-o-endpoint-matchs-de-forma-que-seja-possível-filtrar-as-partidas-finalizadas-na-tela-de-partidas-do-frontend)
    - [Adicionar Partidas](#adicionar-partidas)
      - [22 - (`Bônus`; `TDD`) Desenvolva testes que cubram no mínimo 80 por cento dos arquivo backend em /src com um mínimo de 100 linhas cobertas](#22---bônus-tdd-desenvolva-testes-que-cubram-no-mínimo-80-por-cento-dos-arquivo-backend-em-src-com-um-mínimo-de-100-linhas-cobertas)
      - [23 - Desenvolva a rota /matchs de modo que seja possível salvar uma partida com o status de inProgress como true no banco de dados](#23---desenvolva-a-rota-matchs-de-modo-que-seja-possível-salvar-uma-partida-com-o-status-de-inprogress-como-true-no-banco-de-dados)
      - [24 - Desenvolva a rota `/matchs/:id/finish` de modo que seja possível salvar uma partida com o status de inProgress como false no banco de dados](#24---desenvolva-a-rota-matchsidfinish-de-modo-que-seja-possível-salvar-uma-partida-com-o-status-de-inprogress-como-false-no-banco-de-dados)
      - [25 - Desenvolva o endpoint /matchs de forma que não seja possível inserir uma partida com times iguais](#25---desenvolva-o-endpoint-matchs-de-forma-que-não-seja-possível-inserir-uma-partida-com-times-iguais)
      - [26 - Desenvolva o endpoint /matchs de forma que não seja possível inserir uma partida com time que não existe na tabela clubs](#26---desenvolva-o-endpoint-matchs-de-forma-que-não-seja-possível-inserir-uma-partida-com-time-que-não-existe-na-tabela-clubs)
    - [Editar Partidas](#editar-partidas)
      - [27 - Desenvolva o endpoint `/matchs/:id` de forma que seja possível atualizar partidas em andamento](#27---desenvolva-o-endpoint-matchsid-de-forma-que-seja-possível-atualizar-partidas-em-andamento)
      - [28 - Desenvolva o endpoint `/matchs/:id` de forma que seja possível finalizar partidas em andamento](#28---desenvolva-o-endpoint-matchsid-de-forma-que-seja-possível-finalizar-partidas-em-andamento)
  - [Leaderboards](#leaderboards)
    - [Leaderboard Home](#leaderboard-home)
      - [29 - Desenvolva o endpoint `/leaderboard/home` de forma que seja possível filtrar a classificações dos times quando mandantes na tela de classificação do frontend com os dados iniciais do banco de dados](#29---desenvolva-o-endpoint-leaderboardhome-de-forma-que-seja-possível-filtrar-a-classificações-dos-times-quando-mandantes-na-tela-de-classificação-do-frontend-com-os-dados-iniciais-do-banco-de-dados)
      - [30 - Desenvolva o endpoint `/leaderboard/home` de forma que seja possível filtrar a classificações dos times quando mandantes na tela de classificação do frontend e ao inserir a partida Botafogo 2 X 1 Grêmio a tabela será atualizada](#30---desenvolva-o-endpoint-leaderboardhome-de-forma-que-seja-possível-filtrar-a-classificações-dos-times-quando-mandantes-na-tela-de-classificação-do-frontend-e-ao-inserir-a-partida-botafogo-2-x-1-grêmio-a-tabela-será-atualizada)
    - [Leaderboard away](#leaderboard-away)
      - [31 - Desenvolva o endpoint `/leaderboard/away` de forma que seja possível filtrar as classificações dos times quando visitantes na tela de classificação do frontend com os dados iniciais do banco de dados](#31---desenvolva-o-endpoint-leaderboardaway-de-forma-que-seja-possível-filtrar-as-classificações-dos-times-quando-visitantes-na-tela-de-classificação-do-frontend-com-os-dados-iniciais-do-banco-de-dados)
      - [32 - Desenvolva o endpoint `/leaderboard/away` de forma que seja possível filtrar a classificações dos times quando visitantes na tela de classificação do frontend e ao inserir a partida Botafogo 2 X 1 Grêmio a tabela será atualizada](#32---desenvolva-o-endpoint-leaderboardaway-de-forma-que-seja-possível-filtrar-a-classificações-dos-times-quando-visitantes-na-tela-de-classificação-do-frontend-e-ao-inserir-a-partida-botafogo-2-x-1-grêmio-a-tabela-será-atualizada)
    - [Leaderboard](#leaderboard)
      - [33 - Desenvolva o endpoint `/leaderboard` de forma que seja possível filtrar a classificação geral dos times na tela de classificação do frontend com os dados iniciais do banco de dados](#33---desenvolva-o-endpoint-leaderboard-de-forma-que-seja-possível-filtrar-a-classificação-geral-dos-times-na-tela-de-classificação-do-frontend-com-os-dados-iniciais-do-banco-de-dados)
      - [34 - Desenvolva o endpoint /leaderboard de forma que seja possível filtrar a classificação geral dos times na tela de classificação do frontend e ao inserir a partida Flamengo 3 X 0 Napoli-SC a tabela será atualizada](#34---desenvolva-o-endpoint-leaderboard-de-forma-que-seja-possível-filtrar-a-classificação-geral-dos-times-na-tela-de-classificação-do-frontend-e-ao-inserir-a-partida-flamengo-3-x-0-napoli-sc-a-tabela-será-atualizada)
      - [35 - Desenvolva o endpoint /leaderboard de forma que seja possível filtrar a classificação geral dos times na tela de classificação do frontend e ao inserir a partida Minas Brasília 1 X 0 Ferroviária a tabela será atualizada](#35---desenvolva-o-endpoint-leaderboard-de-forma-que-seja-possível-filtrar-a-classificação-geral-dos-times-na-tela-de-classificação-do-frontend-e-ao-inserir-a-partida-minas-brasília-1-x-0-ferroviária-a-tabela-será-atualizada)
  - [Depois de terminar o desenvolvimento](#depois-de-terminar-o-desenvolvimento)
    - [Revisando um pull request](#revisando-um-pull-request)
- [Avisos Finais](#avisos-finais)

# Habilidades

![Exemplo app front](./front-example.png)

O `TFC` é um site informativo sobre partidas e classificações de futebol! ⚽️

No time de desenvolvimento do `TFC`, seu *squad* ficou responsável por desenvolver uma API (utilizando o método `TDD`) e também integrar *- através do docker-compose -* as aplicações para que funcionem consumindo um banco de dados.

Nesse projeto, você vai construir **um back-end dockerizado utilizando modelagem de dados através do Sequelize**. Seu desenvolvimento deve **respeitar regras de negócio** providas no projeto e **sua API deve ser capaz de ser consumida por um front-end já provido nesse projeto**. Você será capaz de:

 - Realizar a dockerização dos apps, network, volume e compose;
 - Modelar dados com **MySQL** através do **Sequelize**;
 - Criar e associar tabelas usando `models` do `sequelize`;
 - Construir uma **API REST** com endpoints para consumir os models criados;
 - Fazer um `CRUD` utilizando `ORM`;

# Entregáveis

Para entregar o seu projeto você deverá criar um Pull Request neste repositório.

Lembre-se que você pode consultar nosso conteúdo sobre [Git & GitHub](https://course.betrybe.com/intro/git/) sempre que precisar!

---

## O que deverá ser desenvolvido

Você vai arquitetar e desenvolver uma aplicação responsável pela serie A do campeonato __TFC - Trybe Futebol Clube__. Começando pela API, você vai desenvolver alguns endpoints (seguindo os princípios **REST**) que estarão conectados ao seu banco de dados. Lembre-se de aplicar os princípios **SOLID**!

O seu back-end deverá implementar regras de negócio para popular adequadamente a tabela disponível no front-end que será exibida para a pessoa usuária do sistema.

---

## Desenvolvimento

Você deve desenvolver uma aplicação dockerizada em `Node.js + Typescript` usando o pacote `sequelize`.

Para adicionar uma partida é necessário usuário e senha, portanto a pessoa deverá estar logada para fazer as alterações. Teremos um relacionamento entre as tabelas `clubs` e `matchs` para fazermos as atualizações das partidas.

### Data de Entrega

  - Projeto individual;

  - Serão `X` dias de projeto;

  - Data de entrega para avaliação final do projeto: `DD/MM/YYYY - 14:00h`.

---

# Instruções para entregar seu projeto:

### Antes de começar a desenvolver

1. Clone o repositório
  * `git clone https://github.com/tryber/sd-0x-trybe-futebol-clube.git`.
  * Entre na pasta do repositório que você acabou de clonar:
    * `cd sd-0x-trybe-futebol-clube`

2. Instale as dependências [**Caso existam**]
  * `npm install`

3. Crie uma branch a partir da branch `master`
  * Verifique que você está na branch `master`
    * Exemplo: `git branch`
  * Se não estiver, mude para a branch `master`
    * Exemplo: `git checkout master`
  * Agora crie uma branch à qual você vai submeter os `commits` do seu projeto
    * Você deve criar uma branch no seguinte formato: `nome-de-usuario-nome-do-projeto`
    * Exemplo: `git checkout -b joaozinho-sd-0x-trybe-futebol-clube`

4. Adicione as mudanças ao _stage_ do Git e faça um `commit`
  * Verifique que as mudanças ainda não estão no _stage_
    * Exemplo: `git status` (deve aparecer listada a pasta _joaozinho_ em vermelho)
  * Adicione o novo arquivo ao _stage_ do Git
      * Exemplo:
        * `git add .` (adicionando todas as mudanças - _que estavam em vermelho_ - ao stage do Git)
        * `git status` (deve aparecer listado o arquivo _joaozinho/README.md_ em verde)
  * Faça o `commit` inicial
      * Exemplo:
        * `git commit -m 'iniciando o projeto x'` (fazendo o primeiro commit)
        * `git status` (deve aparecer uma mensagem tipo _nothing to commit_ )

5. Adicione a sua branch com o novo `commit` ao repositório remoto
  * Usando o exemplo anterior: `git push -u origin joaozinho-sd-0x-trybe-futebol-clube`

6. Crie um novo `Pull Request` _(PR)_
  * Vá até a página de _Pull Requests_ do [repositório no GitHub](https://github.com/tryber/sd-0x-project-[nome-do-projeto]/pulls)
  * Clique no botão verde _"New pull request"_
  * Clique na caixa de seleção _"Compare"_ e escolha a sua branch **com atenção**
  * Clique no botão verde _"Create pull request"_
  * Adicione uma descrição para o _Pull Request_ e clique no botão verde _"Create pull request"_
  * **Não se preocupe em preencher mais nada por enquanto!**
  * Volte até a [página de _Pull Requests_ do repositório](https://github.com/tryber/sd-0x-project-[nome-do-projeto]/pulls) e confira que o seu _Pull Request_ está criado

---

### Durante o desenvolvimento

* Faça `commits` das alterações que você fizer no código regularmente

* Lembre-se de sempre após um (ou alguns) `commits` atualizar o repositório remoto

* Os comandos que você utilizará com mais frequência são:
  1. `git status` _(para verificar o que está em vermelho - fora do stage - e o que está em verde - no stage)_
  2. `git add` _(para adicionar arquivos ao stage do Git)_
  3. `git commit` _(para criar um commit com os arquivos que estão no stage do Git)_
  4. `git push -u nome-da-branch` _(para enviar o commit para o repositório remoto na primeira vez que fizer o `push` de uma nova branch)_
  5. `git push` _(para enviar o commit para o repositório remoto após o passo anterior)_

---

* ⚠️ **Para adicionar pacotes adicionais ao backend, utilize o arquivo `app/backend/packages.npm`, separando os pacotes adicionais por espaços ou quebras de linha.**
* ⚠️ **Não altere o arquivo `app/backend/packages.json`, pois o mesmo está travado para essa avaliação**

---

# Como desenvolver

## Linter

Para garantir a qualidade do código, usaremos o [ESLint](https://eslint.org/) para fazer a sua análise estática.

Este projeto já vem com as dependências relacionadas ao _linter_ configuradas nos arquivos `package.json` nos seguintes caminhos:

- `sd-0x-trybe-futebol-clube/app/backend/package.json`

Para rodar o `ESLint` em um projeto, basta executar o comando `npm install` dentro do projeto e depois `npm run lint`. Se a análise do `ESLint` encontrar problemas no seu código, tais problemas serão mostrados no seu terminal. Se não houver problema no seu código, nada será impresso no seu terminal.

Você também pode instalar o plugin do `ESLint` no `VSCode`, bastar ir em extensions e baixar o [plugin `ESLint`](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint).

⚠ PULL REQUESTS COM ISSUES DE LINTER NÃO SERÃO AVALIADAS. ATENTE-SE PARA RESOLVÊ-LAS ANTES DE FINALIZAR O DESENVOLVIMENTO! ⚠

---

# Requisitos do projeto:

## Antes de começar:

### ⚠️ Leia-os atentamente e siga à risca o que for pedido. ⚠️

### 👀 Observações importantes:

O não cumprimento de um requisito, total ou parcialmente, impactará em sua avaliação.

#### ⚠️ **Inicie seu `docker-compose` antes de testar localmente!** ⚠️

Os testes vão utilizar sua aplicação do compose para fazer as validações, por tanto **é essencial que ele esteja funcionando corretamente** para que os testes passem!

- Para isso, garanta que as aplicações, tanto do back, quanto do front-end, possuem arquivos `Dockerfile` válidos;
- Utilize os scripts de apoio `npm run compose:up` / `npm run compose:down`, para facilitar a execução do seu *compose*.

#### Variáveis de ambiente

**Você irá precisar configurar as variáveis globais do MySQL.** Você pode usar esse [Conteúdo de variáveis de ambiente com NodeJS](https://blog.rocketseat.com.br/variaveis-ambiente-nodejs/) como referência.

**Faça essas configurações também para as variáveis de ambiente usadas nesses arquivo:**

`sd-00-trybe-futebol-clube-2022-02-22-15-49-09-staging/app/backend/src/database/config/database.ts`

>>>>>>> parent of d0caa25... README.md updated
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