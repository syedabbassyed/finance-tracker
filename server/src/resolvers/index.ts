import { accountResolvers } from "./account";
import { authResolvers } from "./auth";
import { goalResolvers } from "./goal";
import { transactionResolvers } from "./transactions";

export const resolvers = {
    Query: {
      hello: () => 'Hello from backend!',
      ...authResolvers.Query,
      ...goalResolvers.Query,
      ...accountResolvers.Query,
      ...transactionResolvers.Query
    },
    Mutation: {
      ...authResolvers.Mutation,
      ...goalResolvers.Mutation,
      ...accountResolvers.Mutation,
      ...transactionResolvers.Mutation
    },
  };
  