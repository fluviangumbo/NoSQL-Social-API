import { Request, Response } from 'express';
import Thought from '../models/Thought.js';
import User from '../models/User.js';
import ObjectId from 'mongoose';

export const getThoughts = async (_req: Request, res: Response) => {
    try {
        const thoughts = await Thought.find({}).populate('reactions');
        res.status(200).json(thoughts);
    } catch (err) {
        res.status(500).json(err);
    }
};

export const createThought = async (req: Request, res: Response) => {
    try {
        const newThought = await Thought.create(req.body);
        const thoughtOwner = await User.findOneAndUpdate(
            { username: req.body.username }, 
            { $addToSet: { thoughts: newThought._id } },
            { new: true },
        );

        console.log(thoughtOwner);
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

        res.status(200).json(thought?.reactions); // Should I use populate on get thoughts so that we get the reactions with thoughts?
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
            { runValidators: true, new: true },
        );

        res.status(200).json(thought);
    } catch (err) {
        res.status(500).json(err);
    }
};

export const deleteReaction = async (req: Request, res: Response) => {
    try {
        const { thoughtId } = req.params;
        const { reactionId } = req.body;

        const thought = await Thought.findByIdAndUpdate(
            thoughtId,
            {
                $pull: { reactions: {reactionId} }
            },
            { new: true },
        );

        console.log('Reaction deleted.');
        res.status(200).json(thought);
    } catch (err) {
        res.status(500).json(err);
    }
};