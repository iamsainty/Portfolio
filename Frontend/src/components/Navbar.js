import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import { FaBars } from "react-icons/fa6";
import { FaTimes } from "react-icons/fa";
import { IoPersonCircleSharp } from "react-icons/io5";
import styled from "styled-components";
import { signOut } from "firebase/auth";
import { auth } from "./FirebaseAuth/FirebaseConfig";
import AuthModal from "./AuthModal/AuthModal";
import userAuthContext from "./context/userAuth/userAuthContext";
import Loading from "./Loading";

// Styled Components
const NavbarWrapper = styled.nav`
  padding: 0.75rem;
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

const LoadingContainer = styled.div`
  position: absolute;
  right: 20px;
`;

const UserContainer = styled.div`
  border: 1px solid black;
  border-radius: ${({ hovered }) => (hovered ? "2vh" : "5vh")};
  width: 250px;
  height: ${({ hovered }) => (hovered ? "135px" : "55px")};
  transition: border-radius 0.2s ease, width 0.3s ease, height 0.3s ease;
  background-color: #fff;
  @media (min-width: 768px) {
    width: ${({ hovered }) => (hovered ? "250px" : "55px")};
    position: absolute;
    right: 20px;
  }
`;

const AccountContainer = styled.div`
  border: 1px solid black;
  border-radius: ${({ hovered }) => (hovered ? "2vh" : "5vh")};
  width: ${({ hovered }) => (hovered ? "225px" : "150px")};
  height: ${({ hovered }) => (hovered ? "120px" : "55px")};
  transition: border-radius 0.2s ease, width 0.3s ease, height 0.3s ease;
  @media (min-width: 768px) {
    position: absolute;
    right: 20px;
  }
`;

const UserProfile = styled.div`
  display: flex;
  align-items: center;
  padding: 7.55px;
  overflow: hidden;
  cursor: pointer;
`;

const AccountText = styled.div`
  display: flex;
  align-items: center;
  padding: 0 20px;
  justify-content: center;
  height: 55px;
  overflow: hidden;
  cursor: pointer;
`;

const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
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
  transition: all 0.5s ease;
  margin-top: 5px;
  padding-left: 10px;

  &:hover{
  font-weight : 800;
  }
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
`;

const ModalAccount = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;

const ModalLink = styled(Link)`
  margin: 1rem 0;
  color: #333;
  text-decoration: none;
  font-size: 1.25rem;
  font-weight: 400;
  &:hover {
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

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { user, fetchUserDetails } = useContext(userAuthContext);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);
        await fetchUserDetails();
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchDetails();
    // eslint-disable-next-line
  }, []);

  const handleManageProfile = () => {
    navigate("/profile");
    setShow(false);
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

  const handleSignUp = () => {
    setSignUpModal(true);
  };

  const closeModal = () => {
    setSignInModal(false);
    setSignUpModal(false);
  };

  return (
    <>
      {/* Navbar */}
      <NavbarWrapper className="navbar d-lg-none fixed-top">
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <NavbarBrand to="/">Sainty</NavbarBrand>
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
        {loading ? (
          <LoadingContainer>
            <Loading />
          </LoadingContainer>
        ) : user ? (
          <UserContainer
            hovered={hovered}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <UserProfile hovered={hovered}>
              <ProfileImage
                src={
                  user.profilePictureUrl
                    ? user.profilePictureUrl
                    : require("../media/Default/DefaultProfile.png")
                }
                alt={user.name}
                hovered={hovered}
              />
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
              {signInModal && (
                <AuthModal
                  show={signInModal}
                  closeModal={closeModal}
                  type={"signIn"}
                />
              )}
              {signUpModal && (
                <AuthModal
                  show={signUpModal}
                  closeModal={closeModal}
                  type={"signUp"}
                />
              )}
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
        <Modal.Body
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-evenly",
          }}
        >
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
          <ModalAccount>
            {user ? (
              <>
                {/* <p>Logged in as: {user.name}</p> */}
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
                        hovered={true}
                      />
                    ) : (
                      <IoPersonCircleSharp size={40} />
                    )}
                    <UserName hovered={true}>
                      {user.name.slice(0, 16)}...
                    </UserName>
                  </UserProfile>
                  <HoverMenu hovered={hovered}>
                    <HoverMenuItem
                      hovered={hovered}
                      onClick={handleManageProfile}
                    >
                      Manage Profile
                    </HoverMenuItem>
                    <HoverMenuItem hovered={hovered} onClick={handleLogout}>
                      Logout
                    </HoverMenuItem>
                  </HoverMenu>
                </UserContainer>
              </>
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
                  {signInModal && (
                    <AuthModal
                      show={signInModal}
                      closeModal={closeModal}
                      type={"signIn"}
                    />
                  )}
                  {signUpModal && (
                    <AuthModal
                      show={signUpModal}
                      closeModal={closeModal}
                      type={"signUp"}
                    />
                  )}
                </AccountContainer>
              </>
            )}
          </ModalAccount>
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
