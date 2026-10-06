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
