'use client';

import { useState, useEffect, use } from 'react';
import api from '@/lib/api';
import { Loader2, ArrowLeft, Shield, Truck, RotateCcw, ShoppingCart, Heart, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function ItemDetailsPage({ params }) {
    const { id } = use(params);
    const { data: session } = useSession();
    const router = useRouter();
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        const fetchItem = async () => {
            try {
                const response = await api.get(`/items/${id}`);
                setItem(response.data);
            } catch (error) {
                console.error("Error fetching item:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchItem();
    }, [id]);

    const handleDelete = async () => {
        if (!window.confirm('Are you sure you want to delete this item?')) return;

        setDeleting(true);
        try {
            await api.delete(`/items/${id}`);
            toast.success('Item deleted successfully');
            router.push('/items');
        } catch (error) {
            console.error("Error deleting item:", error);
            toast.error(error.response?.data?.message || 'Failed to delete item');
        } finally {
            setDeleting(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
            </div>
        );
    }

    if (!item) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-20 text-center">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">Item Not Found</h1>
                <Link href="/items" className="text-indigo-600 font-medium">Back to items</Link>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex items-center justify-between mb-8">
                <Link href="/items" className="inline-flex items-center text-gray-500 hover:text-indigo-600 font-medium">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to Collection
                </Link>

                {session && (
                    <button
                        onClick={handleDelete}
                        disabled={deleting}
                        className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors font-medium disabled:opacity-50"
                    >
                        {deleting ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                            <Trash2 className="w-4 h-4" />
                        )}
                        Delete Item
                    </button>
                )}
            </div>

            <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
                <div className="aspect-square bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100">
                    <img
                        src={item.image || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80'}
                        alt={item.name}
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="flex flex-col justify-center">
                    <div className="mb-8">
                        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">{item.name}</h1>
                        <p className="text-3xl font-bold text-indigo-600 mb-6">${item.price}</p>
                        <p className="text-gray-600 text-lg leading-relaxed">
                            {item.description}. This high-quality gadget features premium materials and state-of-the-art technology to ensure better performance for professionals and tech enthusiasts alike.
                        </p>
                    </div>

                    <div className="space-y-4 mb-10">
                        <div className="flex items-center text-gray-700">
                            <Truck className="w-5 h-5 text-indigo-500 mr-3" />
                            <span>Free shipping on orders over $500</span>
                        </div>
                        <div className="flex items-center text-gray-700">
                            <Shield className="w-5 h-5 text-indigo-500 mr-3" />
                            <span>2-year warranty included</span>
                        </div>
                        <div className="flex items-center text-gray-700">
                            <RotateCcw className="w-5 h-5 text-indigo-500 mr-3" />
                            <span>30-day money-back guarantee</span>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <button className="flex-grow py-4 px-8 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition flex items-center justify-center gap-2">
                            <ShoppingCart className="w-5 h-5" /> Add to Cart
                        </button>
                        <button className="p-4 border border-gray-200 rounded-2xl hover:bg-gray-50 transition text-gray-400 hover:text-red-500">
                            <Heart className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
