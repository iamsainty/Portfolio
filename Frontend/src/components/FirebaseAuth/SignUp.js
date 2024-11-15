import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { auth, googleProvider } from "./FirebaseConfig";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
} from "firebase/auth";
import { signInWithPopup } from "firebase/auth";
import firebaseAuthContext from "../context/firebaseAuth/firebaseAuthContext";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";

// Styled components for consistent UI
const SignUpContainer = styled.div`
  display: flex;
  height: 90vh;
  align-items: center;
  justify-content: center;
`;

const SignUpBox = styled.div`
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

const SignUpContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

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

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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

      signup(
        user.displayName,
        user.email,
        user.emailVerified,
        user.uid,
        user.photoURL
      );

      setLoading(false);
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

      signup(
        user.displayName,
        user.email,
        user.emailVerified,
        user.uid,
        user.photoURL
      );
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <SignUpContainer>
      <SignUpBox>
        <LeftBox>
          <Heading>Create Your Account</Heading>
          <Subheading>Sign up to get started.</Subheading>
          <InfoText>
            Already have an account?{" "}
            <HighlightedText to={"/signin"}>Click to Sign In</HighlightedText>
          </InfoText>
        </LeftBox>
        <SignUpContent>
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
            Sign Up with Google
          </GoogleButton>
        </SignUpContent>
      </SignUpBox>
    </SignUpContainer>
  );
}

export default SignUp;
