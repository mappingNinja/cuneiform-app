import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaSortUp, FaSortDown } from "react-icons/fa";

const NavBar = ({ setSearchQuery, sortDirection, setSortDirection }) => {
  const [searchInput, setSearchInput] = useState("");

  const handleSortToggle = () => {
    setSortDirection((prevDirection) =>
      prevDirection === "asc" ? "desc" : "asc"
    );
  };

  const handleSearchInputChange = (e) => {
    const { value } = e?.target;
    setSearchInput(value);
    setSearchQuery(value);
  };

  return (
    <div>
      <nav
        className="navbar fixed-top navbar-expand-lg bg-dark"
        style={{ zIndex: 1 }}
      >
        <div className="container-fluid">
          <h2 className="navbar-brand" style={{ color: "white" }}>
            Cuneiform Articles
          </h2>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            class="collapse navbar-collapse align-items-center justify-content-center"
            id="navbarSupportedContent"
          >
            <ul class="navbar-nav mr-auto">
              <li class="nav-item active">
                <Link class="nav-link text-white" to={"/"}>
                  Home
                </Link>
              </li>
              <li class="nav-item active">
                <Link class="nav-link text-white" to={"/articleForm"}>
                  Create
                </Link>
              </li>
              <li className="nav-item active" onClick={handleSortToggle}>
                <a className="nav-link text-white" href="#">
                  Sort By Date{" "}
                  {sortDirection === "asc" ? <FaSortUp /> : <FaSortDown />}
                </a>
              </li>
            </ul>
          </div>
          <div className="float-right" id="navbarSupportedContent">
            <div className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="text"
                placeholder="Search"
                aria-label="Search"
                value={searchInput}
                onChange={handleSearchInputChange}
              />
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
