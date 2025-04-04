"use client";

import MenuOutline from "@/components/icons/MenuOutline";
import useMenuStore from "@/stores/menu";

function Menu() {
  const { setIsOpen } = useMenuStore();
  return (
    <button
      type="button"
      className="flex p-4 rounded-full bg-secondary md:hidden hover:bg-secondaryHover"
      onClick={() => setIsOpen(true)}
    >
      <MenuOutline width={24} height={24} className="stroke-white" />
    </button>
  );
}

export default Menu;
