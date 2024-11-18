import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import { FaBars } from "react-icons/fa6";
import { FaTimes } from "react-icons/fa";
import firebaseAuthContext from "./context/firebaseAuth/firebaseAuthContext";
import { IoPersonCircleSharp } from "react-icons/io5";
import styled from "styled-components";
import { signOut } from "firebase/auth";
import { auth } from "./FirebaseAuth/FirebaseConfig";
import SignInModal from "./AuthModal/SignInModal";
import SignUpModal from "./AuthModal/SignUpModal";

// Styled Components
const NavbarWrapper = styled.nav`
  padding: 0.5rem 1rem;
  background-color: #f8f9fa;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const NavbarBrand = styled(Link)`
  font-weight: bold;
  font-size: 1.25rem;
  color: #333;
  text-decoration: none;
`;

const NavbarButton = styled(Button)`
  border: none;
  background: none;
  padding: 0;
  color: #333;
`;

const LargeNavbarWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 3rem;
`;

const LargeNavbar = styled.nav`
  padding: 1.5vh 5vh;
  border: 1px solid black;
  width: fit-content;
  border-radius: 5vh;
`;

const NavbarLink = styled(Link)`
  margin: 0 1.5rem;
  color: black;
  text-decoration: none;
`;

const UserContainer = styled.div`
  position: absolute;
  right: 20px;
  border: 1px solid black;
  border-radius: ${({ hovered }) => (hovered ? "2vh" : "5vh")};
  width: ${({ hovered }) => (hovered ? "250px" : "55px")};
  height: ${({ hovered }) => (hovered ? "135px" : "55px")};
  transition: border-radius 0.2s ease, width 0.3s ease, height 0.3s ease;
`;

const AccountContainer = styled.div`
  position: absolute;
  right: 20px;
  border: 1px solid black;
  border-radius: ${({ hovered }) => (hovered ? "2vh" : "5vh")};
  width: ${({ hovered }) => (hovered ? "225px" : "150px")};
  height: ${({ hovered }) => (hovered ? "120px" : "55px")};
  transition: border-radius 0.2s ease, width 0.3s ease, height 0.3s ease;
`;

const UserProfile = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  overflow: hidden;
  cursor: pointer;
`;

const AccountText = styled.div`
  display: flex;
  align-items: center;
  padding: 0 20px;
  justify-content: start;
  height: 55px;
  overflow: hidden;
  cursor: pointer;
`;

const ProfileImage = styled.img`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  object-fit: cover;
`;

const UserName = styled.div`
  font-weight: bold;
  font-size: 1rem;
  margin-left: 10px;
  white-space: nowrap;
  opacity: ${({ hovered }) => (hovered ? 1 : 0)};
  transition: opacity 0.75s ease;
`;

const HoverMenu = styled.div`
  padding: 1vh;
  transition: width 0.75s ease;
  width: ${({ hovered }) => (hovered ? "250px" : "50px")};
  display: ${({ hovered }) => (hovered ? "block" : "none")};
  overflow: hidden;
  cursor: pointer;
`;

const AccountButton = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 1vh;
  transition: width 0.75s ease;
  width: ${({ hovered }) => (hovered ? "225px" : "50px")};
  overflow: hidden;
  cursor: pointer;
`;

const HoverMenuItem = styled.div`
  font-size: 1.1rem;
  white-space: nowrap;
  opacity: ${({ hovered }) => (hovered ? 1 : 0)};
  transition: opacity 0.75s ease;
  margin-top: 5px;
  padding-left: 10px;
`;

const AccountMenuItem = styled.div`
  font-size: 1rem;
  white-space: nowrap;
  opacity: ${({ hovered }) => (hovered ? 1 : 0)};
  transition: opacity 0.5s ease;
  border: 1px solid black;
  border-radius: 1vh;
  padding: 5px 15px;
  text-align: center;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const ModalNav = styled.nav`
  display: flex;
  flex-direction: column;
  text-align: center;
  padding: 2rem 1rem;
`;

const ModalLink = styled(Link)`
  margin: 1.5rem 0;
  color: #333;
  text-decoration: none;
  font-size: 1.25rem;
  font-weight: 400;
  &:hover {
    color: #007bff;
    text-decoration: underline;
  }
