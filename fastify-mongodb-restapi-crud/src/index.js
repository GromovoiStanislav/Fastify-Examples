const fastify = require("fastify")();
require("./db/mongoose");

const productRoutes = require("./routes/product.routes");


productRoutes.forEach((route) => {
    fastify.route(route);
});

const start = async () => {
    try {
        const port = process.env.PORT || 3000
        await fastify.listen({port});
        console.log(`Fastify ready at http://localhost:${fastify.server.address().port}`);
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};

start();
