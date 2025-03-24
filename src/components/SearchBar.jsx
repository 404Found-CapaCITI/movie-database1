import React from "react";

const SearchBar = ({ searchTerm = "", setSearchTerm }) => {
  return (
    <input
      type="text"
      placeholder="Search for a movie..."
      value={searchTerm || ""}
      onChange={(e) => setSearchTerm(e.target.value || "")}
      className="p-2 border rounded w-full"
      aria-label="Search Movies"
    />
  );
};

export default SearchBar;
