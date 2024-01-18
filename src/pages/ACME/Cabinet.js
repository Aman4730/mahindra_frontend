import React, { useContext, useEffect, useState } from "react";
import moment from "moment-timezone";
import { notification } from "antd";
import Head from "../../layout/head/Head";
import { useForm } from "react-hook-form";
import ModalPop from "../../components/Modal";
import { Stack, Typography } from "@mui/material";
import Content from "../../layout/content/Content";
import SearchBar from "../../components/SearchBar";
import "react-datepicker/dist/react-datepicker.css";
import { UserContext } from "../../context/UserContext";
import { AuthContext } from "../../context/AuthContext";
import CabinetTable from "../../components/Tables/CabinetTable";
import { FormGroup, Modal, ModalBody, Form } from "reactstrap";
import {
  Block,
  BlockBetween,
  BlockDes,
  BlockHead,
  BlockHeadContent,
  Icon,
  Col,
  Button,
  RSelect,
} from "../../components/Component";

const Cabinet = () => {
  const {
    contextData,
    addCabinet,
    getCabinet,
    userDropdownU,
    getGroupsDropdown,
    deletecabinet,
  } = useContext(UserContext);
  const [sm, updateSm] = useState(false);
  const [editId, setEditedId] = useState();
  const [userData, setUserData] = contextData;
  const [onSearch, setonSearch] = useState(true);
  const [deleteId, setDeleteId] = useState(false);
  const [totalUsers, setTotalUsers] = useState(0);
  const { setAuthToken } = useContext(AuthContext);
  const [actionText, setActionText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(5);
  const [onSearchText, setSearchText] = useState("");
  const [searchTerm, setSearchTerm] = React.useState("");
  const [userDropdowns, setUserDropdowns] = useState([]);
  const [groupsDropdown, setGroupsDropdown] = useState([]);
  const [modal, setModal] = useState({
    edit: false,
    add: false,
  });
  const [formData, setFormData] = useState({
    cabinet_name: "",
    path_name: "",
    selected_groups: "",
    selected_users: "",
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
  useEffect(() => {
    getRolesDropdown();
    getUserRselect();
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
    getTotalGroups();
  }, [formData]);
  const getUserRselect = () => {
    userDropdownU(
      {},
      (apiRes) => {
        const data = apiRes.data;
        [
          { value: "en", label: "English" },
          { value: "es", label: "Spanish" },
          { value: "fr", label: "French" },
        ];
        setUserDropdowns(
          data?.data?.map((gro) => ({
            label: gro.email,
            value: gro.email,
          }))
        );
      },
      (apiErr) => {}
    );
  };
  const getTotalGroups = () => {
    getCabinet(
      { pageNumber: currentPage, pageSize: itemPerPage, search: onSearchText },
      (apiRes) => {
        setTotalUsers(apiRes.data.response.count);
        if (apiRes.status == 200) {
          setUserData(apiRes.data.response.data);
        }
      },
      (apiErr) => {}
    );
  };
  useEffect(() => {
    getTotalGroups();
  }, [currentPage]);
  // function to reset the form
  const resetForm = () => {
    setFormData({
      selected_groups: "",
      cabinet_name: "",
      path_name: "",
      selected_users: "",
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
        selected_groups: formData.selected_groups,
        cabinet_name: formData.cabinet_name,
        path_name: formData.path_name,
        selected_users: formData.selected_users,
      };

      // setUserData([submittedData, ...userData]);
      addCabinet(
        submittedData,
        (apiRes) => {
          if (apiRes.status == 200) {
            notification["success"]({
              placement: "top",
              description: "",
              message: "Cabinet Updated Successfully.",
              style: {
                height: 60,
              },
            });
            onFormCancel();
            getTotalGroups();
          }
          // const { data: { data: { data, total }, meta: { code, message }, token } } = apiRes;
        },
        (apiErr) => {}
      );
    } else {
      let submittedData = {
        cabinet_name: formData.cabinet_name,
        // path_name: formData.path_name,
        selected_groups: formData.selected_groups,
        selected_users: formData.selected_users,
      };
      addCabinet(
        submittedData,
        (apiRes) => {
          if (apiRes.status == 201) {
            notification["success"]({
              placement: "top",
              description: "",
              message: "Cabinet Created Successfully.",
              style: {
                height: 60,
              },
            });
            onFormCancel();
          }
        },
        (apiErr) => {}
      );
    }

    // }
  };
  // function that loads the want to editted userData
  const onEditClick = (id) => {
    userData?.map((item) => {
      if (item.id == id) {
        setFormData({
          id: id,
          cabinet_name: item.cabinet_name,
          selected_groups: item.selected_groups,
          // path_name: item.path_name,
          selected_users: item.selected_users,
          // role: item.user_role,
          // status: item.status
        });

        setModal({ edit: false, add: true });
        setEditedId(id);
      }
    });
  };
  // Delete Cabinet
  const onDeleteClick = (id) => {
    handleClose();
    setDeleteId(true);
    let deleteId = { id: id };
    deletecabinet(
      deleteId,
      (apiRes) => {
        if (apiRes.status == 200) {
          notification["success"]({
            placement: "top",
            description: "",
            message: "Cabinet Deleted Successfully.",
            style: {
              height: 60,
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
  //Table Header
  const tableHeader = [
    {
      id: "Cabinet Name",
      numeric: false,
      disablePadding: true,
      label: "Cabinet Name",
    },
    {
      id: "Selected Groups",
      numeric: false,
      disablePadding: true,
      label: "Selected Groups",
    },
    {
      id: "Selected User",
      numeric: false,
      disablePadding: true,
      label: "Selected User",
    },

    {
      id: "Action",
      numeric: false,
      disablePadding: true,
      label: "Action",
      style: { marginLeft: "18px" },
    },
  ];
  const { errors, register, handleSubmit } = useForm();
  return (
    <React.Fragment>
      <ModalPop
        open={open.status}
        handleClose={handleClose}
        handleOkay={onDeleteClick}
        title={"Cabinet is being Deleted. Are You Sure !"}
        data={open.data}
      />
      <Head title="Cabinet List - Regular"></Head>
      <Content>
        <Stack style={{ marginTop: "-28px" }}>
          <BlockHead size="sm">
            <BlockBetween>
              <BlockHeadContent>
                <Typography style={{ fontSize: "25px", fontWeight: "bold" }}>
                  Cabinet
                </Typography>
                <BlockDes className="text-soft">
                  <p>You have total {totalUsers} cabinet.</p>
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
          <CabinetTable
            headCells={tableHeader}
            searchTerm={searchTerm}
            allfolderlist={userData}
            onEditClick={onEditClick}
            handleClickOpen={handleClickOpen}
          />
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
            <div className="">
              <h5 className="title">
                {editId ? "Update Cabinet" : "Add Cabinet"}
              </h5>
              <div className="mt-2">
                <Form
                  className="row gy-2"
                  noValidate
                  onSubmit={handleSubmit(onFormSubmit)}
                >
                  {/* <Col md="6">
                    <FormGroup>
                      <label className="form-label">Cabinet Name</label>
                      <input
                        className="form-control"
                        type="text"
                        name="cabinet_name"
                        defaultValue={formData.cabinet_name}
                        onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                        placeholder="Enter cabinet_name"
                        ref={register({ required: "This field is required" })}
                      />
                      {errors.cabinet_name && <span className="invalid">{errors.cabinet_name.message}</span>}
                    </FormGroup>
                  </Col> */}

                  <Col md="6">
                    <FormGroup>
                      <label className="form-label">Cabinet Name</label>
                      <input
                        className="form-control"
                        type="text"
                        name="Workspace Name"
                        defaultValue={formData.cabinet_name}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            cabinet_name: e.target.value,
                          })
                        }
                        placeholder="Enter Cabinet Name"
                        ref={register({ required: "This field is required" })}
                      />
                      {errors.cabinet_name && (
                        <span className="invalid">
                          {errors.cabinet_name.message}
                        </span>
                      )}
                    </FormGroup>
                  </Col>

                  {/* <Col md="6">
                    <FormGroup>
                      <label className="form-label">Path</label>
                      <RSelect
                        options={pathDropdown}
                        name="pathDropdown"
                        defaultValue="Please Select Groups"
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            path_name: e.label,
                            [e.label]: e.value,
                          })
                        }
                        ref={register({ required: "This field is required" })}
                      />
                      {errors.path_name && (
                        <span className="invalid">
                          {errors.path_name.message}
                        </span>
                      )}
                    </FormGroup>
                  </Col> */}

                  <Col md="6">
                    <FormGroup>
                      <label className="form-label">Groups</label>
                      <RSelect
                        isMulti
                        options={groupsDropdown}
                        name="addCabinet"
                        defaultValue="Please Select Groups"
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
                      <label className="form-label">Selected User</label>
                      <RSelect
                        isMulti
                        options={userDropdowns}
                        name="addCabinet"
                        defaultValue="Please Select Groups"
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
                  {/* <Col md="6">
                    <FormGroup>

                      <label className="form-label">Browse File</label>
                      <input type="file" name="file" onChange={handleFileChange} />
                    </FormGroup>
                  </Col> */}
                  {/* <Col md="6">
                    <FormGroup>
                      <label className="form-label">Path</label>
                      <RSelect
                        options={userDropdowns}
                        name="addCabinet"
                        defaultValue="Please Select Groups"
                        onChange={(e) => setFormData({ ...formData, path_name: e.label, [e.label]: e.value })}
                        ref={register({ required: "This field is required" })}

                      />
                      {errors.path_name && <span className="invalid">{errors.path_name.message}</span>}
                    </FormGroup>
                  </Col> */}
                  {/* <Col md="6">
                    <FormGroup>
                      <label className="form-label">Selected User</label>
                      <input
                        className="form-control"
                        type="text"
                        name="selected_groups"
                        defaultValue={formData.selected_groups}
                        onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                        placeholder="Enter Quota"
                        ref={register({ required: "This field is required" })}
                      />
                      {errors.selected_groups && <span className="invalid">{errors.selected_groups.message}</span>}
                    </FormGroup>
                  </Col> */}

                  <Col size="12">
                    <ul className="align-center flex-wrap flex-sm-nowrap gx-4 gy-2">
                      <li>
                        <Button color="primary" size="md" type="submit">
                          {editId ? "Update Cabinet" : "Add Cabinet"}
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
      </Content>
    </React.Fragment>
  );
};
export default Cabinet;
