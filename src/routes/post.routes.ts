import { Router } from 'express';
import {
    getPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost,
    searchPosts
} from '../controller/post.controller';

import { authenticate, authorize } from '../middlewares/jwtAuth';

const router = Router();

router.get('/posts', authenticate, authorize(['professor', 'aluno']), getPosts);
router.get('/posts/search', searchPosts);
router.get('/posts/:id', authenticate, authorize(['professor', 'aluno']), getPostById);

router.post('/posts', authenticate, authorize(['professor']), createPost);
router.put('/posts/:id', authenticate, authorize(['professor']), updatePost);
router.delete('/posts/:id', authenticate, authorize(['professor']), deletePost);

export default router;
