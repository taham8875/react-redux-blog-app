import React from "react";
import { Link } from "react-router-dom";

export default function Page404() {
  return (
    <div className="d-flex align-items-center justify-content-center mt-5">
      <div className="text-center">
        <h1 className="display-1 ">404</h1>
        <p className="fs-3">
          {" "}
          <span style={{ color: "#764abc" }}>Opps!</span> Page not found.
        </p>
        <p className="lead">The page you’re looking for doesn’t exist.</p>
        <Link to="/" className="btn btn-primary">
          Go Home
        </Link>
      </div>
    </div>
  );
}
