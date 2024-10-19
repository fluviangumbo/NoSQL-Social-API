import { Schema, Types, model, ObjectId } from 'mongoose';

interface IThought extends Document {
    thoughtText: string;
    
}