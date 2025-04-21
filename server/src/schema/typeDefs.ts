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

  type Query {
    hello: String!
    me: User
    getGoals: [Goal!]!
  }

  type Mutation {
    signup(name: String!, email: String!, password: String!): AuthPayload!
    login(email: String!, password: String!): AuthPayload!
    createGoal(title: String!, targetAmount: Float!, targetDate: String!): Goal!
    updateGoalProgress(goalId: String!, amount: Float!): Goal!
    editGoal(goalId: String!, title: String, targetAmount: Float, targetDate: String): Goal!
    deleteGoal(goalId: String!): Goal!
  }
`;
