const { composeWithMongoose } = require('graphql-compose-mongoose');
const { schemaComposer } = require('graphql-compose');
const { CategoriesCollection, ProductsCollection } = require('../db');

// CONVERT MONGOOSE MODEL TO GraphQL PIECES
const options = {};
const ProductsCollectionTC = composeWithMongoose(ProductsCollection,options);
const CategoriesTC = composeWithMongoose(CategoriesCollection, options);

// Add needed CRUD Notes Collection operations to the GraphQL Schema
// via graphql-compose it will be much much easier, with less typing

// Products collection resolver 
schemaComposer.Query.addFields({
  productsById: ProductsCollectionTC.getResolver('findById'),
  productsByIds: ProductsCollectionTC.getResolver('findByIds'),
  product: ProductsCollectionTC.getResolver('findOne'),
  products: ProductsCollectionTC.getResolver('findMany'),
  productsCount: ProductsCollectionTC.getResolver('count'),
  productsConnection: ProductsCollectionTC.getResolver('connection'),
  productsPagination: ProductsCollectionTC.getResolver('pagination')
});
schemaComposer.Mutation.addFields({
  productCreateOne: ProductsCollectionTC.getResolver('createOne'),
  productUpdateById: ProductsCollectionTC.getResolver('updateById'),
  productRemoveById: ProductsCollectionTC.getResolver('removeById')
});

// Categories collection resolver
schemaComposer.Query.addFields({
  categoriesById: CategoriesTC.getResolver('findById'),
  categoriesByIds: CategoriesTC.getResolver('findByIds'),
  category: CategoriesTC.getResolver('findOne'),
  categories: CategoriesTC.getResolver('findMany'),
  categoriesCount: CategoriesTC.getResolver('count'),
  categoriesConnection: CategoriesTC.getResolver('connection')
});
schemaComposer.Mutation.addFields({
  categoriesCreateOne: CategoriesTC.getResolver('createOne'),
  categoriesUpdateById: CategoriesTC.getResolver('updateById'),
  categoriesRemoveById: CategoriesTC.getResolver('removeById')
});

const graphqlSchema = schemaComposer.buildSchema();
module.exports = graphqlSchema;
