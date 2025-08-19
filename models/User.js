import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String
})

userSchema.virtual("products", {
    ref: "Product",
    localField: "_id",
    foreignField: "owner"
})

userSchema.set("toObject", { virtuals: true });
userSchema.set("toJSON", { virtuals: true });

const User = mongoose.model("User", userSchema)
export default User
