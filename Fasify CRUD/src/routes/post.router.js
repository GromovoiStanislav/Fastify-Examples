const controllers = require("../controllers/post.controller");
const routes = [
    {
        method: "GET",
        url: "/",
        handler: controllers.getAllPost,
    },
    {
        method: "GET",
        url: "/:id",
        handler: controllers.getSinglePost,
        schema: {
            params: {
                type: 'object',
                additionalProperties: false,
                required: ['id'],
                properties: {id: {type: 'string', pattern: "^[0-9a-fA-F]{24}$"}}
            }
        },
    },
    {
        method: "POST",
        url: "/",
        handler: controllers.addNewPost,
        schema: {
            body: {
                type: 'object',
                additionalProperties: false,
                required: ['text', 'author'],
                properties: {
                    text: {type: 'string'},
                    author: {type: 'string'}
                }
            }
        },
    },
    {
        method: "PUT",
        url: "/:id",
        handler: controllers.updatePost,
        schema: {
            body: {
                type: 'object',
                additionalProperties: false,
                required: ['author'],
                properties: {
                    author: {type: 'string'}
                }
            },
            params: {
                type: 'object',
                additionalProperties: false,
                required: ['id'],
                properties: {id: {type: 'string', pattern: "^[0-9a-fA-F]{24}$"}}
            }
        },
    },
    {
        method: "PATCH",
        url: "/:id",
        handler: controllers.patchPost,
        schema: {
            body: {
                type: 'object',
                additionalProperties: false,
                required: ['text'],
                properties: {
                    text: {type: 'string'}
                }
            },
            params: {
                type: 'object',
                additionalProperties: false,
                required: ['id'],
                properties: {id: {type: 'string', pattern: "^[0-9a-fA-F]{24}$"}}
            }
        },
    },
    {
        method: "DELETE",
        url: "/:id",
        handler: controllers.deletePost,
        schema: {
            params: {
                type: 'object',
                additionalProperties: false,
                required: ['id'],
                properties: {id: {type: 'string', pattern: "^[0-9a-fA-F]{24}$"}}
            }
        },
    },
];


module.exports = routes;