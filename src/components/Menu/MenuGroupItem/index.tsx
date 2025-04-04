import { IMenu } from "@/components/Menu";
import MenuItem, { VARIANTS_MENU_ITEM } from "@/components/Menu/MenuItem";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

interface IMenuGroupItem {
  menu: IMenu;
  isOpen: boolean;
  onClickSubMenu: () => void;
}

function MenuGroupItem({ menu, isOpen, onClickSubMenu }: IMenuGroupItem) {
  const [isOpenSubMenu, setIsOpenSubMenu] = useState(false);
  const t = useTranslations("menu");

  useEffect(() => {
    if (!isOpen) {
      setIsOpenSubMenu(false);
    }
  }, [isOpen]);

  return (
    <motion.div className="border-[#22242C]  rounded-md mx-4">
      <li
        onClick={() => setIsOpenSubMenu((old) => !old)}
        className=" cursor-pointer flex flex-row items-center  fill-gray text-gray gap-4 px-6 py-3 rounded-md hover:text-blue hover:fill-blue hover:bg-[#22242C]"
      >
        <div>{menu.icon}</div>
        <motion.div
          variants={VARIANTS_MENU_ITEM}
          animate={isOpen ? "visible" : "hidden"}
          initial="hidden"
          className="text-14 shrink-0 flex flex-1"
        >
          {t(menu.name)}
        </motion.div>
        <motion.div
          initial={{ rotate: 0 }}
          animate={isOpenSubMenu ? { rotate: 180 } : { rotate: 0 }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.25 8.625L12 15.375L18.75 8.625"
              stroke="currentcolor"
              strokeWidth="1.125"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      </li>
      <AnimatePresence>
        {isOpenSubMenu && (
          <motion.ul
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            {menu.subMenus?.map((subMenu) => (
              <MenuItem
                withoutMargin
                key={subMenu.name + menu.name}
                menu={{
                  icon: <div className="w-2 h-2 rounded-full bg-gray" />,
                  ...subMenu,
                }}
                isOpen={isOpen}
                onClick={() => onClickSubMenu()}
              />
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default MenuGroupItem;
