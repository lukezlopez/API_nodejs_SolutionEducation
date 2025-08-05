import { Router } from 'express';
import {
    getPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost
} from '../controller.ts/post.controller';
import { authenticate } from '../middlewares/auth';
import { authorize } from '../middlewares/auth';

const router = Router();

router.get('/posts', authenticate, authorize(['professor', 'aluno']), getPosts);
router.get('/posts/:id', authenticate, authorize(['professor', 'aluno']), getPostById);

router.post('/posts', authenticate, authorize(['professor']), createPost);
router.put('/posts/:id', authenticate, authorize(['professor']), updatePost);
router.delete('/posts/:id', authenticate, authorize(['professor']), deletePost);

export default router;
