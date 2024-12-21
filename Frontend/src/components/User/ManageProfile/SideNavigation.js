import React from "react";
import styled from "styled-components";
import { FaUserAlt, FaUserEdit, FaLock, FaBell, FaCog } from "react-icons/fa";

const navItems = [
  { name: "My Profile", icon: <FaUserAlt /> },
  { name: "Edit Profile", icon: <FaUserEdit /> },
  { name: "Change Password", icon: <FaLock /> },
  { name: "Notification Settings", icon: <FaBell /> },
  { name: "Account Settings", icon: <FaCog /> },
];

const Container = styled.div`
  height: 100%;
  background-color: #444;
  border-radius: 20px 0 0 20px;
  border-right: none;
  position: relative;
`;

const NavigationList = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 50px;
  position: absolute;
  right: 0;
  width: 90%;
`;

const NavigationItem = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 12px 10px 12px 20px;
  border-radius: 10px 0 0 10px;
  gap: 10px;
  color: white;
  transition: all 0.5s ease;

  &:hover {
    background-color: white;
    color: #444;
    transform: scale(1.05);
  }

  &.active {
    background-image: linear-gradient(90deg, #ccc, white);
    color: #444;
    font-weight: bold;
  }
`;

function SideNavigation({ activeSection, setActiveSection }) {
  return (
    <Container>
      <NavigationList>
        {navItems.map((item) => (
          <NavigationItem
            key={item.name}
            onClick={() => setActiveSection(item.name)}
            className={activeSection === item.name ? "active" : ""}
          >
            {item.icon}
            {item.name}
          </NavigationItem>
        ))}
      </NavigationList>
    </Container>
  );
}

export default SideNavigation;
