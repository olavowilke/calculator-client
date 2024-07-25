import React from 'react';
import Calculator from '../components/Calculator'; // Adjust the import path according to your file structure

const NewOperationPage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 pt-16">
            <Calculator/>
        </div>
    );
};

export default NewOperationPage;
