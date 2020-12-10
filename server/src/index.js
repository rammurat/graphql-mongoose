const { ApolloServer, gql } = require('apollo-server-fastify');
const fastify = require('fastify')({ logger: true })
const {isConnected, NotesCollection} = require('./db')
const graphqlSchema = require('./graphql')

// Declare a route
fastify.get('/', async (request, reply) => {
  return { hello: 'world' }
})

// fastify.post('/collections', async (request, reply) => {
//     const { name } = request.body;
//     const newCollection = new NotesCollection({name})
//     await newCollection.save()

//     return newCollection.toObject()
// })

fastify.get('/collections', async (request, reply) => {
    const collections = NotesCollection.find().lean()
    return collections
})
  

// Run the server!
const start = async () => {
  try {

    const _server = new ApolloServer({
        schema: graphqlSchema
    });


    await isConnected
    await fastify.register(_server.createHandler()).listen(3000);

    fastify.log.info(`server listening on ${fastify.server.address().port}`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

module.exports = start