import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { auth, googleProvider } from "./FirebaseConfig";
import {
  signInWithEmailAndPassword,
  sendEmailVerification,
  signInWithPopup,
} from "firebase/auth";
import firebaseAuthContext from "../context/firebaseAuth/firebaseAuthContext";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";

const SignInContainer = styled.div`
  display: flex;
  height: 90vh;
  align-items: center;
  justify-content: center;
`;

const SignInBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 75vw;
  padding: 25px;
  border-radius: 10px;
`;

const LeftBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 30px;
`;

const Heading = styled.h1`
  font-size: 30px;
  color: #333;
  text-align: center;
  margin-bottom: 20px;
`;

const Subheading = styled.p`
  font-size: 16px;
  color: #555;
  text-align: center;
  margin-bottom: 20px;
`;

const InfoText = styled.p`
  font-size: 14px;
  color: #888;
  text-align: center;
  margin-bottom: 30px;
`;

const HighlightedText = styled(Link)`
  color: #000;
  font-weight: bold;
`;

const SignInContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

// const Title = styled.h2`
//   font-size: 24px;
//   margin-bottom: 20px;
//   color: #333;
// `;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 25vw;
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

const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
`;

const SubmitButton = styled.button`
  padding: 10px;
  font-size: 16px;
  color: white;
  background-color: #000;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 10px;

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

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { signin } = useContext(firebaseAuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      if (localStorage.getItem("userToken")) {
        navigate("/");
      }
    };
    fetchUser();
  }, [navigate]);

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      if (!user.emailVerified) {
        await sendEmailVerification(user);
      }

      signin(user.email);
    } catch (error) {
      handleError(error.code);
    }
    setLoading(false);
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      signin(user.email);
      alert("Signed in with Google successfully!");
    } catch (error) {
      setError(error.code);
    }
  };

  const handleError = (errorCode) => {
    let message = "";
    switch (errorCode) {
      case "auth/invalid-email":
        message = "The email address is badly formatted.";
        break;
      case "auth/user-disabled":
        message = "Your account has been disabled.";
        break;
      case "auth/invalid-credential":
        message = "Invalid credential.";
        break;
      case "auth/network-request-failed":
        message = "Network error. Please check your connection.";
        break;
      default:
        message = "An unknown error occurred. Please try again.";
        break;
    }
    setError(message);
  };

  return (
    <SignInContainer>
      <SignInBox>
        <LeftBox>
          <Heading>Hey there! Ready to continue ?</Heading>
          <Subheading>Sign in to continue where you left off.</Subheading>
          <InfoText>
            New here?{" "}
            <HighlightedText to={"/signup"}>Click to Sign Up</HighlightedText>
          </InfoText>
        </LeftBox>
        <SignInContent>
          <Form onSubmit={handleSignIn}>
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
              {loading ? "Signing In..." : "Sign In"}
            </SubmitButton>
          </Form>

          <DividerContainer>
            <DividerLine />
            <DividerText>Or sign in with</DividerText>
            <DividerLine />
          </DividerContainer>

          <GoogleButton onClick={handleGoogleSignIn}>
            <FcGoogle />
            Sign in with Google
          </GoogleButton>
        </SignInContent>
      </SignInBox>
    </SignInContainer>
  );
}

export default SignIn;
