import { Request, Response } from 'express';
import { User } from '../entities/user.model';
import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

const allowedRoles = ["professor", "aluno"];

export async function createUser(req: Request, res: Response) {
    let { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
        return res.status(400).json({ message: 'name, email, password e role são obrigatórios' });
    }

    role = role.toLowerCase();
    email = email.toLowerCase();

    if (!allowedRoles.includes(role)) {
        return res.status(400).json({ message: 'Role inválida. Use professor ou aluno' });
    }

    try {
        const existing = await User.findOne({ email });
        if (existing) return res.status(409).json({ message: 'Email já cadastrado' });

        const hashed = await bcrypt.hash(password, SALT_ROUNDS);
        const u = new User({ name, email, password: hashed, role });

        await u.save();

        const { password: _, ...rest } = u.toObject();
        return res.status(201).json(rest);

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Erro ao criar usuário' });
    }
}

export async function listUsers(req: Request, res: Response) {
    const { role } = req.query;
    const filter: any = {};
    if (role === 'professor' || role === 'aluno') filter.role = role;
    try {
        const users = await User.find(filter).select('-password');
        return res.json(users);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Erro ao listar usuários' });
    }
}

export async function getUserById(req: Request, res: Response) {
    try {
        const u = await User.findById(req.params.id).select('-password');
        if (!u) return res.status(404).json({ message: 'Usuário não encontrado' });
        return res.json(u);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Erro ao buscar usuário' });
    }
}

export async function updateUser(req: Request, res: Response) {
    try {
        const updates: any = { ...req.body };
        if (updates.password) {
            updates.password = await bcrypt.hash(updates.password, SALT_ROUNDS);
        }
        const u = await User.findByIdAndUpdate(req.params.id, updates, { new: true }).select('-password');
        if (!u) return res.status(404).json({ message: 'Usuário não encontrado' });
        return res.json(u);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Erro ao atualizar usuário' });
    }
}

export async function deleteUser(req: Request, res: Response) {
    try {
        const u = await User.findByIdAndDelete(req.params.id);
        if (!u) return res.status(404).json({ message: 'Usuário não encontrado' });
        return res.status(204).send();
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Erro ao deletar usuário' });
    }
}
