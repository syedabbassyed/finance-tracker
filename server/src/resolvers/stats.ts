import { Context } from "../context";
import { isAuthenticated } from "../middleware/isAuthenticated";
import { startOfWeek, addDays, format, subWeeks } from "date-fns";

export const statsResolvers = {
    Query: {
        getWeeklyStats: async (_: any, __: any, ctx: Context) => {
            isAuthenticated(ctx);
            const userId = ctx.userID!;

            const generateDailyStats = async (startDate: Date): Promise<any[]> => {
                const dailyStats: any[] = [];

                for (let i = 0; i < 7; i++) {
                    const dayStart = addDays(startDate, i);
                    const dayEnd = addDays(dayStart, 1);

                    const transactions = await ctx.prisma.transaction.findMany({
                        where: {
                            userId,
                            date: {
                                gte: dayStart,
                                lt: dayEnd,
                            },
                        },
                    });

                    const income: number = transactions
                        .filter((t) => t.type === "INCOME")
                        .reduce((sum, t) => sum + t.amount, 0);

                    const expense: number = transactions
                        .filter((t) => t.type === "EXPENSE")
                        .reduce((sum, t) => sum + t.amount, 0);

                    dailyStats.push({
                        date: format(dayStart, "yyyy-MM-dd"),
                        income,
                        expense,
                    });
                }

                return dailyStats;
            };

            const today = new Date();
            const thisWeekStart = startOfWeek(today, { weekStartsOn: 1 }); // Monday
            const lastWeekStart = subWeeks(thisWeekStart, 1);

            const [thisWeek, lastWeek] = await Promise.all([
                generateDailyStats(thisWeekStart),
                generateDailyStats(lastWeekStart),
            ]);

            return {
                thisWeek,
                lastWeek,
            };
        },
    },
};
