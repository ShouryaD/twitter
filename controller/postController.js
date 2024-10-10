const Post = require('../models/PostSchema')
const jwt = require('jsonwebtoken')
const JWT_SECRET = 'secret_key'

let createPost = async (req,res)=>{
    let {tweet,image,video, userId} = req.body
    
    try{
        let data = await Post.create({tweet, image, video, userId})
        res.json({msg:'Post created', success:true, data})
    }
    catch(error){
        res.json({msg:'Error in creating post', success:false, error:error.message})
    }
}

let getAllPosts = async (req,res)=>{
    try {
        let data = await Post.find().populate({path:'userId'})
        res.json({msg:'Posts retrieved successfully', success:true, data})
    } catch (error) {
        res.json({msg:'Error in retrieving posts', success:false, error:error.message})
    }
}

let getUserPosts = async (req,res)=>{
    let id = req.params._id
    try{
        let data = await Post.find({userId:id})
        res.json({msg:'Posts retrieved successfully', success:true, data})
    }
    catch(error){
        res.json({msg:'Error in retrieving posts', success:false, error:error.message})
    }
}

let deletePost = async (req,res)=>{
    let id = req.params._id
}
module.exports = {
    createPost, getAllPosts,getUserPosts
}