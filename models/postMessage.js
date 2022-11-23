import { model, Schema } from "mongoose";

const postSchema = new Schema({
    title: String,
    creator: String,
    name: String,
    message: String,
    tags: [String],
    createdAt: {
        type: Date,
        default: new Date()
    },

    selectedFile: String,
    likes: {
        type: [String],
        default: []
    }
})

const PostMessage = model('PostMessage', postSchema);
export default PostMessage;