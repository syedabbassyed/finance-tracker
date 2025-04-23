import { GraphQLError } from "graphql";
import { Context } from "../context";
import { isAuthenticated } from "../middleware/isAuthenticated";

export const billResolvers = {
  Query: {
    getUpcomingBills: async (_: any, __: any, ctx: Context) => {
        isAuthenticated(ctx);

        const bills = await ctx.prisma.bill.findMany({
            where: {
                userId: ctx.userID!,
                dueDate: {
                    gte: new Date(), // only future bills
                },
            },
            orderBy: {
                dueDate: "asc",
            },
        });

        return bills;
    },
  },

  Mutation: {
    createBill: async (_: any, args: {
        name: string;
        amount: number;
        dueDate: string;
        recurring: string;
    }, ctx: Context) => {
        isAuthenticated(ctx);

        const { name, amount, dueDate, recurring } = args;

        if (amount <= 0) {
            throw new GraphQLError("Amount must be greater than 0");
        }

        const bill = await ctx.prisma.bill.create({
            data: {
                name,
                amount,
                dueDate: new Date(dueDate),
                recurring,
                userId: ctx.userID!,
            },
        });

        return bill;
    },

    deleteBill: async (_: any, args: { billId: string }, ctx: Context) => {
        isAuthenticated(ctx);

        const existing = await ctx.prisma.bill.findUnique({
            where: { id: args.billId }
        });
          
        if (!existing) {
            throw new GraphQLError("Bill not found", {
                extensions: { code: "NOT_FOUND" },
            });
        }

        const bill = await ctx.prisma.bill.delete({
            where: {
                id: args.billId,
            },
        });

        return bill;
    },

    editBill: async (_: any, args: {
        billId: string;
        name?: string;
        amount?: number;
        dueDate?: string;
        recurring?: string;
    }, ctx: Context) => {
        isAuthenticated(ctx);

        const existing = await ctx.prisma.bill.findUnique({
            where: { id: args.billId }
        });
          
        if (!existing) {
            throw new GraphQLError("Bill not found", {
                extensions: { code: "NOT_FOUND" },
            });
        }

        const updatedBill = await ctx.prisma.bill.update({
            where: { id: args.billId },
            data: {
              ...(args.name && { name: args.name }),
              ...(args.amount && { amount: args.amount }),
              ...(args.dueDate && { dueDate: new Date(args.dueDate) }),
              ...(args.recurring && { recurring: args.recurring })
            }
        });

        return updatedBill;
    },
  },
};
