import React, { useState, useEffect } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCardFooter,
  MDBValidation,
  MDBBtn,
  MDBIcon,
  MDBSpinner,
  MDBValidationItem,
  MDBNavbarLink,
} from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { googleSignIn, login } from "../../redux/features/authSlice";
import { GoogleLogin } from "react-google-login";
import { useRouter } from "next/router";
import Link from "next/link";

const initialState = {
  email: "",
  password: "",
};

const Login = () => {
  const [formValue, setFormValue] = useState(initialState);
  const { loading, error } = useSelector((state: any) => ({ ...state.auth }));
  const { email, password } = formValue;
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (email && password) {
      // @ts-ignore: skip the type checking
      dispatch(login({ formValue, router, toast }));
    }
  };
  const onInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  // const devEnv = process.env.NODE_ENV !== "production";

  const googleSuccess = (resp: any) => {
    const email = resp?.profileObj?.email;
    const name = resp?.profileObj?.name;
    const token = resp?.tokenId;
    const googleId = resp?.googleId;
    const result = { email, name, token, googleId };
    // @ts-ignore: skip the type checking
    dispatch(googleSignIn({ result, router, toast }));
  };
  const googleFailure = (error: any) => {
    toast.error(error);
  };
  return (
    <div
      style={{
        margin: "auto",
        padding: "15px",
        maxWidth: "450px",
        alignContent: "center",
        marginTop: "120px",
      }}
    >
      <MDBCard alignment="center">
        <MDBIcon fas icon="user-circle" className="fa-2x" />
        <h5>Sign In</h5>
        <MDBCardBody>
          <MDBValidation onSubmit={handleSubmit} noValidate className="row g-3">
            <MDBValidationItem
              feedback="Please provide your email"
              invalid
              className="col-md-12"
            >
              <MDBInput
                label="Email"
                type="email"
                value={email}
                name="email"
                onChange={onInputChange}
                required
              />
            </MDBValidationItem>
            <MDBValidationItem
              feedback="Please provide your password"
              invalid
              className="col-md-12"
            >
              <MDBInput
                label="Password"
                type="password"
                value={password}
                name="password"
                onChange={onInputChange}
                required
              />
            </MDBValidationItem>
            <div className="col-12">
              <MDBBtn style={{ width: "100%" }} className="mt-2">
                {loading && (
                  <MDBSpinner
                    size="sm"
                    role="status"
                    tag="span"
                    className="me-2"
                  />
                )}
                Login
              </MDBBtn>
            </div>
            <br />
            <div className="col-12">
              <GoogleLogin
                clientId="Your Client Id"
                render={(renderProps) => (
                  <MDBBtn
                    style={{ width: "100%" }}
                    color="danger"
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                  >
                    <MDBIcon className="me-2" fab icon="google" /> Google Sign
                    In
                  </MDBBtn>
                )}
                onSuccess={googleSuccess}
                onFailure={googleFailure}
                cookiePolicy="single_host_origin"
              />
            </div>
          </MDBValidation>
        </MDBCardBody>
        <MDBCardFooter>
          <Link href="/auth/register" passHref>
            <MDBNavbarLink active aria-current="page">
              Do not have an account ? Sign Up
            </MDBNavbarLink>
          </Link>
        </MDBCardFooter>
      </MDBCard>
    </div>
  );
};

export default Login;
