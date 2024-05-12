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
  font-size: 2vh;
  font-weight: bold;
`;

const OptionDescription = styled.p`
  margin: 0;
  font-size: 1.75vh;
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
  { title: 'Skills', description: 'Manage skills', route: 'skill' },
  { title: 'Projects', description: 'Manage projects', route: 'project' },
  { title: 'Experience', description: 'Manage experience', route: 'experience' },
  { title: 'Education', description: 'Manage education', route: 'education' },
  { title: 'Certification', description: 'Manage certifications', route: 'certification' },
  { title: 'Blog', description: 'Manage blog posts', route: 'blog' },
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

  const handleAdd = (option) => {
    navigate(`/admin/new${option.route}`);
  };

  const handleEdit = (option) => {
    navigate(`/admin/edit${option.route}`);
  };

  const handleDelete = (option) => {
    navigate(`/admin/delete${option.route}`);
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
              <OptionDescription>{option.description}</OptionDescription>
              <ButtonContainer>
                <Button className={`btn btn-outline-${props.mode === 'dark' ? 'light' : 'dark'}`} onClick={() => handleAdd(option)}>Add</Button>
                <Button className={`btn btn-outline-${props.mode === 'dark' ? 'light' : 'dark'}`} onClick={() => handleEdit(option)}>Edit</Button>
                <Button className={`btn btn-outline-${props.mode === 'dark' ? 'light' : 'dark'}`} onClick={() => handleDelete(option)}>Delete</Button>
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
