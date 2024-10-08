import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import { FaBars } from "react-icons/fa6";
import { FaTimes } from "react-icons/fa";

export default function Navbar() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      {/* Navbar */}
      <nav
        className="navbar d-lg-none fixed-top my-10"
        style={{
          padding: "0.5rem 1rem",
          backgroundColor: "#f8f9fa",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
        }}
      >
        <div className="container-fluid d-flex justify-content-between align-items-center">
          {/* Brand Name */}
          <Link
            className="navbar-brand"
            to="/"
            style={{ fontWeight: "bold", fontSize: "1.25rem", color: "#333" }}
          >
            Priyanshu
          </Link>
          {/* Toggle Button for Small Screens */}
          <Button
            variant="outline-dark"
            className="d-lg-none"
            onClick={handleShow}
            style={{ border: "none", background: "none", padding: "0" }}
          >
            <FaBars size={24} />
          </Button>
        </div>
      </nav>

      {/* Large Screen Navbar Links */}
      <div className="d-none d-lg-flex justify-content-center mt-5">
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

      {/* Modal for Small Screen Links */}
      <Modal
        show={show}
        onHide={handleClose}
        dialogClassName="modal-fullscreen"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      >
        <Modal.Body className="position-relative">
          <nav
            className="d-flex flex-column text-center"
            style={{ padding: "2rem 1rem" }}
          >
            <Link
              className="my-3"
              to="/"
              style={{
                color: "#333",
                textDecoration: "none",
                fontSize: "1.25rem",
                fontWeight: "400",
              }}
              onClick={handleClose}
            >
              Home
            </Link>
            <Link
              className="my-3"
              to="/about"
              style={{
                color: "#333",
                textDecoration: "none",
                fontSize: "1.25rem",
                fontWeight: "400",
              }}
              onClick={handleClose}
            >
              About
            </Link>
            <Link
              className="my-3"
              to="/projects"
              style={{
                color: "#333",
                textDecoration: "none",
                fontSize: "1.25rem",
                fontWeight: "400",
              }}
              onClick={handleClose}
            >
              Projects
            </Link>
            <Link
              className="my-3"
              to="/certifications"
              style={{
                color: "#333",
                textDecoration: "none",
                fontSize: "1.25rem",
                fontWeight: "400",
              }}
              onClick={handleClose}
            >
              Certifications
            </Link>
            <Link
              className="my-3"
              to="/blog"
              style={{
                color: "#333",
                textDecoration: "none",
                fontSize: "1.25rem",
                fontWeight: "400",
              }}
              onClick={handleClose}
            >
              Blog
            </Link>
          </nav>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-center">
          <Button
            variant="outline-dark"
            onClick={handleClose}
            style={{ border: "none", background: "transparent" }}
          >
            <FaTimes size={24} /> Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
