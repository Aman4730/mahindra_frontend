import { IconButton, Link, Stack, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  BlockBetween,
  BlockHead,
  BlockHeadContent,
  Button,
  Icon,
} from "../Component";
import SearchIcon from "@mui/icons-material/Search";
// import SearchBar from "../SearchBar";
import SearchBar from "../../components/SearchBar";

const GuestTSHeader = ({
  sm,
  list,
  isLogin,
  policies,
  heading,
  updateSm,
  openModal,
  findFolder,
  searchTerm,
  setSearchTerm,
  callApiHeader,
  openFileUpload,
}) => {
  const [open, setOpen] = useState(false);
  const [modal, setModal] = useState({
    edit: false,
    add: false,
  });
  useEffect(() => {
    // After 5 seconds, set open to false
    const timeoutId = setTimeout(() => {
      setOpen(false);
    }, 15000);
    // Clean up the timeout when the component unmounts or when open changes
    return () => clearTimeout(timeoutId);
  }, []);
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
              Guest TeamSpace
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
              {isLogin.user_type == "Admin" ? (
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
                    {open == false ? (
                      <li className="nk-block-tools-opt">
                        <Button
                          color="primary"
                          className="btn-icon"
                          onClick={() => setOpen(true)}
                          style={{ padding: "2px 5px 2px 5px" }}
                        >
                          <SearchIcon fontSize="small" />
                        </Button>
                      </li>
                    ) : (
                      <li className="nk-block-tools-opt">
                        <SearchBar
                          handleClick={() => setModal({ add: true })}
                          searchButton="true"
                          searchTerm={searchTerm}
                          setSearchTerm={setSearchTerm}
                        />
                      </li>
                    )}
                  </ul>
                </div>
              ) : (
                <div
                  className="toggle-expand-content"
                  style={{
                    display: sm ? "block" : "none",
                    marginBottom: "-15px",
                  }}
                >
                  <ul className="nk-block-tools g-3">
                    <li className="nk-block-tools-opt">
                      {
                        (policies.create_folder = "true" ? (
                          <Button
                            color="primary"
                            className="btn-icon"
                            onClick={openModal}
                            style={{ padding: "2px 5px 2px 5px" }}
                          >
                            Create Folder
                          </Button>
                        ) : (
                          ""
                        ))
                      }
                    </li>
                    <li className="nk-block-tools-opt">
                      {policies.upload_folder == "true" ? (
                        <Button
                          color="primary"
                          className="btn-icon"
                          onClick={openFileUpload}
                          style={{ padding: "2px 5px 2px 5px" }}
                        >
                          Upload Folder
                        </Button>
                      ) : (
                        ""
                      )}
                    </li>
                    <li className="nk-block-tools-opt">
                      {
                        (policies.upload_file = "true" ? (
                          <Button
                            color="primary"
                            className="btn-icon"
                            onClick={openFileUpload}
                            style={{ padding: "2px 5px 2px 5px" }}
                          >
                            Upload File
                          </Button>
                        ) : (
                          ""
                        ))
                      }
                    </li>
                  </ul>
                </div>
              )}
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

export default GuestTSHeader;
