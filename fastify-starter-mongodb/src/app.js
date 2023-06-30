import 'dotenv/config'
import Fastify from 'fastify'
import fastifyCors from '@fastify/cors'
import dbConnector from './our-db-connector.js'
import firstRoute from './our-first-route.js'


const app = Fastify({
    logger: false
})

app.register(fastifyCors);
app.register(dbConnector)
app.register(firstRoute)

try {
    await app.listen({port: process.env.PORT});
    console.log(`Fastify ready at http://localhost:${app.server.address().port}`);
} catch (err) {
    app.log.error(err);
    process.exit(1);
}
