import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import perspective from './Routers/perspectiveRoutes.js';
import user from './Routers/๊userRouters.js';
import { clerkClient, clerkMiddleware, getAuth } from '@clerk/express';


dotenv.config();
const port = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(cors({
    origin: 'https://mirror-of-truth.onrender.com/',
    credentials: true
}));

// 1. **Custom Middleware:** Must run FIRST to move the token
app.use((req, res, next) => {
    const clerkToken = req.header('clerk');
    if (clerkToken) {
        // This makes the token visible to the Clerk middleware below
        req.headers.authorization = `Bearer ${clerkToken}`;
    }
    next();
});

// 2. **Clerk Middleware:** Runs SECOND, sees the 'Authorization' header, and processes the token
app.use(clerkMiddleware());

// ... rest of your routes

app.get('/api/checkuser', (req, res) => {
    try {
        // The token is now verified by clerkMiddleware()
        // We no longer need the manual token extraction or header manipulation here
        const { userId, sessionId } = getAuth(req);

        if (!userId) {
            return res.status(401).json({ error: 'Unauthorized - Please sign in' });
        }

        res.json({
            userId,
            sessionId,
            message: 'User is authenticated'
        });
    } catch (err) {
        console.error('Auth error:', err);
        res.status(401).json({ error: 'Authentication failed' });
    }
});


app.use('/api', perspective);
app.use('/api', user);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});