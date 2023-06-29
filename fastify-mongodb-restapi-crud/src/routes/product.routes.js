const controllers = require("../controllers/product.controller");

const routes = [
    {
        method: "GET",
        url: "/products",
        handler: controllers.getProducts,
    },
    {
        method: "GET",
        url: "/products/:id",
        handler: controllers.getProductById,
    },
    {
        method: "POST",
        url: "/products",
        handler: controllers.saveProduct,
        schema: {
            body: {
                type: "object",
                required: ["title", "price", "image", "description", "quantity"],
                properties: {
                    title: {type: "string"},
                    price: {type: "number"},
                    image: {type: "string"},
                    description: {type: "string"},
                    quantity: {type: "number"},
                },
            }
        },
    },
    {
        method: "PUT",
        url: "/products/:id",
        handler: controllers.updateProduct,
    },
    {
        method: "DELETE",
        url: "/products/:id",
        handler: controllers.deleteProduct,
    },
];

module.exports = routes;
