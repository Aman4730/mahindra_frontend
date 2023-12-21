import React, { useContext, useEffect, useState } from "react";
import { notification } from "antd";
import { useForm } from "react-hook-form";
import Head from "../../layout/head/Head";
import ModalPop from "../../components/Modal";
import Content from "../../layout/content/Content";
import "react-datepicker/dist/react-datepicker.css";
import { UserContext } from "../../context/UserContext";
import { AuthContext } from "../../context/AuthContext";
import { FormGroup, Modal, ModalBody, Form } from "reactstrap";
import WorkspaceTable from "../../components/Tables/WorkspaceTable";
import {
  Block,
  BlockBetween,
  BlockDes,
  BlockHead,
  BlockHeadContent,
  Icon,
  Col,
  Button,
  DataTable,
  RSelect,
} from "../../components/Component";
import {
  Autocomplete,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import SearchBar from "../../components/SearchBar";
const Workspace = () => {
  const {
    contextData,
    addWorkspace,
    userDropdownU,
    cabinetDropdown,
    getGroupsDropdown,
    getWorkspace,
    addPermission,
    deleteworkspace,
    getUser,
  } = useContext(UserContext);
  const { setAuthToken } = useContext(AuthContext);
  const [userData, setUserData] = contextData;
  const [sm, updateSm] = useState(false);
  const [editId, setEditedId] = useState();
  const [onSearch, setonSearch] = useState(true);
  const [deleteId, setDeleteId] = useState(false);
  const [totalUsers, setTotalUsers] = useState(0);
  const [tablesm, updateTableSm] = useState(false);
  const [actionText, setActionText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(5);
  const [cabinetList, setcabinetList] = useState([]);
  const [onSearchText, setSearchText] = useState("");
  const [searchTerm, setSearchTerm] = React.useState("");
  const [userDropdowns, setUserDropdowns] = useState([]);
  const [groupsDropdown, setGroupsDropdown] = useState([]);
  const [modal, setModal] = useState({
    edit: false,
    add: false,
    permission: false,
  });
  const [formData, setFormData] = useState({
    workspace_name: "",
    enter_quota: "",
    selected_groups: [],
    selected_users: [],
    selected_cabinet: "",
    workspace_type: "",
  });
  const [permisssionData, setPermissionData] = useState({
    permission_upload: "",
    permission_view: "",
    permission_createfolder: "",
    permission_delete: "",
    permission_download: "",
    permission_share: "",
    permission_rename: "",
  });
  const [open, setOpen] = useState({
    status: false,
    data: "",
  });
  const handleClickOpen = (id) => {
    setOpen({
      status: true,
      data: id,
    });
  };
  const handleClose = () => {
    setOpen({
      status: false,
      data: "",
    });
  };

  const getRolesDropdown = () => {
    getGroupsDropdown(
      {},
      (apiRes) => {
        const data = apiRes.data;
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

  const getCabinetDropdown = () => {
    cabinetDropdown(
      {},
      (apiRes) => {
        setcabinetList(apiRes.data.data);
      },
      (apiErr) => {}
    );
  };

  useEffect(() => {
    getRolesDropdown();
    getCabinetDropdown();
  }, []);
  useEffect(() => {
    let newData;
    newData = userData.map((item) => {
      item.checked = false;
      return item;
    });
    setUserData([...newData]);
  }, []);
  useEffect(() => {
    getTotalWorkspace();
  }, [currentPage]);

  useEffect(() => {
    getTotalWorkspace();
  }, [formData]);

  const getUserRselect = () => {
    userDropdownU(
      {},
      (apiRes) => {
        // const { data: { data :{data}},status, token }  = apiRes;
        const data = apiRes.data;
        const code = apiRes.status;
        const message =
          apiRes.data.message[
            ({ value: "en", label: "English" },
            { value: "es", label: "Spanish" },
            { value: "fr", label: "French" })
          ];
        setUserDropdowns(
          data.data.map((gro) => ({
            label: gro.email,
            value: gro.email,
          }))
        );

        // setAuthToken(token);
      },
      (apiErr) => {}
    );
  };
  useEffect(() => {
    getUserRselect();
  }, []);

  const getTotalWorkspace = () => {
    getWorkspace(
      { pageNumber: currentPage, pageSize: itemPerPage, search: onSearchText },
      (apiRes) => {
        setTotalUsers(apiRes.data.count);
        if (apiRes.status == 200) {
          setUserData(apiRes.data.data);
          setPermissionData({});
        }
      },
      (apiErr) => {}
    );
  };
  useEffect(() => {
    getTotalWorkspace();
  }, [currentPage]);

  // function to set the action to be taken in table header
  const onActionText = (e) => {
    setActionText(e.value);
  };

  // onChange function for searching name
  const onFilterChange = (e) => {
    setSearchText(e.target.value);
  };

  // function to change the selected property of an item
  const onSelectChange = (e, id) => {
    let newData = userData;
    let index = newData.findIndex((item) => item.id === id);
    newData[index].checked = e.currentTarget.checked;
    setUserData([...newData]);
  };

  // function to reset the form
  const resetForm = () => {
    setFormData({
      workspace_name: "",
      enter_quota: "",
      selected_groups: [],
      selected_users: [],
      selected_cabinet: "",
      workspace_type: "",
    });
    setEditedId(0);
  };

  // function to close the form modal
  const onFormCancel = () => {
    setModal({ edit: false, add: false });
    resetForm();
  };

  // submit function to add a new item
  const onFormSubmit = () => {
    if (editId) {
      let submittedData = {
        id: editId,
        workspace_name: formData.workspace_name,
        enter_quota: formData.enter_quota,
        selected_groups: formData.selected_groups,
        selected_users: formData.selected_users,
        selected_cabinet: formData.selected_cabinet,
        workspace_type: formData.workspace_type,
      };
      addWorkspace(
        submittedData,
        (apiRes) => {
          if (apiRes.status == 200) {
            notification["success"]({
              placement: "top",
              description: "",
              message: "Workspace Updated, Please login again..",
              style: {
                marginTop: "43px",
                height: "80px",
              },
            });
          }
          const code = 200;
          if (code == 200) {
            resetForm();
            setModal({ edit: false }, { add: false });
            getTotalWorkspace();
          }
          setAuthToken(token);
        },
        (apiErr) => {}
      );
    } else {
      let submittedData = {
        workspace_name: formData.workspace_name,
        enter_quota: formData.enter_quota,
        selected_groups: formData.selected_groups,
        selected_users: formData.selected_users,
        selected_cabinet: formData.selected_cabinet,
        workspace_type: formData.workspace_type,
      };
      addWorkspace(
        submittedData,
        (apiRes) => {
          if (apiRes.status == 200) {
            notification["success"]({
              placement: "top",
              description: "",
              message: "Workspace Created, Please login again...",
              style: {
                marginTop: "43px",
                height: "80px",
              },
            });
          }
          const code = 200;
          // const { data: { data: { data, total }, meta: { code, message }, token } } = apiRes;
          if (code == 200) {
            resetForm();
            setModal({ edit: false }, { add: false });
            getUsers();
          }
          setAuthToken(token);
        },
        (apiErr) => {}
      );
      // setUserData([submittedData, ...userData]);
    }

    // }
  };

  const onPermissionSubmit = () => {
    // const { name, email, phone } = submitData;
    if (editId) {
      let submittedData = {
        workspace_id: String(editId),
        permission_upload: permisssionData.permission_upload,
        permission_view: permisssionData.permission_view,
        permission_createfolder: permisssionData.permission_createfolder,
        permission_delete: permisssionData.permission_delete,
        permission_download: permisssionData.permission_download,
        permission_share: permisssionData.permission_share,
        permission_rename: permisssionData.permission_rename,
      };

      // setUserData([submittedData, ...userData]);
      addPermission(
        submittedData,
        (apiRes) => {
          const code = 200;
          // const { data: { data: { data, total }, meta: { code, message }, token } } = apiRes;
          if (code == 200) {
            resetForm();
            setModal({ edit: false }, { add: false });
            getTotalWorkspace();
          }
          setAuthToken(token);
        },
        (apiErr) => {}
      );
    } else {
      let submittedData = {
        workspace_name: formData.workspace_name,
        enter_quota: formData.enter_quota,
        selected_groups: formData.selected_groups,
        selected_users: formData.selected_users,
        selected_cabinet: formData.selected_cabinet,
        workspace_type: formData.workspace_type,
      };
      addWorkspace(
        submittedData,
        (apiRes) => {
          const code = 200;
          // const { data: { data: { data, total }, meta: { code, message }, token } } = apiRes;
          if (code == 200) {
            resetForm();
            setModal({ edit: false }, { add: false });
            getUsers();
          }
          setAuthToken(token);
        },
        (apiErr) => {}
      );
      // setUserData([submittedData, ...userData]);
    }

    // }
  };

  // submit function to update a new item
  // const onEditSubmit = (submitData) => {
  //   debugger
  //   const { workspace_name, email, path_name, addWorkspace, user_role } = submitData;
  //   let submittedData;
  //   let newitems = userData;
  //   newitems.forEach((item) => {
  //     if (item.id === editId) {
  //       submittedData = {
  //         id: item.id,
  //         avatarBg: item.avatarBg,
  //         workspace_name: workspace_name,
  //         user_role: user_role,
  //         selected_groups: selected_groups,
  //         addWorkspace: addWorkspace,
  //         image: item.image,
  //         role: item.role,
  //         email: email,
  //         balance: formData.balance,
  //         path_name: path_name,
  //         emailStatus: item.emailStatus,
  //         kycStatus: item.kycStatus,
  //         lastLogin: item.lastLogin,
  //         status: formData.status,
  //         country: item.country,
  //       };
  //     }
  //   });
  //   let index = newitems.findIndex((item) => item.id === editId);

  //   newitems[index] = submittedData;
  //   setModal({ edit: false });
  //   resetForm();
  // };

  // function that loads the want to editted userData
  const onEditClick = (id) => {
    userData.map((item) => {
      function formatSizeInGB(sizeInBytes) {
        return sizeInBytes / (1024 * 1024);
      }
      const formattedSize = formatSizeInGB(item.quota);
      if (item.id == id) {
        setFormData({
          id: id,
          workspace_name: item.workspace_name,
          selected_groups: item.selected_groups,
          path_name: item.path_name,
          enter_quota: formattedSize,
          selected_users: item.selected_users,
          selected_cabinet: item.selected_cabinet,
          workspace_type: item.workspace_type,
          selected_groups: item.selected_groups,
          // selected_cabinet: selected_cabinet,
          // role: item.user_role,
          // status: item.status
        });

        setModal({ edit: false, add: true });
        setEditedId(id);
      }
    });
  };

  const onDeleteClick = (id) => {
    handleClose();
    setDeleteId(true);
    let deleteId = { id: id };
    deleteworkspace(
      deleteId,
      (apiRes) => {
        if (apiRes.status == 200) {
          notification["success"]({
            placement: "top",
            description: "",
            message: "Workspace Deleted Successfully.",
            style: {
              marginTop: "43px",
              height: "60px",
            },
          });
        }
        const code = 200;
        if (code == 200) {
          resetForm();
          setModal({ edit: false }, { add: false });
          getTotalGroups();
        }
        setAuthToken(token);
      },
      (apiErr) => {}
    );
  };

  const onPermissionClick = (id) => {
    userData.map((item) => {
      if (item.id == id) {
        setFormData({
          id: id,
          workspace_name: formData.workspace_name,
          enter_quota: formData.enter_quota,
          selected_groups: formData.selected_groups,
          selected_users: formData.selected_users,
          selected_cabinet: formData.selected_cabinet,
          workspace_type: formData.workspace_type,
        });

        setModal({ edit: false, add: false, permission: true });
        setEditedId(id);
      }
    });
  };

  // function to change to suspend property for an item
  const suspendUser = (id) => {
    let newData = userData;
    let index = newData.findIndex((item) => item.id === id);
    newData[index].status = "Suspend";
    setUserData([...newData]);
  };
  useEffect(() => {
    if (onSearchText !== "") {
      const filteredObject = userData.filter((item) => {
        return (
          item.name.toLowerCase().includes(onSearchText.toLowerCase()) ||
          item.email.toLowerCase().includes(onSearchText.toLowerCase())
        );
      });
      setUserData([...filteredObject]);
    } else {
      setUserData([...userData]);
    }
  }, [onSearchText, setUserData]);
  // function to change the check property of an item
  const selectorCheck = (e) => {
    let newData;
    newData = userData.map((item) => {
      item.checked = e.currentTarget.checked;
      return item;
    });
    setUserData([...newData]);
  };

  // function which fires on applying selected action
  const onActionClick = (e) => {
    if (actionText === "suspend") {
      let newData = userData.map((item) => {
        if (item.checked === true) item.status = "Suspend";
        return item;
      });
      setUserData([...newData]);
    } else if (actionText === "delete") {
      let newData;
      newData = userData.filter((item) => item.checked !== true);
      setUserData([...newData]);
    }
  };

  // function to toggle the search option
  const toggle = () => setonSearch(!onSearch);

  // Get current list, pagination
  const indexOfLastItem = currentPage * itemPerPage;
  const indexOfFirstItem = indexOfLastItem - itemPerPage;
  const currentItems = userData.slice(indexOfFirstItem, indexOfLastItem);

  // Change Page
  const paginate = (pageNumber) => {
    debugger;
    setCurrentPage(pageNumber);
  };

  const { errors, register, handleSubmit, watch, triggerValidation } =
    useForm();

  const tableHeader = [
    {
      id: "Workspace Name",
      numeric: false,
      disablePadding: true,
      label: "Workspace Name",
    },
    {
      id: "Cabinet",
      numeric: false,
      disablePadding: true,
      label: "Cabinet",
    },
    {
      id: "Groups",
      numeric: false,
      disablePadding: true,
      label: "Groups",
    },
    {
      id: "User",
      numeric: false,
      disablePadding: true,
      label: "User",
    },
    {
      id: "Workspace Type",
      numeric: false,
      disablePadding: true,
      label: "Workspace Type",
    },
    {
      id: "Quota(Gb)",
      numeric: false,
      disablePadding: true,
      label: "Quota(Gb)",
    },
    {
      id: "Action",
      numeric: false,
      disablePadding: true,
      label: "Action",
      style: { marginLeft: "20px" },
    },
  ];

  return (
    <React.Fragment>
      <ModalPop
        open={open.status}
        handleClose={handleClose}
        handleOkay={onDeleteClick}
        title={"Cabinet is being Deleted. Are You Sure !"}
        data={open.data}
      />
      <Head title="Workspace List - Regular"></Head>
      <Content>
        <Stack style={{ marginTop: "-28px" }}>
          <BlockHead size="sm">
            <BlockBetween>
              <BlockHeadContent>
                <Typography style={{ fontSize: "24.5px", fontWeight: "bold" }}>
                  Workspace
                </Typography>
                <BlockDes className="text-soft">
                  <p>You have total {totalUsers} Workspace.</p>
                </BlockDes>
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
                    style={{ display: sm ? "block" : "none" }}
                  >
                    <ul className="nk-block-tools g-3">
                      <li className="nk-block-tools-opt">
                        <SearchBar
                          handleClick={() => setModal({ add: true })}
                          searchTerm={searchTerm}
                          setSearchTerm={setSearchTerm}
                        />
                      </li>
                    </ul>
                  </div>
                </div>
              </BlockHeadContent>
            </BlockBetween>
          </BlockHead>
        </Stack>
        <Block>
          <DataTable className="card-stretch">
            <WorkspaceTable
              searchTerm={searchTerm}
              headCells={tableHeader}
              allfolderlist={userData}
              onEditClick={onEditClick}
              handleClickOpen={handleClickOpen}
              onPermissionClick={onPermissionClick}
            />
          </DataTable>
        </Block>
        <Modal
          isOpen={modal.add}
          toggle={() => setModal({ add: true })}
          className="modal-dialog-centered"
          size="lg"
        >
          <ModalBody>
            <a
              href="#close"
              onClick={(ev) => {
                ev.preventDefault();
                onFormCancel();
              }}
              className="close"
            >
              <Icon name="cross-sm"></Icon>
            </a>
            <div className="p-2">
              <h5 className="title">
                {editId ? "Update Workspace" : "Add Workspace"}
              </h5>
              <div className="mt-4">
                <Form
                  className="row gy-4"
                  noValidate
                  onSubmit={handleSubmit(onFormSubmit)}
                >
                  <Col md="6">
                    <FormGroup>
                      <TextField
                        size="small"
                        className="form-control"
                        type="text"
                        name="workspace_name"
                        defaultValue={formData.workspace_name}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            workspace_name: e.target.value,
                          })
                        }
                        placeholder="Workspace Name"
                        ref={register({ required: "This field is required" })}
                      />
                      {errors.workspace_name && (
                        <span className="invalid">
                          {errors.workspace_name.message}
                        </span>
                      )}
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <Autocomplete
                      disablePortal
                      size="small"
                      options={cabinetList.map(
                        (cabinet) => cabinet.cabinet_name
                      )}
                      getOptionLabel={(cabinet) => cabinet}
                      renderInput={(params) => (
                        <TextField {...params} label="Select Cabinet" />
                      )}
                      value={formData.selected_cabinet}
                      onChange={(e, newValue) =>
                        setFormData({
                          ...formData,
                          selected_cabinet: newValue,
                        })
                      }
                    />
                  </Col>
                  <Col md="6">
                    <Autocomplete
                      fullWidth
                      disablePortal
                      size="small"
                      id="Authentication"
                      options={["My Workspace", "TeamSpace"]}
                      renderInput={(params) => (
                        <TextField {...params} label="Workspace Type" />
                      )}
                      value={formData.workspace_type}
                      onChange={(e, newValue) =>
                        setFormData({
                          ...formData,
                          workspace_type: newValue,
                        })
                      }
                    />
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <TextField
                        type="number"
                        size="small"
                        name="Workspace Name"
                        className="form-control"
                        defaultValue={formData.enter_quota}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            enter_quota: e.target.value,
                          })
                        }
                        label="Enter Quota"
                        ref={register({ required: "This field is required" })}
                      />
                      {errors.enter_quota && (
                        <span className="invalid">
                          {errors.enter_quota.message}
                        </span>
                      )}
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <RSelect
                        isMulti
                        options={groupsDropdown}
                        name="addWorkspace"
                        placeholder="Select Groups"
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            selected_groups: e.map((option) => option.label),
                            [name]: e.map((option) => option.value),
                          })
                        }
                        ref={register({ required: "This field is required" })}
                      />
                      {errors.selected_groups && (
                        <span className="invalid">
                          {errors.selected_groups.message}
                        </span>
                      )}
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <RSelect
                        isMulti
                        options={userDropdowns}
                        name="addWorkspace"
                        placeholder="Selected User"
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            selected_users: e.map((option) => option.label),
                            [name]: e.map((option) => option.value),
                          })
                        }
                        ref={register({ required: "This field is required" })}
                      />
                      {errors.selected_users && (
                        <span className="invalid">
                          {errors.selected_users.message}
                        </span>
                      )}
                    </FormGroup>
                  </Col>
                  <Col size="12">
                    <ul className="align-center flex-wrap flex-sm-nowrap gx-4 gy-2">
                      <li>
                        <Button color="primary" size="md" type="submit">
                          {editId ? "Update Workspace" : "Add workspace"}
                        </Button>
                      </li>
                      <li>
                        <a
                          href="#cancel"
                          onClick={(ev) => {
                            ev.preventDefault();
                            onFormCancel();
                          }}
                          className="link link-light"
                        >
                          Cancel
                        </a>
                      </li>
                    </ul>
                  </Col>
                </Form>
              </div>
            </div>
          </ModalBody>
        </Modal>

        <Modal
          isOpen={modal.edit}
          toggle={() => setModal({ edit: false })}
          className="modal-dialog-centered"
          size="lg"
        >
          <ModalBody>
            <a
              href="#cancel"
              onClick={(ev) => {
                ev.preventDefault();
                onFormCancel();
              }}
              className="close"
            >
              <Icon name="cross-sm"></Icon>
            </a>
            <div className="p-2">
              <h5 className="title">Update User</h5>
              <div className="mt-4"></div>
            </div>
          </ModalBody>
        </Modal>

        <Modal
          isOpen={modal.permission}
          toggle={() => setModal({ permission: false })}
          className="modal-dialog-centered"
          size="lg"
          style={{ width: "500px" }}
        >
          <ModalBody>
            <a
              href="#close"
              onClick={(ev) => {
                ev.preventDefault();
                onFormCancel();
              }}
              className="close"
            >
              <Icon name="cross-sm"></Icon>
            </a>
            <div className="p-2">
              <h5 className="title">
                {editId ? "Manage Permisions" : "Add Workspace"}
              </h5>
              <div className="mt-4">
                <Form
                  className="row gy-4"
                  noValidate
                  onSubmit={handleSubmit(onPermissionSubmit)}
                >
                  {/* <Col md="6">
                    <FormGroup>
                      <label className="form-label">Cabinet Name</label>
                      <input
                        className="form-control"
                        type="text"
                        name="workspace_name"
                        defaultValue={formData.workspace_name}
                        onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                        placeholder="Enter workspace_name"
                        ref={register({ required: "This field is required" })}
                      />
                      {errors.workspace_name && <span className="invalid">{errors.workspace_name.message}</span>}
                    </FormGroup>
                  </Col> */}

                  {/* <span style={{ paddingLeft: "280px", fontWeight: "bold" }}>Always On</span> */}
                  {/* <span style={{ paddingLeft: "110px", fontWeight: "bold" }}>Always Off</span> */}

                  <Grid
                    container
                    rowSpacing={1}
                    columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                  >
                    <Grid item xs={6}>
                      <FormGroup check>
                        <label check style={{ paddingRight: "100px" }}>
                          Upload
                        </label>
                        <input
                          type="checkbox"
                          name="Workspace Name"
                          onChange={(e) =>
                            setPermissionData({
                              ...permisssionData,
                              permission_upload: String(e.target.checked),
                            })
                          }
                          ref={register({ required: "This field is required" })}
                        />
                        {errors.permission_upload && (
                          <span className="invalid">
                            {errors.permission_upload.message}
                          </span>
                        )}
                      </FormGroup>
                    </Grid>
                    <Grid item xs={6}>
                      <FormGroup check>
                        <label check style={{ paddingRight: "100px" }}>
                          View
                        </label>
                        <input
                          type="checkbox"
                          name="Workspace Name"
                          // checked={permisssionData.workspace_name}
                          onChange={(e) =>
                            setPermissionData({
                              ...permisssionData,
                              permission_view: String(e.target.checked),
                            })
                          }
                          ref={register({ required: "This field is required" })}
                        />
                        {errors.permission_view && (
                          <span className="invalid">
                            {errors.permission_view.message}
                          </span>
                        )}
                      </FormGroup>
                    </Grid>
                    <Grid item xs={6}>
                      <FormGroup check>
                        <label check style={{ paddingRight: "102.5px" }}>
                          Create
                        </label>
                        <input
                          type="checkbox"
                          name="Workspace Name"
                          // checked={permisssionData.workspace_name}
                          onChange={(e) =>
                            setPermissionData({
                              ...permisssionData,
                              permission_createfolder: String(e.target.checked),
                            })
                          }
                          ref={register({ required: "This field is required" })}
                        />
                        {errors.permission_createfolder && (
                          <span className="invalid">
                            {errors.permission_createfolder.message}
                          </span>
                        )}
                      </FormGroup>
                    </Grid>
                    <Grid item xs={6}>
                      <FormGroup check>
                        <label check style={{ paddingRight: "91px" }}>
                          Delete
                        </label>
                        <input
                          type="checkbox"
                          name="Workspace Name"
                          // checked={permisssionData.workspace_name}
                          onChange={(e) =>
                            setPermissionData({
                              ...permisssionData,
                              permission_delete: String(e.target.checked),
                            })
                          }
                          ref={register({ required: "This field is required" })}
                        />
                        {errors.permission_delete && (
                          <span className="invalid">
                            {errors.permission_delete.message}
                          </span>
                        )}
                      </FormGroup>
                    </Grid>
                    <Grid item xs={6}>
                      <FormGroup check>
                        <label check style={{ paddingRight: "81px" }}>
                          Download
                        </label>
                        <input
                          type="checkbox"
                          name="Workspace Name"
                          // checked={permisssionData.workspace_name}
                          onChange={(e) =>
                            setPermissionData({
                              ...permisssionData,
                              permission_download: String(e.target.checked),
                            })
                          }
                          ref={register({ required: "This field is required" })}
                        />
                        {errors.permission_download && (
                          <span className="invalid">
                            {errors.permission_download.message}
                          </span>
                        )}
                      </FormGroup>
                    </Grid>
                    <Grid item xs={6}>
                      <FormGroup check>
                        <label check style={{ paddingRight: "96px" }}>
                          Share
                        </label>
                        <input
                          type="checkbox"
                          name="Workspace Name"
                          // checked={permisssionData.workspace_name}
                          onChange={(e) =>
                            setPermissionData({
                              ...permisssionData,
                              permission_share: String(e.target.checked),
                            })
                          }
                          ref={register({ required: "This field is required" })}
                        />
                        {errors.permission_share && (
                          <span className="invalid">
                            {errors.permission_share.message}
                          </span>
                        )}
                      </FormGroup>
                    </Grid>
                    <Grid item xs={6}>
                      <FormGroup check>
                        <label check style={{ paddingRight: "92px" }}>
                          Rename
                        </label>
                        <input
                          type="checkbox"
                          name="Workspace Name"
                          // checked={permisssionData.workspace_name}
                          onChange={(e) =>
                            setPermissionData({
                              ...permisssionData,
                              permission_rename: String(e.target.checked),
                            })
                          }
                          ref={register({ required: "This field is required" })}
                        />
                        {errors.permission_rename && (
                          <span className="invalid">
                            {errors.permission_rename.message}
                          </span>
                        )}
                      </FormGroup>
                    </Grid>
                  </Grid>
                  <Col size="12">
                    <ul
                      className="align-center flex-wrap flex-sm-nowrap gx-4 gy-2"
                      style={{ display: "flex", justifyContent: "center" }}
                    >
                      <li>
                        <Button color="primary" size="md" type="submit">
                          {editId ? "Update Workspace" : "Add workspace"}
                        </Button>
                      </li>
                      <li>
                        <a
                          href="#cancel"
                          onClick={(ev) => {
                            ev.preventDefault();
                            onFormCancel();
                          }}
                          className="link link-light"
                        >
                          Cancel
                        </a>
                      </li>
                    </ul>
                  </Col>
                </Form>
              </div>
            </div>
          </ModalBody>
        </Modal>
      </Content>
    </React.Fragment>
  );
};
export default Workspace;
