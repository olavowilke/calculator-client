import React from 'react';
import Calculator from '../components/Calculator';

const NewOperationPage: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 pt-16">
            <Calculator/>
        </div>
    );
};

export default NewOperationPage;
