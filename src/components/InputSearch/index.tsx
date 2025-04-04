"use client";

import Search from "@/components/icons/Search";

interface SearchInputProps {
  placeholder: string;
  onSubmitSearch?: (value: string) => void;
}

function SearchInput({ placeholder, onSubmitSearch }: SearchInputProps) {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = (event.target as HTMLFormElement).querySelector(
      "input"
    )?.value;
    if (onSubmitSearch && value) {
      onSubmitSearch(value);
    }
  }
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-row w-full bg-secondary rounded-3xl h-14 gap-4 px-6 items-center"
    >
      <input
        className="flex flex-1 bg-secondary focus:outline-none border-none text-white text-18"
        placeholder={placeholder}
      />
      <button type="submit">
        <Search className="w-6 h-6 text-gray" />
      </button>
    </form>
  );
}

export default SearchInput;
