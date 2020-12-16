const { composeWithMongoose } = require('graphql-compose-mongoose');
const { CategoriesCollection, ProductsCollection } = require('../db');
const mongoose = require('mongoose');
const {addToSchema} = require('../utils/mongoose')
const { schemaComposer } = require('graphql-compose');

// CONVERT MONGOOSE MODEL TO GraphQL PIECES

// define relation between categories and products
const ProductsCollectionTC = addToSchema('products', composeWithMongoose(ProductsCollection, {}))
const CategoriesTC = addToSchema('categories', composeWithMongoose(CategoriesCollection, {}))


CategoriesTC.addRelation('products', {
  resolver: () => ProductsCollectionTC.getResolver('findByIds'),
  prepareArgs: {
    _ids: source => source.products
  },
  projection: { products: 1 }
});

// define relation between products and 
ProductsCollectionTC.addRelation('categories', {
  resolver: () => CategoriesTC.getResolver('findMany'),
  prepareArgs: {
    group: source => source._id
  },
  projection: { _id: 1 }
});

const graphqlSchema = schemaComposer.buildSchema();
module.exports = graphqlSchema;
