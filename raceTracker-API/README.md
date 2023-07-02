# race-tracker-api

Race Tracker é uma aplicação em NodeJS desenvolvida para registro de campeonatos de corrida de automóveis. 
A ideia é que seja a interface de comunicação entre o microcontrolador, que captura os tempos de cada volta na pista, e a aplicação Web, que disponibiliza
esse dado de forma intuitiva para o usuário final.

## Tecnologias utilizadas
 * Javascript
 * Node
 * Yarn 
 * PostgreSQL
 * Heroku (for production deployment)

## Para executar localmente
 É necessário, inicialmente clonar ou baixar o repositório na sua máquina.
 
### Pré-requisitos 
 Antes de abrir o projeto ou tentar instalar as dependências é necessário ter instalado:
  * [NodeJS](https://nodejs.org/en/)
  * [PostgreSQL](https://www.postgresql.org/download/)
  * [Yarn](https://edca.com.br/blog/instalando-o-nodejs-e-o-yarn-em-4-passos)

### Inicializando o projeto
Abra a pasta do projeto via linha de comando e execute

  `$ yarn install`
  
para instalar as dependencias necessárias para a execução do projeto. Depois, crie um arquivo chamado .env na pasta raiz do projeto para gerenciar as variáveis de ambiente.
Adicione nesse arquivo a variável 
  
  `$ DATABASE_URL=postgres://<dbuser>:<dbpassword>@127.0.0.1:5432/racertrack`

### Executando
Ainda numa janela do terminal aberta no caminho da pasta do projeto, basta executar o comando
  
  `$ yarn start `
  
e você terá o projeto rodando localmente na sua máquina.
