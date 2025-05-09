const Sidebar = () => {
    return (
        <section className="bg-default-black w-[280px] py-12 px-7 h-dvh">
            <div className="text-2xl text-primary-text tracking-[2px] leading-8 mb-10"><span className="font-extrabold">FIN</span>lock</div>
            <nav>
                <ul className="text-primary-text">
                    <li>Overview</li>
                    <li>Transactions</li>
                    <li>Bills</li>
                    <li>Goals</li>
                </ul>
            </nav>
        </section>
    );
}

export default Sidebar;