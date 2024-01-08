import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
    user: String, 
    title: String,
    description: String,
    uid: String,
})

const Review = mongoose.model('Endorsement', ReviewSchema)
export default Review