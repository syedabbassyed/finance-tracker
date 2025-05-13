import { Route, Routes } from "react-router";
import LoginPage from "../features/auth/LoginPage";
import SignupPage from "../features/auth/SignupPage";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/login" element= { <LoginPage /> } />
            <Route path="/signup" element= { <SignupPage /> } />
        </Routes>
    );
};

export default AppRoutes;