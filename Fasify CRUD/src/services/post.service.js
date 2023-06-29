const Post = require("../database/mongoose/models/Post");

module.exports = {

    findPosts: () => Post.find(),

    findPostById: (id) => Post.findById(id),

    createPost: (postObject) => Post.create(postObject),

    modifyPost: (post) => Post.findByIdAndUpdate(post.id, {'$set': post}, {new: true}),

    removePost: (id) => Post.findByIdAndDelete(id)
}