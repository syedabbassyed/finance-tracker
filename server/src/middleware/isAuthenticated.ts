import { GraphQLError } from "graphql";
import { Context } from "../context";

export function isAuthenticated(ctx: Context) {
    if(!ctx.userID) {
        throw new GraphQLError('Not Authenticated', {
            extensions: {
                code: 'UNAUTHENTICATED'
            }
        })
    }
}