import { Context } from "../context";
import { isAuthenticated } from "../middleware/isAuthenticated";

export const overviewResolvers = {
    Query: {
        getOverview: async (_: any, __: any, ctx: Context) => {
            isAuthenticated(ctx);
            const userId = ctx.userID!;

            const [accounts, transactions, bills, goal] = await Promise.all([
                ctx.prisma.account.findMany({
                    where: { userId },
                }),

                ctx.prisma.transaction.findMany({
                    where: { userId },
                    orderBy: { date: "desc" },
                    take: 5,
                    include: {
                        account: true,
                        category: true
                    }
                }),

                ctx.prisma.bill.findMany({
                    where: {
                        userId,
                        dueDate: {
                        gte: new Date()
                        }
                    },
                    orderBy: {
                        dueDate: "asc"
                    },
                    take: 5
                }),

                ctx.prisma.goal.findFirst({
                    where: {
                        userId,
                        targetDate: {
                            gte: new Date()
                        } 
                    },
                    orderBy: { 
                        createdAt: "desc" 
                    }
                })
            ]);

            const totalBalance = accounts.reduce((acc, curr) => acc + curr.balance, 0);

            return {
                totalBalance,
                recentTransactions: transactions,
                upcomingBills: bills,
                currentGoal: goal
            };
        }
    }
};
