import React, { useState } from "react";
import { Search } from "lucide-react"; // icon library (lucide-react)

interface SearchBoxProps {
  placeholder?: string;
  onSearch: (query: string) => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({
  placeholder = "Search contacts...",
  onSearch,
}) => {
  const [query, setQuery] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <div className="mx-4 mt-2">
      <div className="relative">
        <Search
          className="top-1/2 left-3 absolute text-stone-400 -translate-y-1/2 transform"
          size={18}
        />

        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder={placeholder}
          className="shadow-sm shadow-stone-200 py-2 pr-4 pl-10 border-1 border-gray-200 focus:border-stone-400 rounded-sm sm:rounded-md focus:outline-none focus:ring-1 focus:ring-stone-400 w-full transition-all"
        />
      </div>
    </div>
  );
};

export { SearchBox };
