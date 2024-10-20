import { Schema, Types, model, ObjectId } from 'mongoose';

interface IReaction extends Document {
    reactionId: Schema.Types.ObjectId;
    reactionBody: string;
    username: string;
    createdAt: Date;
}

interface IThought extends Document {
    thoughtText: string;
    createdAt: Date;
    username: string;
    reactions: Schema.Types.ObjectId[];
}

const reactionSchema = new Schema<IReaction>(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            maxLength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (value: Date) => value.toLocaleString('en-us'),
        },
    },
    {
        toJSON: {
            getters: true,
        },
    },
);

const thoughtSchema = new Schema<IThought>(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (value: Date) => value.toLocaleString('en-us'),
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema],
    },
    {
        getters: true,
        virtuals: true,
    },
);

thoughtSchema
    .virtual('reactionCount')
    .get(function (this: any) {
        return this.reactions.length;
    });

const Thought = model('thought', thoughtSchema);

export default Thought;