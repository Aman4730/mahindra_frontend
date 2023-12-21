import React, { useState, useContext, useEffect } from "react";
import Content from "../../layout/content/Content";
import Head from "../../layout/head/Head";
import {
  BlockBetween,
  BlockHead,
  BlockHeadContent,
} from "../../../src/components/Component";
import "react-datepicker/dist/react-datepicker.css";
import { Stack, Typography } from "@mui/material";
import SmtpTable from "../../components/Tables/SmtpTable";
import { UserContext } from "../../context/UserContext";
import { notification } from "antd";

const Smtp = () => {
  const { createsmtp, getsmtp, addtestemail, editsmtp } =
    useContext(UserContext);
  const [smptdata, setSmptdata] = useState([]);
  useEffect(() => {
    getsmptdata();
  }, []);

  const getsmptdata = () => {
    getsmtp(
      {},
      (apiRes) => {
        const apiData = apiRes.data.data[0];
        setSmptdata(apiData);

        // Update form data with API response
        setFormData((prevFormData) => ({
          ...prevFormData,
          User_Name: apiData.username,
          password: apiData.password,
          Server_IP: apiData.host_serverip,
          Server_Port: apiData.port,
          From_Address: apiData.from_address,
          From_Name: apiData.from_name,
          Authentication: apiData.authentication,
          Security: apiData.security,
        }));
      },
      (apiErr) => {
        console.log("====> api get", apiErr);
      }
    );
  };

  // SMTP Details Form------
  const [formData, setFormData] = useState({
    User_Name: "",
    password: "",
    Server_IP: "",
    Server_Port: "",
    From_Address: "",
    From_Name: "",
    Authentication: "",
    Security: "",
  });
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
  const handleSubmit = () => {
    let data = {
      username: formData.User_Name,
      password: formData.password,
      host_serverip: formData.Server_IP,
      port: formData.Server_Port,
      from_address: formData.From_Address,
      from_name: formData.From_Name,
      authentication: formData.Authentication,
      security: formData.Security,
    };
    createsmtp(
      data,
      (apiRes) => {
        if (apiRes.status == 200) {
          notification["success"]({
            placement: "top",
            description: "",
            message: "SMTP Created Successfully.",
            style: {
              marginTop: "43px",
              height: "55px",
            },
          });
        }
        getUsers();
        setAuthToken(token);
      },
      (apiErr) => {}
    );
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
              marginTop: "43px",
              height: "55px",
            },
          });
        }
        getUsers();
        setAuthToken(token);
      },
      (apiErr) => {}
    );
  };
  // Test Email-----
  const [testEmailForm, setTestEmailForm] = useState({
    To_Address: "",
    Subject: "",
    Message: "",
  });
  const handleTestEmail = (event) => {
    const { name, value } = event.target;
    setTestEmailForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmitTestEmail = () => {
    let data = {
      to_address: testEmailForm.To_Address,
      message: testEmailForm.Message,
      subject: testEmailForm.Subject,
    };
    addtestemail(
      data,
      (apiRes) => {
        if (apiRes.status == 200) {
          notification["success"]({
            placement: "top",
            description: "",
            message: "Email Sent Successfully.",
            style: {
              marginTop: "43px",
              height: "60px",
            },
          });
        }
        resetFormTestEmail();
      },
      (apiErr) => {}
    );
  };
  const resetFormTestEmail = () => {
    setTestEmailForm({
      To_Address: "",
      Subject: "",
      Message: "",
    });
  };
  const tableHeader = [
    {
      id: "Display Name",
      numeric: false,
      disablePadding: true,
      label: "Display Name",
    },
    {
      id: "Email",
      numeric: false,
      disablePadding: true,
      label: "Email",
    },
    {
      id: "Employee Code",
      numeric: false,
      disablePadding: true,
      label: "Employee Code",
    },
    {
      id: "Max Quota",
      numeric: false,
      disablePadding: true,
      label: "Max Quota",
    },
    {
      id: "User Role",
      numeric: false,
      disablePadding: true,
      label: "User Role",
    },
    {
      id: "Action",
      numeric: false,
      disablePadding: true,
      label: "Action",
    },
  ];
  return (
    <React.Fragment>
      <Head title="SMTP - Regular"></Head>
      <Content>
        <Stack style={{ marginTop: "-28px" }}>
          <BlockHead size="sm">
            <BlockBetween>
              <BlockHeadContent>
                <Typography style={{ fontSize: "24.5px", fontWeight: "bold" }}>
                  SMTP Details
                </Typography>
              </BlockHeadContent>
            </BlockBetween>
          </BlockHead>
        </Stack>
        <SmtpTable
          smptdata={smptdata}
          formData={formData}
          onEditSmtp={onEditSmtp}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          testEmailForm={testEmailForm}
          handleTestEmail={handleTestEmail}
          handleSubmitTestEmail={handleSubmitTestEmail}
          handleAutocompleteChange={handleAutocompleteChange}
        />
      </Content>
    </React.Fragment>
  );
};
export default Smtp;
