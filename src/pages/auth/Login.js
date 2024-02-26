import React, { useState } from "react";
import { notification } from "antd";
import AuthFooter from "./AuthFooter";
import { useForm } from "react-hook-form";
import Head from "../../layout/head/Head";
import { Link, useHistory } from "react-router-dom";
import { Form, FormGroup, Alert, Spinner } from "reactstrap";
import PageContainer from "../../layout/page-container/PageContainer";
import {
  Icon,
  Block,
  Button,
  BlockDes,
  BlockHead,
  BlockTitle,
  PreviewCard,
  BlockContent,
} from "../../components/Component";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [passState, setPassState] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const history = useHistory();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onFormSubmit = async (formData) => {
    history.push("/");

    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL_LOCAL}/login`,
        {
          method: "POST",
          body: JSON.stringify(formData),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (data.status) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data));
      } else if (data.status === false) {
        notification.error({
          placement: "bottomRight",
          description: "",
          message: "Your account has been disabled",
        });
      } else {
        notification.error({
          placement: "bottomRight",
          description: "",
          message: "Invalid Credential",
        });
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const { errors, register, handleSubmit } = useForm();

  return (
    <div className="loginbackground">
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
                      src="/Image/photon1.jpeg"
                      alt="logo-dark"
                    ></img>
                  </Link>
                </div>
                <BlockTitle tag="h6" className="text-center">
                  Innovation and Sustainability Combined
                </BlockTitle>
                <BlockTitle tag="h5" className="text-center">
                  Sign In - Photon
                </BlockTitle>
                <BlockDes></BlockDes>
              </BlockContent>
            </BlockHead>
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
              <FormGroup>
                <Button
                  size="lg"
                  className="btn-block"
                  type="submit"
                  color="primary"
                >
                  {loading ? <Spinner color="light" size="sm" /> : "Login"}
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
    </div>
  );
};

export default Login;
