import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { auth, googleProvider } from "../FirebaseAuth/FirebaseConfig";
import { Button, Modal } from "react-bootstrap";
import firebaseAuthContext from "../context/firebaseAuth/firebaseAuthContext";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { IoCloseOutline } from "react-icons/io5";

function SignUpModal({ show, closeSignUpModal }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [notVerified, setNotVerified] = useState(false);

  const navigate = useNavigate();

  const { signup } = useContext(firebaseAuthContext);

  useEffect(() => {
    const fetchUser = async () => {
      if (localStorage.getItem("userToken")) {
        navigate("/");
      }
    };
    fetchUser();
  }, [navigate]);

  // Handle sign-up with email and password
  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Create a user with email and password
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Update the user's profile with the name
      await updateProfile(user, { displayName: name });

      // Send email verification
      await sendEmailVerification(user);

      await signup(
        user.displayName,
        user.email,
        user.emailVerified,
        user.uid,
        user.photoURL
      );

      setLoading(false);

      if (!user.emailVerified) {
        setNotVerified(true);
      }
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  // Handle Google sign-up
  const handleGoogleSignUp = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      await signup(
        user.displayName,
        user.email,
        user.emailVerified,
        user.uid,
        user.photoURL
      );
      window.location.reload();
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <Modal
      show={show}
      onHide={closeSignUpModal}
      backdrop={true}
      keyboard={true}
      centered
    >
      <Content>
        <Modal.Body>
          {notVerified ? (
            <>
              <ModalHeader>
                <ModalTitle>Verify Your Email</ModalTitle>
                <IoCloseOutline
                  size={35}
                  onClick={closeSignUpModal}
                  style={{ cursor: "pointer" }}
                />
              </ModalHeader>
              <Message>
                A verification email has been sent to your email address. Verify
                you email to proceed.
              </Message>
            </>
          ) : (
            <>
              <ModalHeader>
                <ModalTitle>Sign Up</ModalTitle>
                <IoCloseOutline
                  size={35}
                  onClick={closeSignUpModal}
                  style={{ cursor: "pointer" }}
                />
              </ModalHeader>

              <Form onSubmit={handleSignUp}>
                <Input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  required
                />
                <Input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
                <Input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />

                {error && <ErrorMessage>{error}</ErrorMessage>}

                <SubmitButton type="submit" disabled={loading}>
                  {loading ? "Signing Up..." : "Sign Up"}
                </SubmitButton>
              </Form>

              <DividerContainer>
                <DividerLine />
                <DividerText>Or sign up with</DividerText>
                <DividerLine />
              </DividerContainer>

              <GoogleButton onClick={handleGoogleSignUp}>
                <FcGoogle />
                Sign up with Google
              </GoogleButton>
            </>
          )}
        </Modal.Body>
      </Content>
    </Modal>
  );
}

const Content = styled.div`
  padding: 25px;
  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const Message = styled.div`
  font-size: 18px;
`;
const ModalHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 25px;
`;
// Styled components for modal content
const ModalTitle = styled.h2`
  font-weight: bold;
  width: 100%;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Input = styled.input`
  border: 1px solid #ccc;
  padding: 12px;
  outline: none;
  width: 100%;
  font-size: 16px;
  border-radius: 8px;

  &:focus {
    border: 1px solid #333;
  }
`;

const SubmitButton = styled(Button)`
  padding: 10px;
  font-size: 16px;
  color: white;
  background-color: #000;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 10px;
  width: 100%;

  &:hover {
    background-color: #333;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const GoogleButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  margin-top: 15px;
  font-size: 16px;
  color: black;
  width: 100%;
  background-color: #e5e5e5;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #c1c1c1;
  }

  svg {
    margin-right: 8px;
  }
`;

const DividerContainer = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  width: 100%;
  margin-top: 25px;
  margin-bottom: 20px;
`;

const DividerLine = styled.hr`
  flex: 1;
  border: none;
  border-top: 1px solid black;
  margin: 0 10px;
`;

const DividerText = styled.p`
  margin: 0;
  font-size: 14px;
  color: #666;
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
`;

export default SignUpModal;
