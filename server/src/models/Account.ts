import mongoose from "mongoose";
const Schema = mongoose.Schema

const AccountSchema = new Schema({
    user: String, 
    email: String,
    password: String,
})

const Account = mongoose.model('Account', AccountSchema)
export default Account