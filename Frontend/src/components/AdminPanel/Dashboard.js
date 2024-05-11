import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook instead of Navigate
import styled from 'styled-components';

// Styled components for the admin options
const OptionCard = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  padding: 20px;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
`;

const OptionTitle = styled.h2`
  font-size: 2vh;
  font-weight: bold;
`;

const OptionDescription = styled.p`
  margin: 0;
  font-size: 1.75vh;
`;

const options = [
  { title: 'Skills', description: 'Manage skills' },
  { title: 'Projects', description: 'Manage projects' },
  { title: 'Experience', description: 'Manage experience' },
  { title: 'Education', description: 'Manage education' },
  { title: 'Certification', description: 'Manage certifications' },
  { title: 'Contact', description: 'Manage contact details' },
  { title: 'Blog', description: 'Manage blog posts' },
];

const Dashboard = () => {
  const navigate = useNavigate(); // Use useNavigate hook to get navigation function

  useEffect(() => {
    // Check if user is logged in
    const fetchUser = async () => {
        if (!localStorage.getItem('token')) {
            navigate('/login');
        }
    };
    fetchUser();
    // eslint-disable-next-line
  }, [navigate]); // Add navigate to the dependency array

  const handleOptionClick = (option) => {
    // Redirect to corresponding admin page based on option clicked
    navigate(`/admin/${option.toLowerCase()}`); // Use navigate function instead of Navigate component
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="container">
      <h1>Welcome to Admin Panel</h1>
      <button className="btn btn-danger mb-3" onClick={handleLogout}>Logout</button>
      <div className="row">
        {options.map((option) => (
          <div className="col-md-4" key={option.title}>
            <OptionCard
              onClick={() => handleOptionClick(option.title)}
            >
              <OptionTitle>{option.title}</OptionTitle>
              <OptionDescription>{option.description}</OptionDescription>
            </OptionCard>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
