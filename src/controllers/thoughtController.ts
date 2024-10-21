import { Request, Response } from 'express';
import Thought from '../models/Thought.js'; // Reaction?

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
        const newThought = await Thought.findByIdAndUpdate(thoughtId, req.body, { new: true });

        res.status(200).json(newThought);
    } catch (err) {
        res.status(500).json(err);
    }
};

export const deleteThought = async (req: Request, res: Response) => {
    try {
        const { thoughtId } = req.params;
        await Thought.findByIdAndDelete(thoughtId);

        res.status(200).json('Successfully deleted thought.');
    } catch (err) {
        res.status(500).json(err);
    }
};

export const getReactions = async (req: Request, res: Response) => {
    try {
        const { thoughtId } = req.params;
        const thought = await Thought.findById(thoughtId);

        res.status(200).json(thought?.reactions);
    } catch (err) {
        res.status(500).json(err);
    }
};

export const createReaction = async (req: Request, res: Response) => {
    try {
        const { thoughtId } = req.params;
        const thought = await Thought.findByIdAndUpdate(
            thoughtId,
            {
                $addToSet: { reactions: req.body }
            },
            { runValidators: true, new: true }, //need vlidators?
        );

        res.status(200).json(thought);
    } catch (err) {
        res.status(500).json(err);
    }
};

export const getReactionById = async (req: Request, res: Response) => {
    try {
        const { thoughtId, reactionId } = req.params;

        const thought = await Thought.findById(thoughtId);
        const reaction = await thought?.reactions.find() // not sure if I am doing this right
        //FINISH
    } catch (err) {
        res.status(500).json(err);
    }
};

export const updateReaction = async (req: Request, res: Response) => {
    try {

    } catch (err) {
        res.status(500).json(err);
    }
};

export const deleteReaction = async (req: Request, res: Response) => {
    try {

    } catch (err) {
        res.status(500).json(err);
    }
};