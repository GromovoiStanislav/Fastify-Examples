require('dotenv').config();
const app = require('fastify')();


app.register(require('@fastify/cors'), {
    // put your options here
});

app.register(require('./routes'));

const start = async () => {
    try {
        const port = process.env.PORT || 8080
        await app.listen({port});
        console.log(`Fastify ready at http://localhost:${app.server.address().port}`);

    } catch (err) {
        app.log.error(err);
        process.exit(1);
    }
};

start();



// const port = process.env.PORT || 8080
// app.listen({port}, (err) => {
//     if (err) {
//         app.log.error(err);
//         process.exit(1);
//     }
//     console.log(`Fastify ready at http://localhost:${app.server.address().port}`);
// });