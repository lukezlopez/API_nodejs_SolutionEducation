import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export interface AuthPayload {
    id: string;
    role: 'professor' | 'aluno';
}

export function authenticate(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Token não fornecido ou inválido' });
    }

    const token = authHeader.split(' ')[1];
    try {
        const payload = jwt.verify(token, JWT_SECRET) as AuthPayload;
        (req as any).userId = payload.id;
        (req as any).userRole = payload.role;
        return next();
    } catch (err) {
        return res.status(401).json({ message: 'Token inválido ou expirado' });
    }
}

export function authorize(allowedRoles: ('professor' | 'aluno')[]) {
    return (req: Request, res: Response, next: NextFunction) => {
        const role = (req as any).userRole as 'professor' | 'aluno' | undefined;
        if (!role) return res.status(401).json({ message: 'Não autenticado' });
        if (!allowedRoles.includes(role)) {
            return res.status(403).json({ message: 'Acesso negado: sem permissão' });
        }
        next();
    };
}

export function requireProfessor(req: Request, res: Response, next: NextFunction) {
    if ((req as any).userRole !== 'professor') {
        return res.status(403).json({ message: 'Apenas professores podem realizar esta ação' });
    }
    next();
}
