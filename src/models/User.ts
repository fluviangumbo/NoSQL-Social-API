import { Schema, Types, model, type Document } from 'mongoose';

interface IUser extends Document {
    username: string;
    email: string;
    thoughts: Schema.Types.ObjectId[];
    friends: Schema.Types.ObjectId[];
}

const userSchema = new Schema<IUser>({
    username: {
        type: String,
        unique: true,
        required: true,
        set: (value: string) => value.trim()
    },
    email: {
        type: String,
        unique: true,
        required: true,
        validate: {
            validator: function (value: string) {
                return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
            },
            message: 'Invalid email format.',
        },
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'thought',
        },
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'user',
        },
    ],
},
{
    toJSON: {
        virtuals: true,
    },
    id: false,
});

userSchema
    .virtual('friendCount')
    .get(function (this: any) {
        return this.friends.length;
    });

const User = model('user', userSchema);

export default User;