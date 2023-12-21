import { Stack, Typography } from "@mui/material";
import React from "react";
import { BlockBetween, BlockHead, BlockHeadContent } from "../Component";

const Header = () => {
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
              Logs
            </Typography>
          </BlockHeadContent>
          <BlockHeadContent>
            {/* <div className="toggle-wrap nk-block-tools-toggle">
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
                  // marginBottom: "-60px",
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
                      Upload File
                    </Button>
                  </li>
                </ul>
              </div>
            </div> */}
          </BlockHeadContent>
        </BlockBetween>
      </BlockHead>
    </Stack>
  );
};

export default Header;
