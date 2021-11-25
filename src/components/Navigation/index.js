import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectToken, selectUser } from "../../store/user/selectors";
import NavbarItem from "./NavbarItem";
import LoggedIn from "./LoggedIn";
import LoggedOut from "./LoggedOut";

export default function Navigation() {
  const token = useSelector(selectToken);
  const user = useSelector(selectUser);

  const loginLogoutControls = token ? <LoggedIn /> : <LoggedOut />;

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand
        style={{ marginLeft: "10px", fontFamily: "Yuji Syuku, serif" }}
        as={NavLink}
        to="/"
      >
        CoffeeCard
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav style={{ width: "100%", marginRight: "10px" }} fill>
          <NavbarItem path="/" linkText="Home" />
          {user.isStore && <NavbarItem path="qr" linkText="QR code" />}
          {user.isStore === false && (
            <NavbarItem path="/mycards" linkText="My Cards" />
          )}

          {loginLogoutControls}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
