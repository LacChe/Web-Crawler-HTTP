import express from 'express';
import mongoose from 'mongoose';
import session from "express-session";
import connectStore from "connect-mongo";
const MongoStore = connectStore(session);
import { userRoutes, sessionRoutes } from './routes/index';
import { PORT, NODE_ENV, MONGO_DB_URI, SESS_NAME, SESS_SECRET, SESS_LIFETIME } from './config';

(async () => {
    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect(MONGO_DB_URI, { useNewUrlParser: true });
        console.log('MongoDB connected');

        const app = express();
        app.disable('x-powered-by');

        app.use(express.urlencoded({ extended: true }));
        app.use(express.json());

        app.use(session({
            name: SESS_NAME,
            secret: SESS_SECRET,
            saveUninitialized: false,
            resave: false,
            store: new MongoStore({
                mongooseConnection: mongoose.connection,
                collection: 'session',
                ttl: parseInt(SESS_LIFETIME) / 1000
            }),
            cookie: {
                sameSite: true,
                secure: NODE_ENV === 'production',
                maxAge: parseInt(SESS_LIFETIME)
            }
        }));

        const apiRouter = express.Router();
        app.use('/api', apiRouter);
        apiRouter.use('/users', userRoutes);
        apiRouter.use('/session', sessionRoutes);

        app.listen(PORT, () => console.log(`Listening on port ${PORT}`));  
    } catch (err) {
        console.log(err)
    }
})();