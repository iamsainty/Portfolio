import React, { useContext, useState } from "react";
import { Form, Card, Container, Row, Col } from "react-bootstrap";
import styled from "styled-components";
import projectContext from "../../context/projects/projectContext";

const StyledCard = styled(Card)`
  margin: 50px auto;
  padding: 20px;
  width: 100%;
`;

const StyledFormGroup = styled(Form.Group)`
  margin: 20px 0;
`;

function AddProject() {
  const [project, setProject] = useState({
    title: "",
    description: "",
    technologies: "",
    startdate: "",
    enddate: "",
    status: "ongoing",
    liveurl: "",
    githuburl: "",
    imageurl: "",
    blogurl: "",
  });

  const context = useContext(projectContext);
  const { addProject } = context;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProject({
      ...project,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(project);
    addProject(project);
  };

  return (
    <Container>
      <StyledCard>
        <Card.Body>
          <Card.Title style={{fontWeight: 'bold', fontSize: '30px'}}>Add Project</Card.Title>
          <Form onSubmit={handleSubmit}>
            <StyledFormGroup controlId="formTitle">
              <Form.Control
                type="text"
                name="title"
                value={project.title}
                onChange={handleChange}
                placeholder="Project Title"
                required
              />
            </StyledFormGroup>

            <StyledFormGroup controlId="formDescription">
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={project.description}
                onChange={handleChange}
                placeholder="Project Description"
                required
              />
            </StyledFormGroup>

            <StyledFormGroup controlId="formTechnologies">
              <Form.Control
                type="text"
                name="technologies"
                value={project.technologies}
                onChange={handleChange}
                placeholder="Technologies (comma separated)"
              />
            </StyledFormGroup>

            <Row>
              <Col>
                <StyledFormGroup controlId="formStartDate">
                  <Form.Control
                    type="date"
                    name="startdate"
                    value={project.startdate}
                    onChange={handleChange}
                    required
                  />
                </StyledFormGroup>
              </Col>
              <Col>
                <StyledFormGroup controlId="formEndDate">
                  <Form.Control
                    type="date"
                    name="enddate"
                    value={project.enddate}
                    onChange={handleChange}
                  />
                </StyledFormGroup>
              </Col>
            </Row>

            <StyledFormGroup controlId="formStatus">
              <Form.Control
                as="select"
                name="status"
                value={project.status}
                onChange={handleChange}
              >
                <option value="ongoing">Ongoing</option>
                <option value="completed">Completed</option>
                <option value="planned">Planned</option>
              </Form.Control>
            </StyledFormGroup>

            <StyledFormGroup controlId="formLiveURL">
              <Form.Control
                type="url"
                name="liveurl"
                value={project.liveurl}
                onChange={handleChange}
                placeholder="Live URL"
              />
            </StyledFormGroup>

            <StyledFormGroup controlId="formGithubURL">
              <Form.Control
                type="url"
                name="githuburl"
                value={project.githuburl}
                onChange={handleChange}
                placeholder="GitHub URL"
              />
            </StyledFormGroup>

            <StyledFormGroup controlId="formImageURL">
              <Form.Control
                type="file"
                name="imageurl"
                onChange={handleChange}
              />
            </StyledFormGroup>

            <StyledFormGroup controlId="formBlogURL">
              <Form.Control
                type="url"
                name="blogurl"
                value={project.blogurl}
                onChange={handleChange}
                placeholder="Blog URL"
              />
            </StyledFormGroup>

            <button className="btn btn-outline-dark w-100" type="submit">
              Add Project
            </button>
          </Form>
        </Card.Body>
      </StyledCard>
    </Container>
  );
}

export default AddProject;
