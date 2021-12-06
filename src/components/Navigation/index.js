import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectToken, selectUser } from "../../store/user/selectors";
import NavbarItem from "./NavbarItem";
import LoggedIn from "./LoggedIn";
import LoggedOut from "./LoggedOut";
import CoffeCup from "../CoffeCup";
import "../../App.css";

export default function Navigation() {
  const token = useSelector(selectToken);
  const user = useSelector(selectUser);

  const loginLogoutControls = token ? <LoggedIn /> : <LoggedOut />;

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand
        style={{
          marginLeft: "10px",
          fontSize: 25,
          fontFamily: "Lobster",
          fontStyle: "bold",

          display: "flex",
          marginRight: "50px",
        }}
        as={NavLink}
        to="/"
      >
        CoffeeCard
        <span style={{ margin: "0 4px" }}> </span>
        <CoffeCup style={{ color: "white" }} />
      </Navbar.Brand>

      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav style={{ width: "100%", marginRight: "10px" }} fill>
          <NavbarItem path="/" linkText="Home" />
          {user.isStore && <NavbarItem path="qr" linkText="QR code" />}
          {user.isStore === false && (
            <NavbarItem path="/mycards" linkText="My Cards" />
          )}
          {user.isStore === false && (
            <NavbarItem path="/myvouchers" linkText="My vouchers" />
          )}
          {user.isStore && <NavbarItem path="storechart" linkText="my sales" />}

          {loginLogoutControls}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
