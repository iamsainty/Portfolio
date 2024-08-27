import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="d-flex mt-5" style={{ justifyContent: "center" }}>
      <nav
        style={{
          padding: "1.75vh 5vh",
          border: "1px solid black",
          width: "fit-content",
          borderRadius: "5vh",
        }}
      >
        <Link
          className="mx-3"
          to="/"
          style={{ color: "black", textDecoration: "none" }}
        >
          Home
        </Link>
        <Link
          className="mx-3"
          to="/about"
          style={{ color: "black", textDecoration: "none" }}
        >
          About
        </Link>
        <Link
          className="mx-3"
          to="/projects"
          style={{ color: "black", textDecoration: "none" }}
        >
          Projects
        </Link>
        <Link
          className="mx-3"
          to="/certifications"
          style={{ color: "black", textDecoration: "none" }}
        >
          Certifications
        </Link>
        <Link
          className="mx-3"
          to="/blog"
          style={{ color: "black", textDecoration: "none" }}
        >
          Blog
        </Link>
      </nav>
    </div>
  );
}
