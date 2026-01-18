'use client';

import Link from 'next/link';
import { Eye, ShoppingCart } from 'lucide-react';

export default function ItemCard({ item }) {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition group">
            <div className="relative h-48 overflow-hidden bg-gray-200">
                <img
                    src={item.image || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80'}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition duration-300" />
            </div>
            <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition truncate pr-4">
                        {item.name}
                    </h3>
                    <span className="text-indigo-600 font-bold">${item.price}</span>
                </div>
                <p className="text-gray-500 text-sm mb-6 line-clamp-2 min-h-[2.5rem]">
                    {item.description}
                </p>
                <div className="flex gap-2">
                    <Link
                        href={`/items/${item.id}`}
                        className="flex-grow flex items-center justify-center gap-2 py-2 px-4 rounded-lg bg-gray-50 text-gray-700 font-medium hover:bg-gray-100 transition"
                    >
                        <Eye className="w-4 h-4" /> Details
                    </Link>
                    <button className="p-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition">
                        <ShoppingCart className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
}
