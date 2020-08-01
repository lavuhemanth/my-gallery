import React from "react";
import InputField from "./inputField";
import { SortAlphaUp, SortAlphaDown, Filter } from "react-bootstrap-icons";

const FilterSection = ({
  filterOptions,
  isSortBy,
  handleInput,
  searchText,
  handleSorting,
}) => {
  return (
    <div className="row m-3 align-items-right">
      <div className="col-sm-12 row align-items-center justify-content-end">
        <span>
          <Filter size="2em" className="theme-color" />
        </span>
        <span className="mx-2 mt-2">
          <select
            name="label"
            className="custom-select  mb-3"
            id="label"
            onChange={handleInput}
          >
            <option value="title">Title</option>
            <option value="name">Name</option>
            <option value="type">Type</option>
          </select>
        </span>
        <span className="mx-2 mt-2">
          <InputField
            value={filterOptions.searchText}
            type="text"
            refs={searchText}
            placeholder={filterOptions.label.toUpperCase()}
            name="searchText"
            id="searchText"
            onChange={handleInput}
          />
        </span>
        <span className="mx-2">
          {isSortBy ? (
            <SortAlphaUp
              size="2em"
              className="theme-color"
              onClick={() => handleSorting("DES")}
            />
          ) : (
            <SortAlphaDown
              size="2em"
              className="theme-color"
              onClick={() => handleSorting("ASC")}
            />
          )}
        </span>
      </div>
    </div>
  );
};

export default FilterSection;
