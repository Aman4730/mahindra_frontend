import React, { useState, useContext } from "react";
import PageContainer from "../../layout/page-container/PageContainer";
import acmeLogo from "../../images/AcmeTrans.png";
import Head from "../../layout/head/Head";
import AuthFooter from "./AuthFooter";
import {
  Block,
  BlockContent,
  BlockDes,
  BlockHead,
  BlockTitle,
  Button,
  Icon,
  PreviewCard,
} from "../../components/Component";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Form, FormGroup, Spinner, Alert } from "reactstrap";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { notification } from "antd";
import { useHistory } from "react-router-dom";
import { Grid, IconButton, InputAdornment, TextField } from "@mui/material";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [passState, setPassState] = useState(false);
  const [errorVal, setError] = useState("");
  const [loginData, setLoginData] = useState([]);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const history = useHistory();
  const onFormSubmit = (formData) => {
    setLoading(true);
    fetch(`${process.env.REACT_APP_API_URL_LOCAL}/login`, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        if (data.success) {
          setLoginData(data);
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", JSON.stringify(data));
          history.push("/");
        } else if (data.status == false) {
          notification["error"]({
            placement: "'bottomRight",
            description: "",
            message: "Your account has been disabled",
          });
        } else {
          notification["error"]({
            placement: "'bottomRight",
            description: "",
            message: "Invalid Credential",
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [showPassword, setShowPassword] = React.useState(false);
  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const { errors, register, handleSubmit } = useForm();
  return (
    <React.Fragment>
      <Head title="Login" />
      <PageContainer>
        <Block className="nk-block-middle nk-auth-body  wide-xs">
          <PreviewCard className="card-bordered" bodyClass="card-inner-lg">
            <BlockHead>
              <BlockContent>
                <div className="brand-logo text-center">
                  <Link to={process.env.PUBLIC_URL + "/"} className="logo-link">
                    <img
                      className="logo-dark w-50"
                      src="/Image/acmeLogo.jpeg"
                      alt="logo-dark"
                    ></img>
                  </Link>
                </div>
                <BlockTitle tag="h5" className="text-center">
                  Sign In - ACME DocHub
                </BlockTitle>
                <BlockDes></BlockDes>
              </BlockContent>
            </BlockHead>
            {errorVal && (
              <div className="mb-3">
                <Alert color="danger" className="alert-icon">
                  <Icon name="alert-circle" /> {errorVal}
                </Alert>
              </div>
            )}
            <Form className="is-alter" onSubmit={handleSubmit(onFormSubmit)}>
              <FormGroup>
                <div className="form-label-group">
                  <label className="form-label" htmlFor="default-01">
                    Login Id
                  </label>
                </div>
                <div className="form-control-wrap">
                  <input
                    type="text"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    ref={register({ required: "This field is required" })}
                    placeholder="Enter your registered email"
                    className="form-control-lg form-control"
                  />
                  {errors.email && (
                    <span className="invalid">{errors.email.message}</span>
                  )}
                </div>
              </FormGroup>
              <FormGroup>
                <div className="form-label-group">
                  <label className="form-label" htmlFor="password">
                    Password
                  </label>
                </div>
                <div className="form-control-wrap">
                  <a
                    href="#password"
                    onClick={(ev) => {
                      ev.preventDefault();
                      setPassState(!passState);
                    }}
                    className={`form-icon lg form-icon-right passcode-switch ${
                      passState ? "is-hidden" : "is-shown"
                    }`}
                  >
                    <Icon name="eye" className="passcode-icon icon-show"></Icon>

                    <Icon
                      name="eye-off"
                      className="passcode-icon icon-hide"
                    ></Icon>
                  </a>
                  <input
                    type={passState ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    ref={register({ required: "This field is required" })}
                    placeholder="Enter your password"
                    className={`form-control-lg form-control ${
                      passState ? "is-hidden" : "is-shown"
                    }`}
                  />
                  {errors.password && (
                    <span className="invalid">{errors.password.message}</span>
                  )}
                </div>
              </FormGroup>
              {/* <Grid container spacing={1}>
                <Grid item xs={4}>
                  <TextField
                    autoFocus
                    fullWidth
                    size="small"
                    type="email"
                    id="User_Name"
                    name="email"
                    margin="dense"
                    label="User Name"
                    value={formData.email}
                    onChange={handleInputChange}
                    ref={register({ required: "This field is required" })}
                  />
                  {errors.email && (
                    <span className="invalid">{errors.email.message}</span>
                  )}
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    autoFocus
                    fullWidth
                    size="small"
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    margin="dense"
                    label="Password"
                    value={formData.password}
                    onChange={handleInputChange}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={handleTogglePassword}
                            style={{
                              outline: "none",
                            }}
                          >
                            {showPassword ? (
                              <VisibilityOff fontSize="small" />
                            ) : (
                              <Visibility fontSize="small" />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Grid> */}
              <FormGroup>
                <Button
                  size="lg"
                  className="btn-block"
                  type="submit"
                  color="primary"
                >
                  Login
                </Button>
              </FormGroup>
              <div
                className="form-note-s2 text-center "
                style={{ display: "flex", justifyContent: "end" }}
              >
                <Link to={`${process.env.PUBLIC_URL}/auth-reset`}>
                  <strong>Forgot Password</strong>
                </Link>
              </div>
            </Form>
          </PreviewCard>
        </Block>
        <AuthFooter />
      </PageContainer>
    </React.Fragment>
  );
};
export default Login;
