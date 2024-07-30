import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RecordsPage from './pages/RecordsPage';
import { SnackbarProvider } from './context/SnackbarContext';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import NotFoundPage from './pages/NotFoundPage';
import NewOperationPage from './pages/NewOperationPage';
import Navbar from './components/Navbar';

const AppContent: React.FC = () => {
    const location = useLocation();

    return (
        <AuthProvider>
            <SnackbarProvider>
                <div className="flex flex-col min-h-screen">
                    {location.pathname !== '/' && <Navbar/>}
                    <div className="flex-grow">
                        <Routes>
                            <Route path="/" element={<LoginPage/>}/>
                            <Route path="/new-operation" element={<ProtectedRoute component={NewOperationPage}/>}/>
                            <Route path="/records" element={<ProtectedRoute component={RecordsPage}/>}/>
                            <Route path="*" element={<NotFoundPage/>}/>
                        </Routes>
                    </div>
                </div>
            </SnackbarProvider>
        </AuthProvider>
    );
};

const App: React.FC = () => {
    return (
        <Router>
            <AppContent/>
        </Router>
    );
}

export default App;
