import { Route, Routes } from "react-router";
import LoginPage from "../features/auth/LoginPage";
import SignupPage from "../features/auth/SignupPage";
import OverviewPage from "../features/overview/OverviewPage";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/login" element= { <LoginPage /> } />
            <Route path="/signup" element= { <SignupPage /> } />
            <Route path="/overview" element= { <OverviewPage /> } />
        </Routes>
    );
};

export default AppRoutes;