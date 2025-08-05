import { Request, Response, NextFunction } from 'express';

export function requireProfessor(req: Request, res: Response, next: NextFunction) {
    if ((req as any).userRole !== 'professor') {
        return res.status(403).json({ message: 'Apenas professores podem realizar esta ação' });
    }

    next();
}