/* eslint-disable prettier/prettier */
/* eslint-disable import/order */
/* eslint-disable prettier/prettier */

"use client"


import React, { ReactNode, useState } from 'react';
import PdfGenerator from '../pdf/pdf';
import UserPostManagement from './UserPostManagement';

interface LayoutProps {
    children: ReactNode
}

const UserLayout: React.FC<LayoutProps> = () => {

    const [activeSection, setActiveSection] = useState('Home');

    const renderSection = () => {
        switch (activeSection) {
            case 'pdf':
                return <PdfGenerator />;
            case 'user':
                return;
            case 'post':
                return <UserPostManagement />;
            case 'Home':
            default:
                return <div>Home Section</div>;
        }
    }

    return (
        <div className="flex min-h-screen">
            <div className="w-64 border p-4">
                <h2 className="text-lg font-bold mb-4">Dashboard</h2>
                <nav>
                    <ul>
                        <li className="mb-2">
                            <a href="/">
                                <button
                                    onClick={() => setActiveSection('Home')}
                                    className="block py-2 px-3 hover:bg-gray-700 rounded"
                                >
                                    Home
                                </button>
                            </a>
                        </li>
                        <li className="mb-2">
                            <button
                                onClick={() => setActiveSection('pdf')}
                                className="block py-2 px-3 hover:bg-gray-700 rounded"
                            >
                                Generate Pdf
                            </button>
                        </li>

                        <li className="mb-2">
                            <button
                                onClick={() => setActiveSection('post')}
                                className="block py-2 px-3 hover:bg-gray-700 rounded"
                            >
                                Post Management
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
            <div className="flex-1 p-6">
                <header className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Dashboard - {activeSection}</h1>
                </header>
                <main>{renderSection()}</main>
            </div>
        </div>
    );
};

export default UserLayout;
