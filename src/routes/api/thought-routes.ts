import { Router } from 'express';

const router = Router();

import {
    getThoughts,
    createThought,
    getThoughtById,
    updateThought,
    deleteThought,
    getReactions,
    createReaction,
    deleteReaction,
} from '../../controllers/thoughtController.js';

// /api/thoughts
router.route('/').get(getThoughts).post(createThought);

// /api/thoughts/:thoughtId
router.route('/:thoughtId').get(getThoughtById).put(updateThought).delete(deleteThought);

// /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions').get(getReactions).post(createReaction).delete(deleteReaction);

export { router as thoughtRouter } ;