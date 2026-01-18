export default function Footer() {
    return (
        <footer className="bg-gray-50 border-t border-gray-200">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-4 md:mb-0">
                        <h2 className="text-xl font-bold text-indigo-600">GadgetHub</h2>
                        <p className="mt-2 text-sm text-gray-500">Premium gadgets for the modern professional.</p>
                    </div>
                    <div className="flex space-x-6">
                        <a href="#" className="text-gray-400 hover:text-gray-500 text-sm">About</a>
                        <a href="#" className="text-gray-400 hover:text-gray-500 text-sm">Privacy</a>
                        <a href="#" className="text-gray-400 hover:text-gray-500 text-sm">Terms</a>
                        <a href="#" className="text-gray-400 hover:text-gray-500 text-sm">Contact</a>
                    </div>
                </div>
                <div className="mt-8 border-t border-gray-200 pt-8 text-center sm:text-left">
                    <p className="text-sm text-gray-400" suppressHydrationWarning>&copy; {new Date().getFullYear()} GadgetHub. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
