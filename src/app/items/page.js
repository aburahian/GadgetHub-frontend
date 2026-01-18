'use client';

import { useState, useEffect } from 'react';
import api from '@/lib/api';
import ItemCard from '@/components/ItemCard';
import { Loader2, Search, Filter } from 'lucide-react';

export default function ItemsPage() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await api.get('/items');
                setItems(response.data);
            } catch (error) {
                console.error("Error fetching items:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchItems();
    }, []);

    const filteredItems = items.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (loading) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Our Collection</h1>
                    <p className="text-gray-500">Discover our latest premium gadgets.</p>
                </div>

                <div className="flex gap-4 items-center">
                    <div className="relative max-w-sm w-full">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 border-none bg-white shadow-sm"
                        />
                    </div>
                    <button className="p-2 bg-white rounded-lg shadow-sm border border-gray-100 hover:bg-gray-50">
                        <Filter className="w-5 h-5 text-gray-600" />
                    </button>
                </div>
            </div>

            {filteredItems.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {filteredItems.map(item => (
                        <ItemCard key={item.id} item={item} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-white rounded-3xl shadow-sm">
                    <p className="text-gray-500 text-lg">No items found matching your search.</p>
                </div>
            )}
        </div>
    );
}
