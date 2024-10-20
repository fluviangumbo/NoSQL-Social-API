import { Request, Response } from 'express';
import Thought from '../models/Thought.js';

export const getThoughts = async (_req: Request, res: Response) => {
    try {
        const thoughts = await Thought.find({});
        res.status(200).json(thoughts);
    } catch (err) {
        res.status(500).json(err);
    }
};

export const createThought = async (req: Request, res: Response) => {
    try {
        const newThought = await Thought.create(req.body);
        res.status(200).json(newThought);
    } catch (err) {
        res.status(500).json(err);
    }
};

export const getThoughtById = async (req: Request, res: Response) => {
    try {
        const { thoughtId } = req.params;
        const singleThought = await Thought.findById(thoughtId);
        res.status(200).json(singleThought);
    } catch (err) {
        res.status(500).json(err);
    }
};

export const updateThought = async (req: Request, res: Response) => {
    try {
        const { thoughtId } = req.params;
        const newThought = await Thought.findByIdandUpdate(thoughtId); // Finish, see the websearch for docs on function

        res.status(200).json(newThought);
    } catch (err) {
        res.status(500).json(err);
    }
};

export const deleteThought = async ()

export const getReactions = async ()

export const createReaction = async ()

export const getReactionById = async ()

export const updateReaction = async ()

export const deleteReaction = async ()