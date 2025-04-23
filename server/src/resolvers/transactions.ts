import { GraphQLError } from "graphql";
import { Context } from "../context";
import { isAuthenticated } from "../middleware/isAuthenticated";

export const transactionResolvers = {
    Query: {
        getTransactions: async (_:any, __:any, ctx: Context) => {
            isAuthenticated(ctx);

            const transactions = await ctx.prisma.transaction.findMany({
                where: {
                    userId: ctx.userID!
                },
                include: {
                    account: true,
                    category: true
                },
                orderBy: {
                    date: "desc"
                }
            });

            return transactions;
        },

        getCategories: async (_:any, __:any, ctx: Context) => {
            isAuthenticated(ctx);

            const categories = await ctx.prisma.category.findMany();

            return categories;
        } 
    },

    Mutation: {
        createTransaction: async (_: any, args: {
            amount: number,
            type: "INCOME" | "EXPENSE",
            date: string,
            accountId: string,
            categoryId: string
        }, ctx: Context) => {
            isAuthenticated(ctx);

            const { amount, type, date, accountId, categoryId } = args;

            const transaction = await ctx.prisma.transaction.create({
                data: {
                    amount,
                    type,
                    date: new Date(date),
                    userId: ctx.userID!,
                    accountId,
                    categoryId
                }
            });

            const balanceChange = type === "INCOME" ? amount : -amount;

            await ctx.prisma.account.update({
                where: {
                    id: accountId
                },
                data: {
                    balance: {
                        increment: balanceChange
                    }
                }
            });

            return transaction;
        },

        deleteTransaction: async (_: any, args: { transactionId: string }, ctx: Context) => {
            isAuthenticated(ctx);

            const { transactionId } = args;

            const existing = await ctx.prisma.transaction.findFirst({
                where: {
                    id: transactionId,
                    userId: ctx.userID!
                }
            });

            if (!existing) {
                throw new GraphQLError('Transaction not Found');
            }

            const balanceChange =
                existing.type === "INCOME" ? -existing.amount : existing.amount;

            await ctx.prisma.account.update({
                where: { id: existing.accountId },
                data: {
                    balance: { increment: balanceChange },
                },
            });

            return await ctx.prisma.transaction.delete({
                where: {
                    id: transactionId
                }
            });
             
        },

        editTransaction: async (_: any, args: {
            transactionId: string,
            amount?: number,
            type?: "INCOME" | "EXPENSE",
            date?: string,
            accountId?: string,
            categoryId?: string
        }, ctx: Context) => {
            isAuthenticated(ctx);

            const existing = await ctx.prisma.transaction.findUnique({
                where: { id: args.transactionId },
            });
    
            if (!existing) {
                throw new GraphQLError("Transaction not found");
            }
    
            const oldImpact =
                existing.type === "INCOME" ? -existing.amount : existing.amount;
    
            await ctx.prisma.account.update({
                where: { id: existing.accountId },
                data: { balance: { increment: oldImpact } },
            });
    
            const updatedData = {
                amount: args.amount ?? existing.amount,
                type: args.type ?? existing.type,
                date: args.date ? new Date(args.date) : existing.date,
                accountId: args.accountId ?? existing.accountId,
                categoryId: args.categoryId ?? existing.categoryId,
            };
    
            const updated = await ctx.prisma.transaction.update({
                where: { id: args.transactionId },
                data: updatedData,
            });
    
            const newImpact =
                updated.type === "INCOME" ? updated.amount : -updated.amount;
    
            await ctx.prisma.account.update({
                where: { id: updated.accountId },
                data: { balance: { increment: newImpact } },
            });
    
            return updated;
        }
    }
}