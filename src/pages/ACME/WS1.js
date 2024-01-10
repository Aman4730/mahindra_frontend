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
import { UserContext } from "../../context/UserContext";
import CreateLinkModel from "../../components/CreateLinkModel";
import FileVersion from "../../components/FileVersion/index.jsx";
import FileUpload from "../../components/FileUploadModal/FileUpload";
import Foldercreate from "../../components/Foldercreate/Foldercreate";
import FileFolderMove from "../../components/FileFolderMove/index.jsx";
import FileFolderProperties from "../../components/FileFolderProperties/index.jsx";
import FileFolderComments from "../../components/FileFolderComments/index.jsx";
const WS1 = () => {
  useEffect(() => {
    getAllfoldernames({
      workspace_id: retrievedWorkspaceId,
      workspace_name: workSpaceData.workspace_name,
    }),
      getdoclistuploadfile();
    getWorkspacedata();
    getUserRselect();
    getmetatypelist();
  }, []);
  const {
    isLogin,
    getnotes,
    getdoclist,
    deletefile,
    deleteNotes,
    CommonNotes,
    contextData,
    getmetalist,
    getfetchlink,
    getWorkspace,
    userDropdownU,
    workSpaceData,
    getallversions,
    addcreatefolder,
    add_updatefolder,
    getfoldernameslist,
    add_metaproperties,
  } = useContext(UserContext);
  const [sm, updateSm] = useState(false);
  const [userData, setUserData] = contextData;
  const [fileDesc, setFileDesc] = useState("");
  const [metaList, setMetaList] = useState([]);
  const [workspace, setWorkspace] = useState([]);
  const [formValues, setFormValues] = useState({});
  const [doctypeName, setDoctypeName] = useState("");
  const [metaDropdown, setMetaDropdown] = useState({});
  const [docListUpload, setDocListupload] = useState([]);
  const [addProperties, setAddProperties] = useState([]);
  const [userDropdowns, setUserDropdowns] = useState([]);
  const [currentFolderData, setCurrentFolderData] = useState({
    folder_name: "name",
    levels: 0,
    parent_id: 0,
    id: 0,
    workspace_name: workSpaceData.workspace_name,
  });
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
        setWorkspace(apiRes?.data.data);
      },
      (apiErr) => {
        console.log(apiErr);
      }
    );
  };
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
  const getUserRselect = () => {
    userDropdownU(
      {},
      (apiRes) => {
        setUserDropdowns(apiRes.data.data);
      },
      (apiErr) => {}
    );
  };
  const teamSpace = isLogin?.teamspace;
  const moveData =
    workspace
      ?.filter((data) => isLogin?.my_workspace?.includes(data.workspace_name))
      .map(({ id: workspace_id, workspace_name }) => ({
        workspace_id,
        workspace_name,
      })) || [];
  const matchedWorkspace = metaList
    ?.filter((data) => data.workspace_name === workSpaceData?.workspace_name)
    .map((data) => data);

  const [allMoveFile, setAllMoveFile] = useState([]);
  const [allfolderlist, setAllfolderlist] = useState([]);
  const getAllfoldernames = (
    data = {
      workspace_name: workSpaceData?.workspace_name,
      workspace_id: workSpaceData.workspace_id,
    }
  ) => {
    getfoldernameslist(
      data,
      (apiRes) => {
        setAllMoveFile(apiRes?.data?.folders);
        setAllfolderlist([...apiRes?.data?.files, ...apiRes?.data?.folders]);
      },
      (apiErr) => {
        console.log("====> api get folder name", apiErr);
      }
    );
  };
  // ------------------------------------------------getApis End
  // ------------------------------------------------postApis Start
  const [selectedMeta, setSelectedMeta] = useState({
    doctype: "",
  });
  const handleOnClick = (e) => {
    onSubmitProperties(e);
    setDoctypeName(e?.label);
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
      },
      (apiErr) => {}
    );
  };
  // ------------------------------------------------postApis End
  // ------------------------------------------------Delete File Folder
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
        if (apiRes.status === 200) {
          notification["success"]({
            placement: "top",
            description: "",
            message: "Deleted Successfully...",
            style: {
              height: 60,
            },
          });
          let newData = {
            parent_id: currentFolderData?.id,
            levels: currentFolderData?.levels + 1,
            workspace_name: workSpaceData?.workspace_name,
            workspace_id: JSON.stringify(workSpaceData.workspace_id),
          };
          getAllfoldernames(newData);
        }
      },
      (apiErr) => {}
    );
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
    let data = {
      workspace_id: JSON.stringify(workSpaceData.workspace_id),
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
          handleClose();
          resetForm();
          let newData = {
            parent_id: currentFolderData?.id,
            levels: currentFolderData?.levels + 1,
            workspace_name: workSpaceData?.workspace_name,
            workspace_id: JSON.stringify(workSpaceData.workspace_id),
          };
          getAllfoldernames(newData);
        }
      },
      (apiErr) => {}
    );
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
  const [file, setFile] = useState(null);
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
  const handleMetaDropdown = (e) => {
    const { name, value } = e.target;
    setMetaDropdown((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const data = {
        workspace_id: workSpaceData.workspace_id,
        workspace_name: workSpaceData.workspace_name,
        folder_id: currentFolderData.id || null,
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
        resetFileForm();
        setLoading(false);
        setFileUpload(false);
        let newData = {
          parent_id: currentFolderData?.id,
          levels: currentFolderData?.levels + 1,
          workspace_id: JSON.stringify(workSpaceData.workspace_id),
          workspace_name: workSpaceData?.workspace_name,
        };
        getAllfoldernames(newData);
      }
    } catch (error) {
      if (error?.response?.status == 400) {
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
      setFileUpload(false);
    }
  };
  const CancelFileUpload = () => {
    handleFileClose();
    const apiUrl = `${process.env.REACT_APP_API_URL_LOCAL}/cancelfileupload`;

    axios
      .post(apiUrl, {})
      .then((response) => {
        if (response.status === 200) {
          notification["success"]({
            placement: "top",
            description: "",
            message: response.data.message,
            style: {
              height: 60,
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
    const apiUrl = `${process.env.REACT_APP_API_URL_LOCAL}/downloadfolders`;
    const requestData = { folder_id: filemongo_id };

    axios
      .post(apiUrl, requestData, { responseType: "arraybuffer" })
      .then((response) => {
        notification["success"]({
          placement: "top",
          description: "",
          message: "Folder Download Successfully...",
          style: {
            height: 60,
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
            height: 60,
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
    workspace_name: "",
  });
  const [checkboxValues, setCheckboxValues] = useState({
    view: false,
    share: false,
    rename: false,
    upload_folder: false,
    create_folder: false,
    upload_file: false,
    delete: false,
    download: false,
    move: false,
    rights: false,
    comment: false,
    properties: false,
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
  const handleFileClose = () => {
    resetFileForm();
    setLoading(false);
    setFileUpload(false);
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
      email: shareFormData?.Email,
      file_type: shareId.file_type || "",
      workspace_name: shareFormData.workspace_name,
      file_folder_name: shareId.name,
      message: shareFormData.Message,
      subject: shareFormData.Subject,
      password: shareFormData.Password,
      user_email: shareFormData?.userDropdowns?.email,
      view: checkboxValues.view,
      share: checkboxValues.share,
      rename: checkboxValues.rename,
      upload_folder: checkboxValues.upload_folder,
      create_folder: checkboxValues.create_folder,
      upload_file: checkboxValues.upload_file,
      delete: checkboxValues.delete,
      download: checkboxValues.download,
      move: checkboxValues.move,
      rights: checkboxValues.rights,
      comment: checkboxValues.comment,
      properties: checkboxValues.properties,
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
            height: 60,
          },
        });
      },
      (apiErr) => {
        // For example, you can show an error notification if needed
        notification["error"]({
          placement: "top",
          description: "An error occurred while sharing the link.",
          message: "Error",
          style: {
            height: 60,
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
      view: false,
      share: false,
      rename: false,
      upload_folder: false,
      create_folder: false,
      upload_file: false,
      delete: false,
      download: false,
      move: false,
      rights: false,
      comment: false,
      properties: false,
    });
  };
  // ------------------------------------------------Reset Form End
  const [propertys, setPropertys] = useState([]);
  const [fileUpload, setFileUpload] = useState(false);
  const [folderList, setFolderList] = useState([{ name: "test" }]);
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
  const callApi = async (data) => {
    setList((prev) => {
      return [...prev, data];
    });
    let apiData = {
      parent_id: data?.id,
      levels: data?.levels + 1,
      workspace_name: data?.workspace_name,
      workspace_id: data?.workspace_id,
    };
    getAllfoldernames(apiData);
    setCurrentFolderData(data);
  };
  const callApiHeader = async (data) => {
    if (data.id === "its_me") {
      getAllfoldernames({
        workspace_name: retrievedWorkspaceName,
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
      };
      getAllfoldernames(apiData);
      setCurrentFolderData(data);
      let arr = list;
      arr.splice(data.index + 1, 100);
      setList(arr);
    }
  };
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
  const [todos, setTodos] = useState([]);
  const [notes, setNotes] = useState([]);
  const [openCommets, setOpenCommets] = React.useState(false);
  const [addProperty, setAddProperty] = useState({
    notes: "",
  });
  const handleClickOpenCommets = (data) => {
    setOpenCommets({ status: true, data: data });
    getNoteslist(data);
  };
  const handleCloseCommets = () => {
    setOpenCommets(false);
  };
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
    getnotes(
      data_note,
      (apiRes) => {
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
  const [hideMoveData, setHideMoveData] = useState(false);
  const [moveHeader, setMoveHeader] = useState([
    { id: "its_me", folder_name: workSpaceData.workspace_name },
  ]);
  const onClickWorksapce = () => {
    setHideMoveData(false);
  };
  const handleClickMove = (data) => {
    setOpenMove({ status: true, data: data });
  };
  const handleCloseMove = () => {
    setOpenMove(false);
  };
  const moveFileFolder = async (data) => {
    setHideMoveData(true);
    setMoveHeader((prev) => {
      return [...prev, data];
    });
    let apiData = {
      workspace_name: data?.workspace_name,
      workspace_id: JSON.stringify(data?.workspace_id),
    };
    getAllfoldernames(apiData);
  };
  const onSubmitUpdatefolder = () => {
    let data;
    if (openMove?.data?.file_type) {
      data = {
        policies_id:
          isLogin?.user_type == "Admin" ? "" : PermissionPolicy[0]?.id,
        file_id: openMove?.data?.id,
        folder_id: currentFolderData.id || null,
        workspace_name: workSpaceData.workspace_name,
        workspace_id: retrievedWorkspaceId,
      };
    } else {
      data = {
        workspace_name: workSpaceData.workspace_name,
        workspace_id: retrievedWorkspaceId,
        policies_id:
          isLogin?.user_type == "Admin" ? "" : PermissionPolicy[0]?.id,
        levels: currentFolderData.levels,
        parent_id: currentFolderData.id,
        folder_id: openMove?.data?.id || null,
      };
    }
    add_updatefolder(
      data,
      (apiRes) => {
        if (apiRes.status === 200) {
          notification["success"]({
            placement: "top",
            description: "",
            message: apiRes?.data?.message,
            style: {
              height: 60,
            },
          });
        }
        handleCloseMove();
      },
      (apiErr) => {}
    );
    let newData = {
      parent_id: currentFolderData.id,
      levels: currentFolderData.levels,
      workspace_name: currentFolderData.workspace_name,
      workspace_id: currentFolderData.workspace_id,
    };
    getAllfoldernames(newData);
  };
  // ---------------------------------move
  const checkboxData = [
    { label: "View", name: "view", style: { marginLeft: "-8.8px" } },
    { label: "Move", name: "move", style: { marginLeft: "11px" } },
    { label: "Share", name: "share", style: { marginLeft: "35px" } },
    { label: "Rights", name: "rights", style: { marginLeft: "29px" } },
    { label: "Rename", name: "rename" },
    { label: "Delete", name: "delete", style: { marginLeft: "-10px" } },
    {
      label: "Comments",
      name: "comment",
      style: { marginLeft: "30px" },
    },
    {
      label: "Download",
      name: "download",
      style: { marginLeft: "-6px" },
    },
    {
      label: "Properties",
      name: "properties",
    },
    {
      label: "Upload Folder",
      name: "upload_folder",
      style: { marginLeft: "-25px" },
    },
    {
      label: "Create Folder",
      name: "create_folder",
      style: { marginLeft: "-22px" },
    },

    {
      label: "Upload File",
      name: "upload_file",
      style: { marginLeft: "-22px" },
    },
  ];
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
            list={list}
            callApi={callApi}
            moveData={moveData}
            openMove={openMove}
            hideMoveData={hideMoveData}
            findFolder={findFolder}
            onClickWorksapce={onClickWorksapce}
            allMoveFile={allMoveFile}
            callApiHeader={callApiHeader}
            moveFileFolder={moveFileFolder}
            handleCloseMove={handleCloseMove}
            onSubmitUpdatefolder={onSubmitUpdatefolder}
          />
          <CreateLinkModel
            error={error}
            moveData={moveData}
            openLink={openLink}
            workspace={workspace}
            teamSpace={teamSpace}
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
            accesscheckbox={checkboxData}
          />
          <FileUpload
            open={fileUpload}
            loading={loading}
            selectedMeta={selectedMeta}
            matchedWorkspace={matchedWorkspace}
            selectedFile={file}
            handleOnClick={handleOnClick}
            fileName={fileName}
            close={CancelFileUpload}
            handleOkay={handleSubmit}
            Properties={addProperties}
            docListUpload={docListUpload}
            handleFileChange={handleFileChange}
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
