import React, { useContext, useRef, useState } from "react";
import styled from "styled-components";
import { GoEye, GoEyeClosed } from "react-icons/go";
import userContext from "../../context/user/userContext";
import Loading from "../../Loading";

const Container = styled.div`
  padding: 20px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const Headline = styled.div`
  font-size: 25px;
  font-weight: 500;
  color: #444;
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
  background-color: #444;
  color: #fff;
  font-weight: 500;
  border: 1px solid #444;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.5s ease;

  &:hover {
    background-color: white;
    color: #444;
    border: 1px solid #444;
  }
`;

const OTPContainer = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-bottom: 35px;
`;

const Message = styled.div`
  font-weight: 500;
  color: #444;
  text-align: center;
`;

const Resend = styled.div`
  font-weight: 500;
  font-size: 14px;
  color: #444;
  text-align: center;
  cursor: pointer;
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

const DispalyText = styled.div`
  font-size: 15px;
  font-weight: 500;
  width: auto;
  margin-top: 25px;
  transition: all 0.5s ease;

  MsgBox {
    width: auto;
  }
  SaveButton {
    width: auto;
  }
`;

const MsgBox = styled.div`
  padding: 10px 20px;
  background-color: #444;
  color: #fff;
  font-weight: 500;
  border: 1px solid #444;
  border-radius: 25px;
  cursor: pointer;

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

  const [forgotPassword, setForgotPassword] = useState(false);

  const [otpSent, setOtpSent] = useState(false);

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [savingChanges, setSavingChanges] = useState(false);

  const {
    user,
    changePassword,
    sendOtpForPasswordReset,
    resetOtp,
    resetPassword,
  } = useContext(userContext);

  const handleForgotPassword = async () => {
    setLoading(true);
    if (!otpSent) {
      await sendOtpForPasswordReset();
      setOtpSent(true);
    }
    setForgotPassword(true);
    setLoading(false);
  };

  const handleChangePassword = async () => {
    if (
      currentPassword === "" ||
      newPassword === "" ||
      confirmPassword === ""
    ) {
      setMsg("Please fill all the fields");
      setTimeout(() => {
        setMsg("");
      }, 3000);
      return;
    }
    if (newPassword !== confirmPassword) {
      setMsg("New password and confirm password do not match");
      setTimeout(() => {
        setMsg("");
      }, 3000);
      return;
    }
    if (newPassword.length < 6) {
      setMsg("New password must be at least 6 characters long");
      setTimeout(() => {
        setMsg("");
      }, 3000);
      return;
    }
    setSavingChanges(true);
    const response = await changePassword(currentPassword, newPassword);
    setSavingChanges(false);
    setMsg(response);
    setTimeout(() => {
      setMsg("");
    }, 3000);
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

  const handleResetOtp = async () => {
    await sendOtpForPasswordReset();
    setOtpSent(true);
  };

  const handleResetPassword = async () => {
    try {
      if (otp.join("") === "") {
        setMsg("Please enter the OTP");
        setTimeout(() => {
          setMsg("");
        }, 3000);
        return;
      }
      if (resetOtp.toString() !== otp.join("")) {
        setMsg("OTP does not match");
        setTimeout(() => {
          setMsg("");
        }, 3000);
        return;
      }
      if (newPassword === "") {
        setMsg("New password cannot be empty");
        setTimeout(() => {
          setMsg("");
        }, 3000);
        return;
      }
      if (newPassword.length < 6) {
        setMsg("Password must be at least 6 characters long");
        setTimeout(() => {
          setMsg("");
        }, 3000);
        return;
      }
      if (confirmPassword === "") {
        setMsg("Confirm password cannot be empty");
        setTimeout(() => {
          setMsg("");
        }, 3000);
        return;
      }
      if (newPassword !== confirmPassword) {
        setMsg("New password and confirm password do not match");
        setTimeout(() => {
          setMsg("");
        }, 3000);
        return;
      }
      setSavingChanges(true);
      const response = await resetPassword(newPassword);
      setSavingChanges(false);
      setMsg(response);
      setTimeout(() => {
        setMsg("");
        setForgotPassword(false);
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setOtpSent(false);
        setOtp(["", "", "", ""]);
      }, 3000);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <Headline>
        <span
          style={{
            fontFamily: "'Cedarville Cursive', cursive",
            fontSize: "40px",
            fontWeight: "bold",
            padding: "0 10px",
          }}
        >
          Change
        </span>
        your password
      </Headline>
      {loading ? (
        <Loading />
      ) : forgotPassword ? (
        <ContentWrapper>
          <Message>
            Enter the OTP sent to your email{" "}
            <span style={{ fontWeight: "bold" }}> {user.email}</span>
          </Message>
          <Resend>
            Didn't receive the OTP?{" "}
            <span
              style={{ textDecoration: "underline" }}
              onClick={handleResetOtp}
            >
              Resend
            </span>
          </Resend>
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
          {savingChanges ? (
            <div style={{ marginTop: "25px" }}>
              <Loading />
            </div>
          ) : (
            <DispalyText>
              {msg ? (
                <MsgBox>{msg}</MsgBox>
              ) : (
                <Button onClick={handleResetPassword}>Reset Password</Button>
              )}
            </DispalyText>
          )}
        </ContentWrapper>
      ) : (
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
          {savingChanges ? (
            <div style={{ marginTop: "25px" }}>
              <Loading />
            </div>
          ) : (
            <DispalyText>
              {msg ? (
                <MsgBox>{msg}</MsgBox>
              ) : (
                <Button onClick={handleChangePassword}>Change Password</Button>
              )}
            </DispalyText>
          )}
        </ContentWrapper>
      )}
    </Container>
  );
}

export default ChangePassword;
