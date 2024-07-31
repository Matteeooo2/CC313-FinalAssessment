import React from "react";
import "./SearchFilter.css";

const SearchFilter = ({ searchQuery, onSearchChange }) => {
  return (
    <div className="search-filter">
      <input
        type="text"
        placeholder="Search tasks..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="search-input"
      />
    </div>
  );
};

export default SearchFilter;