`;

const CloseButton = styled(Button)`
  color: black;
  background-color: transparent;
  border: none;
  &:hover {
    color: grey;
    background-color: transparent;
  }
`;

export default function Navbar() {
  const [show, setShow] = useState(false);
  const [hovered, setHovered] = useState(false);

  const [signInModal, setSignInModal] = useState(false);
  const [signUpModal, setSignUpModal] = useState(false);

  const navigate = useNavigate();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { user, fetchUserDetails } = useContext(firebaseAuthContext);

  console.log(user);
  

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        await fetchUserDetails();
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchDetails();
    // eslint-disable-next-line
  }, []);

  const handleManageProfile = () => {
    navigate("/profile");
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("userToken");
      window.location.reload();
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const handleSignIn = () => {
    setSignInModal(true);
  };
  const closeSignInModal = () => setSignInModal(false);
  const closeSignUpModal = () => setSignUpModal(false);

  const handleSignUp = () => {
    setSignUpModal(true);
  };

  return (
    <>
      {/* Navbar */}
      <NavbarWrapper className="navbar d-lg-none fixed-top">
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <NavbarBrand to="/">Priyanshu</NavbarBrand>
          <NavbarButton
            className="d-lg-none"
            onClick={handleShow}
            aria-label="Open Navigation"
          >
            <FaBars size={24} />
          </NavbarButton>
        </div>
      </NavbarWrapper>

      {/* Large Screen Navbar Links */}
      <LargeNavbarWrapper className="d-none d-lg-flex">
        <LargeNavbar>
          <NavbarLink to="/">Home</NavbarLink>
          <NavbarLink to="/about">About</NavbarLink>
          <NavbarLink to="/projects">Projects</NavbarLink>
          <NavbarLink to="/certifications">Certifications</NavbarLink>
          <NavbarLink to="/blog">Blog</NavbarLink>
        </LargeNavbar>
        {user ? (
          <UserContainer
            hovered={hovered}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <UserProfile hovered={hovered}>
              {user.profilePictureUrl ? (
                <ProfileImage
                  src={user.profilePictureUrl}
                  alt={user.name}
                  hovered={hovered}
                />
              ) : (
                <IoPersonCircleSharp size={40} />
              )}
              <UserName hovered={hovered}>{user.name.slice(0, 16)}...</UserName>
            </UserProfile>
            <HoverMenu hovered={hovered}>
              <HoverMenuItem hovered={hovered} onClick={handleManageProfile}>
                Manage Profile
              </HoverMenuItem>
              <HoverMenuItem hovered={hovered} onClick={handleLogout}>
                Logout
              </HoverMenuItem>
            </HoverMenu>
          </UserContainer>
        ) : (
          <>
            <AccountContainer
              hovered={hovered}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
            >
              <AccountText hovered={hovered}>Who's There?</AccountText>
              <AccountButton hovered={hovered}>
                <AccountMenuItem hovered={hovered} onClick={handleSignIn}>
                  Sign In
                </AccountMenuItem>
                <AccountMenuItem hovered={hovered} onClick={handleSignUp}>
                  Sign Up
                </AccountMenuItem>
              </AccountButton>
              {signInModal && <SignInModal show={signInModal} closeSignInModal={closeSignInModal} />}
              {signUpModal && <SignUpModal show={signUpModal} closeSignUpModal={closeSignUpModal} />}
            </AccountContainer>
          </>
        )}
      </LargeNavbarWrapper>

      {/* Modal for Small Screen Links */}
      <Modal
        show={show}
        onHide={handleClose}
        dialogClassName="modal-fullscreen"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      >
        <Modal.Body>
          <ModalNav>
            <ModalLink to="/" onClick={handleClose}>
              Home
            </ModalLink>
            <ModalLink to="/about" onClick={handleClose}>
              About
            </ModalLink>
            <ModalLink to="/projects" onClick={handleClose}>
              Projects
            </ModalLink>
            <ModalLink to="/certifications" onClick={handleClose}>
              Certifications
            </ModalLink>
            <ModalLink to="/blog" onClick={handleClose}>
              Blog
            </ModalLink>
          </ModalNav>
        </Modal.Body>
        <Modal.Footer
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <CloseButton onClick={handleClose} aria-label="Close Navigation">
            <FaTimes size={24} /> Close
          </CloseButton>
        </Modal.Footer>
      </Modal>
    </>
  );
}
