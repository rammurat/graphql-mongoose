const { ApolloServer, gql } = require('apollo-server-fastify');
const fastify = require('fastify')({ logger: true })
const {isConnected, ProductsCollection, CategoriesCollection} = require('../server/src/db')
const graphqlSchema = require('../server/src/graphql')

// Declare a route
fastify.get('/', async (request, reply) => {
  return { hello: 'world' }
})

// fastify.post('/products', async (request, reply) => {
//     const { name } = request.body;
//     const newCollection = new ProductsCollection({name})
//     await newCollection.save()

//     return newCollection.toObject()
// })

fastify.get('/products', async (request, reply) => {
    const products = ProductsCollection.find().lean()
    return products
})

fastify.get('/categories', async (request, reply) => {
    const categories = CategoriesCollection.find().lean()
    return categories
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

start()