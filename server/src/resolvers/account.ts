import { GraphQLError } from "graphql";
import { Context } from "../context";
import { isAuthenticated } from "../middleware/isAuthenticated";

export const accountResolvers = {
    Query: {
        getAccounts: async (_: any, __: any, ctx: Context) => {
            isAuthenticated(ctx);

            const accounts = await ctx.prisma.account.findMany({
                where: {
                    userId: ctx.userID!
                },
                include: {
                    type: true
                },
                orderBy: {
                    createdAt: "desc"
                }
            });

            return accounts;
        },

        getAccountTypes: async (_: any, __: any, ctx: Context) => {
            isAuthenticated(ctx);

            const accountTypes = await ctx.prisma.accountType.findMany();

            return accountTypes;
        }
    },

    Mutation: {
        createAccount: async (_: any, args: {
            name: string;
            typeId: string;
        }, ctx: Context) => {
            isAuthenticated(ctx);

            const { name, typeId } = args;

            const account = await ctx.prisma.account.create({
                data: {
                    name,
                    typeId,
                    userId: ctx.userID!
                },
                include: {
                    type: true
                }
            });

            return account;
        },

        editAccount: async (_: any, args: {
            accountId: string,
            name?: string,
            typeId?: string
        }, ctx: Context) => {
            isAuthenticated(ctx);

            const { accountId, name, typeId } = args;

            const account = await ctx.prisma.account.findFirst({
                where: {
                    id: accountId,
                    userId: ctx.userID!
                }
            });

            if(!account) {
                throw new GraphQLError('Account not found');
            }

            const updatedAccount = await ctx.prisma.account.update({
                where: {
                    id: accountId,
                },
                data: {
                    ...(name && { name }),
                    ...(typeId && { typeId })
                },
                include: {
                    type: true,
                }
            });

            return updatedAccount;
        },

        deleteAccount: async (_: any, args: { accountId: string }, ctx: Context) => {
            isAuthenticated(ctx);

            const { accountId } = args;

            const account = await ctx.prisma.account.findFirst({
                where: {
                    id: accountId,
                    userId: ctx.userID!
                }
            });

            if(!account) {
                throw new GraphQLError('Account not found');
            }

            await ctx.prisma.account.delete({
                where: {
                    id: accountId,
                }
            });

            return account;
        }
    }
}