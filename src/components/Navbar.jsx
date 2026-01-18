'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { User, LogOut, PlusCircle, Menu, X } from 'lucide-react';

const NavLinks = ({ mobile = false, session, setIsOpen }) => (
    <div className={`${mobile ? 'flex flex-col space-y-2 pb-3 pt-2' : 'flex items-center space-x-8'}`}>
        <Link
            href="/"
            className="text-gray-900 px-3 py-2 text-sm font-medium hover:text-indigo-600 transition"
            onClick={() => mobile && setIsOpen(false)}
        >
            Home
        </Link>
        <Link
            href="/items"
            className="text-gray-600 hover:text-indigo-600 px-3 py-2 text-sm font-medium transition"
            onClick={() => mobile && setIsOpen(false)}
        >
            Items
        </Link>
        {session?.user && (
            <Link
                href="/add-item"
                className="text-gray-600 hover:text-indigo-600 px-3 py-2 text-sm font-medium flex items-center transition"
                onClick={() => mobile && setIsOpen(false)}
            >
                <PlusCircle className="w-4 h-4 mr-1" /> Add Item
            </Link>
        )}
    </div>
);

export default function Navbar() {
    const { data: session } = useSession();
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <nav className="bg-white shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Desktop Navbar */}
                <div className="flex justify-between h-16 items-center">
                    {/* Left: Logo */}
                    <div className="flex-1 flex items-center justify-start">
                        <Link href="/" className="text-2xl font-bold text-indigo-600 shrink-0">
                            GadgetHub
                        </Link>
                    </div>

                    {/* Middle: Links (Centered on Desktop) */}
                    <div className="hidden sm:flex flex-1 items-center justify-center">
                        <NavLinks session={session} setIsOpen={setIsOpen} />
                    </div>

                    {/* Right: Auth & Mobile Toggle */}
                    <div className="flex-1 flex items-center justify-end space-x-4">
                        <div className="hidden sm:block">
                            {session ? (
                                <div className="flex items-center space-x-4">
                                    <span className="text-sm font-medium text-gray-700">Hi, {session.user.name || session.user.email}</span>
                                    <button
                                        onClick={() => signOut()}
                                        className="text-gray-600 hover:text-red-600 p-2 rounded-full transition-colors"
                                    >
                                        <LogOut className="w-5 h-5" />
                                    </button>
                                </div>
                            ) : (
                                <Link
                                    href="/login"
                                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm transition"
                                >
                                    <User className="w-4 h-4 mr-2" /> Login
                                </Link>
                            )}
                        </div>

                        {/* Mobile menu button */}
                        <div className="sm:hidden flex items-center">
                            <button
                                onClick={toggleMenu}
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
                            >
                                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`sm:hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                <div className="px-4 pt-2 pb-3 space-y-1 bg-white border-t border-gray-100">
                    <NavLinks mobile={true} session={session} setIsOpen={setIsOpen} />
                    <div className="border-t border-gray-100 pt-4 pb-3">
                        {session ? (
                            <div className="flex items-center justify-between px-3">
                                <span className="text-base font-medium text-gray-800">Hi, {session.user.name || session.user.email}</span>
                                <button
                                    onClick={() => { signOut(); setIsOpen(false); }}
                                    className="text-red-600 font-medium"
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <Link
                                href="/login"
                                onClick={() => setIsOpen(false)}
                                className="block w-full text-center px-4 py-2 rounded-md text-white bg-indigo-600 font-medium shadow-sm"
                            >
                                Login
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
