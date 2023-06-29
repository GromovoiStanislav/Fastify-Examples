const postService = require('../services/post.service');

module.exports = {

    getAllPost: async (req, reply) => {
        try {
            const posts = await postService.findPosts();
            reply.code(200).send(posts);
        } catch (err) {
            console.log(err);
            reply.status(505).send();
        }
    },

    getSinglePost: async (req, reply) => {
        try {
            const {id} = req.params;
            const post = await postService.findPostById(id);
            hasPostValidation(post, reply);
            reply.status(200).send(post);
        } catch (err) {
            console.log(err);
            reply.status(505).send();
        }
    },

    addNewPost: async (req, reply) => {
        try {
            const post = await postService.createPost(req.body);
            reply.status(201).send(post);
        } catch (err) {
            console.log(err);
            reply.status(505).send();
        }
    },

    updatePost: async (req, reply) => {
        try {
            const {id} = req.params;
            const {author} = req.body;
            const post = await postService.findPostById(id);
            hasPostValidation(post, reply);
            post.author = author;
            await postService.modifyPost(post);
            reply.status(200).send(post);
            // reply.status(204);
        } catch (err) {
            console.log(err);
            reply.status(505).send();
        }
    },

    patchPost: async (req, reply) => {
        try {
            const {id} = req.params;
            const {text} = req.body;
            const post = await postService.findPostById(id);
            hasPostValidation(post, reply);
            post.text = text;
            await postService.modifyPost(post);
            reply.status(200).send(post);
            // reply.status(204);
        } catch (err) {
            console.log(err);
            reply.status(505).send();
        }

    },

    deletePost: async (req, reply) => {
        try {
            const {id} = req.params;
            const post = await postService.findPostById(id);
            hasPostValidation(post, reply);
            await postService.removePost(id);
            reply.status(200).send(post);
            // reply.status(204);
        } catch (err) {
            console.log(err);
            reply.status(505).send();
        }
    }
}

function hasPostValidation(post, reply) {
    if (!post) {
        reply.status(404).send("Not found");
    }
}