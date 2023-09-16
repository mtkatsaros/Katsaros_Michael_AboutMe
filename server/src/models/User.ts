import mongoose from "mongoose";
const Schema = mongoose.Schema

const UserSchema = new Schema({
    username: String, 
    //select false means that data retrieval must be explicit
    email: {type: String, required: true, unique: true, select: false},
    password: {type: String, required: true, select: false},
    admin: String,
})

const User = mongoose.model('User', UserSchema)
export default User