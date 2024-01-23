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
  Col,
  Icon,
  Block,
  Button,
  BlockDes,
  DataTable,
  BlockHead,
  BlockBetween,
  BlockHeadContent,
} from "../../components/Component";
import SearchBar from "../../components/SearchBar";
import { Grid, Stack, Typography } from "@mui/material";
import WorkspceForm from "../../components/Forms/WorkspceForm";
import WorkspacePermission from "../../components/Forms/WorkspacePermission";
const Workspace = () => {
  const {
    contextData,
    addWorkspace,
    getWorkspace,
    addPermission,
    userDropdownU,
    deleteworkspace,
    cabinetDropdown,
    getGroupsDropdown,
  } = useContext(UserContext);
  const [sm, updateSm] = useState(false);
  const [editId, setEditedId] = useState();
  const [userData, setUserData] = contextData;
  const [totalUsers, setTotalUsers] = useState(0);
  const { setAuthToken } = useContext(AuthContext);
  const [cabinetList, setcabinetList] = useState([]);
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
  const [checkboxValues, setCheckboxValues] = useState({
    view: false,
    enable: false,
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
    version_enable: false,
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
        const data = apiRes?.data;
        setGroupsDropdown(data?.groups?.map((gro) => gro?.group_name));
      },
      (apiErr) => {}
    );
  };
  const getCabinetDropdown = () => {
    cabinetDropdown(
      {},
      (apiRes) => {
        const data = apiRes?.data?.data;
        setcabinetList(data?.map((cab) => cab?.cabinet_name));
      },
      (apiErr) => {}
    );
  };
  const getUserRselect = () => {
    userDropdownU(
      {},
      (apiRes) => {
        const data = apiRes?.data;
        setUserDropdowns(data?.data?.map((gro) => gro?.email));
      },
      (apiErr) => {}
    );
  };
  const getTotalWorkspace = () => {
    getWorkspace(
      {},
      (apiRes) => {
        setTotalUsers(apiRes?.data?.data.length);
        if (apiRes?.status == 200) {
          setUserData(apiRes?.data?.data);
        }
      },
      (apiErr) => {}
    );
  };
  useEffect(() => {
    getUserRselect();
    getRolesDropdown();
    getTotalWorkspace();
    getCabinetDropdown();
  }, []);

  // function to reset the form
  const resetFormWorkspace = () => {
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
    resetFormWorkspace();
    setFormShow(false);
    setModal({ edit: false, add: false });
  };
  // submit function to add a new item
  const onFormSubmit = () => {
    if (editId) {
      let submittedData = {
        id: editId,
        workspace_name: formData.workspace_name,
        enter_quota: formData.enter_quota,
        selected_groups: formData.selected_groups.label,
        selected_users: formData.selected_users,
        selected_cabinet: formData.selected_cabinet,
        workspace_type: formData.workspace_type,
      };
      addWorkspace(
        submittedData,
        (apiRes) => {
          if (apiRes?.status == 200) {
            notification["success"]({
              placement: "top",
              description: "",
              message: "Workspace Updated, Please login again..",
              style: {
                height: 70,
              },
            });
            resetFormWorkspace();
            getTotalWorkspace();
          }
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
          if (apiRes?.status == 201) {
            notification["success"]({
              placement: "top",
              description: "",
              message: "Workspace Created, Please login again...",
              style: {
                height: 70,
              },
            });
            setFormData({
              workspace_name: "",
              enter_quota: "",
              selected_groups: [],
              selected_users: [],
              selected_cabinet: "",
              workspace_type: "",
            });
            setEditedId(0);
            getTotalWorkspace();
          }
        },
        (apiErr) => {
          if (apiErr?.response?.status == 400) {
            notification["success"]({
              placement: "top",
              description: "",
              message: apiErr?.response.data.message,
              style: {
                height: 60,
              },
            });
          }
        }
      );
    }
  };
  const onEditClick = (id) => {
    userData?.map((item) => {
      if (item.id == id) {
        setFormData((prevFormData) => ({
          ...prevFormData,
          workspace_name: item.workspace_name,
          enter_quota: item.quota,
          selected_groups: item.selected_groups,
          selected_users: item.selected_users,
          selected_cabinet: item.selected_cabinet,
          workspace_type: item.workspace_type,
        }));
        setEditedId(id);
        setFormShow(true);
      }
    });
  };
  const onPermissionSubmit = () => {
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
      addPermission(
        submittedData,
        (apiRes) => {
          const code = 200;
          if (code == 200) {
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
          if (code == 200) {
            setModal({ edit: false }, { add: false });
          }
          setAuthToken(token);
        },
        (apiErr) => {}
      );
    }
  };

  const onDeleteClick = (id) => {
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
              height: 60,
            },
          });
          getTotalWorkspace();
          handleClose();
        }
      },
      (apiErr) => {}
    );
  };

  const onPermissionClick = (id) => {
    userData?.map((item) => {
      if (item?.id == id) {
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
  const [formShow, setFormShow] = useState(false);

  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenPermission = () => {
    setOpenDialog(true);
  };

  const handleClosePermission = () => {
    setOpenDialog(false);
  };

  const handleChange = (event) => {
    const { id, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };
  const handleAutocompleteChange = (id, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };

  const permissionArray = [
    { label: "View", name: "view" },
    { label: "Move", name: "move" },
    { label: "Share", name: "share" },
    {
      label: "Rights",
      name: "rights",
    },
    { label: "Rename", name: "rename" },
    {
      label: "Delete",
      name: "delete",
    },
    {
      label: "Comments",
      name: "comment",
    },
    {
      label: "Download",
      name: "download",
    },
    {
      label: "Properties",
      name: "properties",
    },
    {
      label: "Upload Folder",
      name: "upload_folder",
    },
    {
      label: "Create Folder",
      name: "create_folder",
    },

    {
      label: "Upload File",
      name: "upload_file",
    },
  ];

  const permission = {
    title: "Workspace Permission",
    permissionArray: [
      { label: "View", name: "view" },
      { label: "Move", name: "move" },
      { label: "Share", name: "share" },
      {
        label: "Rights",
        name: "rights",
      },
      { label: "Rename", name: "rename" },
      {
        label: "Delete",
        name: "delete",
      },
      {
        label: "Comments",
        name: "comment",
      },
      {
        label: "Download",
        name: "download",
      },
      {
        label: "Properties",
        name: "properties",
      },
      {
        label: "Upload Folder",
        name: "upload_folder",
      },
      {
        label: "Create Folder",
        name: "create_folder",
      },

      {
        label: "Upload File",
        name: "upload_file",
      },
    ],
    buttonLabels: {
      agree: "Grant Access",
      disagree: "Deny Access",
    },
  };
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
                          handleClick={() => setFormShow(true)}
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
          <WorkspceForm
            formShow={formShow}
            formData={formData}
            cabinetList={cabinetList}
            onFormCancel={onFormCancel}
            handleChange={handleChange}
            onFormSubmit={onFormSubmit}
            userDropdowns={userDropdowns}
            groupsDropdown={groupsDropdown}
            handleAutocompleteChange={handleAutocompleteChange}
          />
          <WorkspacePermission
            title="Add Permission"
            openDialog={openDialog}
            checkboxValues={checkboxValues}
            permission={permission}
            handleClosePermission={handleClosePermission}
          />
          <DataTable className="card-stretch">
            <WorkspaceTable
              searchTerm={searchTerm}
              headCells={tableHeader}
              allfolderlist={userData}
              onEditClick={onEditClick}
              handleClickOpen={handleClickOpen}
              onPermissionClick={handleOpenPermission}
            />
          </DataTable>
        </Block>
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
