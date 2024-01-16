import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import supabase from '../supabaseClient';

export const postLogin = async (req: Request, res: Response) => {
    // User authentication logic
    const { email, password } = req.body;
    
    try {
        // Retrieve user from Supabase
        const { data, error } = await supabase
            .from('users')
            .select('id, password_hash')
            .eq('email', email)
            .single();
        


        if (error || !data) {
            return res.status(401).send('User not found');
        }

        // Compare password hashes
        const validPassword = await bcrypt.compare(password, data.password_hash);
        if (!validPassword) {
            return res.status(401).send('Invalid password');
        }
        
        // User is authenticated, generate JWT
        /*
        const token = jwt.sign({ userId: data.id }, 'your_secret_key', { expiresIn: '1h' });
        res.status(200).json({ token });
        */
        
        // User is authenticated, set up the session
        req.session!.user = {
            userId: data.id
        }
        res.status(200).send('Logged in successfully');
        console.log(res.get('Set-Cookie'));
    
    }
    catch(err) {
        console.error('Login error:', err);
        res.status(500).send('An error occurred during login');
    }
}

export const postRegister = async (req: Request, res: Response) => {
    // User authentication logic
    const { email, password } = req.body;
        
    try {
        // Check if email already exists
        const { data: existingUser, error: existingUserError } = await supabase
            .from('users')
            .select('email')
            .eq('email', email)
            .single();

        if (existingUser) {
            return res.status(409).send('Email already in use');
        }

        // Hash the password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        
        // Add user to Supabase
        const { data, error } = await supabase
            .from('users')
            .insert([{ email, password_hash: hashedPassword }]);

        if (error) throw error;

        res.status(200).send('User registered successfully');
    } 
    catch (err) {
        // Prevent sending a response if one has already been sent
        if (!res.headersSent) {
            console.error(err); // Log the error for debugging
            res.status(500).send('Error occurred during registration');
        }
    }
}