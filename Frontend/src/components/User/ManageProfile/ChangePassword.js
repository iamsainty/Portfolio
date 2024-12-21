import React, { useContext, useState } from "react";
import styled from "styled-components";
import { GoEye, GoEyeClosed } from "react-icons/go";
import userContext from "../../context/user/userContext";

const Container = styled.div`
  padding: 20px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const Heading = styled.div`
  font-size: 24px;
  font-weight: bold;
  text-align: center;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  gap: 10px;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 50%;
  border: 1px solid #aaa;
  border-radius: 25px;
  padding: 10px 20px;
  outline: none;
  gap: 10px;
`;

const ForgotPassword = styled.div`
  width: 50%;
  text-align: right;
  font-size: 12px;
  font-weight: 500;
  text-decoration: underline;
  color: #444;
  cursor: pointer;
  margin-bottom: 15px;
`;

const Input = styled.input`
  width: 90%;
  border: none;
  outline: none;
`;

const IconWrapper = styled.div`
  cursor: pointer;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-weight: 600;
  font-size: 15px;
  background-color: #444;
  color: #fff;
  border: 1px solid #444;
  border-radius: 25px;
  cursor: pointer;
  margin-top: 20px;
  transition: all 0.5s ease;

  &:hover {
    background-color: white;
    color: #444;
    border: 1px solid #444;
  }
`;

function ChangePassword() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { changePassword } = useContext(userContext);

  const handleForgotPassword = () => {
    console.log("forgot password");
  };

  const handleChangePassword = async () => {
    if (currentPassword === "" || newPassword === "" || confirmPassword === "") {
      return;
    }
    if (newPassword !== confirmPassword) {
      return;
    }
    if (newPassword.length < 6) {
      return;
    }
    await changePassword(currentPassword, newPassword);
  };

  return (
    <Container>
      <Heading>Change Password</Heading>
      <ContentWrapper>
        <InputWrapper>
          <Input
            type={showCurrentPassword ? "text" : "password"}
            placeholder="Current Password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
          <IconWrapper>
            {showCurrentPassword ? (
              <GoEyeClosed onClick={() => setShowCurrentPassword(false)} />
            ) : (
              <GoEye onClick={() => setShowCurrentPassword(true)} />
            )}
          </IconWrapper>
        </InputWrapper>
        {/* forgot password handling */}
        <ForgotPassword onClick={handleForgotPassword}>
          Forgot Password?
        </ForgotPassword>
        <InputWrapper>
          <Input
            type={showNewPassword ? "text" : "password"}
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <IconWrapper>
            {showNewPassword ? (
              <GoEyeClosed onClick={() => setShowNewPassword(false)} />
            ) : (
              <GoEye onClick={() => setShowNewPassword(true)} />
            )}
          </IconWrapper>
        </InputWrapper>
        <InputWrapper>
          <Input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <IconWrapper>
            {showConfirmPassword ? (
              <GoEyeClosed onClick={() => setShowConfirmPassword(false)} />
            ) : (
              <GoEye onClick={() => setShowConfirmPassword(true)} />
            )}
          </IconWrapper>
        </InputWrapper>
        <Button onClick={handleChangePassword}>Change Password</Button>
      </ContentWrapper>
    </Container>
  );
}

export default ChangePassword;
