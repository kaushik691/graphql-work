import { graphql, buildSchema, GraphQLSchema, GraphQLObjectType, GraphQLInt } from 'graphql';

let schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: () => ({
      counter: {
        type: GraphQLInt,
        resolve: () => 42
      }
    })
  })
})

var root = {
  hello: () => 'Hello world!',
  name: () => 'Kaushik',
  id: () => 1,
};

// graphql(schema, '{ id }', root).then((response) => {
//   console.log(response);
// })

export default schema;