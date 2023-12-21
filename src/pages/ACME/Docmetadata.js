import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../context/AuthContext";
import { UserContext } from "../../context/UserContext";
import { notification } from "antd";
import { FormGroup, Modal, ModalBody, Form } from "reactstrap";
import Head from "../../layout/head/Head";
import ModalPop from "../../components/Modal";
import Content from "../../layout/content/Content";
import Meta_Properties from "../../components/Meta_properties";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import "react-datepicker/dist/react-datepicker.css";
import SearchIcon from "@mui/icons-material/Search";
import {
  Autocomplete,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import {
  Block,
  BlockBetween,
  BlockDes,
  BlockHead,
  BlockHeadContent,
  Icon,
  Col,
  PaginationComponent,
  Button,
  DataTable,
  DataTableBody,
  DataTableHead,
  DataTableRow,
  DataTableItem,
  TooltipComponent,
} from "../../components/Component";
import DocmetaTable from "../../components/Tables/DocmetaTable";
import SearchBar from "../../components/SearchBar";

const Docmetadata = () => {
  const {
    contextData,
    add_docmetadata,
    getdoclist,
    getmetalist,
    getWorkspace,
    meta_property,
    cabinetDropdown,
    deletemetadata,
    getproperties,
    blockMetaStatus,
  } = useContext(UserContext);
  const { setAuthToken } = useContext(AuthContext);
  const [userData, setUserData] = contextData;
  const [sm, updateSm] = useState(false);
  const [tablesm, updateTableSm] = useState(false);
  const [onSearch, setonSearch] = useState(true);
  const [onSearchText, setSearchText] = useState("");
  const [editId, setEditedId] = useState();
  const [formData, setFormData] = useState("");
  const [metadata, setMetadata] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(5);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalmeta, setTotalMeta] = useState(0);
  const [deleteId, setDeleteId] = useState(false);
  const [docList, setDocList] = useState([]);
  const [metaList, setMetaList] = useState([]);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [cabinetList, setcabinetList] = useState([]);
  const [modal, setModal] = useState({
    edit: false,
    add: false,
    permission: false,
    metaedit: false,
    properties: false,
  });
  // ----------------DeleteModelStart
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
  // ----------------DeleteModelEnd
  const [propertyDropdown, setPropertyDropdown] = useState("");
  const [fieldNameInput, setFieldNameInput] = useState("");
  const [propertyName, setPropertyName] = useState("");
  // -----------------------------Autocomplete data store
  const [cabinet, setCabinet] = useState([]);
  const [workspace, setworkspace] = useState([]);
  const [doctype, setDoctype] = useState([]);

  // -----------------------------Autocomplete data store

  // ----------------list Dropdown
  const getCabinetDropdown = () => {
    cabinetDropdown(
      {},
      (apiRes) => {
        setcabinetList(apiRes.data.data);
      },
      (apiErr) => {}
    );
  };
  const getdoctypelist = () => {
    getdoclist(
      {},
      (apiRes) => {
        setDocList(apiRes.data);
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
        setTotalMeta(apiRes.data.length);
        setMetaList(apiRes.data);
      },
      (apiErr) => {
        console.log(apiErr);
      }
    );
  };
  // ----------------list Dropdown
  const [getProperties, GetProperties] = useState([]);
  const onProperties = (doctype) => {
    setMetaId(doctype);
    let data = {
      doctype: doctype,
    };
    getproperties(
      data,
      (apiRes) => {
        GetProperties(apiRes.data);
        getUsers();
        setAuthToken(token);
      },
      (apiErr) => {}
    );
  };

  useEffect(() => {
    getdoctypelist();
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
    getmetatypelist();
  }, [cabinet]);
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
  // ----------------
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
  // onChange function for searching name
  const onFilterChange = (e) => {
    setSearchText(e.target.value);
  };
  //block meta properties
  const onBlockClick = (id, checked) => {
    let statusCheck = {
      id: id,
      status: checked,
    };
    // notification["warning"]({
    //   placement: "bottomRight",
    //   description: "",
    //   message: statusCheck.meta_status
    //     ? "Property Active"
    //     : "Property Inactive",
    // });

    blockMetaStatus(
      statusCheck,
      (apiRes) => {
        if (200 == 200) {
          statusCheck = {};
          resetForm();
          setModal({ edit: false }, { add: false });
          getUsers();
        }
        setAuthToken(token);
      },
      (apiErr) => {}
    );
  };

  const [switchValues, setSwitchValues] = useState({});
  const handleSwitchChange = (event, id) => {
    const checked = event.target.checked;
    setSwitchValues((prevValues) => ({
      ...prevValues,
      [id]: {
        id,
        metaStatus: checked,
      },
    }));
  };

  // function to reset the form
  const resetForm = () => {
    setPropertyDropdown("");
    setDoctype("");
    setworkspace("");
    setCabinet("");
    setEditedId(0);
  };
  // function to close the form modal
  const onFormCancel = () => {
    setModal({ edit: false, add: false });
    resetForm();
  };
  // submit function to add a new item onSubmitProperties
  const onSubmitProperties = () => {
    if (editId) {
      let submittedData = {
        meta_id: metaId.id,
        doctype: metaId,
        fieldname: fieldNameInput,
        fieldtype: propertyDropdown,
        metaproperties: todos,
      };
      meta_property(
        submittedData,
        (apiRes) => {
          if (apiRes.status == 201) {
            notification["success"]({
              placement: "top",
              description: "",
              message: "Add Doc Metadata properties.",
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
    } else {
      let submittedData = {
        meta_id: metaId.id,
        doctype: metaId,
        fieldname: fieldNameInput,
        fieldtype: propertyDropdown,
        metaproperties: todos,
      };
      meta_property(
        submittedData,
        (apiRes) => {
          const code = 200;
          if (code == 200) {
            resetForm();
            setModal({ edit: false }, { add: false });
            getUsers();
          }
          setAuthToken(token);
        },
        (apiErr) => {}
      );
    }
  };
  //doc type properties on submit
  const onFormSubmit = () => {
    if (editId) {
      let submittedData = {
        id: editId,
        metadata_name: metadata,
        workspace_name: workspace.workspace_name,
        doctype: doctype.doctype_name,
        cabinet_name: cabinet.cabinet_name,
      };
      add_docmetadata(
        submittedData,
        (apiRes) => {
          if (apiRes.status == 200) {
            notification["success"]({
              placement: "top",
              description: "",
              message: "Doc Metadata Created Successfully.",
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
            getTotalWorkspace();
          }
          setAuthToken(token);
        },
        (apiErr) => {}
      );
    } else {
      let submittedData = {
        metadata_name: metadata,
        workspace_name: workspace.workspace_name,
        doctype: doctype.doctype_name,
        cabinet_name: cabinet.cabinet_name,
      };
      add_docmetadata(
        submittedData,
        (apiRes) => {
          const code = 200;
          if (code == 200) {
            resetForm();
            setModal({ edit: false }, { add: false });
            getUsers();
          }
          setAuthToken(token);
        },
        (apiErr) => {}
      );
    }
  };
  // function that loads the want to editted userData

  // handle Delete Function
  const onDeleteClick = (id) => {
    handleClose();
    setDeleteId(true);
    let deleteId = { id: id };
    deletemetadata(
      deleteId,
      (apiRes) => {
        if (apiRes.status == 200) {
          notification["success"]({
            placement: "top",
            description: "",
            message: "Doc Metadata Deleted Successfully.",
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
  // function to toggle the search option
  const toggle = () => setonSearch(!onSearch);
  const paginate = (pageNumber) => {
    debugger;
    setCurrentPage(pageNumber);
  };
  const [metaId, setMetaId] = useState();
  let [addProperty, setAddProperty] = useState("");
  let [todos, setTodos] = useState([]);
  const addTask = () => {
    setTodos([...todos, addProperty]);
    setAddProperty("");
  };
  const removeHandler = (id) => {
    let newTodos = todos.filter((ele, index) => index != id);
    setTodos(newTodos);
  };
  const editHandler = (id) => {
    setAddProperty(todos.filter((val, index) => index === id));
    removeHandler(id);
  };
  const tableHeader = [
    {
      id: "Doc Metadata Name",
      numeric: false,
      disablePadding: true,
      label: "Doc Metadata Name",
    },
    {
      id: "Cabinet Name",
      numeric: false,
      disablePadding: true,
      label: "Cabinet Name",
    },
    {
      id: "Workspace Name",
      numeric: false,
      disablePadding: true,
      label: "Workspace Name",
    },
    {
      id: "Doctype Name",
      numeric: false,
      disablePadding: true,
      label: "Doctype Name",
    },
    {
      id: "Action",
      numeric: false,
      disablePadding: true,
      label: "Action",
    },
  ];
  const { errors, register, handleSubmit } = useForm();

  return (
    <React.Fragment>
      <ModalPop
        open={open.status}
        handleClose={handleClose}
        handleOkay={onDeleteClick}
        title={"Doc Metadata is being Deleted. Are You Sure !"}
        data={open.data}
      />
      <Meta_Properties
        modal={modal}
        editId={editId}
        title={metaId}
        switchValues={switchValues}
        setSwitchValues={setSwitchValues}
        handleSwitchChange={handleSwitchChange}
        onBlockClick={onBlockClick}
        getProperties={getProperties}
        toggle={() => setModal({ metaedit: false })}
        onFormCancel={onFormCancel}
        addTask={todos}
        onClickaddTask={() => addTask()}
        PropertyName={(e) => setAddProperty(e.target.value)}
        editHandler={(id) => editHandler(id)}
        removeHandler={(id) => removeHandler(id)}
        handleSubmit={handleSubmit}
        onSubmitProperties={onSubmitProperties}
        propertyDropdown={propertyDropdown}
        autocomplete={(e, v) => setPropertyDropdown(v)}
        FieldNameInput={(e) => setFieldNameInput(e.target.value)}
      />

      <Head title="Docmetadata- Regular"></Head>
      <Content>
        <Stack style={{ marginTop: "-28px" }}>
          <BlockHead size="sm">
            <BlockBetween>
              <BlockHeadContent>
                <Typography style={{ fontSize: "24.5px", fontWeight: "bold" }}>
                  Doc Metadata
                </Typography>
                <BlockDes className="text-soft">
                  <p>You have total {totalmeta} Doc Metadata.</p>
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
                        {/* <Button
                          color="primary"
                          className="btn-icon"
                          onClick={() => setModal({ add: true })}
                        >
                          <Icon name="plus"></Icon>
                        </Button> */}
                      </li>
                    </ul>
                  </div>
                </div>
              </BlockHeadContent>
            </BlockBetween>
          </BlockHead>
        </Stack>
        <DocmetaTable
          searchTerm={searchTerm}
          headCells={tableHeader}
          allfolderlist={metaList}
          onBlockClick={onBlockClick}
          onProperties={onProperties}
          handleClickOpen={handleClickOpen}
          setModal={setModal}
          toggle={() => setModal({ metaedit: true })}
        />
        {/* ---------------------------------------models start */}
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
                {editId ? "Update Metadata" : "Add Metadata"}
              </h5>
              <div className="mt-2">
                <Form
                  className="row gy-2"
                  noValidate
                  onSubmit={handleSubmit(onFormSubmit)}
                >
                  <Col md="6">
                    <label className="form-label">Cabinet</label>
                    <Autocomplete
                      disablePortal
                      size="small"
                      options={cabinetList}
                      getOptionLabel={(cabinetList) =>
                        cabinetList?.cabinet_name
                      } // Adjust this based on your API response structure
                      renderInput={(params) => (
                        <TextField {...params} label="Select an option" />
                      )}
                      onChange={(e, v) => setCabinet(v)}
                    />
                  </Col>
                  <Col md="6">
                    <label className="form-label">workspace_name</label>
                    <Autocomplete
                      disablePortal
                      size="small"
                      options={userData}
                      getOptionLabel={(userData) => userData.workspace_name} // Adjust this based on your API response structure
                      renderInput={(params) => (
                        <TextField {...params} label="Select an option" />
                      )}
                      onChange={(e, v) => setworkspace(v)}
                    />
                  </Col>
                  <Col md="6">
                    <label className="form-label">Doc Type</label>
                    <Autocomplete
                      disablePortal
                      size="small"
                      options={docList}
                      getOptionLabel={(docList) => docList.doctype_name} // Adjust this based on your API response structure
                      renderInput={(params) => (
                        <TextField {...params} label="Select an option" />
                      )}
                      onChange={(e, v) => setDoctype(v)}
                    />
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <label className="form-label">Metadata Name</label>
                      <TextField
                        className="form-control"
                        type="text"
                        fullWidth
                        size="small"
                        name="metadata Name"
                        // defaultValue={formData}
                        onChange={(e) => setMetadata(e.target.value)}
                        placeholder="Enter Quota"
                        ref={register({ required: "This field is required" })}
                      />
                      {errors.workspace_name && (
                        <span className="invalid">
                          {errors.workspace_name.message}
                        </span>
                      )}
                    </FormGroup>
                  </Col>
                  <Col size="12">
                    <ul className="align-center flex-wrap flex-sm-nowrap gx-4 gy-2">
                      <li>
                        <Button color="primary" size="md" type="submit">
                          {editId ? "Update Metadata" : "Add Metadata"}
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
        {/* ---------------------------------------models end */}
      </Content>
    </React.Fragment>
  );
};
export default Docmetadata;
