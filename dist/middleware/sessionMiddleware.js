"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionMiddleware = void 0;
const express_session_1 = __importDefault(require("express-session"));
// Define and export the session middleware
exports.sessionMiddleware = (0, express_session_1.default)({
    secret: 'sebasthian',
    name: 'myapp.sid',
    resave: false,
    saveUninitialized: false,
    cookie: { httpOnly: true, secure: false } // In production, set secure: true
});
