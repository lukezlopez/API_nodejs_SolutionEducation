import { Router } from 'express';
import {
    createUser,
    listUsers,
    getUserById,
    updateUser,
    deleteUser
} from '../controller/user.controller';

import { authenticate, authorize } from '../middlewares/jwtAuth';

const router = Router();

router.post('/first-admin', createUser);

router.post('/', authenticate, authorize(['professor']), createUser);

router.get('/', authenticate, authorize(['professor']), listUsers);

router.get('/:id', authenticate, authorize(['professor']), getUserById);

router.put('/:id', authenticate, authorize(['professor']), updateUser);

router.delete('/:id', authenticate, authorize(['professor']), deleteUser);

export default router;
