import React from "react";
import logo from "../static/logo.png";
import "../index.css";
import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <>
      <div className="container">
        <header className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
          <a
            href="/"
            className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none"
          >
            <img src={logo} className="logo me-2" alt="" srcSet="" />
            <span className="fs-4 me-2">Redux Blog App</span>
          </a>

          <ul className="nav nav-pills">
            <li className="nav-item">
              <NavLink to="/" className="nav-link" aria-current="page">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="users" className="nav-link">
                Users
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="post" className="nav-link">
                New Post
              </NavLink>
            </li>
          </ul>
        </header>
      </div>
    </>
  );
}
