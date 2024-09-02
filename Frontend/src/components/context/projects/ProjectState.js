import React, { useState } from "react";
import projectContext from "./projectContext";

const ProjectState = (props) => {
  const host = "http://localhost:5002";
  // const host = 'https://hey-sainty-backend.vercel.app';

  const [projects, setProjects] = useState([]);

  // Fetch all projects from backend
  const getProjects = async () => {
    try {
      const response = await fetch(`${host}/project/projects`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log(data);
      setProjects(data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  const addProject = async (formData) => {
    try {
      const response = await fetch(`${host}/project/newproject`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log(data);
      setProjects([...projects, data]);
    } catch (error) {
      console.error("Error adding project:", error);
    }
  };

  const deleteProject = async (id) => {
    try {
      const response = await fetch(`${host}/project/deleteproject/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log(data);
      setProjects(projects.filter((project) => project._id !== id));
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  return (
    <projectContext.Provider
      value={{
        projects,
        getProjects,
        addProject,
        deleteProject,
      }}
    >
      {props.children}
    </projectContext.Provider>
  );
};

export default ProjectState;
