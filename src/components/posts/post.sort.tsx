/* eslint-disable prettier/prettier */
import { Select, SelectItem } from "@nextui-org/react";
import React from "react";

const PetPostSort = ({
  sortBy,
  handleSortChange,
  filterByCategory,
  setFilterByCategory,
}) => {
  return (
    <div className="flex mt-4 mb-5 gap-20">
      <Select
        style={{ borderRadius: "6px", width: 200 }}
        value={sortBy}
        onChange={handleSortChange}
        placeholder="Select "
      >
        <SelectItem key={"newest"} value="newest">
          Newest
        </SelectItem>
        <SelectItem key={"mostUpvoted"} value="mostUpvoted">
          Most Upvoted
        </SelectItem>
      </Select>

      <Select
        placeholder="Select by category"
        style={{ borderRadius: "6px", width: 200 }}
        value={filterByCategory}
        onChange={(e) =>
          setFilterByCategory(e.target.value as "All" | "Story" | "TIP")
        }
      >
        <SelectItem key="All" value="All">
          All
        </SelectItem>
        <SelectItem key="Story" value="Story">
          Story
        </SelectItem>
        <SelectItem key="TIP" value="TIP">
          TIP
        </SelectItem>
      </Select>
    </div>
  );
};

export default PetPostSort;
