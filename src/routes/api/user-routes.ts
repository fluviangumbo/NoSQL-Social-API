import { Router } from 'express';

const router = Router();

import {
    getUsers,
    createUser,
    getUserById,
    updateUser,
    deleteUser,
    getFriends,
    addFriend,
    deleteFriend,
} from '../../controllers/userController.js';

// /api/users
router.route('/').get(getUsers).post(createUser);

// /api/users/:userId
router.route('/:userId').get(getUserById).put(updateUser).delete(deleteUser);

// /api/users/:userId/friends
router.route('/:userId/friends/:friendId').get(getFriends).post(addFriend).delete(deleteFriend);

export { router as userRouter } ;