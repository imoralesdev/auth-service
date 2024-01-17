"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRegister = exports.postLogin = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const supabaseClient_1 = __importDefault(require("../supabaseClient"));
const postLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // User authentication logic
    const { email, password } = req.body;
    try {
        // Retrieve user from Supabase
        const { data, error } = yield supabaseClient_1.default
            .from('users')
            .select('id, password_hash')
            .eq('email', email)
            .single();
        if (error || !data) {
            return res.status(401).send('User not found');
        }
        // Compare password hashes
        const validPassword = yield bcrypt_1.default.compare(password, data.password_hash);
        if (!validPassword) {
            return res.status(401).send('Invalid password');
        }
        // User is authenticated, generate JWT
        /*
        const token = jwt.sign({ userId: data.id }, 'your_secret_key', { expiresIn: '1h' });
        res.status(200).json({ token });
        */
        // User is authenticated, set up the session
        req.session.user = {
            userId: data.id
        };
        res.status(200).send('Logged in successfully');
        console.log(res.get('Set-Cookie'));
    }
    catch (err) {
        console.error('Login error:', err);
        res.status(500).send('An error occurred during login');
    }
});
exports.postLogin = postLogin;
const postRegister = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // User authentication logic
    const { email, password } = req.body;
    try {
        // Check if email already exists
        const { data: existingUser, error: existingUserError } = yield supabaseClient_1.default
            .from('users')
            .select('email')
            .eq('email', email)
            .single();
        if (existingUser) {
            return res.status(409).send('Email already in use');
        }
        // Hash the password
        const saltRounds = 10;
        const hashedPassword = yield bcrypt_1.default.hash(password, saltRounds);
        // Add user to Supabase
        const { data, error } = yield supabaseClient_1.default
            .from('users')
            .insert([{ email, password_hash: hashedPassword }]);
        if (error)
            throw error;
        res.status(200).send('User registered successfully');
    }
    catch (err) {
        // Prevent sending a response if one has already been sent
        if (!res.headersSent) {
            console.error(err); // Log the error for debugging
            res.status(500).send('Error occurred during registration');
        }
    }
});
exports.postRegister = postRegister;
