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

  type Goal {
    id: String!
    title: String!
    targetAmount: Float!
    currentAmount: Float!
    targetDate: String!
    createdAt: String!
  }

  type Account {
    id: String!
    name: String!
    balance: Float!
    createdAt: String!
    type: AccountType!
  }

  type AccountType {
    id: String!
    name: String!
  }

  type Query {
    hello: String!
    me: User
    getGoals: [Goal!]!
    getAccounts: [Account!]!
    getAccountTypes: [AccountType!]!
  }

  type Mutation {
    signup(name: String!, email: String!, password: String!): AuthPayload!
    login(email: String!, password: String!): AuthPayload!
    createGoal(title: String!, targetAmount: Float!, targetDate: String!): Goal!
    updateGoalProgress(goalId: String!, amount: Float!): Goal!
    editGoal(goalId: String!, title: String, targetAmount: Float, targetDate: String): Goal!
    deleteGoal(goalId: String!): Goal!
    createAccount(name: String!, typeId: String!): Account!
    deleteAccount(accountId: String!): Account!
    editAccount(accountId: String!, name: String, typeId: String): Account!
  }
`;
