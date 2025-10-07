"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireProfessor = requireProfessor;
function requireProfessor(req, res, next) {
    if (req.userRole !== 'professor') {
        return res.status(403).json({ message: 'Apenas professores podem realizar esta ação' });
    }
    next();
}
