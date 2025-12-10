import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../entities/user.model";

const JWT_SECRET = process.env.JWT_SECRET as string;

export async function login(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) return res.status(404).json({ message: "Usuário não encontrado" });

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) return res.status(401).json({ message: "Senha incorreta" });

        const token = jwt.sign(
            { id: user._id, role: user.role },
            JWT_SECRET,
            { expiresIn: "7d" }
        );

        return res.json({
            message: "Login bem-sucedido",
            token,
            role: user.role
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Erro interno no servidor" });
    }
}
