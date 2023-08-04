# <img align="left" alt="Logo" width="30px" style="padding-right:10px;" src="https://raw.githubusercontent.com/paulojr-eco/Task-Mate/main/public/logo.png" /> Task Mate - Todo App

<img align="left" alt="NextJS" width="30px" style="padding-right:10px;" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" />
<img align="left" alt="TypeScript" width="30px" style="padding-right:10px;" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-plain.svg" />
<img align="left" alt="TypeScript" width="30px" style="padding-right:10px;" src="https://www.vectorlogo.zone/logos/reactjs/reactjs-icon.svg" />
<img align="left" alt="graphql" width="30px" style="padding-right:10px;" src="https://www.vectorlogo.zone/logos/graphql/graphql-icon.svg" />
<img align="left" alt="graphql" width="30px" style="padding-right:10px;" src="https://global.discourse-cdn.com/business5/uploads/apollographql/original/1X/25bd5104d61020fe4dc0777a5919cd009bca633e.png" />
<img align="left" alt="prsima" width="30px" style="padding-right:10px;" src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/prisma.svg" />


<br/>
<br/>

O projeto foi criado com o objetivo de aprendizado sobre as seguintes tecnologias:
- GraphQL;
- Apollo Server;
- Apollo Client v4;
- Next.js com TypeScript;
- ORM Prisma.

<img alt="App" width="480px" style="padding-right:10px;" src="https://raw.githubusercontent.com/paulojr-eco/Task-Mate/main/public/app.png" />

## Executando o servidor de desenvolvimento

O projeto foi construído em um único repositório. Dessa forma, na pasta `backend` foram criadas as queries e mutations do GraphQL para o devido funcionamento.

### Inicialize o database através do Docker

Após realizar o clone do projeto em sua máquina é preciso instalar as dependências para o devido funcionamento:

`npm install`

Este app faz use do Container MySQL para compor o banco de dados. Para inicializá-lo, vá para a pasta raiz do projeto e execute o comando: 

`docker-compose up -d`

Em seguida, é preciso fazer o setup do schema a ser utilizado, através do ORM Prisma. Sendo assim, crie o arquivo .env com base no arquivo de exemplo contendo as credencias corretas. Após isso, execute o seguinte comando:

`npx prisma db push`

### Executando a aplicação

Por fim, uma vez que as dependência já foram instalados basta executar:

`npm run dev`

## Observações

O App foi construído durante a realização do curso pela Udemy: [Using TypeScript with React]( https://www.udemy.com/course/react-with-typescript/ )