import { Link } from "react-router-dom";
import React from "react";
import { useSelector } from "react-redux";

import styles from "./Header.module.scss";

import { AppBar, Toolbar, Button, Typography } from "@material-ui/core";
import RestaurantIcon from "@material-ui/icons/Restaurant";
import ProfileNav from "./ProfileNav/ProfileNav";

export default function Header(props) {
  const user = useSelector((state) => state.auth);

  return (
    <div>
      <AppBar className={styles.navBar} position="static">
        <Toolbar>
          <RestaurantIcon className={styles.navBarIcon} />
          <h1 className={styles.navBarTitle}>
            <Link className={styles.navBarHomeLink} to="/">
              DQueue
            </Link>
          </h1>
          {Object.keys(user).length > 0 ? (
            <ProfileNav username={user.first_name} />
          ) : (
            <>
              <Button
                color="primary"
                className={styles.navBarBtn}
                component={Link}
                to="/sign/merchant"
              >
                <h3>Join as Merchant</h3>
              </Button>
              <Button
                color="primary"
                className={styles.navBarBtn}
                component={Link}
                to="/sign/user"
              >
                <h3>Login</h3>
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
