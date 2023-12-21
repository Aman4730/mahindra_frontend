import React from "react";
import { Link, Stack, Typography } from "@mui/material";
import {
  BlockBetween,
  BlockHead,
  BlockHeadContent,
  Button,
  Icon,
} from "../Component";

const TeamSpaceHeader = ({
  updateSm,
  sm,
  openModal,
  list,
  openFileUpload,
  findFolder,
  callApiHeader,
}) => {
  function handleClick(event) {
    event.preventDefault();
    console.info("You clicked a breadcrumb.");
  }
  const breadcrumbs = [
    <Link
      underline="hover"
      key="1"
      color="inherit"
      href="/"
      onClick={handleClick}
    >
      test
    </Link>,
    <Link
      underline="hover"
      key="2"
      color="inherit"
      href="/material-ui/getting-started/installation/"
      onClick={handleClick}
    >
      folder
    </Link>,
    <Typography key="3" color="text.primary">
      subfolder
    </Typography>,
  ];
  return (
    <Stack>
      <BlockHead size="sm">
        <BlockBetween>
          <BlockHeadContent>
            <Typography
              style={{
                fontSize: "24.5px",
                fontWeight: "bold",
              }}
            >
              Team Space
            </Typography>
          </BlockHeadContent>
          <BlockHeadContent>
            <div className="toggle-wrap nk-block-tools-toggle">
              <Button
                className={`btn-icon btn-trigger toggle-expand mr-n1 ${
                  sm ? "active" : ""
                }`}
                onClick={() => updateSm(!sm)}
              >
                <Icon name="menu-alt-r"></Icon>
              </Button>
              <div
                className="toggle-expand-content"
                style={{
                  display: sm ? "block" : "none",
                  marginBottom: "-15px",
                }}
              >
                <ul className="nk-block-tools g-3">
                  <li className="nk-block-tools-opt">
                    <Button
                      color="primary"
                      className="btn-icon"
                      onClick={openModal}
                      style={{ padding: "2px 5px 2px 5px" }}
                    >
                      Create Folder
                    </Button>
                  </li>
                  <li className="nk-block-tools-opt">
                    <Button
                      color="primary"
                      className="btn-icon"
                      onClick={openFileUpload}
                      style={{ padding: "2px 5px 2px 5px" }}
                    >
                      Upload Folder
                    </Button>
                  </li>
                  <li className="nk-block-tools-opt">
                    <Button
                      color="primary"
                      className="btn-icon"
                      onClick={openFileUpload}
                      style={{ padding: "2px 5px 2px 5px" }}
                    >
                      Upload File
                    </Button>
                  </li>
                </ul>
              </div>
            </div>
          </BlockHeadContent>
        </BlockBetween>
      </BlockHead>
      <div
        style={{
          display: "flex",
          margin: "-15px 0px 3px 0px",
          fontSize: "16px",
        }}
      >
        {list?.map((data, index) => (
          <div
            onClick={() => callApiHeader({ ...data, index })}
            style={{ cursor: "pointer" }}
          >
            {data?.folder_name ? (
              <p onClick={() => findFolder(data)} style={{ cursor: "pointer" }}>
                {data?.folder_name} /
              </p>
            ) : (
              ""
            )}
          </div>
        ))}
      </div>
    </Stack>
  );
};

export default TeamSpaceHeader;
