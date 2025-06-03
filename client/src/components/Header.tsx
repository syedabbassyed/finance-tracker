import { useSelector } from "react-redux";
import ChevronRight from "../icons/ChevronRight";
import { getCurrentDate } from "../utils/utils";
import { RootState } from "../app/store";

const Header = () => {
    const userName = useSelector((state: RootState) => state.auth.user?.name);
    return (
        <header className="py-5 border-header-border border-b font-inter flex justify-center">
            <div className="flex items-center gap-6">
                <h1 className="font-bold text-[24px] text-default-black">Hello {userName}</h1>
                <p className="flex gap-0.5">
                    <ChevronRight />
                    <span className="text-subtext">{getCurrentDate()}</span>
                </p>
            </div>
        </header>
    );
};

export default Header;