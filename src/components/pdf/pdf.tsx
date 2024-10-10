/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable prettier/prettier */
import jsPDF from 'jspdf';
import React, { useState } from 'react';

const PdfGenerator = () => {
    const [petName, setPetName] = useState('');
    const [petAge, setPetAge] = useState('');
    const [petWeight, setPetWeight] = useState('');
    const [petType, setPetType] = useState('');
    const [petSize, setPetSize] = useState('');
    const [dailyFood, setDailyFood] = useState('');
    const [calories, setCalories] = useState('');

    // Function to calculate recommended daily food intake
    const calculateNutrition = () => {
        let dailyIntake = 0;
        let dailyCalories = 0;

        // Convert age and weight to numbers for calculations
        const age = Number(petAge);
        const weightInKg = Number(petWeight);
        const weightInLbs = weightInKg * 2.20462; // Convert weight to lbs for calorie calculation

        // Simple logic for calculating food intake based on age and weight
        if (petType.toLowerCase() === 'dog') {
            if (age < 1) {
                // Puppy: 50 grams of food per kg of body weight
                dailyIntake = weightInKg * 50;
            } else {
                // Adult: 30 grams of food per kg of body weight
                dailyIntake = weightInKg * 30;
            }
        } else if (petType.toLowerCase() === 'cat') {
            if (age < 1) {
                // Kitten: 60 grams of food per kg of body weight
                dailyIntake = weightInKg * 60;
            } else {
                // Adult Cat: 40 grams of food per kg of body weight
                dailyIntake = weightInKg * 40;
            }
        }

        // Calculate recommended daily calories based on size
        if (petSize === 'toy') {
            dailyCalories = weightInLbs * 40; // Toy breeds
        } else if (petSize === 'small') {
            dailyCalories = weightInLbs * 30; // Small breeds
        } else if (petSize === 'medium') {
            dailyCalories = weightInLbs * 25; // Medium breeds
        } else if (petSize === 'large') {
            dailyCalories = weightInLbs * 20; // Large breeds
        }

        setDailyFood(dailyIntake);
        setCalories(dailyCalories);
    };

    const generatePdf = () => {
        const doc = new jsPDF();

        // Add title and styling
        doc.setFontSize(22);
        doc.setTextColor(40, 40, 120);
        doc.text(`Nutrition Plan for ${petName}`, 105, 20, { align: 'center' });

        // Add a header or logo section (optional)
        doc.setFontSize(16);
        doc.setTextColor(100);
        doc.text('Pet Nutrition Report', 105, 30, { align: 'center' });

        // Draw a line under the title
        doc.setLineWidth(0.5);
        doc.line(20, 35, 190, 35);

        // Add pet details with a styled box
        doc.setFontSize(12);
        doc.setTextColor(0);
        doc.text('Pet Details:', 20, 40);

        // Draw a box around pet details
        doc.rect(20, 50, 170, 40);
        doc.setFontSize(10);
        doc.text(`Name: ${petName}`, 25, 60);
        doc.text(`Type: ${petType}`, 25, 70);
        doc.text(`Age: ${petAge} years`, 25, 80);
        doc.text(`Size: ${petSize}`, 25, 88); // Pet Size Field
        doc.text(`Weight: ${petWeight} kg`, 100, 60);
        doc.text(`Daily Food Intake: ${dailyFood} grams`, 100, 70);
        doc.text(`Calories: ${calories} kcal`, 100, 80); // Display Calories

        // Add recommended daily feeding table
        const startY = 110;
        const margin = 20;
        const cellPadding = 6;
        const cellWidth = 40;
        const columns = ['Pet Name', 'Pet Type', 'Daily Food (g)', 'Calories (kcal)'];
        const data = [[petName, petType, dailyFood, calories]];

        // Table Header
        doc.setFontSize(12);
        doc.setTextColor(255, 255, 255);
        doc.setFillColor(40, 40, 120);
        doc.rect(margin, startY, cellWidth * columns.length, 10, 'F');
        columns.forEach((col, index) => {
            doc.text(col, margin + index * cellWidth + cellPadding, startY + 7);
        });

        // Table Data
        data.forEach((row, rowIndex) => {
            row.forEach((cell, cellIndex) => {
                doc.setTextColor(0);
                doc.rect(margin + cellIndex * cellWidth, startY + (rowIndex + 1) * 10, cellWidth, 10);
                doc.text(cell.toString(), margin + cellIndex * cellWidth + cellPadding, startY + (rowIndex + 1) * 10 + 7);
            });
        });

        // Footer or notes
        doc.setFontSize(10);
        doc.setTextColor(100);
        doc.text('Note: Always consult a veterinarian for breed-specific feeding guidelines.', margin, 160);


        doc.save(`${petName}-nutrition-plan.pdf`);
    };

    return (
        <div className="p-4 max-w-lg mx-auto">
            <h1 className="text-2xl font-bold mb-4">Pet Nutrition Calculator</h1>

            <div className="mb-4">
                <label className="block font-semibold mb-2">Pet Name:</label>
                <input
                    required
                    className="w-full border rounded p-2"
                    type="text"
                    value={petName}
                    onChange={(e) => setPetName(e.target.value)}
                />
            </div>

            <div className="mb-4">
                <label className="block font-semibold mb-2">Pet Type (Dog/Cat):</label>
                <input
                    required
                    className="w-full border rounded p-2"
                    type="text"
                    value={petType}
                    onChange={(e) => setPetType(e.target.value)}
                />
            </div>

            <div className="mb-4">
                <label className="block font-semibold mb-2">Pet Size (Toy/Small/Medium/Large):</label>
                <select
                    required
                    className="w-full border rounded p-2"
                    value={petSize}
                    onChange={(e) => setPetSize(e.target.value)}
                >
                    <option value="">Select Size</option>
                    <option value="toy">Toy</option>
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                </select>
            </div>

            <div className="mb-4">
                <label className="block font-semibold mb-2">Pet Age (in years):</label>
                <input
                    required
                    className="w-full border rounded p-2"
                    type="number"
                    value={petAge}
                    onChange={(e) => setPetAge(e.target.value)}
                />
            </div>

            <div className="mb-4">
                <label className="block font-semibold mb-2">Pet Weight (in kg):</label>
                <input
                    required
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
                <div className="mt-4 p-4 rounded">
                    <h2 className="text-xl font-semibold mb-2">Nutrition Plan:</h2>
                    <table className="min-w-full border-collapse">
                        <thead>
                            <tr>
                                <th className="border px-4 py-2">Pet Name</th>
                                <th className="border px-4 py-2">Pet Type</th>
                                <th className="border px-4 py-2">Age (years)</th>
                                <th className="border px-4 py-2">Size</th>
                                <th className="border px-4 py-2">Weight (kg)</th>
                                <th className="border px-4 py-2">Daily Food (g)</th>
                                <th className="border px-4 py-2">Calories (kcal)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="border px-4 py-2">{petName}</td>
                                <td className="border px-4 py-2">{petType}</td>
                                <td className="border px-4 py-2">{petAge}</td>
                                <td className="border px-4 py-2">{petSize}</td>
                                <td className="border px-4 py-2">{petWeight}</td>
                                <td className="border px-4 py-2">{dailyFood}</td>
                                <td className="border px-4 py-2">{calories}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default PdfGenerator;
