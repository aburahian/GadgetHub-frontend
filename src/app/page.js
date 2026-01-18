'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Zap, Shield, Smartphone, Globe, Headphones, BarChart, Loader2 } from 'lucide-react';
import api from '@/lib/api';
import ItemCard from '@/components/ItemCard';

export default function LandingPage() {
  const [latestItems, setLatestItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestItems = async () => {
      try {
        const response = await api.get('/items');
        // Get latest 6 items (assuming last in array are latest)
        const items = response.data.slice(-6).reverse();
        setLatestItems(items);
      } catch (error) {
        console.error("Error fetching latest items:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchLatestItems();
  }, []);

  return (
    <div className="bg-white">
      {/* 1. Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl sm:text-6xl font-extrabold text-gray-900 tracking-tight">
              The Future of <span className="text-indigo-600">Gadgets</span> is Here
            </h1>
            <p className="mt-6 text-xl text-gray-500 max-w-2xl mx-auto">
              Discover premium electronics designed to elevate your professional life. Performance, style, and innovation in every device.
            </p>
            <div className="mt-10 flex justify-center gap-4">
              <Link href="/items" className="px-8 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition">
                Browse Items
              </Link>
              <Link href="/login" className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition">
                Get Started
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b from-indigo-50/50 to-transparent -z-10" />
      </section>

      {/* 2. Featured Categories */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Categories</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {['Laptops', 'Wearables', 'Audio'].map((cat, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition">
                <h3 className="text-xl font-semibold mb-2">{cat}</h3>
                <p className="text-gray-500 mb-4">Top-tier {cat.toLowerCase()} for professionals.</p>
                <Link href="/items" className="text-indigo-600 font-medium flex items-center">
                  View More <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEW: Latest Items Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Latest Arrivals</h2>
              <p className="text-gray-500">The newest additions to our premium collection.</p>
            </div>
            <Link href="/items" className="text-indigo-600 font-semibold flex items-center hover:underline">
              View All <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {latestItems.map(item => (
                <ItemCard key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 3. About Us */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="bg-indigo-100 rounded-3xl h-64 md:h-96" />
            <div>
              <h2 className="text-3xl font-bold mb-6">Redefining Tech Excellence</h2>
              <p className="text-gray-600 text-lg mb-6">
                Founded in 2024, GadgetHub has been at the forefront of bringing cutting-edge technology to professionals worldwide. We believe that tools should empower, not hinder.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center text-gray-700">
                  <Shield className="w-5 h-5 text-indigo-500 mr-3" /> Quality Guaranteed
                </li>
                <li className="flex items-center text-gray-700">
                  <Globe className="w-5 h-5 text-indigo-500 mr-3" /> Global Shipping
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Why Choose Us */}
      <section className="py-20 bg-indigo-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-16 text-white">Why GadgetHub?</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: Zap, label: 'Fast Delivery' },
              { icon: Shield, label: 'Secure Payments' },
              { icon: Headphones, label: '24/7 Support' },
              { icon: BarChart, label: 'Best Prices' }
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="p-4 bg-indigo-800 rounded-2xl mb-4">
                  <item.icon className="w-8 h-8 text-indigo-300" />
                </div>
                <h3 className="font-semibold">{item.label}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Statistics */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-indigo-600 mb-2">50k+</div>
              <div className="text-gray-500">Happy Customers</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-indigo-600 mb-2">120+</div>
              <div className="text-gray-500">Tech Awards</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-indigo-600 mb-2">99%</div>
              <div className="text-gray-500">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Newsletter */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Stay in the Loop</h2>
          <p className="text-gray-500 mb-8">Subscribe to our newsletter for the latest tech trends and exclusive deals.</p>
          <form className="flex gap-2">
            <input type="email" placeholder="Enter your email" className="flex-grow px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            <button type="submit" className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700">Subscribe</button>
          </form>
        </div>
      </section>

      {/* 7. Call to Action */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-indigo-600 rounded-3xl p-12 text-center text-white">
            <h2 className="text-3xl font-bold mb-6">Ready to upgrade your workspace?</h2>
            <p className="text-indigo-100 mb-10 max-w-xl mx-auto">Join thousands of professionals who have already made the switch to premium gadgets.</p>
            <Link href="/items" className="px-8 py-4 bg-white text-indigo-600 rounded-xl font-bold hover:bg-indigo-50 transition">
              Explore All Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
