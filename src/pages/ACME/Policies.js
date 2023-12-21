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
import PolicyModal from "../../components/PolicyModal";
import PolicyTable from "../../components/Tables/PolicyTable";
import { Autocomplete, Stack, TextField } from "@mui/material";
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
const Policies = () => {
  const {
    contextData,
    getpolicy,
    userDropdownU,
    add_Policies,
    getGroupsDropdown,
    deletepolicy,
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
  const [formData, setFormData] = useState({
    group_name: "",
    group_admin: "",
    selected_user: "",
  });
  const [addPolicies, setAddPolicies] = useState({
    policy_name: "",
    selected_user: [],
    selected_group: [],
    policy_type: "",
    minimum_characters: "",
    minimum_numeric: "",
    minimum_alphabet: "",
    minimum_special: "",
    incorrect_password: "",
    minimum_days: "",
    maximum_days: "",
    subject: "",
    message: "",
    minimum_upload: "",
    minimum_download: "",
    recyclebin: "",
    version: "",
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
  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setCheckboxValues((prevValues) => ({
      ...prevValues,
      [name]: checked,
    }));
  };
  const handleShareData = (e) => {
    const { name, value } = e.target;
    setAddPolicies((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const [open, setOpen] = React.useState({
    status: false,
    data: "",
  });
  const handleClose = () => {
    resetForm();
    setEditedId(0);
    setOpen({ status: false });
  };
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
    getTableDropdown();
  }, [currentPage]);
  useEffect(() => {
    getTableDropdown();
  }, [addPolicies]);
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
  const [groupsDropdown, setGroupsDropdown] = useState([]);
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
  const [tableDropdown, setTableDropdown] = useState([]);
  const getTableDropdown = () => {
    getpolicy(
      {},
      (apiRes) => {
        const data = apiRes.data.data2;
        setTableDropdown(data);
        setTotalUsers(apiRes.data.data2.length);
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
    getUserRselect();
  }, []);
  // function to reset the form
  const resetForm = () => {
    setAddPolicies({
      policy_name: "",
      selected_user: [],
      selected_group: [],
      policy_type: "",
      minimum_characters: "",
      minimum_numeric: "",
      minimum_alphabet: "",
      minimum_special: "",
      incorrect_password: "",
      // file_extension: "",
      minimum_days: "",
      maximum_days: "",
      subject: "",
      message: "",
      minimum_upload: "",
      minimum_download: "",
      recyclebin: "",
      version: "",
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
        version: addPolicies.version,
        policy_name: addPolicies.policy_name,
        selected_user: addPolicies.selected_user,
        selected_group: addPolicies.selected_group,
        policy_type: addPolicies.policy_type,
        minimum_characters: addPolicies.minimum_characters,
        minimum_numeric: addPolicies.minimum_numeric,
        minimum_alphabet: addPolicies.minimum_alphabet,
        minimum_special: addPolicies.minimum_special,
        incorrect_password: addPolicies.incorrect_password,
        no_of_days: addPolicies.recyclebin,
        file_extension: todos,
        minimum_days: addPolicies.minimum_days,
        maximum_days: addPolicies.maximum_days,
        subject: addPolicies.subject,
        message: addPolicies.message,
        minimum_upload: addPolicies.minimum_upload,
        minimum_download: addPolicies.minimum_download,
        view: checkboxValues.view,
        version_enable: checkboxValues.version_enable,
        recycle_bin: checkboxValues.enable,
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
      add_Policies(
        submittedData,
        (apiRes) => {
          if (apiRes.status == 200) {
            notification["success"]({
              placement: "top",
              description: "",
              message: "Policy Updated Successfully.",
              style: {
                marginTop: "48px",
                height: "60px",
              },
            });
          }
          const code = 200;
          if (code == 200) {
            resetForm();
            // setModal({ edit: false }, { add: false });
            setOpen({ ...open, status: false });
          }
          setAuthToken(token);
        },
        (apiErr) => {}
      );
    } else {
      let submittedData = {
        version: addPolicies.version,
        policy_type: addPolicies.policy_type,
        policy_name: addPolicies.policy_name,
        maximum_days: addPolicies.maximum_days,
        minimum_days: addPolicies.minimum_days,
        selected_user: addPolicies.selected_user,
        selected_group: addPolicies.selected_group,
        minimum_numeric: addPolicies.minimum_numeric,
        minimum_special: addPolicies.minimum_special,
        minimum_alphabet: addPolicies.minimum_alphabet,
        minimum_characters: addPolicies.minimum_characters,
        incorrect_password: addPolicies.incorrect_password,
        file_extension: todos,
        subject: addPolicies.subject,
        message: addPolicies.message,
        no_of_days: addPolicies.recyclebin,
        minimum_upload: addPolicies.minimum_upload,
        minimum_download: addPolicies.minimum_download,
        view: checkboxValues.view,
        version_enable: checkboxValues.version_enable,
        share: checkboxValues.share,
        rename: checkboxValues.rename,
        recycle_bin: checkboxValues.enable,
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
      add_Policies(
        submittedData,
        (apiRes) => {
          if (apiRes.status == 200) {
            notification["success"]({
              placement: "top",
              description: "",
              message: "Policy Applied Successfully.",
              style: {
                marginTop: "48px",
                height: "60px",
              },
            });
          }
          const code = 200;
          if (code == 200) {
            resetForm();
            setOpen({ ...open, status: false });
            getUsers();
          }
          setAuthToken(token);
        },
        (apiErr) => {}
      );
    }
  };
  // const onFormSubmit = () => {
  //   let data = {
  //     policy_name: addPolicies.policy_name,
  //     selected_user: addPolicies.selected_user,
  //     selected_group: addPolicies.selected_group,
  //     policy_type: addPolicies.policy_type,
  //     minimum_characters: addPolicies.minimum_characters,
  //     minimum_numeric: addPolicies.minimum_numeric,
  //     minimum_alphabet: addPolicies.minimum_alphabet,
  //     minimum_special: addPolicies.minimum_special,
  //     incorrect_password: addPolicies.incorrect_password,
  //     file_extension: todos,
  //     minimum_days: addPolicies.minimum_days,
  //     maximum_days: addPolicies.maximum_days,
  //     subject: addPolicies.subject,
  //     message: addPolicies.message,
  //     minimum_upload: addPolicies.minimum_upload,
  //     minimum_download: addPolicies.minimum_download,
  //     view: checkboxValues.view,
  //     share: checkboxValues.share,
  //     rename: checkboxValues.rename,
  //     upload_folder: checkboxValues.upload_folder,
  //     create_folder: checkboxValues.create_folder,
  //     upload_file: checkboxValues.upload_file,
  //     delete: checkboxValues.delete,
  //     download: checkboxValues.download,
  //   };
  //   add_Policies(
  //     data,
  //     (apiRes) => {
  //       setOpen({ ...open, status: false });
  //       setAuthToken(token);
  //     },
  //     (apiErr) => {}
  //   );
  // };
  // function that loads the want to editted userData
  const onEditClick = (id) => {
    tableDropdown.map((item) => {
      if (item.id == id) {
        setAddPolicies({
          id: id,
          policy_name: item.policy_name,
          policy_type: item.policy_type,
          selected_user: item.selected_users,
          selected_group: item.selected_group,
          recyclebin: item.no_of_days,
          minimum_characters: item.minimum_character,
          minimum_numeric: item.minimum_numeric,
          minimum_alphabet: item.minimum_Alphabets,
          minimum_special: item.minimum_special_character,
          incorrect_password: item.inncorrect_password_attend,
          file_extension: todos,
          minimum_days: item.minimum_maximum_days[0],
          maximum_days: item.minimum_maximum_days[1],
          subject: item.subject,
          message: item.message,
          minimum_upload: item.Bandwidth_min_max[0],
          minimum_download: item.Bandwidth_min_max[1],
          view: item.view,
          share: item.share,
          rename: item.rename,
          upload_folder: item.upload_folder,
          enable: item.recycle_bin,
          create_folder: item.create_folder,
          upload_file: item.upload_file,
          delete: item.delete,
          download: item.download,
          move: item.move,
          rights: item.rights,
          comment: item.comment,
          properties: item.properties,
        });
        setOpen({ ...open, status: true });
        // setModal({ edit: false, add: true });
        setEditedId(id);
      }
    });
  };
  const onDeleteClick = (id) => {
    handleCloseDelete();
    setDeleteId(true);
    let deleteId = { id: id };
    deletepolicy(
      deleteId,
      (apiRes) => {
        if (apiRes.status == 200) {
          notification["success"]({
            placement: "top",
            description: "",
            message: "Policy Deleted Successfully...",
            style: {
              marginTop: "48px",
              height: "60px",
            },
          });
        }
        const code = 200;
        if (code == 200) {
          resetForm();
          setModal({ edit: false }, { add: false });
        }
        setAuthToken(token);
      },
      (apiErr) => {}
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
      id: "Policy Type",
      numeric: false,
      disablePadding: true,
      label: "Policy Type",
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
      <PolicyModal
        type="form"
        todoList="true"
        addTask={todos}
        open={open.status}
        buttonSuccessTitle={editId ? "Update Policy" : "Add Policy"}
        onClickaddTask={() => addTask()}
        title={editId ? "Update Policy" : "Add Policy"}
        title1="Password Settings"
        title2="File Extension"
        title3="Link Expiry"
        title4="Email"
        title5="BandWidth"
        title6="Permission"
        title7="Recycle Bin"
        title8="Versions"
        groupsDropdown={groupsDropdown}
        userDropdowns={userDropdowns}
        addPolicies={addPolicies}
        setAddPolicies={setAddPolicies}
        checkboxValues={checkboxValues}
        onFormSubmit={onFormSubmit}
        handleShareData={handleShareData}
        handleCheckboxChange={handleCheckboxChange}
        editHandler={(id) => editHandler(id)}
        removeHandler={(id) => removeHandler(id)}
        handleClose={handleClose}
        PropertyName={(e) => setAddProperty(e.target.value)}
        Policies={[
          {
            type: "text",
            name: "policy_name",
            placeholder: "Name",
          },
        ]}
        inputList={[
          {
            type: "number",
            name: "minimum_characters",
            placeholder: "Min Char",
          },
          {
            type: "number",
            name: "minimum_numeric",
            placeholder: "Min Numeric Char",
          },
          {
            type: "number",
            name: "minimum_alphabet",
            placeholder: "Min Alphabets",
          },
          {
            type: "number",
            name: "minimum_special",
            placeholder: "Min Special Char",
          },
        ]}
        password={[
          {
            type: "number",
            name: "incorrect_password",
            placeholder: "Inncorrect Password Attempts",
          },
        ]}
        linkSharing={[
          {
            type: "number",
            name: "minimum_days",
            placeholder: "Min Days",
          },
          {
            type: "number",
            name: "maximum_days",
            placeholder: "Max Days",
          },
        ]}
        email={[
          {
            type: "text",
            name: "subject",
            placeholder: "Subject",
          },
          {
            type: "text",
            name: "message",
            placeholder: "Message",
          },
        ]}
        BandWidth={[
          {
            type: "number",
            name: "minimum_upload",
            placeholder: "Min Upload(Mbps)",
          },
          {
            type: "number",
            name: "minimum_download",
            placeholder: "Max Download(Mbps)",
          },
        ]}
        access={[
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
        ]}
        recyclebin={[{ label: "Enable", name: "enable" }]}
        recyclebinfield={[
          {
            type: "number",
            name: "recyclebin",
            placeholder: "No. Of Days",
          },
        ]}
        version={[{ label: "Enable", name: "version_enable" }]}
        versionfield={[
          {
            type: "number",
            name: "version",
            placeholder: "No. Of versions",
          },
        ]}
      />
      <Head title="Policies List - Regular"></Head>
      <Content>
        <Stack style={{ marginTop: "40px" }}>
          <BlockHead size="sm">
            <BlockBetween>
              <BlockHeadContent>
                <BlockTitle>Policies</BlockTitle>
                <BlockDes className="text-soft">
                  <p>You have total {totalUsers} Policies.</p>
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
                          handleClick={() => setOpen({ ...open, status: true })}
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
          <PolicyTable
            searchTerm={searchTerm}
            headCells={tableHeader}
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
                  className="row gy-1"
                  noValidate
                  // onSubmit={handleSubmit(onFormSubmit)}
                >
                  <Col md="6">
                    <FormGroup>
                      <label className="form-label">Policys Name</label>
                      <TextField
                        className="form-control"
                        type="text"
                        size="small"
                        name="policys_name"
                        defaultValue={formData.group_name}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            [e.target.name]: e.target.value,
                          })
                        }
                        placeholder="Enter group_name"
                        ref={register({ required: "This field is required" })}
                      />
                      {errors.group_name && (
                        <span className="invalid">
                          {errors.group_name.message}
                        </span>
                      )}
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <label className="form-label">Policy Type</label>
                    <Autocomplete
                      fullWidth
                      disablePortal
                      size="small"
                      id="Authentication"
                      options={["My Workspace", "Teamspace"]}
                      renderInput={(params) => (
                        <TextField {...params} label="Policy Type" />
                      )}
                    />
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <label className="form-label">Selected User</label>
                      <RSelect
                        options={userDropdowns}
                        name="add_group"
                        defaultValue="Please Select Groups"
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            selected_user: e.label,
                            [e.label]: e.value,
                          })
                        }
                        ref={register({ required: "This field is required" })}
                      />
                      {errors.selected_user && (
                        <span className="invalid">
                          {errors.selected_user.message}
                        </span>
                      )}
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <label className="form-label">Group Admin</label>
                      <TextField
                        size="small"
                        className="form-control"
                        name="group_admin"
                        defaultValue={formData.group_admin}
                        ref={register({ required: "This field is required" })}
                        minLength={10}
                        maxLength={10}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            [e.target.name]: e.target.value,
                          })
                        }
                        placeholder="Enter Group Admin"
                        required
                      />
                      {errors.group_admin && (
                        <span className="invalid">
                          {errors.group_admin.message}
                        </span>
                      )}
                    </FormGroup>
                  </Col>
                  <Col md="12">
                    <h5
                      className="title"
                      style={{ padding: "5px 0px 5px 0px" }}
                    >
                      {editId ? "Update Password Setting" : "Password Setting"}
                    </h5>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <label className="form-label">Minimum Characters</label>
                      <TextField
                        className="form-control"
                        type="number"
                        size="small"
                        name="policys_name"
                        defaultValue={formData.group_name}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            [e.target.name]: e.target.value,
                          })
                        }
                        placeholder="Minimum Characters"
                        ref={register({ required: "This field is required" })}
                      />
                      {errors.group_name && (
                        <span className="invalid">
                          {errors.group_name.message}
                        </span>
                      )}
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <label className="form-label">
                        Minimum Numeric Characters
                      </label>
                      <TextField
                        className="form-control"
                        type="number"
                        size="small"
                        name="policys_name"
                        defaultValue={formData.group_name}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            [e.target.name]: e.target.value,
                          })
                        }
                        placeholder=" Minimum Numeric Characters"
                        ref={register({ required: "This field is required" })}
                      />
                      {errors.group_name && (
                        <span className="invalid">
                          {errors.group_name.message}
                        </span>
                      )}
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <label className="form-label">Minimum Alphabets</label>
                      <TextField
                        className="form-control"
                        type="text"
                        size="small"
                        name="policys_name"
                        defaultValue={formData.group_name}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            [e.target.name]: e.target.value,
                          })
                        }
                        placeholder="Minimum Alphabets"
                        ref={register({ required: "This field is required" })}
                      />
                      {errors.group_name && (
                        <span className="invalid">
                          {errors.group_name.message}
                        </span>
                      )}
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <label className="form-label">
                        Minimum Special Characters
                      </label>
                      <TextField
                        className="form-control"
                        type="text"
                        size="small"
                        name="policys_name"
                        defaultValue={formData.group_name}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            [e.target.name]: e.target.value,
                          })
                        }
                        placeholder="Minimum Special Characters"
                        ref={register({ required: "This field is required" })}
                      />
                      {errors.group_name && (
                        <span className="invalid">
                          {errors.group_name.message}
                        </span>
                      )}
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <label className="form-label">
                        Inncorrect Password Attempts
                      </label>
                      <TextField
                        className="form-control"
                        type="text"
                        size="small"
                        name="policys_name"
                        defaultValue={formData.group_name}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            [e.target.name]: e.target.value,
                          })
                        }
                        placeholder="Inncorrect Password Attempts"
                        ref={register({ required: "This field is required" })}
                      />
                      {errors.group_name && (
                        <span className="invalid">
                          {errors.group_name.message}
                        </span>
                      )}
                    </FormGroup>
                  </Col>
                  {/* <Grid container spacing={1}>
                    <Grid item xs={4} key={data.name}>
                      <TextField
                        fullWidth
                        size="small"
                        variant="outlined"
                        type="number"
                        name="name"
                        placeholder="Minimum Characters"
                        //   onChange={handleChange}
                        //   value={folderNameInput.name}
                        placeholder={data.placeholder}
                      />
                    </Grid>
                  </Grid> */}
                  <Col size="12">
                    <ul className="align-center flex-wrap flex-sm-nowrap gx-4 gy-2">
                      <li>
                        <Button
                          color="primary"
                          size="md"
                          onClick={() => setOpen({ ...open, status: true })}
                        >
                          Next
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
export default Policies;
