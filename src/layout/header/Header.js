import React from "react";
import classNames from "classnames";
import Toggle from "../sidebar/Toggle";
import Logo from "../logo/Logo";
import News from "../news/News";
import User from "./dropdown/user/User";
import Notification from "./dropdown/Notification/Notification";
import { Link } from "react-router-dom";
import { BlockHeadContent, BlockTitle } from "../../components/Component";
import { Stack } from "@mui/material";

const Header = ({ fixed, theme, className, setVisibility, ...props }) => {
  const headerClass = classNames({
    "nk-header": true,
    "nk-header-fixed": fixed,
    [`is-light`]: theme === "white",
    [`is-${theme}`]: theme !== "white" && theme !== "light",
    [`${className}`]: className,
  });
  return (
    <div className={headerClass} style={{ right: "-20px", marginTop: "-4px" }}>
      <div className="container-fluid">
        <div className="nk-header-wrap">
          <div className="nk-menu-trigger d-xl-none ml-n1">
            <Toggle
              className="nk-nav-toggle nk-quick-nav-icon d-xl-none ml-n1"
              icon="menu"
              click={props.sidebarToggle}
            />
          </div>
          <div className="nk-header-brand d-xl-none">
            <Logo />
          </div>
          <div className="nk-header-news d-none d-xl-block"></div>
          <div className="nk-header-tools">
            <ul className="nk-quick-nav">
              <Stack
                style={{
                  fontSize: "24.5px",
                  marginLeft: "100px",
                }}
              >
                <BlockHeadContent>
                  <BlockTitle>PHOTON</BlockTitle>
                </BlockHeadContent>
              </Stack>
            </ul>
          </div>
          <div className="nk-header-tools">
            <ul className="nk-quick-nav">
              <li
                className="notification-dropdown mr-n1"
                onClick={() => setVisibility(false)}
              >
                <Notification />
              </li>
              <li
                className="user-dropdown"
                onClick={() => setVisibility(false)}
              >
                <User />
              </li>
            </ul>
          </div>
          <div>
            <Link to={process.env.PUBLIC_URL + "/"} className="logo-link">
              <img
                style={{
                  width: "86px",
                  height: "65px",
                }}
                src="/Image/photon1.jpeg"
                alt="logo-dark"
              ></img>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Header;
