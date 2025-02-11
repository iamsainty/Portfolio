"use client";

const { createContext, useState, useContext } = require("react");

const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState([]);

  const addProject = async (formData) => {
    try {
      setLoading(true);

      const adminToken = document.cookie
        .split("; ")
        .find((row) => row.startsWith("adminToken="))
        ?.split("=")[1];

      if (!adminToken) {
        setLoading(false);
        return;
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/project`,
        {
          method: "POST",
          headers: {
            adminToken: adminToken,
          },
          body: formData,
        }
      );

      // Only parse response as JSON if it's OK
      const data = response.ok ? await response.json() : null;

      if (response.ok) {
        setProjects((prevProjects) => [...prevProjects, data]);
      } else {
        console.error("Error adding project:", data || "Unknown error");
      }
    } catch (error) {
      console.error("Error during project addition:", error);
    } finally {
      setLoading(false); // Ensure loading is always set to false
    }
  };

  const getProjects = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/project`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      setProjects(data.projects);
    } catch (error) {
      console.error("Error during project fetching:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProjectContext.Provider
      value={{ loading, projects, addProject, getProjects }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export const useProject = () => useContext(ProjectContext);
