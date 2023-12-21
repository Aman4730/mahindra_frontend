import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { notification } from "antd";
import Head from "../../layout/head/Head";
import ModalPop from "../../components/Modal";
import CommonTable from "../../components/Table";
import Content from "../../layout/content/Content";
import "react-datepicker/dist/react-datepicker.css";
import { LinearProgress, Stack } from "@mui/material";
import WS1Header from "../../components/WS1Header.jsx";
import { AuthContext } from "../../context/AuthContext";
import { UserContext } from "../../context/UserContext";
import CreateLinkModel from "../../components/CreateLinkModel";
import FileUpload from "../../components/FileUploadModal/FileUpload";
import Foldercreate from "../../components/Foldercreate/Foldercreate";
import FileFolderProperties from "../../components/FileFolderProperties/index.jsx";
import FileFolderComments from "../../components/FileFolderComments/index.jsx";
import FileVersion from "../../components/FileVersion/index.jsx";
import FileFolderMove from "../../components/FileFolderMove/index.jsx";
const WS1 = () => {
  useEffect(() => {
    getAllfoldernames({
      workspace_name: workSpaceData.workspace_name,
      user_id: userIdStore.user_id,
      workspace_id: retrievedWorkspaceId,
    }),
      getdoclistuploadfile();
    getTableDropdown();
    getWorkspacedata();
    getUserRselect();
  }, []);
  const {
    contextData,
    workSpaceData,
    getdoclist,
    getfoldernameslist,
    addcreatefolder,
    add_metaproperties,
    getfetchlink,
    deletefile,
    getWorkspace,
    getpolicy,
    isLogin,
    getallversions,
    userDropdownU,
    getnotes,
    deleteNotes,
    CommonNotes,
  } = useContext(UserContext);
  const [sm, updateSm] = useState(false);
  const [userData, setUserData] = contextData;
  const [fileDesc, setFileDesc] = useState("");
  const [policies, setPolicies] = useState([]);
  const [formValues, setFormValues] = useState({});
  const { setAuthToken } = useContext(AuthContext);
  const [doctypeName, setDoctypeName] = useState("");
  const [workspace, setWorkspace] = useState([]);
  const [userIdStore, setUserIdStore] = useState([]);
  const [docListUpload, setDocListupload] = useState([]);
  const [addProperties, setAddProperties] = useState([]);
  useEffect(() => {
    let newData;
    newData = userData.map((item) => {
      item.checked = false;
      return item;
    });
    setUserData([...newData]);
  }, []);
  // ------------------------------------------------getApis Start
  const PermissionPolicy = isLogin?.Permission;
  const getTableDropdown = () => {
    getpolicy(
      {},
      (apiRes) => {
        const data = apiRes.data.data2;
        setPolicies(data);
        setGroupsDropdown(
          data.groups.map((gro) => ({
            label: gro.group_name,
            value: gro.id,
          }))
        );
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
  const getWorkspacedata = () => {
    getWorkspace(
      {},
      (apiRes) => {
        setWorkspace(apiRes?.data);
      },
      (apiErr) => {
        console.log(apiErr);
      }
    );
  };
  const [userDropdowns, setUserDropdowns] = useState([]);
  const getUserRselect = () => {
    userDropdownU(
      {},
      (apiRes) => {
        setUserDropdowns(apiRes.data.data);
      },
      (apiErr) => {}
    );
  };
  const [allfolderlist, setAllfolderlist] = useState([]);
  const [allMoveFile, setAllMoveFile] = useState([]);
  console.log(allMoveFile, "pppppppppppp");
  const getAllfoldernames = (
    data = {
      workspace_name: workSpaceData?.workspace_name,
      user_id: userIdStore.user_id,
      workspace_id: retrievedWorkspaceId,
    }
  ) => {
    getfoldernameslist(
      data,
      (apiRes) => {
        console.log(apiRes, "alldata ");
        setAllMoveFile([apiRes?.data?.files]);
        setAllfolderlist([...apiRes?.data?.files, ...apiRes?.data?.folders]);
      },
      (apiErr) => {
        console.log("====> api get folder name", apiErr);
      }
    );
  };
  // ------------------------------------------------getApis End
  // ------------------------------------------------postApis Start
  const handleOnClick = (selectedOption) => {
    onSubmitProperties(selectedOption);
    setDoctypeName(selectedOption?.doctype_name);
  };
  const onSubmitProperties = (selectedOption) => {
    let data = {
      doctype: selectedOption?.doctype_name,
    };
    add_metaproperties(
      data,
      (apiRes) => {
        setAddProperties(apiRes.data);
        getUsers();
        setAuthToken(token);
      },
      (apiErr) => {}
    );
  };
  // ------------------------------------------------postApis End
  // ------------------------------------------------Delete File Folder
  const [deleteId, setDeleteId] = useState(false);

  const [openDelete, setOpenDelete] = React.useState({
    status: false,
    data: {},
  });
  const handleClickOpen = (id, file_type) => {
    setOpenDelete({
      status: true,
      data: { id, file_type },
    });
  };
  const handleCloseDelete = () => {
    setOpenDelete({
      status: false,
      data: "",
    });
  };
  const onDeleteClick = (id, file_type) => {
    handleCloseDelete();
    let data = {
      id: id,
      file: file_type,
    };
    deletefile(
      data,
      (apiRes) => {
        notification["success"]({
          placement: "top",
          description: "",
          message: "Deleted Successfully...",
          style: {
            height: 60,
          },
        });
        getAllfoldernames();
        setAuthToken(token);
      },
      (apiErr) => {}
    );
    let newData = {
      parent_id: currentFolderData.id,
      levels: currentFolderData.levels + 1,
      workspace_name: workSpaceData.workspace_name,
      workspace_id: retrievedWorkspaceId,
      user_id: userIdStore.user_id,
    };
    getAllfoldernames(newData);
  };
  // ------------------------------------------------Delete File Folder
  // ------------------------------------------------Create Folder Start
  const [folderNameInput, setFolderNameInput] = useState({
    name: "",
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFolderNameInput((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const handleClose = () => {
    setOpen({
      status: false,
      data: "",
    });
  };

  const onFormSubmit = () => {
    handleClose();
    resetForm();
    let data = {
      user_id: userIdStore.user_id,
      workspace_id: workSpaceData.workspace_id,
      workspace_name: workSpaceData.workspace_name,
      workspace_type: "My Workspace",
      policies_id: isLogin?.user_type == "Admin" ? "" : PermissionPolicy[0]?.id,
      folder_name: folderNameInput.name,
      levels: currentFolderData.levels,
      parent_id: currentFolderData.parent_id,
      folder_id: currentFolderData.id,
    };
    addcreatefolder(
      data,
      async (apiRes) => {
        if (apiRes.status === 201) {
          notification["success"]({
            placement: "top",
            description: "",
            message: "Folder Created Successfully...",
            style: {
              height: 60,
            },
          });
        }
      },
      (apiErr) => {}
    );
    let newData = {
      parent_id: currentFolderData.id,
      levels: currentFolderData.levels + 1,
      workspace_name: workSpaceData.workspace_name,
      workspace_id: retrievedWorkspaceId,
      user_id: userIdStore.user_id,
    };
    getAllfoldernames(newData);
  };
  const addNew = () => {
    onFormSubmit();
  };
  const [open, setOpen] = useState({
    status: false,
    data: "",
  });
  // ------------------------------------------------Create Folder End
  // ------------------------------------------------file upload
  const [folderName, setFolderName] = useState();
  const [file, setFile] = useState(null);
  console.log(file, "222222222222");
  const [fileName, setFileName] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fileModal, setFileModal] = useState({
    status: false,
    data: "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };
  const handleFileClose = () => {
    resetFileForm();
    setLoading(false);
    setFileUpload(false);
  };
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };
  const [getFile, setGetFile] = useState(false);

  console.log(folderName, "folderName");
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const data = {
        user_id: userIdStore.user_id,
        workspace_id: workSpaceData.workspace_id,
        workspace_name: workSpaceData.workspace_name,
        folder_id: folderName?.id || null,
        policies_id:
          isLogin?.user_type == "Admin" ? "" : PermissionPolicy[0]?.id,
        doctype: doctypeName,
        fileDesc: fileDesc,
        file_Size: file.size,
        Feilds_Name: formValues,
        workspace_type: "My Workspace",
      };
      const formData = new FormData();
      formData.append("file", file);
      formData.append("data", JSON.stringify(data));
      const quary = [[file.size], [workSpaceData.workspace_name]];
      const file_type = file.name.split(".")[1];
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL_LOCAL}/uploadcreate?q=${quary}&fileExtension=${file_type}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setFileName(response.data);
      if (response.status == 200) {
        notification["success"]({
          placement: "top",
          description: "",
          message: response.data.message,
          style: {
            height: 60,
          },
        });
        setLoading(false);
        resetFileForm();
        setFileUpload(false);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      // Show an error notification if necessary
      if (error.response.status == 400) {
        notification["warning"]({
          placement: "top",
          description: "",
          message: error.response.data.message,
          style: {
            height: 60,
          },
        });
      }
      setLoading(false);
      resetFileForm();
      setFileUpload(false);
    } finally {
      setGetFile(false);
    }
  };
  const CancelFileUpload = () => {
    handleFileClose();
    const apiUrl = `${process.env.REACT_APP_API_URL_LOCAL}/cancelfileupload`;

    axios
      .post(apiUrl, {
        /* Your data object here */
      })
      .then((response) => {
        if (response.status === 200) {
          notification["success"]({
            placement: "top",
            description: "",
            message: response.data.message,
            style: {
              marginTop: "49px",
              height: "60px",
            },
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // ------------------------------------------------file upload
  // ------------------------------------------------file Download
  const onDownloadfolders = (filemongo_id, folder_name) => {
    console.log(folder_name);
    const apiUrl = `${process.env.REACT_APP_API_URL_LOCAL}/downloadfolders`;
    const requestData = { folder_id: filemongo_id };

    axios
      .post(apiUrl, requestData, { responseType: "arraybuffer" }) // Specify responseType as arraybuffer
      .then((response) => {
        notification["success"]({
          placement: "top",
          description: "",
          message: "Folder Download Successfully...",
          style: {
            marginTop: "48px",
            height: "63px",
          },
        });
        const blob = new Blob([response.data], { type: "application/zip" });
        const url = URL.createObjectURL(blob);
        const anchor = document.createElement("a");
        anchor.href = url;
        anchor.target = "_blank";
        anchor.download = `${folder_name}`;
        anchor.click();

        URL.revokeObjectURL(url); // Clean up the object URL
      })
      .catch((error) => {
        console.error("Error downloading the folder:", error);
      });
  };
  const onFileDownload = (filemongo_id, file_name) => {
    const apiUrl = `${process.env.REACT_APP_API_URL_LOCAL}/downloadfile`;
    const requestData = { filemongo_id: filemongo_id };

    axios
      .post(apiUrl, requestData, {
        responseType: "blob",
      })
      .then((response) => {
        notification["success"]({
          placement: "top",
          description: "",
          message: "File Download Successfully...",
          style: {
            marginTop: "48px",
            height: "63px",
          },
        });
        const blob = new Blob([response.data]);
        const fileName = file_name;
        // Use the split() method to separate the name and extension
        const parts = fileName.split(".");
        const name = parts[0];
        const extension = parts[1];

        // Create a temporary URL for the Blob
        const url = URL.createObjectURL(blob);

        // Create a link element
        const link = document.createElement("a");
        link.href = url;

        // Replace 'your_file_name.extension' with the desired file name and extension
        link.download = `${name}.${extension}`;
        // Append the link to the DOM and trigger the download
        document.body.appendChild(link);
        link.click();

        // Clean up the temporary URL and link
        URL.revokeObjectURL(url);
        link.remove();
      })
      .catch((error) => {
        console.error("Error downloading the file:", error);
      });
  };
  // ------------------------------------------------file Download
  // ------------------------------------------------Start Share Link Modal
  const [shareId, setShareId] = useState({});
  const [shareLink, setShareLink] = useState([]);
  const [openLink, setOpenLink] = useState(false);
  const [error, setError] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [shareFormData, setShareFormData] = useState({
    Email: "",
    Password: "",
    Message: "",
    Subject: "",
    Type: "",
    userDropdowns: "",
  });
  console.log(shareFormData, "klkl");
  const [checkboxValues, setCheckboxValues] = useState({
    View: false,
    Download: false,
    Upload: false,
    Print: false,
    create_folder: false,
    upload_file: false,
    upload_folder: false,
  });
  const handleClickLinkOpen = (id, file_type) => {
    setShareId({ id: id, file_type: file_type });
    setOpenLink(true);
  };
  const handleLinkClose = () => {
    resetState();
    setOpenLink(false);
    resetCheckboxState();
  };
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const handleShareData = (e) => {
    const { name, value } = e.target;
    setShareFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setCheckboxValues((prevValues) => ({
      ...prevValues,
      [name]: checked,
    }));
  };
  const handleSubmitShareData = () => {
    onFetchlink();
  };
  const onFetchlink = () => {
    handleLinkClose();

    let data = {
      id: shareId.id,
      link_expiry: selectedDate,
      user_type: shareFormData.Type,
      view: checkboxValues.View,
      email: shareFormData?.Email,
      print: checkboxValues.Print,
      file_type: shareId.file_type || "",
      upload: checkboxValues.Upload,
      file_folder_name: shareId.name,
      message: shareFormData.Message,
      subject: shareFormData.Subject,
      password: shareFormData.Password,
      download: checkboxValues.Download,
      upload_file: checkboxValues.upload_file,
      user_email: shareFormData?.userDropdowns?.email,
      create_folder: checkboxValues.create_folder,
      upload_folder: checkboxValues.upload_folder,
    };

    getfetchlink(
      data,
      (apiRes) => {
        setShareLink(apiRes?.data);
        // Show success notification
        notification["success"]({
          placement: "top",
          description: "",
          message: "Link Shared Successfully...",
          style: {
            marginTop: "45px",
            height: "60px",
          },
        });
      },
      (apiErr) => {
        // For example, you can show an error notification if needed
        console.error("Error sharing link:", apiErr);
        notification["error"]({
          placement: "top",
          description: "An error occurred while sharing the link.",
          message: "Error",
          style: {
            marginTop: "45px",
            height: "60px",
          },
        });
      }
    );
  };
  // ------------------------------------------------End Share Link Modal
  // ------------------------------------------------Reset Form Start
  const resetForm = () => {
    setFolderNameInput({
      name: "",
    });
  };
  const resetState = () => {
    setShareFormData({
      Email: "",
      Password: "",
      Message: "",
      Subject: "",
    });
  };
  const resetFileForm = () => {
    setFile("");
    setFileDesc("");
    setFormValues({});
    setDoctypeName("");
  };
  const resetCheckboxState = () => {
    setCheckboxValues({
      View: false,
      Download: false,
      Upload: false,
      Print: false,
    });
  };
  // ------------------------------------------------Reset Form End
  const [folderList, setFolderList] = useState([{ name: "test" }]);
  const [fileUpload, setFileUpload] = useState(false);
  const [propertys, setPropertys] = useState([]);
  const tableHeader = [
    {
      id: "name",
      numeric: false,
      disablePadding: true,
      label: "Folder / File Name ",
    },

    {
      id: "Update Date/Time",
      numeric: false,
      disablePadding: true,
      label: "Update D/T",
    },
    {
      id: "Uploaded By",
      numeric: false,
      disablePadding: true,
      label: "Uploaded By",
    },
    {
      id: "Size",
      numeric: false,
      disablePadding: true,
      label: "Size",
    },
    {
      id: "name",
      numeric: false,
      disablePadding: true,
      label: "Actions",
      style: { marginLeft: "230px" },
    },
  ];
  // ------------------------------------------------Folder Routing
  const [state, setState] = useState({ id: 0, data: [] }); //
  const [newArr, setNewArr] = useState({ data: [] });
  const [input, setInput] = useState("");
  const [searchTerm, setSearchTerm] = React.useState("");
  const [id, setId] = useState(0);
  const retrievedWorkspaceName = localStorage.getItem("workspace_name");
  const retrievedWorkspaceId = localStorage.getItem("workspace_id");
  useEffect(() => {
    let api = [];
    setState({ id: 0, data: api });
  }, []);
  const [list, setList] = useState([
    { id: "its_me", folder_name: workSpaceData.workspace_name },
  ]);
  useEffect(() => {
    setList([{ id: "its_me", folder_name: retrievedWorkspaceName }]);
    getAllfoldernames({
      workspace_name: retrievedWorkspaceName,
      user_id: userIdStore.user_id,
      workspace_id: retrievedWorkspaceId,
    });
  }, [workSpaceData?.workspace_name]);
  const nestedFolder = (obj, folderName) => {
    if (folderName == "ws1") {
      return setNewArr(state);
    }
    if (obj.folderName == folderName) {
      return setNewArr(obj);
    }
    obj.data.map((newData) => nestedFolder(newData, folderName));
  };
  const findFolder = (folder) => {
    nestedFolder(state, folder);
  };
  const [currentFolderData, setCurrentFolderData] = useState({
    folder_name: "name",
    levels: 0,
    parent_id: 0,
    id: 0,
    workspace_name: workSpaceData.workspace_name,
  });
  const callApi = async (data) => {
    console.log(data, "===========");
    setList((prev) => {
      return [...prev, data];
    });
    setFolderName(data);
    let apiData = {
      parent_id: data.id,
      levels: data.levels + 1,
      workspace_name: retrievedWorkspaceName,
      user_id: userIdStore.user_id,
    };
    getAllfoldernames(apiData);
    setCurrentFolderData(data);
  };
  const callApiHeader = async (data) => {
    if (data.id === "its_me") {
      getAllfoldernames({
        workspace_name: retrievedWorkspaceName,
        user_id: userIdStore.user_id,
        workspace_id: retrievedWorkspaceId,
      });
      setCurrentFolderData({
        folder_name: "name",
        levels: 0,
        parent_id: 0,
        id: 0,
      });
      setList([{ id: "its_me", folder_name: workSpaceData.workspace_name }]);
    } else {
      let apiData = {
        parent_id: data.id,
        levels: data.levels + 1,
        workspace_name: retrievedWorkspaceName,
        workspace_id: retrievedWorkspaceId,
        user_id: userIdStore.user_id,
      };
      getAllfoldernames(apiData);
      setCurrentFolderData(data);
      let arr = list;
      arr.splice(data.index + 1, 100);
      setList(arr);
    }
  };

  // const workspacedata = [];
  // const workspacemain = workspace?.forEach((data, i) => {
  //   // if (data.workspace_type == "Teamspace") {
  //   //   workspacedata.push(data);
  //   // }
  // });
  // console.log(workspacedata, "workspacedata");
  // ---------------------------------Properties
  const [propertiesModel, setPropertiesModel] = useState(false);
  const handleClickOpenProperties = (data) => {
    setPropertiesModel({ status: true, data: data });
  };

  const propertiesModelClose = () => {
    setPropertiesModel(false);
  };
  // ---------------------------------Properties
  // ---------------------------------Comments
  const [openCommets, setOpenCommets] = React.useState(false);
  console.log(openCommets, "openCommets");
  const handleClickOpenCommets = (data) => {
    console.log(data, "data====");

    setOpenCommets({ status: true, data: data });
    getNoteslist(data);
  };

  const handleCloseCommets = () => {
    setOpenCommets(false);
  };

  const [todos, setTodos] = useState([]);
  const [notes, setNotes] = useState([]);
  const [addProperty, setAddProperty] = useState({
    notes: "",
  });

  const resetFormComment = () => {
    setAddProperty({
      notes: "",
    });
  };
  // ------------------------------------------apis
  const onNotesSubmit = () => {
    let data = {
      id: openCommets?.data,
      notes: addProperty.notes,
    };

    CommonNotes(
      data,
      (apiRes) => {
        console.log(apiRes?.data?.details?.file_id, "0000");
        if (apiRes.status == 200) {
          notification.success({
            message: "Comment Created Successfully",
            placement: "topRight", // Adjust placement as needed
            duration: 3, // Set the duration (in seconds) the notification is displayed
            style: {
              height: 60,
            },
          });
          resetFormComment();
          getNoteslist(apiRes?.data?.details?.file_id);
        }
      },
      (apiErr) => {
        console.log(apiErr);
      }
    );
  };

  const getNoteslist = (data) => {
    let data_note = {
      id: data,
    };
    console.log(data_note, "data_note");
    getnotes(
      data_note,
      (apiRes) => {
        console.log(apiRes, "0000000");
        setNotes(apiRes.data.details);
      },
      (apiErr) => {
        console.log(apiErr);
      }
    );
  };
  const onDeleteClickComment = (id) => {
    let data = {
      id: id,
    };
    deleteNotes(
      data,
      (apiRes) => {
        notification["success"]({
          placement: "topRight",
          description: "",
          message: "Comment Deleted Successfully",
          style: {
            height: 60,
          },
        });
        getNoteslist();
      },
      (apiErr) => {}
    );
  };
  // ------------------------------------------apis
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

  // ---------------------------------Comments
  // ---------------------------------Version
  const [openVersion, setOpenVersion] = React.useState(false);
  const [versionTableData, setVersionTableData] = useState([]);
  const handleClickVersionOpen = (data) => {
    setOpenVersion(true);
    getFileversion(data);
  };
  const handleVersionClose = () => {
    setOpenVersion(false);
  };
  const getFileversion = (data) => {
    let requestData = {
      folder_id: data.folder_id,
      file_name: data.file_name,
    };
    getallversions(
      requestData,
      (apiRes) => {
        setVersionTableData(apiRes);
      },
      (apiErr) => {
        // Handle error case
      }
    );
  };

  // ---------------------------------Version
  // ---------------------------------move
  const [openMove, setOpenMove] = useState(false);

  const handleClickMove = () => {
    setOpenMove(true);
  };

  const handleCloseMove = () => {
    setOpenMove(false);
  };

  // ---------------------------------move

  return (
    <>
      <Head title="My Workspace - Regular"></Head>
      <Content>
        <Stack style={{ marginTop: "-58px" }}>
          {loading ? (
            <LinearProgress
              color="primary"
              sx={{
                "& .MuiLinearProgress-bar": {
                  backgroundColor: "rgb(121, 139, 255)",
                  width: "400px",
                  animationDuration: "3000ms",
                },
              }}
              style={{
                width: "100%",
                position: "absolute",
                zIndex: 100,
                top: 5,
                left: 0,
                backgroundColor: "lightgray",
              }}
            />
          ) : (
            ""
          )}
          <ModalPop
            open={openDelete.status}
            handleClose={handleCloseDelete}
            handleOkay={onDeleteClick}
            title="User Delete?  You Sure!"
            data={openDelete?.data?.id}
            file_type={openDelete.data.file_type}
          />
          {/* <ModalPop
            open={openCommets.status}
            handleClose={handleCloseCommets}
            handleOkay={onDeleteClickComment}
            title="User Delete?  You Sure!"
            data={openCommets?.data?.id}
            file_type=""
          /> */}
          <FileFolderProperties
            list={list}
            propertiesModel={propertiesModel}
            propertiesModelClose={propertiesModelClose}
          />
          <FileFolderComments
            notes={notes}
            addTask={addTask}
            addProperty={addProperty}
            openCommets={openCommets}
            onNotesSubmit={onNotesSubmit}
            setAddProperty={setAddProperty}
            handleCloseCommets={handleCloseCommets}
            onDeleteClickComment={onDeleteClickComment}
          />
          <FileVersion
            openVersion={openVersion}
            onFileDownload={onFileDownload}
            versionTableData={versionTableData}
            handleOpenDeleteFile={handleClickOpen}
            handleVersionClose={handleVersionClose}
          />
          <FileFolderMove
            openMove={openMove}
            allfolderlist={allfolderlist}
            handleCloseMove={handleCloseMove}
          />
          <CreateLinkModel
            error={error}
            openLink={openLink}
            workspace={workspace}
            userDropdowns={userDropdowns}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            shareFormData={shareFormData}
            checkboxValues={checkboxValues}
            handleShareData={handleShareData}
            handleLinkClose={handleLinkClose}
            handleDateChange={handleDateChange}
            handleCheckboxChange={handleCheckboxChange}
            handleSubmitShareData={handleSubmitShareData}
            shareLink={shareLink}
          />
          <FileUpload
            open={fileUpload}
            close={CancelFileUpload}
            docListUpload={docListUpload}
            handleOnClick={handleOnClick}
            Properties={addProperties}
            handleFileChange={handleFileChange}
            selectedFile={file}
            fileName={fileName}
            loading={loading}
            handleOkay={handleSubmit}
            fileDesc={(e) => {
              setFileDesc(e.target.value);
            }}
            handleInputChange={handleInputChange}
            formValues={formValues}
          />
          <WS1Header
            openModal={() => setOpen({ ...open, status: true })}
            openModal1={() => setFileModal({ ...fileModal, status: true })}
            sm={sm}
            list={list}
            isLogin={isLogin}
            policies={propertys}
            findFolder={findFolder}
            updateSm={updateSm}
            userData={userData}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            openFileUpload={() => setFileUpload(true)}
            callApiHeader={callApiHeader}
          />
          <Foldercreate
            open={open.status}
            handleClose={handleClose}
            title="Create New Folder"
            buttonSuccessTitle="Create"
            id={id}
            addNew={addNew}
            input={input}
            type="form"
            inputList={[
              { type: "text", name: "name", placeholder: "Enter Folder Name" },
            ]}
            handleChange={handleChange}
            handleOkay={onFormSubmit}
            folderNameInput={folderNameInput}
          />
          <CommonTable
            rows={folderList}
            callApi={callApi}
            isLogin={isLogin}
            policies={policies}
            propertys={propertys}
            headCells={tableHeader}
            setPropertys={setPropertys}
            searchTerm={searchTerm}
            allfolderlist={allfolderlist}
            onFileDownload={onFileDownload}
            handleClickVersionOpen={handleClickVersionOpen}
            onDownloadfolders={onDownloadfolders}
            PermissionPolicy={PermissionPolicy}
            handleOpenDeleteFile={handleClickOpen}
            handleClickLinkOpen={handleClickLinkOpen}
            openFileUpload={() => setFileUpload(true)}
            handleClickMove={handleClickMove}
            handleClickOpenCommets={handleClickOpenCommets}
            handleClickOpenProperties={handleClickOpenProperties}
            openModal={() => setOpen({ ...open, status: true })}
          />
        </Stack>
      </Content>
    </>
  );
};
export default WS1;
