import mongoose, { model, models, Schema } from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser {
    email: string,
    password: string,
    _id?: mongoose.Types.ObjectId,
    createdAt?: Date,
    updatedAt?: Date,
    deletedAt?: Date
}

const userSchema = new Schema<IUser>({
    email: { type: String, required: true, unique: true }, 
    password: { type: String, required: true }
}, { timestamps: true });


//call just before data save
userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
})

//first models?.User define that nextjs have various edges branches so if already exist then use directly it
const User = models?.User || model<IUser>("User", userSchema);
export default User;