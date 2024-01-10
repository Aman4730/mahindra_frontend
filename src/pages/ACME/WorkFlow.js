import React, { useContext, useEffect, useState } from "react";
import { notification } from "antd";
import { useForm } from "react-hook-form";
import Head from "../../layout/head/Head";
import ModalPop from "../../components/Modal";
import SearchBar from "../../components/SearchBar";
import Content from "../../layout/content/Content";
import "react-datepicker/dist/react-datepicker.css";
import { UserContext } from "../../context/UserContext";
import { AuthContext } from "../../context/AuthContext";
import {
  Autocomplete,
  Checkbox,
  DialogTitle,
  FormControlLabel,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { FormGroup, Modal, ModalBody, Form } from "reactstrap";
import {
  Block,
  BlockBetween,
  BlockDes,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  Icon,
  Col,
  Button,
  RSelect,
} from "../../../src/components/Component";
import WorkFlowTable from "../../components/Tables/WorkFlowTable";
const WorkFlow = () => {
  const {
    contextData,
    userDropdownU,
    add_createworkflow,
    getworkflow,
    deletepolicy,
    getWorkspace,
    deleteworkflow,
  } = useContext(UserContext);
  const [sm, updateSm] = useState(false);
  const [editId, setEditedId] = useState();
  const [userData, setUserData] = contextData;
  const [deleteId, setDeleteId] = useState(false);
  const [totalUsers, setTotalUsers] = useState(0);
  const { setAuthToken } = useContext(AuthContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(5);
  const [onSearchText, setSearchText] = useState("");
  const [searchTerm, setSearchTerm] = React.useState("");
  const [userDropdowns, setUserDropdowns] = useState([]);
  const [modal, setModal] = useState({
    edit: false,
    add: false,
  });

  const [addPolicies, setAddPolicies] = useState({
    policy_name: "",
    group_admin: "",
    workspace_name: "",
    selected_user: [],
  });
  const [checkboxValues, setCheckboxValues] = useState({
    l1: false,
    l2: false,
  });

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setCheckboxValues((prevValues) => ({
      ...prevValues,
      [name]: checked,
    }));
  };

  const [open, setOpen] = React.useState({
    status: false,
    data: "",
  });

  const [deleteModal, setDeleteModal] = React.useState({
    status: false,
    data: "",
  });
  const handleClickOpen = (id) => {
    setDeleteModal({
      status: true,
      data: id,
    });
  };
  const handleCloseDelete = () => {
    setDeleteModal({
      status: false,
      data: "",
    });
  };
  useEffect(() => {
    let newData;
    newData = userData.map((item) => {
      item.checked = false;
      return item;
    });
    setUserData([...newData]);
  }, []);
  useEffect(() => {
    getRolesDropdown();
    getTableData();
  }, []);

  const getUserRselect = () => {
    userDropdownU(
      {},
      (apiRes) => {
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
      },
      (apiErr) => {}
    );
  };

  const [userDropdown, setUserDropdown] = useState([]);

  const getRolesDropdown = () => {
    getWorkspace(
      {},
      (apiRes) => {
        const data = apiRes.data.data;
        setUserDropdown(
          data.map((gro) => ({
            label: gro.workspace_name,
            value: gro.id,
          }))
        );
      },
      (apiErr) => {}
    );
  };
  const [tableDropdown, setTableDropdown] = useState([]);
  const getTableData = () => {
    getworkflow(
      {},
      (apiRes) => {
        setTableDropdown(apiRes?.data?.allWorkFlow);
        setTotalUsers(apiRes?.data?.allWorkFlow?.length);
      },
      (apiErr) => {}
    );
  };
  useEffect(() => {
    getUserRselect();
  }, []);
  // function to reset the form
  const resetForm = () => {
    setAddPolicies({
      policy_name: "",
      group_admin: "",
      selected_user: [],
      workspace_name: "",
    });
    setEditedId(0);
  };
  // function to close the form modal
  const onFormCancel = () => {
    setModal({ edit: false, add: false });
    resetForm();
  };
  const onFormClose = () => {
    resetForm();
    setModal({ edit: false }, { add: false });
  };
  // submit function to add a new item
  const onFormSubmit = () => {
    if (editId) {
      let submittedData = {
        id: editId,
        policy_name: addPolicies.policy_name,
        user_email: addPolicies.selected_user,
        group_admin: addPolicies.group_admin,
        workspace_name: addPolicies.workspace_name,
        l_1: checkboxValues.l1,
        l_2: checkboxValues.l2,
      };
      add_createworkflow(
        submittedData,
        (apiRes) => {
          console.log(apiRes, "====");
          if (apiRes.status === 200) {
            notification["success"]({
              placement: "top",
              description: "",
              message: apiRes.data.message,
              style: {
                height: 60,
              },
            });
            onFormClose();
          } else if (apiRes.status === 400) {
            notification["success"]({
              placement: "top",
              description: "",
              message: apiRes.data.message,
              style: {
                height: 60,
              },
            });
          }
        },
        (apiErr) => {
          if (apiErr.response.status === 400) {
            notification["warning"]({
              placement: "top",
              description: "",
              message: apiErr.response.data.message,
              style: {
                height: 60,
              },
            });
            onFormClose();
          }
        }
      );
    } else {
      let submittedData = {
        policy_name: addPolicies.policy_name,
        user_email: addPolicies.selected_user,
        group_admin: addPolicies.group_admin,
        workspace_name: addPolicies.workspace_name,
        l_1: checkboxValues.l1,
        l_2: checkboxValues.l2,
      };

      add_createworkflow(
        submittedData,
        (apiRes) => {
          if (apiRes.status === 201) {
            notification["success"]({
              placement: "top",
              description: "",
              message: apiRes.data.message,
              style: {
                height: 60,
              },
            });
            onFormClose();
          }
        },
        (apiErr) => {
          if (apiErr.response.status === 400) {
            notification["warning"]({
              placement: "top",
              description: "",
              message: apiErr.response.data.message,
              style: {
                height: 60,
              },
            });
            onFormClose();
          }
        }
      );
    }
  };

  const onEditClick = (id) => {
    setModal({ ...open, add: true });
    tableDropdown.map((item) => {
      console.log(item, "item==");
      if (item.id == id) {
        setAddPolicies({
          id: id,
          policy_name: item.policy_name,
          user_email: item.selected_user,
          group_admin: item.group_admin,
          workspace_name: item.workspace_name,
          l_1: item.l1,
          l_2: item.l2,
        });
        setEditedId(id);
      }
    });
  };
  const onDeleteClick = (id) => {
    let deleteId = { id: id };
    deleteworkflow(
      deleteId,
      (apiRes) => {
        if (apiRes.status === 200) {
          notification["success"]({
            placement: "top",
            description: "",
            message: apiRes.data.message,
            style: {
              height: 60,
            },
          });
          getTableData();
          handleCloseDelete();
        }
      },
      (apiErr) => {
        if (apiErr.response.status === 500) {
          notification["error"]({
            placement: "top",
            description: "",
            message: apiErr.response.data.message,
            style: {
              height: 60,
            },
          });
          handleCloseDelete();
        }
      }
    );
  };
  const tableHeader = [
    {
      id: "Policy Name",
      numeric: false,
      disablePadding: true,
      label: "Policy Name",
    },
    {
      id: "User Group",
      numeric: false,
      disablePadding: true,
      label: "User Group",
    },
    {
      id: "User",
      numeric: false,
      disablePadding: true,
      label: "User",
    },
    {
      id: "Updated By",
      numeric: false,
      disablePadding: true,
      label: "Updated By",
    },
    {
      id: "Action",
      numeric: false,
      disablePadding: true,
      label: "Action",
      style: { marginLeft: "18px" },
    },
  ];
  // todolist
  let [addProperty, setAddProperty] = useState("");
  let [todos, setTodos] = useState([]);
  const addTask = () => {
    setAddProperty("");
    setTodos([...todos, addProperty]);
  };
  const removeHandler = (id) => {
    let newTodos = todos.filter((ele, index) => index != id);
    setTodos(newTodos);
  };
  const editHandler = (id) => {
    setAddProperty(todos.filter((val, index) => index === id));
    removeHandler(id);
  };
  const access = [
    { label: "L1", name: "l1" },
    { label: "L2", name: "l2" },
  ];
  const { errors, register, handleSubmit, watch, triggerValidation } =
    useForm();

  return (
    <React.Fragment>
      {/* modal */}
      <ModalPop
        data={deleteModal.data}
        open={deleteModal.status}
        handleClose={handleCloseDelete}
        handleOkay={onDeleteClick}
        title="Policy is being Deleted. Are You Sure !"
      />
      <Head title="Work Flow List - Regular"></Head>
      <Content>
        <Stack style={{ marginTop: "-20px" }}>
          <BlockHead size="sm">
            <BlockBetween>
              <BlockHeadContent>
                <BlockTitle>Work Flow</BlockTitle>
                <BlockDes className="text-soft">
                  <p>You have total {totalUsers} work flow.</p>
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
                          handleClick={() => setModal({ ...open, add: true })}
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
          <WorkFlowTable
            headCells={tableHeader}
            searchTerm={searchTerm}
            onEditClick={onEditClick}
            allfolderlist={tableDropdown}
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
            <div>
              <h5 className="title">
                {editId ? "Update Policy" : "Add Policy"}
              </h5>
              <div>
                <Form
                  className="row gy-2 gx-2"
                  noValidate
                  onSubmit={handleSubmit(onFormSubmit)}
                >
                  <Col md="6">
                    <FormGroup>
                      <TextField
                        className="form-control"
                        type="text"
                        size="small"
                        name="policy_name"
                        defaultValue={addPolicies.policy_name}
                        onChange={(e) =>
                          setAddPolicies({
                            ...addPolicies,
                            [e.target.name]: e.target.value,
                          })
                        }
                        label="Policys Name"
                        ref={register({ required: "This field is required" })}
                      />
                      {errors.policy_name && (
                        <span className="invalid">
                          {errors.policy_name.message}
                        </span>
                      )}
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <Autocomplete
                      fullWidth
                      disablePortal
                      size="small"
                      id="Authentication"
                      name="workspace_name"
                      options={userDropdown}
                      defaultValue={addPolicies.workspace_name}
                      renderInput={(params) => (
                        <TextField {...params} label="WorkSpace Name" />
                      )}
                      onChange={(event, selectedOption) => {
                        setAddPolicies({
                          ...addPolicies,
                          workspace_name: selectedOption
                            ? selectedOption.label
                            : "", // Assuming you want to store the label in the state
                        });
                      }}
                    />
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <TextField
                        size="small"
                        className="form-control"
                        name="group_admin"
                        defaultValue={addPolicies.group_admin}
                        ref={register({ required: "This field is required" })}
                        minLength={10}
                        maxLength={10}
                        onChange={(e) =>
                          setAddPolicies({
                            ...addPolicies,
                            [e.target.name]: e.target.value,
                          })
                        }
                        label="Enter Group Admin"
                        required
                      />
                      {errors.group_admin && (
                        <span className="invalid">
                          {errors.group_admin.message}
                        </span>
                      )}
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <RSelect
                        options={userDropdowns}
                        name="selected_user"
                        defaultValue="Please Select User"
                        isMulti // Assuming this prop makes RSelect support multiple selections
                        onChange={(selectedOptions) => {
                          // Assuming selectedOptions is an array of selected options
                          setAddPolicies({
                            ...addPolicies,
                            selected_user: selectedOptions.map(
                              (option) => option.label
                            ),
                          });
                        }}
                        ref={register({ required: "This field is required" })}
                      />
                      {errors.selected_user && (
                        <span className="invalid">
                          {errors.selected_user.message}
                        </span>
                      )}
                    </FormGroup>
                  </Col>

                  <Stack>
                    <Grid item xs={10} sx={{ mb: -2 }}>
                      <DialogTitle sx={{ ml: -3, mt: -2 }} fontSize="14px">
                        Aproval Levels
                      </DialogTitle>
                    </Grid>
                    <Stack flexDirection="row">
                      {access?.map((data, index) => (
                        <>
                          <Grid item key={data.id}>
                            <FormControlLabel
                              control={
                                <Checkbox
                                  name={data.name}
                                  checked={checkboxValues[data.name] || false}
                                  onChange={handleCheckboxChange}
                                />
                              }
                              label={
                                <Typography
                                  variant="body2"
                                  style={{ fontSize: "15px" }}
                                >
                                  {data.label}
                                </Typography>
                              }
                              sx={{ mb: -1 }}
                              style={data.style}
                            />
                          </Grid>
                        </>
                      ))}
                    </Stack>
                  </Stack>
                  <Col size="12">
                    <ul className="align-center flex-wrap flex-sm-nowrap gx-4 gy-2">
                      <li>
                        <Button color="primary" size="md">
                          Add
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
export default WorkFlow;
