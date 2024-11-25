import mongoose, { Document , Schema, Types  } from "mongoose";
import dotenv from 'dotenv';
import { IUser } from './User';
dotenv.config({ path: '.env.local' });


export interface IProject extends Document {
    name : string,
    description : string,
    completion : number,
    members : Types.ObjectId[],
    isFavorite : boolean, 
    createdAt: Date;
    updatedAt: Date;
}


const projectSchema = new Schema<IProject>({
    name: {type: String , required: true},
    description: {type: String, required: true},
    completion: {type : Number, required: false},
    // Removed the real path definition for 'members' to resolve conflict
    members: [{type: Schema.Types.ObjectId, ref: 'User'}],
    isFavorite: {type: Boolean, required: false},
    createdAt: Date,
    updatedAt: Date,
});

// projectSchema.virtual('members', {
//     ref: 'User',
//     localField: 'projects',
//     foreignField: '_id',
//     justOne: false
// });

projectSchema.set('toJSON', {
    virtuals: true
  });
projectSchema.set('toObject', {
    virtuals: true
  });  

export const Project = mongoose.models.Project || mongoose.model<IProject>("Project", projectSchema);
