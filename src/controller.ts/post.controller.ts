import { Request, Response } from 'express'
import { Post } from '../entities/post.model'


export async function getPosts(req: Request, res: Response) {
    const posts = await Post.find()
    res.json(posts)
}

export async function createPost(req: Request, res: Response) {
    const newPost = new Post(req.body)
    
    await newPost.save()
    
    res.status(201).json(newPost)
}

export async function getPostById(req: Request, res: Response) {
    const post = await Post.findById(req.params.id)
    
    if (!post) return res.status(404).json({ message: 'Post not found' })
    
    res.json(post)
}

export async function updatePost(req: Request, res: Response) {
    const post = await Post.findByIdAndUpdate(
        req.params.id, 
        req.body, 
        { new: true })
    
    if (!post) return res.status(404).json({ message: 'Post not found' });
    
    res.json(post)
}

export async function deletePost(req: Request, res: Response) {
    await Post.findByIdAndDelete(req.params.id);

    res.status(204).send()
}
