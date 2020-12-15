const { composeWithMongoose } = require('graphql-compose-mongoose');
const { schemaComposer } = require('graphql-compose');
const { CategoriesCollection, ProductsCollection } = require('../db');
const mongoose = require('mongoose');

const addToSchema = (collection, TC) => {
  let query = {} 
  query[`${collection}ById`] = TC.getResolver('findById')
  query[`${collection}ByIds`] = TC.getResolver('findByIds')
  query[`${collection}One`] = TC.getResolver('findOne')
  query[`${collection}Many`] = TC.getResolver('findMany')
  query[`${collection}Count`] = TC.getResolver('count')
  schemaComposer.Query.addFields(query)

  let mutation = {}
  mutation[`${collection}CreateOne`] = TC.getResolver('createOne')
  mutation[`${collection}UpdateById`] = TC.getResolver('updateById')
  mutation[`${collection}RemoveById`] = TC.getResolver('removeById')
  schemaComposer.Mutation.addFields(mutation)
}


// CONVERT MONGOOSE MODEL TO GraphQL PIECES
addToSchema('products', composeWithMongoose(ProductsCollection, {}))
addToSchema('categories', composeWithMongoose(CategoriesCollection, {}))

// Example:- Loop though if you want
// for(const name of mongoose.modelNames()) {
//   addToSchema(name, composeWithMongoose(mongoose.model(name), {}))
// }

// define relation between categories and products
// CategoriesTC.addRelation('products', {
//   resolver: () => ProductsCollectionTC.getResolver('findById'),
//   prepareArgs: {
//     _id: source => source.group
//   },
//   projection: { group: 1 }
// });

// // define relation between products and 
// ProductsCollectionTC.addRelation('categories', {
//   resolver: () => CategoriesTC.getResolver('findMany'),
//   prepareArgs: {
//     group: source => source._id
//   },
//   projection: { _id: 1 }
// });

const graphqlSchema = schemaComposer.buildSchema();
module.exports = graphqlSchema;
