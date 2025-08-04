import mongoose, { model , HydratedDocument, Schema } from 'mongoose'
import { IPost } from './models/post.interface'

const postSchema = new Schema<IPost>({
    title: { type: String, required: true },
    content: { type: String },
    createdAt: { type: Date, default: Date.now },
})

export type PostDocument = HydratedDocument<IPost>
export const Post = model<IPost>('Post', postSchema)
