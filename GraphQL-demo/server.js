const Fastify = require('fastify');
const {createHandler} = require('graphql-http/lib/use/fastify');
const schema = require('./schema');


const app = Fastify();

app.all('/graphql', createHandler({schema}))

app.listen({port: 3000})
    .then(() => console.log('Running a GraphQL API server at http://localhost:3000/graphql'));

