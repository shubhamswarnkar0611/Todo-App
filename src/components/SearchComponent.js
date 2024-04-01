import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

const SearchComponent = ({onSearch}) => {

  return (
    <div className="flex items-center justify-center mt-6 ">
      <div className="flex border-2 border-gray-600 rounded">
        <input
          type="text"
          className="px-4 py-2 w-80"
          placeholder="Search..."
          id="search"
          onChange={onSearch}
        />
        <button
          className="px-4 text-white bg-teal-400 border-l "
         
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchComponent;
