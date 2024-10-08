/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable prettier/prettier */
import jsPDF from 'jspdf';
import React, { useState } from 'react';

const PdfGenerator = () => {
    const [petName, setPetName] = useState('');
    const [petAge, setPetAge] = useState('');
    const [petWeight, setPetWeight] = useState('');
    const [petType, setPetType] = useState('');
    const [dailyFood, setDailyFood] = useState('');

    // Function to calculate recommended daily food intake
    const calculateNutrition = () => {
        let dailyIntake = 0;

        // Convert age and weight to numbers for calculations
        const age = Number(petAge);
        const weight = Number(petWeight);

        // Simple logic for calculating food intake based on age and weight
        if (petType.toLowerCase() === 'dog') {
            if (age < 1) {
                // Puppy: 50 grams of food per kg of body weight
                dailyIntake = weight * 50;
            } else {
                // Adult: 30 grams of food per kg of body weight
                dailyIntake = weight * 30;
            }
        } else if (petType.toLowerCase() === 'cat') {
            if (age < 1) {
                // Kitten: 60 grams of food per kg of body weight
                dailyIntake = weight * 60;
            } else {
                // Adult Cat: 40 grams of food per kg of body weight
                dailyIntake = weight * 40;
            }
        }
        setDailyFood(dailyIntake);
    };

    const generatePdf = () => {
        const doc = new jsPDF();
        const title = `Nutrition Plan for ${petName}`;
        
        // Title
        doc.setFontSize(22);
        doc.setTextColor(40, 40, 120);
        doc.text(title, 105, 20, { align: 'center' });

        // Set margins
        const margin = 20; // Margin from the right side
        const startY = 30; // Starting position for the table
        const cellPadding = 6; // Padding inside cells
        const cellWidth = 40; // Width of each cell

        // Table Headers
        const columns = ['Pet Name', 'Pet Type', 'Age (years)', 'Weight (kg)', 'Daily Food Intake (grams)'];
        const data = [[petName, petType, petAge, petWeight, dailyFood]];

        // Draw the header
        doc.setFontSize(12);
        doc.setTextColor(255, 255, 255);
        doc.setFillColor(40, 40, 120); // Header background color
        doc.rect(margin, startY, cellWidth * columns.length, 10, 'F'); // Draw header background

        columns.forEach((col, index) => {
            doc.text(col, margin + index * cellWidth + cellPadding, startY + 7); // Draw header text
        });

        // Draw table row
        data.forEach((row, rowIndex) => {
            row.forEach((cell, cellIndex) => {
                doc.setTextColor(0, 0, 0); // Reset text color for body text
                doc.rect(margin + cellIndex * cellWidth, startY + (rowIndex + 1) * 10, cellWidth, 10); // Cell border
                doc.text(cell.toString(), margin + cellIndex * cellWidth + cellPadding, startY + (rowIndex + 1) * 10 + 7); // Cell text
            });
        });

        doc.save(`${petName}-nutrition-plan.pdf`);
    };

    return (
        <div className="p-4 max-w-lg mx-auto">
            <h1 className="text-2xl font-bold mb-4">Pet Nutrition Calculator</h1>

            <div className="mb-4">
                <label className="block font-semibold mb-2">Pet Name:</label>
                <input
                    className="w-full border rounded p-2"
                    type="text"
                    value={petName}
                    onChange={(e) => setPetName(e.target.value)}
                />
            </div>

            <div className="mb-4">
                <label className="block font-semibold mb-2">Pet Type (Dog/Cat):</label>
                <input
                    className="w-full border rounded p-2"
                    type="text"
                    value={petType}
                    onChange={(e) => setPetType(e.target.value)}
                />
            </div>

            <div className="mb-4">
                <label className="block font-semibold mb-2">Pet Age (in years):</label>
                <input
                    className="w-full border rounded p-2"
                    type="number"
                    value={petAge}
                    onChange={(e) => setPetAge(e.target.value)}
                />
            </div>

            <div className="mb-4">
                <label className="block font-semibold mb-2">Pet Weight (in kg):</label>
                <input
                    className="w-full border rounded p-2"
                    type="number"
                    value={petWeight}
                    onChange={(e) => setPetWeight(e.target.value)}
                />
            </div>

            <div className="flex space-x-4">
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                    onClick={calculateNutrition}
                >
                    Calculate Nutrition
                </button>

                {dailyFood && (
                    <button
                        className="bg-green-500 text-white px-4 py-2 rounded"
                        onClick={generatePdf}
                    >
                        Download PDF
                    </button>
                )}
            </div>

            {dailyFood && (
                <div className="mt-4 p-4 border rounded">
                    <h2 className="text-xl font-semibold mb-2">Nutrition Plan:</h2>
                    <table className="min-w-full border-collapse">
                        <thead>
                            <tr>
                                <th className="border px-4 py-2">Pet Name</th>
                                <th className="border px-4 py-2">Pet Type</th>
                                <th className="border px-4 py-2">Age (years)</th>
                                <th className="border px-4 py-2">Weight (kg)</th>
                                <th className="border px-4 py-2">Daily Food Intake (grams)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="border px-4 py-2">{petName}</td>
                                <td className="border px-4 py-2">{petType}</td>
                                <td className="border px-4 py-2">{petAge}</td>
                                <td className="border px-4 py-2">{petWeight}</td>
                                <td className="border px-4 py-2">{dailyFood}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default PdfGenerator;
