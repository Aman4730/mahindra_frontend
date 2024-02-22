import React, { useState, createContext, useEffect } from "react";
export const AuthContext = createContext();
import { AxiosPost } from "./Axios";
var Buffer = require("buffer/").Buffer;

export const AuthContextProvider = (props) => {
  //Login User/Admin
  let stringifyData = localStorage.getItem("user");
  let isLogin = null;
  if (stringifyData) {
    isLogin = JSON.parse(stringifyData);
  }
  //Login Guest
  let guestdata = localStorage.getItem("guestlogin");
  let guestlogin = null;
  if (guestdata) {
    guestlogin = JSON.parse(guestdata);
  }
  const [authMenu, setAuthMenu] = useState([]);
  useEffect(() => {
    if (isLogin?.user_type == "Admin") {
      setAuthMenu([
        {
          icon: "slack-hash",
          text: "Admin",
          active: true,
          subMenu: [
            {
              icon: "user",
              text: "Users",
              active: true,
              link: "/user-list",
            },
            {
              icon: "users",
              text: "Groups",
              active: true,
              link: "/groups",
            },
            {
              icon: "mail-fill",
              text: "Smtp",
              active: true,
              link: "/smtp",
            },
            {
              icon: "account-setting-fill",
              text: "Roles",
              active: true,
              link: "/user-list",
            },
            {
              icon: "account-setting-fill",
              text: "SystemInfo",
              active: true,
              link: "/systemInfo",
            },
          ],
        },
      ]);
    } else if (isLogin?.user_type == "User") {
      setAuthMenu([]);
    } else {
      setAuthMenu([
        {
          icon: "package-fill",
          text: " TeamSpace",
          active: true,
          subMenu: [
            {
              icon: "user",
              text: "Guest Workspace",
              active: true,
              link: "/guestTeamSpace",
            },
          ],
        },
      ]);
    }
  }, []);
  async function loginWithOTP(data, handleApiRes, handleApiError) {
    await AxiosPost(
      "loginWIthOTP",
      data,
      (apiRes) => {
        handleApiRes(apiRes);
      },
      (apiError) => {
        handleApiError(apiError);
      }
    );
  }
  async function verifyOTP(data, handleApiRes, handleApiError) {
    await AxiosPost(
      "verifyOTP",
      data,
      (apiRes) => {
        handleApiRes(apiRes);
      },
      (apiError) => {
        handleApiError(apiError);
      }
    );
  }
  const logOut = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };
  const GuestLogOUt = () => {
    localStorage.removeItem("guest");
    localStorage.removeItem("token");
    localStorage.removeItem("guestlogin");
  };
  return (
    <AuthContext.Provider
      value={{
        isLogin,
        guestlogin,
        userAuthContextData: [isLogin || guestlogin],
        menuData: authMenu,
        loginWithOTP: loginWithOTP,
        verifyOTP: verifyOTP,
        logOut: logOut,
        GuestLogOUt: GuestLogOUt,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
