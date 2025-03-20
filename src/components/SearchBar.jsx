import React from "react";

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <input
      type="text"
      placeholder="Search for a movie..."
      value={searchTerm}
      onChange={handleInputChange}
      className="p-2 border rounded w-full"
    />
  );
};

export default SearchBar;
