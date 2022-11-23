import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";

export const getPosts = async (req, res) => {

    try {
        const posts = await PostMessage.find();
        res.status(200).json(posts);
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}


export const createPost = async (req, res) => {
    const post = req.body;
    const newPost = new PostMessage({...post, creator: req.userId, createdAt: new Date().toISOString()});

    try {
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
}

export const updatePost = async (req, res) => {
    const { id: _id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        res.status(404).send("No post with this id")
    } else {
        const updatedPost = await PostMessage.findByIdAndUpdate(_id, req.body, { new: true });
        res.send(updatedPost);
    }
}

export const deletePost = async(req, res) => {
    const {id} = req.params;
    try {
        if (!mongoose.Types.ObjectId.isValid) {
            res.status(404).send("This is not valid");
        } else {
            await PostMessage.findByIdAndRemove(id);
            res.send("This post is deleted successfully")
        }
    } catch (error) {
        res.send(error)
    }
}

export const likeCount = async(req, res) => {
    const {id} = req.params;
    try {
        if (!req.userId) return res.status(400).json({message: "please login at first"})
        const post = await PostMessage.findById(id);
        const index = post.likes.findIndex((id) => id === String(req.userId))
        
        if (index !== -1) {
            post.likes = post.likes.filter(id => id !== String(req.userId))
        } else {
            post.likes.push(req.userId)
        }
        const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {new: true});

        res.send(updatedPost)
    } catch (error) {
        res.send(error)
    }
}