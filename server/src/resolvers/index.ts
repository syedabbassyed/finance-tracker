import { authResolvers } from "./auth";

export const resolvers = {
    Query: {
      hello: () => 'Hello from backend!',
      ...authResolvers.Query,
    },
    Mutation: {
      ...authResolvers.Mutation,
    },
  };
  