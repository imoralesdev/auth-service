"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const sessionMiddleware_1 = require("./middleware/sessionMiddleware");
const testRouter_1 = __importDefault(require("./routes/testRouter"));
const authRouter_1 = __importDefault(require("./routes/authRouter"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use(express_1.default.json());
// Middleware
app.use(sessionMiddleware_1.sessionMiddleware);
// Routes
app.get('/', testRouter_1.default);
app.use('/', authRouter_1.default);
app.listen(3000, () => {
    console.log(`Server running on http://localhost:${port}`);
});
