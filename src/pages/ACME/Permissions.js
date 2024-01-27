import React, { useState, useContext, useEffect } from "react";
import { notification } from "antd";
import Head from "../../layout/head/Head";
import { Stack, Typography } from "@mui/material";
import Content from "../../layout/content/Content";
import "react-datepicker/dist/react-datepicker.css";
import { UserContext } from "../../context/UserContext";
import PermissionForm from "../../components/Forms/PermissionForm";
import PermissionTable from "../../components/Tables/PermissionTable";

const Permissions = () => {
  const {
    getsmtp,
    editsmtp,
    createsmtp,
    getWorkspace,
    userDropdownU,
    cabinetDropdown,
    getGroupsDropdown,
  } = useContext(UserContext);
  const [editId, setEditedId] = useState(0);
  const [getSmpt, setGetSmpt] = useState([]);
  const [smptdata, setSmptdata] = useState([]);
  const [Workspace, setWorkspace] = useState([]);
  const [cabinetList, setcabinetList] = useState([]);
  const [userDropdowns, setUserDropdowns] = useState([]);
  const [groupsDropdown, setGroupsDropdown] = useState([]);
  // Permission Details Form------
  const [formData, setFormData] = useState({
    Groups: "",
    Users: "",
    Cabinet: "",
    WorkSpace: "",
    Permissions: "",
    Folder_File: "",
    WorkSpace_Type: "",
  });
  useEffect(() => {
    getsmptdata();
    getWorkspaces();
    getUserRselect();
    getRolesDropdown();
    getCabinetDropdown();
  }, []);

  const getsmptdata = () => {
    getsmtp(
      {},
      (apiRes) => {
        setGetSmpt(apiRes?.data?.data);
        const apiData = apiRes?.data?.data[0];
        setSmptdata(apiData);
      },
      (apiErr) => {
        console.log("====> api get", apiErr);
      }
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
  const getWorkspaces = () => {
    getWorkspace(
      {},
      (apiRes) => {
        setWorkspace(apiRes?.data?.data);
      },
      (apiErr) => {
        console.log(apiErr, "fhdfhdfhgdf");
      }
    );
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
  const onEditClick = (id) => {
    getSmpt.map((item) => {
      if (item.id == id) {
        setFormData((prevFormData) => ({
          ...prevFormData,
          User_Name: item?.username,
          password: item?.password,
          Server_IP: item?.host_serverip,
          Server_Port: item?.port,
          From_Address: item?.from_address,
          From_Name: item?.from_name,
          Authentication: item?.authentication,
          Security: item?.security,
        }));
        setEditedId(id);
      }
    });
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

  const onBlockClick = (id, smtp_status) => {
    let statusCheck = {
      id,
      smtp_status,
    };
    editsmtp(
      statusCheck,
      (apiRes) => {
        if (apiRes.status == 200) {
          notification["success"]({
            placement: "top",
            description: "",
            message: apiRes.data.message,
            style: {
              height: 60,
            },
          });
          getsmptdata();
        }
      },
      (apiErr) => {}
    );
  };
  const handleSubmit = () => {
    if (editId) {
      let data = {
        id: editId,
        username: formData?.User_Name,
        password: formData?.password,
        host_serverip: formData?.Server_IP,
        port: formData?.Server_Port,
        from_address: formData?.From_Address,
        from_name: formData?.From_Name,
        authentication: formData?.Authentication,
        security: formData?.Security,
      };
      editsmtp(
        data,
        (apiRes) => {
          if (apiRes.status == 200) {
            notification["success"]({
              placement: "top",
              description: "",
              message: "SMTP Edited Successfully.",
              style: {
                height: 60,
              },
            });
            getsmptdata();
            resetFormSmtp();
          }
        },
        (apiErr) => {}
      );
    } else {
      let data = {
        username: formData?.User_Name,
        password: formData?.password,
        host_serverip: formData?.Server_IP,
        port: formData?.Server_Port,
        from_address: formData?.From_Address,
        from_name: formData?.From_Name,
        authentication: formData?.Authentication,
        security: formData?.Security,
      };
      createsmtp(
        data,
        (apiRes) => {
          if (apiRes.status == 201) {
            notification["success"]({
              placement: "top",
              description: "",
              message: "SMTP Created Successfully.",
              style: {
                height: 60,
              },
            });
            getsmptdata();
            resetFormSmtp();
          }
        },
        (apiErr) => {}
      );
    }
  };
  const onEditSmtp = () => {
    let data = {
      id: smptdata.id,
      username: formData.User_Name,
      password: formData.password,
      host_serverip: formData.Server_IP,
      port: formData.Server_Port,
      from_address: formData.From_Address,
      from_name: formData.From_Name,
      authentication: formData.Authentication,
      security: formData.Security,
    };
    editsmtp(
      data,
      (apiRes) => {
        if (apiRes.status == 200) {
          notification["success"]({
            placement: "top",
            description: "",
            message: "SMTP Updated Successfully.",
            style: {
              height: 60,
            },
          });
        }
      },
      (apiErr) => {}
    );
  };

  const resetFormPermission = () => {
    setFormData({
      Groups: "",
      Users: "",
      Cabinet: "",
      WorkSpace: "",
      Permissions: "",
      Folder_File: "",
      WorkSpace_Type: "",
    });
    setEditedId(0);
  };
  return (
    <React.Fragment>
      <Head title="SMTP - Regular"></Head>
      <Content>
        <Stack
          flexDirection="row"
          justifyContent="space-between"
          sx={{ mt: -3.4 }}
        >
          <Typography style={{ fontSize: "24.5px", fontWeight: "bold" }}>
            Permissions
          </Typography>
        </Stack>
        <PermissionForm
          editId={editId}
          smptdata={smptdata}
          formData={formData}
          Workspace={Workspace}
          cabinetList={cabinetList}
          userDropdowns={userDropdowns}
          groupsDropdown={groupsDropdown}
          onEditSmtp={onEditSmtp}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          handleAutocompleteChange={handleAutocompleteChange}
        />
        <PermissionTable
          getSmpt={getSmpt}
          onEditClick={onEditClick}
          onBlockClick={onBlockClick}
        />
      </Content>
    </React.Fragment>
  );
};
export default Permissions;
