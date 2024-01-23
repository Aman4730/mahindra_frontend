import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { notification } from "antd";
import Dialog from "@mui/material/Dialog";
import Head from "../../layout/head/Head";
import FileViewer from "react-file-viewer";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Content from "../../layout/content/Content";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import DialogTitle from "@mui/material/DialogTitle";
import { UserContext } from "../../context/UserContext";
import DialogActions from "@mui/material/DialogActions";
import LinearProgress from "@mui/material/LinearProgress";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { Viewer } from "@cyntler/react-doc-viewer";
import {
  BlockBetween,
  BlockHead,
  BlockHeadContent,
  Button,
  RSelect,
} from "../../../src/components/Component";
import {
  Autocomplete,
  Card,
  Grid,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { Document, Page } from "react-pdf";

function Fileviewer() {
  const {
    CommonNotes,
    getnotes,
    deleteNotes,
    workSpaceData,
    getmetalist,
    getdoclist,
    add_metaproperties,
    addmetaproperties,
  } = useContext(UserContext);
  const [url, setUrl] = useState("");
  const [fileType, setFileType] = useState("");
  const [doctypeName, setDoctypeName] = useState("");
  const [todos, setTodos] = useState([]);
  const [notes, setNotes] = useState([]);
  const [propertys, setPropertys] = useState([]);
  const [addProperties, setAddProperties] = useState([]);
  const [docListUpload, setDocListupload] = useState([]);
  const [formValues, setFormValues] = useState({});
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(false);
  const [addProperty, setAddProperty] = useState({
    notes: "",
  });
  const history = useHistory();
  const location = useLocation();
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    getNoteslist();
  }, [deleteId]);

  useEffect(() => {
    getNoteslist();
  }, [todos]);
  useEffect(() => {
    getmetatypelist();
    getdoclistuploadfile();
  }, []);
  // ------------------------------------------apis
  function openBase64NewTap(base64Pdf) {
    const blob = base64toblob(base64Pdf);
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(blob, "pdfBase64.pdf");
    } else {
      const blobUrl = URL.createObjectURL(blob);
      window.open(blobUrl);
    }
  }
  function base64toblob(base64Data) {
    const sliceSize = 1024;
    const byteCharacters = atob(base64Data);
    const bytesLength = byteCharacters.length;
    const slicesCount = math.ceil(bytesLength / sliceSize);
    const byteArrays = new Array(slicesCount);
    for (let sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
      const begin = sliceIndex * sliceSize;
      const end = Math.min(begin + sliceSize, bytesLength);

      const bytes = new Array(end - begin);
      for (let offset = begin, i = 0; offset < end; ++i, ++offset) {
        bytes[i] = byteCharacters[offset].charCodeAt(0);
      }
      byteArrays[sliceIndex] = new Uint8Array(bytes);
    }
    return new Blob(byteArrays, { type: "application/pdf" });
  }
  const [pdfData, setPdfData] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL_LOCAL}/filedata`,
          {
            filemongo_id: location.state.filemongo_id,
          }
        );
        setFileType(response?.data.newdata.file_type);

        const data = response.data.file_data.data;

        const uint8Array = new Uint8Array(data);

        const blob = new Blob([uint8Array], {
          type: response.data.newdata.file_type,
        });
        const url = URL.createObjectURL(blob);
        setUrl(url);
      } catch (error) {}
    };
    fetchData();
  }, []);
  const onNotesSubmit = () => {
    notification["success"]({
      placement: "top",
      description: "",
      message: "Comment Created Successfully...",
    });
    let data = {
      id: location.state.id,
      notes: addProperty.notes,
    };
    CommonNotes(
      data,
      (apiRes) => {
        resetForm();
      },
      (apiErr) => {
        console.log(apiErr);
      }
    );
  };
  const getNoteslist = () => {
    let data = {
      id: location.state.id,
    };
    getnotes(
      data,
      (apiRes) => {
        setNotes(apiRes.data.details);
      },
      (apiErr) => {
        console.log(apiErr);
      }
    );
  };
  const onDeleteClick = (id) => {
    notification["success"]({
      placement: "topLeft",
      description: "",
      message: "Comment Deleted Successfully...",
    });
    setDeleteId(true);

    let data = {
      id: id,
    };
    deleteNotes(
      data,
      (apiRes) => {
        setAuthToken(token);
        getNoteslist();
      },
      (apiErr) => {}
    );
  };
  const getdoclistuploadfile = () => {
    getdoclist(
      {},
      (apiRes) => {
        setDocListupload(apiRes?.data);
      },
      (apiErr) => {
        console.log(apiErr);
      }
    );
  };
  const [metaList, setMetaList] = useState([]);

  const getmetatypelist = () => {
    getmetalist(
      {},
      (apiRes) => {
        setMetaList(apiRes?.data);
      },
      (apiErr) => {
        console.log(apiErr);
      }
    );
  };
  const onSubmitProperties = (e) => {
    let data = {
      doctype: e?.label,
      workspace_name: workSpaceData?.workspace_name,
    };
    add_metaproperties(
      data,
      (apiRes) => {
        setAddProperties(apiRes.data);
        setAuthToken(token);
      },
      (apiErr) => {}
    );
  };
  const addmetapropertie = () => {
    notification["success"]({
      placement: "bottomLeft",
      description: "",
      message: "Added Properties",
    });
    let data = {
      doctype: doctypeName,
      fieldnames: formValues,
      file_name: location.state.file,
    };
    addmetaproperties(
      data,
      (apiRes) => {
        setAddProperties(apiRes.data);
        setAuthToken(token);
      },
      (apiErr) => {}
    );
  };

  const matchedWorkspace = metaList?.filter(
    (data) => data.workspace_name === workSpaceData?.workspace_name
  );

  const metadata = matchedWorkspace?.map((data) => ({
    label: data?.doctype,
    value: data?.doctype,
  }));

  // ------------------------------------------apis
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };
  const handleOnClick = (e) => {
    onSubmitProperties(e);
    setDoctypeName(e?.label);
  };
  const property = () => {
    addProperties?.map((data) => {
      setPropertys(data.metaproperties);
    });
  };
  useEffect(() => {
    property();
  }, [addProperties]);
  const addTask = () => {
    setTodos([...todos, addProperty]);
    setAddProperty("");
  };
  const resetForm = () => {
    setAddProperty({
      notes: "",
    });
  };
  const navigate = () => {
    history.push("/my-workspace");
  };
  const top100Films = propertys;
  return (
    <React.Fragment>
      <Head title="User List - Regular"></Head>
      <Content>
        <Stack
          style={{
            marginTop: "-30px",
            marginBottom: "12px",
            width: "100%",
          }}
          sx={{ p: 0.5 }}
        >
          <BlockHead>
            <BlockBetween>
              <BlockHeadContent>
                <Typography style={{ fontSize: "24.5px", fontWeight: "bold" }}>
                  File Viewer - {location.state.file}
                </Typography>
              </BlockHeadContent>
              <BlockHeadContent>
                <Tooltip title="Close" onClick={navigate}>
                  <HighlightOffIcon />
                </Tooltip>
              </BlockHeadContent>
            </BlockBetween>
          </BlockHead>
        </Stack>
        {/* <Document
          file={{ data: pdfData }}
          onLoadSuccess={({ numPages }) => setNumPages(numPages)}
        >
          {Array.from(new Array(numPages), (el, index) => (
            <Page
              key={`page_${index + 1}`}
              pageNumber={index + 1}
              width={500} // Set the width as needed
              height={700}
            />
          ))}
        </Document> */}
        <Stack flexDirection="row" style={{ width: "fitContent" }}>
          <div
            style={{
              border: "1px solid black",
              height: "700px",
              width: "950px",
            }}
          >
            {url.length ? (
              <>
                {url && (
                  <FileViewer
                    fileType={fileType}
                    filePath={url}
                    onError={console.error}
                    onLoad={() => {}}
                    quality="hd"
                  />

                  // <object data={url} width="100%" height="600px"></object>
                )}
              </>
            ) : (
              <LinearProgress
                color="primary"
                sx={{
                  "& .MuiLinearProgress-bar": {
                    backgroundColor: "#101924",
                    width: "300px",
                  },
                }}
                style={{
                  width: "100%",
                  position: "absolute",
                  top: 2,
                  left: 0,
                  backgroundColor: "lightgray",
                }}
              />
            )}
          </div>
          <Stack flexDirection="column">
            <Stack sx={{ pt: 1, pl: 1 }}>
              <div style={{ marginBottom: "11px" }}>
                <RSelect
                  options={metadata}
                  defaultValue="Please Select Doctype"
                  onChange={handleOnClick}
                />
              </div>
              <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 1 }}
                flexDirection="column"
              >
                {addProperties?.map((data, index) => (
                  <Stack
                    key={index}
                    flexDirection="column"
                    sx={{ p: 0.2, pl: 1 }}
                  >
                    {data.fieldtype == "Text" ? (
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          size="small"
                          variant="outlined"
                          type={data.fieldtype}
                          name={data.fieldname}
                          label={data.fieldname}
                          value={formValues[data.fieldname] || ""}
                          onChange={handleInputChange}
                          inputProps={{
                            style: {
                              height: "20px",
                            },
                          }}
                        />
                      </Grid>
                    ) : (
                      <Grid item xs={12}>
                        <Autocomplete
                          disablePortal
                          size="small"
                          id="combo-box-demo"
                          options={top100Films}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Properties"
                              size="small"
                            />
                          )}
                        />
                      </Grid>
                    )}
                  </Stack>
                ))}
              </Grid>
              <Button
                color="primary"
                onClick={addmetapropertie}
                style={{ width: "35%", marginTop: "4px" }}
              >
                Submit
              </Button>
            </Stack>
            <Stack sx={{ pt: 1, pl: 1 }}>
              <TextField
                fullWidth
                id="outlined-multiline-static"
                label="Comments"
                multiline
                rows={4}
                value={addProperty.notes}
                onChange={(e) =>
                  setAddProperty({
                    ...addProperty,
                    notes: e.target.value,
                  })
                }
              />
              <Stack flexDirection="row">
                <Button
                  color="primary"
                  onClick={() => {
                    addTask();
                    onNotesSubmit();
                  }}
                  style={{
                    marginTop: "5px",
                    marginBottom: "10px",
                  }}
                >
                  Submit
                </Button>
                <Button
                  style={{
                    height: "31px",
                    margin: "5px 0px 0px 2px",
                    background: "#6576FF",
                    padding: "15px 15px 18px 15px",
                  }}
                  onClick={handleClickOpen}
                >
                  <SearchIcon style={{ color: "white" }} />
                </Button>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
        <div>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title" sx={{ pl: 15, pr: 15 }}>
              {"Commentes"}
            </DialogTitle>
            <Grid item xs={12}>
              {notes?.map((ele, index) => {
                return (
                  <React.Fragment key={index}>
                    <Card
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                      sx={{ p: 1, m: 1 }}
                    >
                      <Stack>{ele.notes_description}</Stack>
                      <Tooltip
                        title="Delete"
                        onClick={() => onDeleteClick(ele.id)}
                        style={{ cursor: "pointer" }}
                      >
                        <DeleteIcon size="small" />
                      </Tooltip>
                    </Card>
                  </React.Fragment>
                );
              })}
            </Grid>
            <DialogActions>
              <Button onClick={handleClose} autoFocus>
                Close
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </Content>
    </React.Fragment>
  );
}
export default Fileviewer;
