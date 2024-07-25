import React from 'react';
import {BrowserRouter as Router, Route, Routes, useLocation} from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import NewOperationPage from './pages/NewOperationPage';
import Navbar from './components/Navbar';
import RecordsPage from "./pages/RecordsPage.jsx";
import {SnackbarProvider} from "./context/SnackbarContext.jsx";
import {AuthProvider} from "./context/AuthContext.jsx";
import ProtectedRoute from './components/ProtectedRoute.jsx';
import NotFoundPage from './pages/NotFoundPage';

const AppContent = () => {
    const location = useLocation();

    // Determine if the current path is for the NotFoundPage
    const showNavbar =
        location.pathname !== '*' ||
        location.pathname !== '/';

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

function App() {
    return (
        <Router>
            <AppContent/>
        </Router>
    );
}

export default App;
