import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";

const OverviewPage = () => {
    return (
        <div className="flex">
            <Sidebar />
            <main className="grow">
                <Header />
            </main>
        </div>
    );
};

export default OverviewPage;