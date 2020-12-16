const { schemaComposer } = require('graphql-compose');

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

    return TC
}

exports.addToSchema = addToSchema