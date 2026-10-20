# Livraria API - Segurança com BCrypt, JWT e RBAC

API RESTful da atividade de segurança para Livros e Autores.

## Segurança implementada

- Senhas armazenadas com BCrypt (salt automático + work factor 10).
- Login stateless com JWT válido por 2 horas.
- Header esperado: `Authorization: Bearer <token>`.
- RBAC para operações administrativas.
- Comentários disponíveis apenas para usuários autenticados.

## Credenciais de teste

**Administrador**
- E-mail: `admin@livraria.com`
- Senha: `admin123`

**Leitor**
- E-mail: `leitor@gmail.com`
- Senha: `leitor123`

## Instalação e execução

```bash
npm install
npm start
```

A API será iniciada em `http://localhost:3000`.

O `index.html` pode ser aberto com Live Server ou por:

```bash
py -m http.server 8080
```

## Matriz de permissões

| Método | Rota | Acesso |
|---|---|---|
| GET | `/api/v1/livros` | Público |
| GET | `/api/v1/livros/:id` | Público |
| POST | `/api/v1/auth/register` | Público |
| POST | `/api/v1/auth/login` | Público |
| POST | `/api/v1/livros/:id/comentarios` | USER ou ADMIN autenticado |
| POST | `/api/v1/autores` | ADMIN |
| POST | `/api/v1/livros` | ADMIN |

## Exemplos rápidos

Login como admin:

```bash
curl -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@livraria.com","senha":"admin123"}'
```

Depois use o token retornado:

```bash
curl -X POST http://localhost:3000/api/v1/autores \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN" \
  -d '{"nome":"Clarice Lispector","nacionalidade":"Brasileira"}'
```

> Em produção, defina `JWT_SECRET` por variável de ambiente. A chave fallback existe apenas para compatibilidade com o laboratório.

## Documentação da API — OpenAPI 3.0

A API possui documentação interativa desenvolvida com Swagger UI, seguindo a especificação OpenAPI 3.0.

### Executando o projeto

Instale as dependências:

```bash
npm install
```

Inicie o servidor:

```bash
npm start
```

A API estará disponível em:

http://localhost:3000

### Acessando o Swagger

Após iniciar o servidor, acesse:

- Swagger UI: http://localhost:3000/docs
- OpenAPI JSON: http://localhost:3000/docs/api.json

### Autenticação JWT

A documentação permite testar endpoints protegidos diretamente pelo navegador.

1. Acesse POST /api/v1/auth/login.
2. Informe as credenciais de teste disponíveis neste README.
3. Execute a requisição e copie o token JWT retornado.
4. Clique no botão "Authorize" do Swagger.
5. Cole o token no campo indicado, sem o prefixo Bearer.
6. Teste os endpoints conforme as permissões do usuário.

### Permissões

| Endpoint | Acesso |
|---|---|
| GET /api/v1/livros | Público |
| GET /api/v1/livros/{id} | Público |
| POST /api/v1/auth/register | Público |
| POST /api/v1/auth/login | Público |
| POST /api/v1/livros/{id}/comentarios | USER ou ADMIN |
| POST /api/v1/autores | ADMIN |
| POST /api/v1/livros | ADMIN |

### Respostas HTTP documentadas

- 200 OK — Consulta ou login realizado.
- 201 Created — Recurso cadastrado.
- 400 Bad Request — Dados inválidos.
- 401 Unauthorized — Autenticação ausente ou inválida.
- 403 Forbidden — Usuário sem permissão.
- 404 Not Found — Recurso não encontrado.
- 409 Conflict — E-mail já cadastrado.
- 500 Internal Server Error — Erro interno.

A documentação inclui schemas JSON, campos obrigatórios, exemplos de requisições e respostas e autenticação HTTP Bearer JWT.
