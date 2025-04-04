import Link from "next/link";
import LinkNetwork from "@/components/LinkNetwork";
import { IMenu } from "@/components/Menu";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export const VARIANTS_MENU_ITEM = {
  hidden: {
    opacity: 0,
    x: -10,
  },
  visible: {
    opacity: 1,
    x: 0,
  },
};
interface MenuItemProps {
  menu: IMenu;
  onClick: () => void;
  isOpen: boolean;
  withoutMargin?: boolean;
}
function MenuItem({ menu, onClick, isOpen, withoutMargin }: MenuItemProps) {
  const t = useTranslations("menu");
  const className = withoutMargin ? "" : "px-4";
  return (
    <li className={className}>
      <LinkNetwork
        href={menu.url as string}
        onClick={onClick}
        className="flex flex-row items-center fill-gray text-gray gap-4 px-6 py-3 rounded-md hover:text-blue hover:fill-blue hover:bg-[#22242C]"
      >
        <div className="w-6 h-6 flex shrink-0 items-center justify-center">
          {menu.icon}
        </div>
        <motion.div
          variants={VARIANTS_MENU_ITEM}
          animate={isOpen ? "visible" : "hidden"}
          initial="hidden"
          className="text-14"
        >
          {t(menu.name)}
        </motion.div>
      </LinkNetwork>
    </li>
  );
}

export default MenuItem;
