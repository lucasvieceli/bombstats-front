import Portal from "@/components/Portal";
import { AnimatePresence } from "framer-motion";
import { PropsWithChildren } from "react";

const ModalPortal = ({ children }: PropsWithChildren) => {
  const onHideModal = () => {
    setTimeout(() => {
      const modals = document.querySelectorAll(".modal");
      if (modals.length) return;

      const html = document.getElementsByTagName("body")[0];
      if (!html) return;
      html.style.overflow = "";
      html.style.paddingRight = "";

      const chat = document.getElementById("md-app-widget");
      if (!chat) return;
      chat.style.transform = "translateX(0%)";
    }, 100);
  };

  return (
    <Portal>
      <AnimatePresence onExitComplete={onHideModal}>{children}</AnimatePresence>
    </Portal>
  );
};

export default ModalPortal;
