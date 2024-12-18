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
  padding: 10px;
  border-right: 1px solid #aaa;
`;

const NavigationList = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

const NavigationItem = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 12px 20px;
  border-radius: 10px;
  gap: 10px;
  color: #555;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: #f5f5f5;
    transform: scale(1.05); 
  }

  &.active {
    background-color: #f0f0f0;
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