"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = authenticate;
exports.authorize = authorize;
const VALID_TOKENS = {
    'professor-token': 'professor',
    'aluno-token': 'aluno',
};
function authenticate(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Token não fornecido ou inválido' });
    }
    const token = authHeader.split(' ')[1];
    const role = VALID_TOKENS[token];
    if (!role) {
        return res.status(403).json({ message: 'Acesso negado: token inválido' });
    }
    req.userRole = role;
    next();
}
function authorize(allowedRoles) {
    return (req, res, next) => {
        const role = req.userRole;
        if (!allowedRoles.includes(role)) {
            return res.status(403).json({ message: 'Acesso negado: sem permissão' });
        }
        next();
    };
}
