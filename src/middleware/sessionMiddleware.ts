import session from 'express-session';

// Define and export the session middleware
export const sessionMiddleware = session({
    secret: 'sebasthian',
    name: 'myapp.sid',
    resave: false,
    saveUninitialized: false,
    cookie: { httpOnly: true, secure: false } // In production, set secure: true
});