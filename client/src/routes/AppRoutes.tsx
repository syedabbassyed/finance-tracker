import { Route, Routes } from "react-router";
import OverviewPage from "../features/overview/OverviewPage";
import AuthPage from "../features/auth/AuthPage";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/login" element= { <AuthPage /> } />
            <Route path="/signup" element= { <AuthPage /> } />
            <Route path="/overview" element= { <OverviewPage /> } />
        </Routes>
    );
};

export default AppRoutes;