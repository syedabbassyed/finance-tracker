import { authResolvers } from "./auth";
import { goalResolvers } from "./goal";

export const resolvers = {
    Query: {
      hello: () => 'Hello from backend!',
      ...authResolvers.Query,
      ...goalResolvers.Query,
    },
    Mutation: {
      ...authResolvers.Mutation,
      ...goalResolvers.Mutation,
    },
  };
  