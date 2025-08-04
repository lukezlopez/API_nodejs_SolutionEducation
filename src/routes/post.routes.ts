import { Router } from 'express'
import {
    getPosts,
    createPost,
    getPostById,
    updatePost,
    deletePost,
} from '../controller.ts/post.controller'

import { postSchema } from '../schema/post.schema'
import { validate } from '../middlewares/validate'

const router = Router();

router.get('/posts', getPosts)
router.post('/posts', validate(postSchema), createPost)
router.get('/posts/:id', getPostById)
router.put('/posts/:id', validate(postSchema), updatePost)
router.delete('/posts/:id', deletePost)

export default router