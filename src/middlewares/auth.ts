import { Request, Response, NextFunction } from 'express';

const VALID_TOKENS: Record<string, 'professor' | 'aluno'> = {
    'professor-token': 'professor',
    'aluno-token': 'aluno',
};

export function authenticate(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Token não fornecido ou inválido' });
    }

    const token = authHeader.split(' ')[1];
    const role = VALID_TOKENS[token];

    if (!role) {
        return res.status(403).json({ message: 'Acesso negado: token inválido' });
    }

    (req as any).userRole = role;

    next();
}

export function authorize(allowedRoles: ('professor' | 'aluno')[]) {
    return (req: Request, res: Response, next: NextFunction) => {
        const role = (req as any).userRole;

        if (!allowedRoles.includes(role)) {
            return res.status(403).json({ message: 'Acesso negado: sem permissão' });
        }

        next();
    };
}