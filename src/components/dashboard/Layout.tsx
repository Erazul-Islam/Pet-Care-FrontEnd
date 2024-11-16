/* eslint-disable prettier/prettier */
import React, { ReactNode } from 'react';

interface LayoutProps {
    children: ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div>
            <div className="flex min-h-screen">
                {/* Sidebar */}
                <div className="w-64 bg-gray-800 text-white p-4">
                    <h2 className="text-lg font-bold mb-4">Dashboard</h2>
                    <nav>
                        <ul>
                            <li className="mb-2">
                                <a href="/" className="block py-2 px-3 hover:bg-gray-700 rounded">
                                    Home
                                </a>
                            </li>
                            <li className="mb-2">
                                <a href="/payment" className="block py-2 px-3 hover:bg-gray-700 rounded">
                                    Analytics
                                </a>
                            </li>
                            <li>
                                <a href="settings" className="block py-2 px-3 hover:bg-gray-700 rounded">
                                    Settings
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>

                <div className="flex-1 p-6 bg-gray-100">
                    <header className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold">Welcome to the Dashboard</h1>
                        <button className="bg-blue-600 text-white py-2 px-4 rounded">Logout</button>
                    </header>
                    <main>{children}</main>
                </div>
            </div>
        </div>
    );
};

export default Layout;