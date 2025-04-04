"use client";

import AdBanner from "@/components/AdsBanner";
import Store from "@/components/icons/Store";
import Locale from "@/components/Menu/Locale";
import MenuGroupItem from "@/components/Menu/MenuGroupItem";
import MenuItem, { VARIANTS_MENU_ITEM } from "@/components/Menu/MenuItem";
import { useBreakpointTailwind } from "@/hooks/useBreakpointTailwind";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import useMenuStore from "@/stores/menu";
import { MotionConfig, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useRef } from "react";

export interface IMenu {
  name: string;
  url?: string;
  icon?: JSX.Element;
  subMenus?: IMenu[];
}

const menus: IMenu[] = [
  {
    name: "home",
    url: "/",
    icon: (
      <svg
        width="22"
        height="23"
        viewBox="0 0 22 23"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M7.49621 21.2108V17.7561C7.49621 16.8742 8.21636 16.1592 9.1047 16.1592H12.352C12.7786 16.1592 13.1878 16.3275 13.4894 16.6269C13.7911 16.9264 13.9605 17.3326 13.9605 17.7561V21.2108C13.9579 21.5774 14.1027 21.93 14.3629 22.1902C14.6231 22.4504 14.9772 22.5967 15.3465 22.5967H17.562C18.5967 22.5994 19.5899 22.1932 20.3225 21.4678C21.0551 20.7424 21.4669 19.7574 21.4669 18.7302V8.88825C21.4669 8.0585 21.0964 7.27144 20.4552 6.73909L12.9186 0.76362C11.6075 -0.284084 9.72914 -0.250256 8.45726 0.843963L1.09256 6.73909C0.421135 7.25575 0.0198312 8.04515 0 8.88825V18.7202C0 20.8611 1.74829 22.5967 3.90491 22.5967H6.0698C6.83689 22.5967 7.4603 21.9823 7.46586 21.2208L7.49621 21.2108Z" />
      </svg>
    ),
  },
  {
    name: "wallet",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M4.47656 4.875H19.4766C19.6518 4.87495 19.8268 4.88606 20.0006 4.90828C19.9417 4.49473 19.7997 4.0974 19.583 3.74024C19.3664 3.38308 19.0797 3.07348 18.7402 2.83012C18.4007 2.58676 18.0154 2.41467 17.6076 2.32423C17.1998 2.2338 16.7779 2.22688 16.3673 2.3039L4.03125 4.41H4.01719C3.24285 4.55807 2.55425 4.99618 2.09203 5.63484C2.7884 5.13952 3.622 4.87389 4.47656 4.875ZM19.4766 6H4.47656C3.68118 6.00086 2.91862 6.31721 2.3562 6.87963C1.79378 7.44206 1.47743 8.20461 1.47656 9V18C1.47743 18.7954 1.79378 19.5579 2.3562 20.1204C2.91862 20.6828 3.68118 20.9991 4.47656 21H19.4766C20.2719 20.9991 21.0345 20.6828 21.5969 20.1204C22.1593 19.5579 22.4757 18.7954 22.4766 18V9C22.4757 8.20461 22.1593 7.44206 21.5969 6.87963C21.0345 6.31721 20.2719 6.00086 19.4766 6ZM17.25 15C16.9533 15 16.6633 14.912 16.4166 14.7472C16.17 14.5824 15.9777 14.3481 15.8642 14.074C15.7506 13.7999 15.7209 13.4983 15.7788 13.2074C15.8367 12.9164 15.9796 12.6491 16.1893 12.4393C16.3991 12.2296 16.6664 12.0867 16.9574 12.0288C17.2483 11.9709 17.5499 12.0006 17.824 12.1142C18.0981 12.2277 18.3324 12.42 18.4972 12.6666C18.662 12.9133 18.75 13.2033 18.75 13.5C18.75 13.8978 18.592 14.2794 18.3107 14.5607C18.0294 14.842 17.6478 15 17.25 15Z" />
        <path d="M1.5 12.1641V7.5C1.5 6.48422 2.0625 4.78125 4.01484 4.41234C5.67188 4.10156 7.3125 4.10156 7.3125 4.10156C7.3125 4.10156 8.39062 4.85156 7.5 4.85156C6.60938 4.85156 6.63281 6 7.5 6C8.36719 6 7.5 7.10156 7.5 7.10156L4.00781 11.0625L1.5 12.1641Z" />
      </svg>
    ),
    subMenus: [
      {
        name: "search_wallet",
        url: "/wallet",
      },
      {
        name: "investiment_simulator",
        url: "/investment-simulator",
      },
    ],
  },
  {
    name: "house",
    url: "/house",
    icon: (
      <svg
        width="22"
        height="23"
        viewBox="0 0 22 23"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M7.49621 21.2108V17.7561C7.49621 16.8742 8.21636 16.1592 9.1047 16.1592H12.352C12.7786 16.1592 13.1878 16.3275 13.4894 16.6269C13.7911 16.9264 13.9605 17.3326 13.9605 17.7561V21.2108C13.9579 21.5774 14.1027 21.93 14.3629 22.1902C14.6231 22.4504 14.9772 22.5967 15.3465 22.5967H17.562C18.5967 22.5994 19.5899 22.1932 20.3225 21.4678C21.0551 20.7424 21.4669 19.7574 21.4669 18.7302V8.88825C21.4669 8.0585 21.0964 7.27144 20.4552 6.73909L12.9186 0.76362C11.6075 -0.284084 9.72914 -0.250256 8.45726 0.843963L1.09256 6.73909C0.421135 7.25575 0.0198312 8.04515 0 8.88825V18.7202C0 20.8611 1.74829 22.5967 3.90491 22.5967H6.0698C6.83689 22.5967 7.4603 21.9823 7.46586 21.2208L7.49621 21.2108Z" />
      </svg>
    ),
  },
  {
    name: "hero",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="m12.007 1l.238.005a6 6 0 0 1 5.405 3.974l.078.233a6 6 0 0 1-.182 4.08l-.093.21l.05-.002a2.94 2.94 0 0 1 2.638 1.511l.081.158a2.887 2.887 0 0 1-1.234 3.764l-.19.096L17 15.85v.963l1.166 1.166l.14.154a2.96 2.96 0 0 1-.17 4.002c-1.087 1.088-2.827 1.161-4.03.144l-.16-.146L12 20.185l-1.946 1.947a2.96 2.96 0 0 1-3.95.22l-.15-.128c-1.17-1.073-1.284-2.879-.234-4.12l.146-.158L7 16.812v-.962l-1.834-.84l-.181-.093a2.88 2.88 0 0 1-1.205-3.75a2.93 2.93 0 0 1 2.646-1.661l.13.003l-.03-.064a6.1 6.1 0 0 1-.503-1.968l-.017-.26V7a6 6 0 0 1 5.775-5.996L12.005 1zm.003 15H12a1 1 0 0 0 0 2h.01a1 1 0 0 0 0-2m0-3H12a1 1 0 0 0 0 2h.01a1 1 0 0 0 0-2m0-5H12a1 1 0 0 0 0 2h.01a1 1 0 0 0 0-2m-2-3H10a1 1 0 1 0 0 2h.01a1 1 0 0 0 0-2m4 0H14a1 1 0 0 0 0 2h.01a1 1 0 0 0 0-2"
        />
      </svg>
    ),
    subMenus: [
      {
        name: "search_hero",
        url: "/hero",
      },
      {
        name: "best_cost_for_hero",
        url: "/hero/best-cost-quartz",
      },
    ],
  },
  {
    name: "ranking",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="19.19"
        viewBox="0 0 640 512"
      >
        <path d="M353.8 54.1L330.2 6.3c-3.9-8.3-16.1-8.6-20.4 0l-23.6 47.8l-52.3 7.5c-9.3 1.4-13.3 12.9-6.4 19.8l38 37l-9 52.1c-1.4 9.3 8.2 16.5 16.8 12.2l46.9-24.8l46.6 24.4c8.6 4.3 18.3-2.9 16.8-12.2l-9-52.1l38-36.6c6.8-6.8 2.9-18.3-6.4-19.8l-52.3-7.5zM256 256c-17.7 0-32 14.3-32 32v192c0 17.7 14.3 32 32 32h128c17.7 0 32-14.3 32-32V288c0-17.7-14.3-32-32-32zM32 320c-17.7 0-32 14.3-32 32v128c0 17.7 14.3 32 32 32h128c17.7 0 32-14.3 32-32V352c0-17.7-14.3-32-32-32zm416 96v64c0 17.7 14.3 32 32 32h128c17.7 0 32-14.3 32-32v-64c0-17.7-14.3-32-32-32H480c-17.7 0-32 14.3-32 32" />
      </svg>
    ),
    subMenus: [
      {
        name: "stake",
        url: "/ranking-stake/common",
      },
      {
        name: "global_stake",
        url: "/ranking-global-stake/common",
      },
      {
        name: "stake_wallet",
        url: "/ranking-stake-wallet",
      },
      {
        name: "global_stake_wallet",
        url: "/ranking-global-stake-wallet",
      },

      {
        name: "claim",
        url: "/ranking-claim",
      },
    ],
  },

  {
    name: "retail",
    icon: <Store className="w-6 h-6" />,
    subMenus: [
      {
        name: "real_time",
        url: "/real-time-retail",
      },
      {
        name: "heroes_list",
        url: "/retail/heroes",
      },
      {
        name: "houses_list",
        url: "/retail/houses",
      },
    ],
  },
  {
    name: "communityVideos",
    url: "/community-videos",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24px"
        height="24px"
        viewBox="0 0 256 256"
      >
        <path
          fill="currentColor"
          d="M232 208a8 8 0 0 1-8 8H32a8 8 0 0 1 0-16h192a8 8 0 0 1 8 8m0-152v112a16 16 0 0 1-16 16H40a16 16 0 0 1-16-16V56a16 16 0 0 1 16-16h176a16 16 0 0 1 16 16m-68 56a8 8 0 0 0-3.41-6.55l-40-28A8 8 0 0 0 108 84v56a8 8 0 0 0 12.59 6.55l40-28A8 8 0 0 0 164 112"
        />
      </svg>
    ),
  },
  // {
  //   name: "OpenSea",
  //   url: "/opensea",
  //   icon: (
  //     <div className="h-6 w-6">
  //       <Image
  //         src="/images/opensea.webp"
  //         width={24}
  //         height={24}
  //         alt="OpenSea"
  //       />
  //     </div>
  //   ),
  // },
  // {
  //   name: "Market",
  //   url: "/market",
  //   icon: (
  //     <div className="h-6 w-6">
  //       <Image src="/images/market.webp" width={24} height={24} alt="OpenSea" />
  //     </div>
  //   ),
  // },
];

