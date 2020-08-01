import React, { Component } from "react";
import { PlusCircleFill } from "react-bootstrap-icons";
import Header from "./header";
import ImageCard from "../common/imageCard";
import * as data from "../assets/data.json";
import FilterSection from "../common/filterSection";

class Main extends Component {
  searchText = React.createRef();
  state = {
    gallery: data.images,
    filter: [],
    isSortBy: false,
    filterOptions: {
      label: "title",
      searchText: "",
    },
  };

  onClickLike = (id) => {
    let { gallery } = this.state;
    gallery = gallery.filter((data) => {
      if (data.id === id) {
        data.likeCount++;
      }
      return data;
    });

    this.setState({ gallery });
  };

  filterGallery = () => {
    const { gallery, filterOptions } = this.state;
    if (filterOptions.searchText.length > 3) {
      const filterArr = gallery.filter((item) =>
        item[filterOptions.label]
          .toLowerCase()
          .includes(filterOptions.searchText.toLowerCase())
      );
      this.setState({ filter: filterArr });
    } else if (filterOptions.searchText.length === 0) {
      this.setState({ filter: gallery });
    }
  };

  handleInput = (e) => {
    const { filterOptions } = this.state;
    filterOptions[e.currentTarget.name] = e.currentTarget.value;
    this.setState({ filterOptions });
    this.filterGallery();
  };
  sorting = (item1, item2) => {
    const { filterOptions } = this.state;
    var nameA = item1[filterOptions.label].toUpperCase(); // ignore upper and lowercase
    var nameB = item2[filterOptions.label].toUpperCase(); // ignore upper and lowercase

    if (nameA < nameB) {
      return -1;
    }

    if (nameA > nameB) {
      return 1;
    }

    // names must be equal
    return 0;
  };

  handleSorting = (typeOfSort) => {
    let { gallery, filter, isSortBy } = this.state;
    const sortArray = filter.length
      ? filter.sort((item1, item2) => this.sorting(item1, item2))
      : gallery.sort((item1, item2) => this.sorting(item1, item2));
    if (typeOfSort === "DES" && sortArray.length) sortArray.reverse();
    this.setState({ filter: sortArray, isSortBy: !isSortBy });
  };

  render() {
    const { filterOptions, filter, gallery, isSortBy } = this.state;

    return (
      <>
        <Header {...this.props} />
        <FilterSection
          searchText={this.searchText}
          filterOptions={filterOptions}
          isSortBy={isSortBy}
          handleInput={this.handleInput}
          handleSorting={(typeOfSort) => this.handleSorting(typeOfSort)}
        />
        <div className="row m-3 align-items-center">
          {filter.length
            ? filter.map((data) => {
                return (
                  <div className="col-sm-4 mb-3" key={data.id}>
                    <ImageCard {...data} onClickLike={this.onClickLike} />
                  </div>
                );
              })
            : gallery.map((data) => {
                return (
                  <div className="col-sm-4 mb-3" key={data.id}>
                    <ImageCard {...data} onClickLike={this.onClickLike} />
                  </div>
                );
              })}
        </div>
        <div className="floating-btn">
          <PlusCircleFill size="2em" className="theme-color" />
        </div>
      </>
    );
  }
}

export default Main;
