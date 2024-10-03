/* eslint-disable prettier/prettier */
import React, { useState } from 'react';

const PhotoModal = ({ isOpen, onClose, onSubmit }) => {
    const [photoUrl, setPhotoUrl] = useState('');

    const handleSubmit = () => {
        if (photoUrl) {
            onSubmit(photoUrl);
            onClose();
            setPhotoUrl('');
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-4 rounded-lg shadow-lg w-11/12 max-w-md">
                <h2 className="text-lg font-semibold mb-4">Add a Photo</h2>
                <input
                    type="text"
                    value={photoUrl}
                    placeholder="Enter photo URL"
                    className="w-full p-2 border border-gray-300 rounded-lg mt-2"
                    onChange={(e) => setPhotoUrl(e.target.value)}
                />
                <div className="flex justify-between mt-4">
                    <button 
                        className="bg-blue-500 text-white rounded-lg py-2 px-4" 
                        onClick={handleSubmit}
                    >
                        Submit
                    </button>
                    <button 
                        className="text-gray-500" 
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PhotoModal;
