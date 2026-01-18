import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const DATA_FILE = path.join(process.cwd(), 'data.json');
const SECRET_KEY = process.env.SECRET_KEY || 'super-secret-key';

const readData = () => {
    if (!fs.existsSync(DATA_FILE)) {
        const initialData = [
            { id: 1, name: "Premium Laptop", description: "High-performance laptop for professionals with 32GB RAM and 1TB SSD.", price: 1200, image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&q=80" },
            { id: 2, name: "Wireless Headphones", description: "Noise-cancelling over-ear headphones with 40-hour battery life.", price: 250, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80" },
            { id: 3, name: "Smart Watch", description: "Stay connected with this sleek smartwatch featuring health tracking and GPS.", price: 199, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80" },
            { id: 4, name: "Professional Camera", description: "Mirrorless camera with ultra-fast autofocus and 4K video recording capability.", price: 1800, image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&q=80" },
            { id: 5, name: "Mechanical Keyboard", description: "Tactile mechanical keyboard with RGB lighting and programmable keys for developers.", price: 120, image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=500&q=80" },
            { id: 6, name: "Ultra-Wide Monitor", description: "34-inch curved monitor with vibrant colors and high refresh rate for immersive work.", price: 650, image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&q=80" },
            { id: 7, name: "Ergonomic Office Chair", description: "Premium ergonomic chair designed for long-term comfort and posture support.", price: 450, image: "https://images.unsplash.com/photo-1592078615290-033ee584e267?w=500&q=80" }
        ];
        fs.writeFileSync(DATA_FILE, JSON.stringify(initialData, null, 2));
        return initialData;
    }
    return JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
};

const writeData = (data) => {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
};

export async function POST(request) {
    try {
        // Check authentication
        const cookieStore = await cookies();
        const token = cookieStore.get('token')?.value;

        if (!token) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        try {
            jwt.verify(token, SECRET_KEY);
        } catch (err) {
            return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
        }

        const body = await request.json();
        const items = readData();
        const newItem = {
            id: Date.now(),
            ...body
        };
        items.push(newItem);
        writeData(items);

        return NextResponse.json(newItem, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create item' }, { status: 500 });
    }
}
