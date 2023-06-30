import fastifyPlugin from 'fastify-plugin'
import fastifyMongo from '@fastify/mongodb'

/**
 * @param {FastifyInstance} fastify
 * @param {Object} options
 */
async function dbConnector(fastify, options) {
    fastify.register(fastifyMongo, {
        url: process.env.MONGO_URL
    })
}

export default fastifyPlugin(dbConnector)