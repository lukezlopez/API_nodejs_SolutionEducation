"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPosts = getPosts;
exports.createPost = createPost;
exports.getPostById = getPostById;
exports.updatePost = updatePost;
exports.deletePost = deletePost;
exports.searchPosts = searchPosts;
const post_model_1 = require("../entities/post.model");
async function getPosts(req, res) {
    try {
        const posts = await post_model_1.Post.find();
        res.json(posts);
    }
    catch (error) {
        res.status(500).json({ message: 'Erro ao buscar posts' });
    }
}
async function createPost(req, res) {
    const role = req.userRole;
    if (role !== 'professor') {
        return res.status(403).json({ message: 'Acesso negado: sem permissão para criar posts' });
    }
    try {
        const newPost = new post_model_1.Post(req.body);
        await newPost.save();
        res.status(201).json(newPost);
    }
    catch (error) {
        res.status(400).json({ message: 'Erro ao criar post' });
    }
}
async function getPostById(req, res) {
    try {
        const post = await post_model_1.Post.findById(req.params.id);
        if (!post)
            return res.status(404).json({ message: 'Post não encontrado' });
        res.json(post);
    }
    catch (error) {
        res.status(500).json({ message: 'Erro ao buscar post' });
    }
}
async function updatePost(req, res) {
    const role = req.userRole;
    if (role !== 'professor') {
        return res.status(403).json({ message: 'Acesso negado: sem permissão para editar posts' });
    }
    try {
        const post = await post_model_1.Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!post)
            return res.status(404).json({ message: 'Post não encontrado' });
        res.json(post);
    }
    catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar post' });
    }
}
async function deletePost(req, res) {
    const role = req.userRole;
    if (role !== 'professor') {
        return res.status(403).json({ message: 'Acesso negado: sem permissão para deletar posts' });
    }
    try {
        const post = await post_model_1.Post.findByIdAndDelete(req.params.id);
        if (!post)
            return res.status(404).json({ message: 'Post não encontrado' });
        res.status(204).send();
    }
    catch (error) {
        res.status(500).json({ message: 'Erro ao deletar post' });
    }
}
async function searchPosts(req, res) {
    const { query } = req.query;
    if (typeof query !== 'string' || query.trim() === '') {
        return res.status(400).json({ message: 'Parâmetro de busca inválido.' });
    }
    const regex = new RegExp(query, 'i');
    try {
        const posts = await post_model_1.Post.find({
            $or: [
                { title: { $regex: regex } },
                { content: { $regex: regex } }
            ]
        });
        res.json(posts);
    }
    catch (error) {
        res.status(500).json({ message: 'Erro ao buscar posts' });
    }
}
