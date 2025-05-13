import { FC } from "react";
import ICON_MAPPINGS, { MenuKey } from "../utils/iconMappings";
import MENU_LABELS from "../utils/menuLabelMappings";

type MenuItemProps = {
    itemKey: MenuKey;
    isActive: boolean;
    onClick: () => void;
};


const MenuItem = ({ itemKey, isActive, onClick }: MenuItemProps) => {
    const IconComponent: FC = ICON_MAPPINGS[itemKey];
    return (
        <div 
            onClick={onClick}
            className={`flex py-3 px-4 rounded-sm gap-3 mb-4 cursor-pointer ${isActive ? 'bg-primary' : 'opacity-[.7]'}`}
        >
            <IconComponent />
            <span className="text-[16px] leading-6">{MENU_LABELS[itemKey]}</span>
        </div>
    )
};

export default MenuItem;