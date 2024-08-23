# Projeto Back-end com Nest.js e PostgreSQL

Está procurando o Frontend? 👇

Repositório Front-end, disponível em [buildpc-frontend](https://github.com/CaueFer/buildpc-front).

Este projeto é um exemplo de uma aplicação back-end utilizando Nest.js e banco de dados com PostgreSQL. A aplicação consiste um site para montagem de computadores fictícios e permite aos usuários adicionar produtos e peças ao sistema.


![image](https://github.com/user-attachments/assets/44c1e4c5-c143-4b10-bd90-3894f7db453c)


![image](https://github.com/user-attachments/assets/49f62c5e-17cc-45c1-8b0f-04ef80339d9e)


## Funcionalidades

• CRUD para Categorias, Componentes e Computadores.

• Adicionar um sistema de permissão para exclusão e edição de itens especificos.  

Categorias<br>
• POST /categorias <br>
• GET /categorias <br>
• PUT /categorias/:id <br>
• DELETE /categorias/:id <br>

Componentes<br>
• POST /componentes <br>
• GET /componentes<br> 
• PUT /componentes/:id<br>
• DELETE /componentes/:id<br>

Computadores<br>
• POST /computadores<br>
• GET /computadores<br>
• PUT /computadores/:id<br>
• DELETE /computadores/:id<br>

## Tecnologias Utilizadas

• Nest.js: Framework para construir aplicações web Node.js eficientes e escaláveis.

• PostgreSQL: PostgreSQL é um sistema gerenciador de banco de dados objeto relacional, desenvolvido como projeto de código aberto.

## Como Executar o Projeto

1- Testar Conexão

```bash
https://buildpc-backend-production.up.railway.app/api/categorias
```

O projeto estará disponível em [buildpc.com](https://buildupc.vercel.app/home).

## Considerações

Este projeto foi desenvolvido como parte de um teste técnico para demonstrar habilidades em Nest.js e PostgreSQL, criação de uma RESTful API.
