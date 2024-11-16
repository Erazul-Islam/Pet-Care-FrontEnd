/* eslint-disable prettier/prettier */

"use client"


import PaymentInfo from '@/src/app/(WithCommonLayout)/(dashboard)/adminDashboard/payment/page';
import React, { ReactNode, useState } from 'react';

interface LayoutProps {
    children: ReactNode
}

const Layout: React.FC<LayoutProps> = () => {

    const [activeSection, setActiveSection] = useState('Home');

    const renderSection = () => {
        switch (activeSection) {
            case 'PaymentInfo':
                return <PaymentInfo />;
            case 'Settings':
                return <div>Settings Section</div>;
            case 'Home':
            default:
                return <div>Home Section</div>;
        }
    }

    return (
        <div className="flex min-h-screen">
            <div className="w-64 bg-gray-800 text-white p-4">
                <h2 className="text-lg font-bold mb-4">Dashboard</h2>
                <nav>
                    <ul>
                        <li className="mb-2">
                            <button
                                onClick={() => setActiveSection('Home')}
                                className="block py-2 px-3 hover:bg-gray-700 rounded"
                            >
                                Home
                            </button>
                        </li>
                        <li className="mb-2">
                            <button
                                onClick={() => setActiveSection('PaymentInfo')}
                                className="block py-2 px-3 hover:bg-gray-700 rounded"
                            >
                                Payment Info
                            </button>
                        </li>
                        <li className="mb-2">
                            <button
                                onClick={() => setActiveSection('Settings')}
                                className="block py-2 px-3 hover:bg-gray-700 rounded"
                            >
                                Settings
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-6">
                <header className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Dashboard - {activeSection}</h1>
                </header>
                <main>{renderSection()}</main>
            </div>
        </div>
    );
};

export default Layout;
