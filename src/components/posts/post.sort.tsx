/* eslint-disable prettier/prettier */
import React from "react";

const PetPostSort = ({sortBy,handleSortChange,filterByCategory,setFilterByCategory}) => {
  return (
    <div className="flex mt-4 gap-20">
      <div className="flex w-full max-w-screen-md mb-1">
        <select
          className="border bg-purple-600 rounded-md px-3 py-2"
          id="sort"
          value={sortBy}
          onChange={handleSortChange}
        >
          <option value="newest">Newest</option>
          <option value="mostUpvoted">Most Upvoted</option>
        </select>
      </div>
      <div className="flex  w-full max-w-screen-md mb-1">
        <select
          className="border bg-purple-600 rounded-md px-3 py-2"
          id="filter"
          value={filterByCategory}
          onChange={(e) =>
            setFilterByCategory(e.target.value as "All" | "Story" | "TIP")
          }
        >
          <option value="All">All</option>
          <option value="Story">Story</option>
          <option value="TIP">TIP</option>
        </select>
      </div>
    </div>
  );
};

export default PetPostSort;
