import React, { useContext, useEffect, useRef, useState } from "react";
import { Button, Modal } from "react-bootstrap";
// import { FcGoogle } from "react-icons/fc";
import styled from "styled-components";
import userAuthContext from "../context/userAuth/userAuthContext";
import { IoCloseOutline } from "react-icons/io5";

const Content = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const FullScreenModal = styled(Modal)`
  height: 100vh;
  width: 100vw;
  .modal-dialog {
    margin: 0;
    max-width: 100%;
    height: 100vh;
  }
  .modal-content {
    height: 100%;
    border: none;
    border-radius: 0;
  }
`;

const Greeting = styled.h2`
  font-size: 40px;
  font-weight: bold;
  @media (max-width: 768px) {
    font-size: 30px;
  }
`;

const Container = styled.div`
  height: 100vh;
  margin: 0;
`;

const CloseContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  border: 1px solid black;
  border-radius: 100%;
  padding: 10px;
  cursor: pointer;
`;

const CloseButton = styled.div`
  margin: 0;
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: start;
`;

const FormContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  gap: 10px;
  width: 60vw;
  height: 85vh;
  margin: 0;

  @media (max-width: 768px) {
    width: 80vw;
    height: 80vh;
    flex-direction: column;
    justify-content: center;
  }
`;

const OtpContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  width: 35vw;
  height: 100vh;
  margin: 0;

  @media (max-width: 768px) {
    width: 80vw;
    height: 100vh;
    flex-direction: column;
    justify-content: center;
  }
`;

const AuthDesign = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  width: 35vw;
  height: 90vh;
  gap: 15px;

  @media (max-width: 768px) {
    align-items: center;
    height: 20vh;
    width: 80vw;
  }
`;

const Welcome = styled.p`
  font-size: 18px;
  font-weight: bold;
  margin: 0;
`;

const Message = styled.p`
  font-size: 18px;
  margin: 0;
  @media (max-width: 768px) {
    display: none;
  }
`;

const AuthForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  height: 90vh;
  width: 25vw;
  @media (max-width: 768px) {
    width: 80vw;
    height: 40vh;
  }
`;

const Input = styled.input`
  border: 1px solid #ccc;
  padding: 12px;
  outline: none;
  width: 100%;
  border-radius: 8px;

  &:focus {
    border: 1px solid #333;
  }
`;

const ErrorText = styled.p`
  margin: 0;
  color: red;
  font-size: 14px;
