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
    getReactionById,
    updateReaction,
    deleteReaction,
} from '../../controllers/thoughtController.js';

// /api/thoughts
router.route('/').get(getThoughts).post(createThought);

// /api/thoughts/:thoughtId
router.route('/:thoughtId').get(getThoughtById).put(updateThought).delete(deleteThought);

// /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions').get(getReactions).post(createReaction);

// /api/thoughts/:thoughtId/reactions/:reactionId
router.route('/:thoughtd/reactions/:reactionId').get(getReactionById).put(updateReaction).delete(deleteReaction); // readme has no /:reactionId

export { router as thoughtRouter } ;