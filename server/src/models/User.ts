import mongoose from "mongoose";
const Schema = mongoose.Schema

const UserSchema = new Schema({
    username: String, 
    //select false means that data retrieval must be explicit
    email: {type: String, select: false},
    password: {String, select: false},
})

const User = mongoose.model('User', UserSchema)
export default User