import { useState } from "react";
import { MenuKey } from "../utils/iconMappings";
import MenuItem from "./MenuItem";
import { Link } from "react-router";

const Sidebar = () => {

    const [activeKey, setActiveKey] = useState<MenuKey>('overview');

    const keys: Array<MenuKey> = ["overview", "transactions", "bills", "goals"];

    return (
        <section className="bg-default-black w-[280px] py-12 px-7 h-screen sticky top-0">
            <Link className="block text-center text-2xl text-primary-text tracking-[2px] leading-8 mb-10" to="/">
                <span className="font-extrabold">FIN</span>
                lock
                <span className="font-extrabold">.IO</span>
            </Link>
            <nav>
                <ul className="text-primary-text">
                    {keys.map((menuKey) => 
                        <MenuItem 
                            key={menuKey} 
                            itemKey={menuKey} 
                            isActive={menuKey === activeKey} 
                            onClick={() => setActiveKey(menuKey)}
                        />
                    )}
                </ul>
            </nav>
        </section>
    );
}

export default Sidebar;