const VARIANTS_MENU = {
  hidden: {
    width: "96px",
    boxShadow: "0px 4px 4px rgba(0,0,0, 0.15)",
  },
  visible: {
    width: "270px",
    boxShadow: "0px 4px 4px rgba(0,0,0, 0.25)",
  },
};
const VARIANTS_MENU_MOBILE = {
  hidden: {
    x: `-100%`,
  },
  visible: {
    x: 0,
  },
};

function Menu() {
  const { isOpen, setIsOpen } = useMenuStore();
  const isMd = useBreakpointTailwind("md");
  const refRoot = useRef(null);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  useOutsideClick([refRoot], handleClose);

  const items = (
    <motion.ul
      className="flex h-full flex-col bg-secondary py-8 md:rounded-b-3xl absolute, top-0 left-0 overflow-hidden z-50 "
      variants={isMd ? VARIANTS_MENU : undefined}
      initial="hidden"
      onMouseEnter={() => isMd && handleOpen()}
      onMouseLeave={() => isMd && handleClose()}
      animate={isOpen ? "visible" : "hidden"}
      // animate="hidden"
    >
      <div className="px-4 pb-10">
        <div className="flex flex-row pl-4 gap-3 items-center">
          <Image
            alt="BombStats"
            src="/images/logo.webp"
            className="shrink-0"
            width={40}
            height={40}
            priority
          />
          <motion.h1
            variants={isMd ? VARIANTS_MENU_ITEM : undefined}
            animate={isOpen ? "visible" : "hidden"}
            className="text-20 font-semibold"
            initial="hidden"
          >
            BombStats
          </motion.h1>
        </div>
      </div>
      {menus.map((menu) => {
        if (menu.subMenus?.length) {
          return (
            <MenuGroupItem
              key={menu.name}
              menu={menu}
              isOpen={isOpen}
              onClickSubMenu={handleClose}
            ></MenuGroupItem>
          );
        }

        return (
          <MenuItem
            key={menu.name}
            menu={menu}
            onClick={handleClose}
            isOpen={isOpen}
          />
        );
      })}

      <div className=" mx-4">
        <div className="w-full h-[0.5px] my-4 bg-gray " />
      </div>
      <Locale isOpen={isOpen} />
    </motion.ul>
  );

  if (isMd) {
    return (
      <MotionConfig transition={{ ease: "linear" }}>
        <nav
          className="absolute flex-col h-full md:w-24 md:sticky md:top-0 z-10 md:flex"
          ref={refRoot}
        >
          {items}
        </nav>
      </MotionConfig>
    );
  }

  return (
    <MotionConfig transition={{ ease: "linear" }}>
      <motion.nav
        variants={VARIANTS_MENU_MOBILE}
        initial="hidden"
        animate={isOpen ? "visible" : "hidden"}
        className="absolute flex-col h-full z-20 md:w-24 md:relative md:flex"
        ref={refRoot}
      >
        {items}
      </motion.nav>
    </MotionConfig>
  );
}

export default Menu;
