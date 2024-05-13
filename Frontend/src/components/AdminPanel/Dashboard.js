import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Introduction from '../Introduction';

const OptionCard = styled.div`
  background-color: ${({ mode }) => (mode === 'dark' ? '#222' : '#fff')}; /* Conditional background color */
  color: ${({ mode }) => (mode === 'dark' ? '#fff' : '#000')}; /* Conditional text color */
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
  font-size: 3vh;
  font-weight: bold;
`;


const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const Button = styled.button`
  flex-grow: 1;
  margin-right: 10px;
`;

const options = [
  { title: 'Skill', route: 'skill' },
  { title: 'Project', route: 'project' },
  { title: 'Experience', route: 'experience' },
  { title: 'Education', route: 'education' },
  { title: 'Certification', route: 'certification' },
  { title: 'Blog', route: 'blog' },
];

const Dashboard = (props) => {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      if (!localStorage.getItem('token')) {
        navigate('/login');
      }
    };
    fetchUser();
  }, [navigate]);

  const handlemanage = (option) => {
    navigate(`/admin/manage${option.route}`);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="container">
      <Introduction array={options.map(option => option.title)} heading={"Admin Panel"} mode={props.mode} />
      <br /><br /><br /><br />
      <div className="row">
        {options.map((option) => (
          <div className="col-md-4" key={option.title}>
            <OptionCard mode={props.mode}>
              <OptionTitle>{option.title}</OptionTitle>
              <ButtonContainer>
                <Button className={`btn btn-outline-${props.mode === 'dark' ? 'light' : 'dark'}`} onClick={() => handlemanage(option)}>Manage {option.title}</Button>
              </ButtonContainer>
            </OptionCard>
          </div>
        ))}
      </div>
      <button className="btn btn-danger mb-3" style={{ width: '100%' }} onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
