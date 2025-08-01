import React from 'react';
import {Routes, Route, useLocation} from 'react-router-dom';
import Navbar from "../components/navbar";
import RecipesPage from "./recipes";
import ProfilePage from "./profile";
import LoginPage from "./login";
import RecipeDetail from "./recipe";

function App() {
    const location = useLocation();

    const isLoginPage = location.pathname === '/';

    return (
        <>
            {!isLoginPage && <Navbar />}

            <Routes>
                <Route path="/receitas" element={<RecipesPage />} />
                <Route path="/perfil" element={<ProfilePage />} />
                <Route path="/receitas/:id" element={<RecipeDetail />} />
                <Route path="/" element={<LoginPage />} />
            </Routes>
        </>
    );
}

export default App;