`;

const SubmitButton = styled(Button)`
  padding: 10px;
  color: white;
  background-color: #000;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  width: 100%;
  margin-top: 10px;

  &:hover {
    background-color: #333;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

// const GoogleButton = styled.button`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   padding: 10px;
//   color: black;
//   background-color: #e5e5e5;
//   border: none;
//   border-radius: 5px;
//   cursor: pointer;
//   width: 100%;

//   transition: background-color 0.3s ease;

//   &:hover {
//     background-color: #c1c1c1;
//   }

//   svg {
//     margin-right: 8px;
//   }
// `;

// const DividerContainer = styled.div`
//   display: flex;
//   align-items: center;
//   text-align: center;
//   width: 100%;
// `;

// const DividerLine = styled.hr`
//   flex: 1;
//   border: none;
//   border-top: 1px solid black;
//   margin: 25px 0;
// `;

// const DividerText = styled.p`
//   margin: 0 10px;
//   font-size: 14px;
//   color: #444;
// `;

const SwitchPage = styled.p`
  font-size: 14px;
  margin-top: 10px;
  cursor: pointer;
`;

const OTPContainer = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
`;

const OTPInput = styled.input`
  width: 50px;
  height: 50px;
  text-align: center;
  font-size: 24px;
  border: 1px solid #ccc;
  border-radius: 8px;

  &:focus {
    border: 1px solid #333;
    outline: none;
  }
`;

function AuthModal({ show, closeModal, type }) {
  const [currentPage, setCurrentPage] = useState(type);

  const { signin, signup, sendOtp, otpSent, error } =
    useContext(userAuthContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [err, setErr] = useState(null);

  const openSignIn = () => {
    setCurrentPage("signIn");
    setErr(null);
  };

  const openSignUp = () => {
    setCurrentPage("signUp");
    setErr(null);
  };

  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputs = useRef([]);

  const handleChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < inputs.current.length - 1) {
      inputs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && otp[index] === "") {
      if (index > 0) {
        inputs.current[index - 1].focus();
      }
    }
  };

  const handlePaste = (e) => {
    const pastedData = e.clipboardData.getData("text").slice(0, 4);
    const newOtp = [...otp];
    for (let i = 0; i < pastedData.length; i++) {
      newOtp[i] = pastedData[i];
    }
    setOtp(newOtp);

    const lastIndex = Math.min(
      pastedData.length - 1,
      inputs.current.length - 1
    );
    inputs.current[lastIndex].focus();
  };

  const validEmail = (email) => {
    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSignIn = async () => {
    setErr(null);

    if (!email || !password) {
      setErr("Please fill all the fields");
      return;
    }

    if (!validEmail(email)) {
      setErr("Enter a valid email");
      return;
    }

    if (password.length < 6) {
      setErr("Password should be at least 6 characters long");
      return;
    }

    try {
      await signin(email, password);
      if (!error) {
        closeModal();
      } else {
        setErr("Invalid email or password");
      }
    } catch (err) {
      setErr("Failed to sign in. Please try again later.");
    }
  };

  const handleSignUp = async () => {
    setErr(null);

    if (!name || !email || !password) {
      setErr("Please fill all the fields");
      return;
    }

    if (!validEmail(email)) {
      setErr("Enter a valid email");
      return;
    }

    if (password.length < 6) {
      setErr("Password should be at least 6 characters long");
      return;
    }

    try {
      await sendOtp(name, email);
      setCurrentPage("otp");
    } catch (error) {
      setErr("Failed to send OTP. Please try again.");
    }
  };

  const handleOtpVerification = async () => {
    if (otpSent && otp.join("") === otpSent.toString()) {
      await signup(name, email, password);
      setErr(error);
      if (err === null) {
        closeModal();
      }
    } else {
      setErr("Invalid OTP, Try again");
    }
  };

  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const currentTime = new Date().getHours();
    if (currentTime < 12) {
      setGreeting("Good morning!");
    } else if (currentTime < 18) {
      setGreeting("Good afternoon!");
    } else {
      setGreeting("Good evening!");
    }
  }, []);

  const renderContent = () => {
    switch (currentPage) {
      case "signIn":
        return (
          <Container>
            <FormContainer>
              <AuthDesign>
                <Greeting>{greeting}</Greeting>
                <Welcome>Glad to have you back</Welcome>
                <Message>
                  Please sign in using your credentials to continue
                </Message>
              </AuthDesign>
              <AuthForm>
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {err && <ErrorText>{err}</ErrorText>}
                <SubmitButton onClick={handleSignIn}>Sign In</SubmitButton>
                {/* <DividerContainer>
              <DividerLine />
              <DividerText>Or sign in with</DividerText>
              <DividerLine />
            </DividerContainer>
            <GoogleButton>
              <FcGoogle />
              Sign in with Google
            </GoogleButton> */}
                <SwitchPage onClick={openSignUp}>
                  New here ? Sign up now
                </SwitchPage>
              </AuthForm>
            </FormContainer>
            <CloseButton>
              <CloseContainer>
                <IoCloseOutline
                  onClick={() => {
                    closeModal();
                  }}
                  size={30}
                />
              </CloseContainer>
            </CloseButton>
          </Container>
        );
      case "signUp":
        return (
          <Container>
            <FormContainer>
              <AuthDesign>
                <Greeting>{greeting}</Greeting>
                <Welcome>Excited to have you on board!</Welcome>
                <Message>Enter your details below to create an account</Message>
              </AuthDesign>
              <AuthForm>
                <Input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {err && <ErrorText>{err}</ErrorText>}
                <SubmitButton onClick={handleSignUp}>Sign Up</SubmitButton>
                {/* <DividerContainer>
              <DividerLine />
              <DividerText>Or sign up with</DividerText>
              <DividerLine />
              </DividerContainer>
              <GoogleButton>
              <FcGoogle />
              Sign up with Google
              </GoogleButton> */}
                <SwitchPage onClick={openSignIn}>
                  Already Have an account ? Sign in instead
                </SwitchPage>
              </AuthForm>
            </FormContainer>
            <CloseButton>
              <CloseContainer>
                <IoCloseOutline
                  onClick={() => {
                    closeModal();
                  }}
                  size={30}
                />
              </CloseContainer>
            </CloseButton>
          </Container>
        );
      case "otp":
        return (
          <OtpContainer>
            <Greeting>You're one step away</Greeting>
            <Welcome style={{ textAlign: "center", fontSize: "15px" }}>
              An OTP has been sent to your email <br />
              Enter the OTP to complete the process
            </Welcome>
            <OTPContainer onPaste={handlePaste}>
              {otp.map((digit, index) => (
                <OTPInput
                  key={index}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleChange(e.target.value, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  ref={(el) => (inputs.current[index] = el)}
                />
              ))}
            </OTPContainer>
            {err && <ErrorText>{err}</ErrorText>}
            <SubmitButton onClick={handleOtpVerification}>Verify</SubmitButton>
          </OtpContainer>
        );
      default:
        return null;
    }
  };

  return (
    <FullScreenModal show={show} onHide={closeModal} centered>
      <Content>{renderContent()}</Content>
    </FullScreenModal>
  );
}

export default AuthModal;
