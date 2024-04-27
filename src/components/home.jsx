import React, { useState } from "react";

import ArticlesItem from "./articles/articlesItem";
import NavBar from "./navBar";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");

  return (
    <>
      <NavBar
        setSearchQuery={setSearchQuery}
        sortDirection={sortDirection}
        setSortDirection={setSortDirection}
      />
      <div>
        <ArticlesItem
          searchQuery={searchQuery}
          isSortByDate={true}
          sortDirection={sortDirection}
        />
      </div>
    </>
  );
};

export default Home;
