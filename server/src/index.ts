import { ApolloServer } from '@apollo/server';
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { typeDefs } from './schema/typeDefs';
import { resolvers } from './resolvers/index';
import cors from 'cors';
import { expressMiddleware } from '@apollo/server/express4';
import { createContext } from './context';
import jwt from 'jsonwebtoken';


const app = express();
const PORT = process.env.PORT || 4000;

app.use(cookieParser());

app.post('/refresh-token', (req, res) => {
    console.log('Received cookies:', req.cookies);
    const token = req.cookies?.refreshToken;
  
    if (!token) {
        return res.status(401).json({ ok: false, message: 'No refresh token found' });
    }
  
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userID: string };
        const newAccessToken = jwt.sign({ userID: decoded.userID }, process.env.JWT_SECRET!, { expiresIn: '7d' });
    
        return res.json({ ok: true, accessToken: newAccessToken });
    } catch (err: any) {
      console.error('Refresh token error:', err.message);
      return res.status(403).json({ ok: false, message: 'Invalid or expired refresh token' });
    }
});

const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    formatError: (err) => {
        const isProd = process.env.NODE_ENV === "production";
    
        if (!isProd) {
            console.error("GraphQL Error:", err);
            return err;
        }
    
        // Production-safe error structure
        if (err.extensions?.code === "BAD_USER_INPUT") {
            return {
                message: err.message,
                code: err.extensions.code,
            };
        }
    
        return {
            message: "Something went wrong. Please try again later.",
            code: "INTERNAL_SERVER_ERROR"
        };
    }
});

await server.start();

app.use(
    '/graphql',
    cors({
        origin: 'http://localhost:5173/',
        credentials: true
    }),
    cookieParser(),
    bodyParser.json(),
    expressMiddleware(server, {
        context: createContext
    })
);

app.listen(PORT, () => {
    console.log(`Server ready at http://localhost:${PORT}/graphql`);
});