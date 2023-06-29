const fastify = require('fastify')({
    logger: false
});
require('./src/database/mongoose/index');
const postRoutes = require("./src/routes/post.router");


postRoutes.forEach((route) => {
    fastify.route(route);
});


const start = async () => {
    const port = process.env.PORT || 3000;
    try {
        await fastify.listen({port});
        console.log(`Fastify ready at http://localhost:${port}`);
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
}

start();