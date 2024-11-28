import React, { useRef, useState } from "react";
import { Button, Modal } from "react-bootstrap";
// import { FcGoogle } from "react-icons/fc";
import styled from "styled-components";

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

const ModalHeading = styled.h2`
  font-size: 30px;
  font-weight: bold;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 25vw;
  height: 100vh;

  @media (max-width: 768px) {
    width: 80vw;
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

const OtpText = styled.p`
  font-size: 15px;
  text-align: center;
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

function AuthModal({ show, closeModal }) {
  const [currentPage, setCurrentPage] = useState("signIn");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("sainty@gmail.com");
  const [password, setPassword] = useState("");

  const openSignIn = () => {
    setCurrentPage("signIn");
  };

  const openSignUp = () => {
    setCurrentPage("signUp");
  };

  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputs = useRef([]);

  const handleChange = (value, index) => {
    // Update the current OTP digit
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move focus to the next input if the value is a single digit
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


  const handleSignIn = () => {

  }

  const handleSignUp = () => {
    setCurrentPage('otp');
  }

  const handleOtpVerification = () => {

  }

  const renderContent = () => {
    switch (currentPage) {
      case "signIn":
        return (
          <FormContainer>
            <ModalHeading>Sign In</ModalHeading>
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
              New here ? Register now
            </SwitchPage>
          </FormContainer>
        );
      case "signUp":
        return (
          <FormContainer>
            <ModalHeading>Sign Up</ModalHeading>
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
              Already Registered ? Login Instead
            </SwitchPage>
          </FormContainer>
        );
      case "otp":
        return (
          <FormContainer>
            <ModalHeading>Verify your email</ModalHeading>
            <OtpText>
              {" "}
              An OTP has been sent to {email}, verify to proceed
            </OtpText>
            <OTPContainer onPaste={handlePaste}>
              {otp.map((digit, index) => (
                <OTPInput
                  key={index}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleChange(e.target.value, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  ref={(el) => (inputs.current[index] = el)} // Assign refs dynamically
                />
              ))}
            </OTPContainer>

            <SubmitButton onClick={handleOtpVerification}>Verify</SubmitButton>
          </FormContainer>
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
