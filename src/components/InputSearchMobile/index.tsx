"use client";

import SearchInput from "@/components/InputSearch";
import Modal from "@/components/Modal";
import ModalPortal from "@/components/Modal-portal";
import Search from "@/components/icons/Search";
import { useState } from "react";
interface SearchInputMobileProps {
  placeholder: string;
  onSubmitSearch?: (value: string) => void;
}

function SearchInputMobile({
  placeholder,
  onSubmitSearch,
}: SearchInputMobileProps) {
  const [isOpen, setIsOpen] = useState(false);
  function handleSubmitSearch(value: string) {
    if (onSubmitSearch) {
      onSubmitSearch(value);
    }
    setIsOpen(false);
  }

  return (
    <>
      <div
        onClick={() => setIsOpen(true)}
        className="p-4  rounded-full bg-secondary cursor-pointer "
      >
        <Search className="w-6 h-6 fill-white" />
      </div>
      <ModalPortal>
        {isOpen && (
          <Modal
            onClose={() => setIsOpen(false)}
            className="!h-auto !bg-primary p-6"
          >
            <SearchInput
              placeholder={placeholder}
              onSubmitSearch={handleSubmitSearch}
            />
          </Modal>
        )}
      </ModalPortal>
    </>
  );
}

export default SearchInputMobile;
