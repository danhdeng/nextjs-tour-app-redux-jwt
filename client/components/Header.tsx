import React, { useState } from "react";
import {
  MDBNavbar,
  MDBContainer,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarToggler,
  MDBCollapse,
  MDBNavbarBrand,
} from "mdb-react-ui-kit";
import { useSelector, useDispatch } from "react-redux";
import { setLogout } from "../redux/features/authSlice";
import { searchTours } from "../redux/features/tourSlice";
import decode from "jwt-decode";
import { useRouter } from "next/router";
import Link from "next/link";

const Header = () => {
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState("");
  const { user } = useSelector((state: any) => ({ ...state.auth }));
  const dispatch = useDispatch();
  const router = useRouter();
  const token = user?.token;

  if (token) {
    const decodedToken: any = decode(token);
    if (decodedToken.exp * 1000 < new Date().getTime()) {
      // @ts-ignore: setLogout no paramters
      dispatch(setLogout());
    }
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (search) {
      // @ts-ignore: not type check here
      dispatch(searchTours(search));
      router.push(`/tours/search?searchQuery=${search}`);
      setSearch("");
    } else {
      router.push("/");
    }
  };

  const handleLogout = () => {
    // @ts-ignore: setLogout no paramters
    dispatch(setLogout());
  };

  return (
    <MDBNavbar fixed="top" expand="lg" style={{ backgroundColor: "#f0e6ea" }}>
      <MDBContainer>
        <MDBNavbarBrand
          href="/"
          style={{ color: "#606080", fontWeight: "600", fontSize: "22px" }}
        >
          Touropedia
        </MDBNavbarBrand>
        <MDBNavbarToggler
          type="button"
          aria-expanded="false"
          aria-label="Toogle navigation"
          onClick={() => setShow(!show)}
          style={{ color: "#606080" }}
        >
          <MDBIcon icon="bars" fas />
        </MDBNavbarToggler>
        <MDBCollapse show={show} navbar>
          <MDBNavbarNav right fullWidth={false} className="mb-2 mb-lg-0">
            {user?.result?._id && (
              <h5 style={{ marginRight: "30px", marginTop: "27px" }}>
                Logged in as: {user?.result?.name}
              </h5>
            )}
            <MDBNavbarItem>
              <Link href="/" passHref>
                <MDBNavbarLink>
                  <p className="header-text">Home</p>
                </MDBNavbarLink>
              </Link>
            </MDBNavbarItem>
            {user?.result?._id && (
              <>
                <MDBNavbarItem>
                  <Link href="/tour/addEditTour" passHref>
                    <MDBNavbarLink>
                      <p className="header-text">Add Tour</p>
                    </MDBNavbarLink>
                  </Link>
                </MDBNavbarItem>
                <MDBNavbarItem>
                  <Link href="/tour/dashboard" passHref>
                    <MDBNavbarLink>
                      <p className="header-text">Dashboard</p>
                    </MDBNavbarLink>
                  </Link>
                </MDBNavbarItem>
              </>
            )}
            {user?.result?._id ? (
              <MDBNavbarItem>
                <Link href="/login" passHref>
                  <MDBNavbarLink>
                    <p className="header-text" onClick={() => handleLogout()}>
                      Logout
                    </p>
                  </MDBNavbarLink>
                </Link>
              </MDBNavbarItem>
            ) : (
              <MDBNavbarItem>
                <Link href="/login" passHref>
                  <MDBNavbarLink>
                    <p className="header-text">Login</p>
                  </MDBNavbarLink>
                </Link>
              </MDBNavbarItem>
            )}
          </MDBNavbarNav>
          <form className="d-flex input-group w-auto" onSubmit={handleSubmit}>
            <input
              type="text"
              className="form-control"
              placeholder="Search Tour"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div style={{ marginTop: "5px", marginLeft: "5px" }}>
              <MDBIcon fas icon="search" />
            </div>
          </form>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
};

export default Header;
