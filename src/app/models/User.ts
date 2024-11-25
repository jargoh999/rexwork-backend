import mongoose, { Document , Schema, Types  } from "mongoose";
import dotenv from 'dotenv';
import { IProject } from "./Project";
dotenv.config({ path: '.env.local' });
export interface IUser  extends Document {
    name: string;
    email: string;
    password: string;
    role: string;
    active: boolean;
    createdAt: Date;
    updatedAt: Date;
    projects: Types.ObjectId[]
}

const userSchema = new Schema<IUser>({
    name: {type: String , required: true},
    email: {type: String, required: true},
    password: { type: String, required: false},
    role: {type : String, required: false},
    active: {type: Boolean, required: false},
    projects: [{type: Schema.Types.ObjectId, ref: 'Project'}],
    createdAt: Date,
    updatedAt: Date,
});

// userSchema.virtual('projects', {
//     ref: 'Project',
//     localField: 'members',
//     foreignField: '_id',
//     justOne: false
// });

userSchema.set('toJSON', {
    virtuals: true
});
userSchema.set('toObject', {
    virtuals: true
});

export const User = mongoose.models.User || mongoose.model<IUser>("User", userSchema);