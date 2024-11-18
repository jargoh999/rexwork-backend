import mongoose, { Document , Schema  } from "mongoose";
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
export interface IUser  extends Document {
    name: string;
    email: string;
    password: string;
    role: string;
    active: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const userSchema = new mongoose.Schema({
    name: {type: String , required: true},
    email: {type: String, required: true},
    password: { type: String, required: false},
    role: {type : String, required: true},
    active: {type: Boolean, required: false},
    createdAt: Date,
    updatedAt: Date,
},{timestamps: true});

export const User = mongoose.models.User || mongoose.model<IUser>("User", userSchema);