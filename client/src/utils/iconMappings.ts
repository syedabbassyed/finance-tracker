import { FC } from "react";
import Bills from "../icons/Bills";
import Goals from "../icons/Goals";
import Logout from "../icons/Logout";
import Overview from "../icons/Overview";
import Transactions from "../icons/Transactions";

export type MenuKey = 'overview' | 'transactions' | 'bills' | 'goals' | 'logout';

const ICON_MAPPINGS: Record<MenuKey, FC> = {
    bills: Bills,
    goals: Goals,
    logout: Logout,
    overview: Overview,
    transactions: Transactions
};

export default ICON_MAPPINGS;