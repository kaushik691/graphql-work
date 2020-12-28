import { GraphQLInt, GraphQLObjectType, GraphQLSchema } from 'graphql'

let schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name:'Query',
        fields: () => ({
            counter: {
                type: GraphQLInt,
                resolve: () => 42
            }
        })
    })
});

export default schema;