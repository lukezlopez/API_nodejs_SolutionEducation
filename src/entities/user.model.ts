import mongoose, { Schema, model, HydratedDocument } from 'mongoose';

export type Role = 'professor' | 'aluno';

export interface IUser {
    name: string;
    email: string;
    password: string;
    role: Role;
    createdAt?: Date;
}

const userSchema = new Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['professor', 'aluno'], required: true },
    createdAt: { type: Date, default: Date.now },
});

export type UserDocument = HydratedDocument<IUser>;
export const User = model<IUser>('User', userSchema);
