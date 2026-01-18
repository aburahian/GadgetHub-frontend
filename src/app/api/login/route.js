import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const SECRET_KEY = process.env.SECRET_KEY || 'super-secret-key';

export async function POST(request) {
    try {
        const { username, password } = await request.json();

        // Mock user validation
        if (username === 'admin' && password === 'admin') {
            const user = { username: 'admin', role: 'admin' };
            const token = jwt.sign(user, SECRET_KEY, { expiresIn: '1h' });

            const cookieStore = await cookies();
            cookieStore.set('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
                maxAge: 3600 // 1 hour
            });

            return NextResponse.json({ message: "Logged in successfully", user });
        }

        return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    } catch (error) {
        return NextResponse.json({ error: 'Login failed' }, { status: 500 });
    }
}
