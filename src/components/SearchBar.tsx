import React from "react";

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="fixed top-0 left-0 w-full bg-white shadow-md p-4 z-50">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search apps..."
        className="w-full p-2 border rounded"
      />
    </div>
  );
};

export default SearchBar;
