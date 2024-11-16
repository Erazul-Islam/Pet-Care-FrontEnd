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
    const sections = [
 
        { id: "pdf", label: "Generate Pdf" },
        { id: "post", label: "Post Management" },
    ];

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
                return <PdfGenerator />;
        }
    }

    return (
        <div className="flex min-h-screen">
            <div className="w-64 border p-4">
                <h2 className="text-lg font-bold mb-4">Dashboard</h2>
                <nav>
                    <ul>
                        {sections.map((section) => (
                            <li key={section.id} className="mb-2">
                                <button
                                    onClick={() => setActiveSection(section.id)}
                                    className={`block w-full py-2 px-3 text-left rounded ${activeSection === section.id
                                            ? "bg-blue-600 text-white"
                                            : ""
                                        }`}
                                >
                                    {section.label}
                                </button>
                            </li>
                        ))}
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
