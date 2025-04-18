export const typeDefs = `#graphql
  type User {
    id: String!
    name: String!
    email: String!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Query {
    hello: String!
    me: User
  }

  type Mutation {
    signup(name: String!, email: String!, password: String!): AuthPayload!
    login(email: String!, password: String!): AuthPayload!
  }
`;
