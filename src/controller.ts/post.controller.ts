import { Request, Response } from 'express'
import { Post } from '../entities/post.model'


export async function getPosts(req: Request, res: Response) {

    try {
        const posts = await Post.find()

        res.json(posts)

    } catch (error) {
        res.status(500).json
        ({ message: 'Erro ao buscar posts' })
    }
}

export async function createPost(req: Request, res: Response) {
    try {
        const newPost = new Post(req.body)

        await newPost.save()

        res.status(201).json(newPost)
    } catch (error) {
        res.status(400).json
        ({ message: 'Erro ao criar post' })
    }
}

export async function getPostById(req: Request, res: Response) {
    
    try {
        
        const post = await Post.findById(req.params.id)
        
        if (!post) return res.status(404).json
        ({ message: 'Post não encontrado' })
            res.json(post)
    } catch (error) {
        
        res.status(500).json({ message: 'Erro ao buscar post' })

    }
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
    try {
        const post = await Post.findByIdAndDelete(req.params.id)
        
        if (!post) return res.status(404).json

        ({ message: 'Post não encontrado' })
        res.status(204).send()
    } catch (error) {
        res.status(500).json
        ({ message: 'Erro ao deletar post' })
    }
}

export async function searchPosts(req: Request, res: Response) {
    const { query } = req.query

    if (typeof query !== 'string' || query.trim() === '') {
        return res.status(400).json({ message: 'Parâmetro de busca inválido.' })
    }

    const regex = new RegExp(query, 'i')
    const posts = await Post.find({
        $or: [
            { title: { $regex: regex } },
            { content: { $regex: regex } }
        ]
    });

    res.json(posts);
}
