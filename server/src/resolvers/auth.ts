import { Context } from "../context";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { GraphQLError } from "graphql";
import { ENV } from "../config/env";

const JWT_SECRET = ENV.JWT_SECRET;

export const authResolvers = {
    Mutation: {
        signup: async (_: any, args: { name: string; email: string; password: string}, ctx: Context & { res: any }) => {
            const { name, email, password } = args;

            const existingUser = await ctx.prisma.user.findUnique({ where: { email }});

            if(existingUser) {
                throw new GraphQLError('User already exists', {
                    extensions: {
                        code: 'BAD_USER_INPUT'
                    }
                });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const user = await ctx.prisma.user.create({
                data: {
                    name,
                    email,
                    password: hashedPassword
                }
            });

            const accessToken = jwt.sign({ userID: user.id }, JWT_SECRET, { expiresIn: "7d" });
            const refreshToken = jwt.sign({ userID: user.id }, JWT_SECRET, { expiresIn: "30d" });

            ctx.res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: false, // true in prod
                sameSite: "Lax",
                maxAge: 30 * 24 * 60 * 60 * 1000,
            });

            return {
                token: accessToken,
                user: {
                  id: user.id,
                  name: user.name,
                  email: user.email
                }
            };
        },

        login: async (_: any, args: { email:string, password: string }, ctx: Context & { res: any }) => {
            const { email, password } = args;

            const user = await ctx.prisma.user.findUnique({ where: { email,}});

            if(!user) {
                throw new GraphQLError('Invalid Credentials', {
                    extensions: {
                        code: 'UNAUTHENTICATED'
                    }
                })
            }

            const isValid = await bcrypt.compare(password, user.password);

            if(!isValid) {
                throw new GraphQLError('Invalid Credentials', {
                    extensions: {
                        code: 'UNAUTHENTICATED'
                    }
                });
            }

            const accessToken = jwt.sign({ userID: user.id }, JWT_SECRET, { expiresIn: "7d" });
            const refreshToken = jwt.sign({ userID: user.id }, JWT_SECRET, { expiresIn: "30d" });

            ctx.res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: false, // true in prod
                sameSite: "Lax",
                maxAge: 30 * 24 * 60 * 60 * 1000,
            });

            return {
                token: accessToken,
                user: {
                  id: user.id,
                  name: user.name,
                  email: user.email
                }
            };
        },

        logout: async (_: any, __: any, ctx: Context & { res: any }) => {
            ctx.res.clearCookie("refreshToken", {
                httpOnly: true,
                secure: false, // set to true in production
                sameSite: "Lax"
            });
          
            return true;
        }
          
    },

    Query: {
        me: async (_:any, __:any, ctx: Context) => {
            if (!ctx.userID) {
                throw new GraphQLError("Unauthenticated", {
                    extensions: { code: "UNAUTHENTICATED" }
                });
            }

            return await ctx.prisma.user.findUnique({
                where: { id: ctx.userID }
            });
        }
    }
}