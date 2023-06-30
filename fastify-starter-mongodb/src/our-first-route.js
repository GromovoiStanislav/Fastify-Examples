/**
 * A plugin that provide encapsulated routes
 * @param {FastifyInstance} fastify encapsulated fastify instance
 * @param {Object} options plugin options, refer to https://www.fastify.io/docs/latest/Reference/Plugins/#plugin-options
 */
const routes = async (fastify, options) => {

    const collection = fastify.mongo.db.collection('animals')

    // Serializing
    const opts = {
        schema: {
            response: {
                200: {
                    type: 'object',
                    properties: {
                        hello: {type: 'string'}
                    }
                }
            }
        }
    }

    fastify.get('/', opts, async (request, reply) => {
        return {hello: 'world'}
    })


    //validation
    fastify.post('/', {
            schema: {
                body: {
                    type: 'object',
                    required: ['someKey', 'someOtherKey'],
                    properties: {
                        someKey: {type: 'string'},
                        someOtherKey: {type: 'number'}
                    }
                }
            }
        },
        async (request, reply) => {
            return {hello: 'world'}
        })


    fastify.get('/animals', async (request, reply) => {
        const result = await collection.find().toArray()
        if (result.length === 0) {
            throw new Error('No documents found')
        }
        return result
    })


    fastify.get('/animals/:animal', async (request, reply) => {
        const result = await collection.findOne({animal: request.params.animal})
        if (!result) {
            throw new Error('Invalid value')
        }
        return result
    })

    // validation
    const animalBodyJsonSchema = {
        type: 'object',
        required: ['animal'],
        properties: {
            animal: {type: 'string'},
        },
    }
    const schema = {
        body: animalBodyJsonSchema,
    }

    fastify.post('/animals', {schema}, async (request, reply) => {
        return collection.insertOne({animal: request.body.animal})
    })
}

export default routes