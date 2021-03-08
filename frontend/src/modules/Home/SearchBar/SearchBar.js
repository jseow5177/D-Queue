import React from "react";
import { Paper, IconButton, InputBase } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

import styles from "./SearchBar.module.scss";

export default function SearchBar(props) {
  return (
    <div className={styles.searchBarDiv}>
      <h1 className={styles.bannerTitle}>Food is better without queueing</h1>
    </div>
  );
}

// <Paper component="form" className={styles.searchBar}>
//   <InputBase
//     className={styles.searchInput}
//     fullWidth
//     placeholder="Search for restaurants"
//   />
//   <IconButton type="submit">
//     <SearchIcon />
//   </IconButton>
// </Paper>;
