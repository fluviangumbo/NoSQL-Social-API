import { Request, Response } from 'express';
import { Types, ObjectId } from 'mongoose';
import User from '../models/User.js';

export const getUsers = async (_req: Request, res: Response) => {
    try {
        const users = await User.find({});

        res.json(users);
    } catch (err) {
        res.status(500).json(err);
    }
};

export const createUser = async (req: Request, res: Response) => {
    try {
        const user = await User.create(req.body);

        res.json(user);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};

export const getUserById = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId);

        res.json(user);
    } catch (err) {
        res.status(500).json(err);
    }
};

export const updateUser = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const user = await User.findByIdAndUpdate(userId, req.body, { new: true });

        res.json(user);
    } catch (err) {
        res.status(500).json(err);
    }
};

export const deleteUser = async (req: Request, res: Response) => {
        try {
        const { userId } = req.params;
        const user = await User.findByIdAndDelete(userId);

            console.log(user);
        res.json('Successfully deleted user.');
    } catch (err) {
        res.status(500).json(err);
    }
};

export const getFriends = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId);

        res.json(user?.friends);
    } catch (err) {
        res.status(500).json(err);
    }
};

export const addFriend = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const friendId = new Types.ObjectId(req.params.friendId);
        const user = await User.findByIdAndUpdate(
            userId,
            { $addToSet: { friends: friendId } },
            { new: true },
        );

        res.json(user);
    } catch (err) {
        res.status(500).json(err);
    }
};

export const deleteFriend = async (req: Request, res: Response) => {
    try {
        const { userId, friendId } = req.params;
        const user = await User.findByIdAndUpdate(
            userId,
            { $pull: { friends: friendId } },
            { new:true },
        );

        console.log('Successfully removed friend.');
        res.json(user);
    } catch (err) {
        res.status(500).json(err);
    }
};