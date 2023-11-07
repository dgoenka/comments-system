import { Link, Outlet } from "react-router-dom";
import routes from "../../Routes";
import styles from "./Layout.module.css";
import { Typography } from "@mui/material";
import LoginInfo from "../LoginInfo/LoginInfo.component";
import { matchRoutes, useLocation } from "react-router-dom";

function LayoutComponent(props: any) {
  const location = useLocation();
  const matches = matchRoutes(Object.values(routes), location);

  return (
    <div className={styles.main}>
      <div className={styles.navbar}>
        <ul className={styles.navbarLeft}>
          <Typography variant={"h5"}>{matches?.[0]?.route?.title}</Typography>
          <LoginInfo />
        </ul>
      </div>
      <div className={styles.body}>
        <Outlet />
      </div>
    </div>
  );
}

export default LayoutComponent;
