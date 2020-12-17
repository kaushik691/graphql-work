var { graphql, buildSchema } = require('graphql');

var schema = buildSchema(`
  type Query {
    hello: String
    name: String
    id: Int
  }
`);

var allPersons_mutation = buildSchema(`
  type mutation {
    createPerson(name: String!, age: String!): Person!
    updatePerson(id:ID!, name: String!, age: String!): Person!
    deletePerson(id: ID!): Person!
    createPost(title: String!): Post!
    updatePost(id: ID!, title: String!): Post!
    deletePost(id: ID!): Post!
  }
`)

var allPersons_schema = buildSchema(`
  type Query {
    allPersons(last: Int):[Person!]!
    allPosts(last: Int): [Post!]!
  }
`)

var allPersons_subscription = buildSchema(`
  type Subscription {
    newPerson: Person!
    updatedPerson: Person!
    deletedPerson: Person!
    newPost: Post!
    updatedPost: Post!
    deletedPost: Post!
  }
`)

var person_schema = buildSchema(`
    type Person {
      id: ID!
      name: String!
      age: Int!
      posts: [Post!]!
    }
`)

var post_schema = buildSchema(`
  type Post {
    title: String!
    author: Person!
  }
`)

var posts = [{
  title: () => 'New Post1',
  author: () => 'User1'
},
{
  title: () => 'New Post2',
  author: () => 'User2'
},
{
  title: () => 'New Post3',
  author: () => 'User3'
}]

var root = {
  hello: () => 'Hello world!',
  name: () => 'Kaushik',
  id: () => 1,
};

graphql(schema, '{ id }', root).then((response) => {
  console.log(response);
});
