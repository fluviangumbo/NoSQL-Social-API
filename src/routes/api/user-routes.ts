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
    getFriendById,
    deleteFriend,
} from '../../controllers/userController.js';

// /api/users
router.route('/').get(getUsers).post(createUser);

// /api/users/:userId
router.route('/:userId').get(getUserById).put(updateUser).delete(deleteUser);

// /api/users/:userId/friends
router.route('/:userId/friends').get(getFriends).post(addFriend);

// /api/users/:userId/friends/:friendId
router.route('/api/users/:userId/friends/:friendId').get(getFriendById).delete(deleteFriend);

export { router as userRouter } ;