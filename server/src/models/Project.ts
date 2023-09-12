/**
 * Object Name: Project
 * @author Michael Katsaros
 * The Project object is used to display different projects
 * I created. It collects the title, date, and description as Strings.
 * This part of the page will be viewable by everybody, but only
 * I will be able to edit.
 */
import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
    title: String,
    month: String,
    year: String,
    description: String,
    github: String,
})

const Project = mongoose.model('Project', ProjectSchema)
export default Project