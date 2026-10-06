const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || "chave_super_secreta_livraria_2026";

// AuthN: valida o header Authorization: Bearer <token> e a assinatura do JWT.
function autenticarToken(req, res, next) {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(401).json({ erro: "Acesso negado: Token de autenticação não fornecido." });
  }

  const [tipo, token] = authHeader.trim().split(/\s+/);
  if (tipo !== 'Bearer' || !token) {
    return res.status(401).json({ erro: "Formato de autenticação inválido. Use Authorization: Bearer <token>." });
  }

  try {
    const usuarioDecodificado = jwt.verify(token, JWT_SECRET);
    req.usuario = usuarioDecodificado;
    return next();
  } catch (err) {
    return res.status(401).json({ erro: "Token inválido, corrompido ou expirado." });
  }
}

// AuthZ/RBAC: permite a operação somente para o perfil solicitado.
function exigirRole(roleEsperada) {
  return (req, res, next) => {
    if (!req.usuario || req.usuario.role !== roleEsperada) {
      return res.status(403).json({
        erro: `Acesso proibido: Privilégio de ${roleEsperada} exigido para esta operação.`
      });
    }
    return next();
  };
}

module.exports = { autenticarToken, exigirRole };
