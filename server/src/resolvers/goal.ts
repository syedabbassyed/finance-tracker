import { GraphQLError } from "graphql";
import { Context } from "../context";
import { isAuthenticated } from "../middleware/isAuthenticated";

export const goalResolvers = {
    Mutation: {
        createGoal: async (_: any, args: {
            title: string;
            targetAmount: number;
            targetDate: string;
        }, ctx: Context) => {

            isAuthenticated(ctx);

            const { title, targetAmount, targetDate } = args;

            if(targetAmount <= 0) {
                throw new GraphQLError('Target Amount must be greater than 0');
            }

            const goal = await ctx.prisma.goal.create({
                data: {
                    title,
                    targetAmount,
                    targetDate: new Date(targetDate),
                    userId: ctx.userID!
                },
                select: {
                    id: true,
                    title: true,
                    targetAmount: true,
                    currentAmount: true,
                    targetDate: true,
                    createdAt: true,
                    userId: true
                }
            });
              

            return goal;
        }
    },

    Query: {
        getGoals: async (_:any, __:any, ctx: Context) => {
            try {
                isAuthenticated(ctx);
            
                const goals = await ctx.prisma.goal.findMany({
                    where: { userId: ctx.userID! },
                    select: {
                      id: true,
                      title: true,
                      targetAmount: true,
                      currentAmount: true, 
                      targetDate: true,
                      createdAt: true,
                      userId: true
                    }
                });
            
                return goals;
            } catch (err) {
                console.error('Error in getGoals:', err);
                return [];
            }
        }
    },
}