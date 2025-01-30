import React, { useEffect, useState, useContext, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import EditorJs from "@editorjs/editorjs";
import Header from "@editorjs/header";
import Paragraph from "@editorjs/paragraph";
import List from "@editorjs/list";
import Code from "@editorjs/code";
import Quote from "@editorjs/quote";
import LinkTool from "@editorjs/link";
import Table from "@editorjs/table";
import Delimiter from "@editorjs/delimiter";
import InlineCode from "@editorjs/inline-code";
import Raw from "@editorjs/raw";
import blogContext from "../../context/blogs/blogContext";
import Loading from "../../Loading"; // Assuming this is your custom loading component
import styled from "styled-components";

// Styled Components

const Body = styled.div`
  display: flex;
  justify-content: center;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  width: 90vw;
  gap: 25px;
  margin-top: 10vh;
`;

const TitleInput = styled.input`
  border: none;
  font-size: 50px;
  font-weight: 700;
  width: 100%;

  &:focus {
    outline: none;
  }
`;

const SummaryInput = styled.input`
  border: none;
  font-size: 20px;
  width: 100%;

  &:focus {
    outline: none;
  }
`;

const TagsInput = styled.input`
  border: none;
  font-size: 20px;
  width: 100%;

  &:focus {
    outline: none;
  }
`;

const PermalinkInput = styled.input`
  border: none;
  font-size: 20px;
  width: 100%;

  &:focus {
    outline: none;
  }
`;

const Input = styled.input`
  border: none;
  font-size: 15px;
  width: 100%;

  &:focus {
    outline: none;
  }
`;

const Button = styled.div`
  margin: 0;
  width: 100%;
`;

const ErrorMsg = styled.div`
  color: red;
  padding-bottom: 1vh;
`;

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;

const Modal = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1001;
`;

const ModalContent = styled.div`
  padding: 2vh;
  background-color: white;
  border-radius: 5px;
`;

const ModalHeader = styled.div`
  font-weight: bolder;
  font-size: 3.5vh;
`;

const ModalBody = styled.div`
  font-size: 2.5vh;
`;

const ModalFooter = styled.div`
  width: 100%;
`;

const NewBlog = () => {
  // fields are title, summary, content, tags, permalink
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [tags, setTags] = useState([]);
  const [permalink, setPermalink] = useState("");
  const [coverimage, setCoverimage] = useState(null);

  const [msg, setMsg] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { newBlog, fetchBlog } = useContext(blogContext);

  const editorRef = useRef(null);

  useEffect(() => {
    if (!localStorage.getItem("hey-sainty-token")) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    // Check if the editor is already initialized
    if (editorRef.current) return; // Prevent multiple initializations

    // Ensure the DOM element is available
    const editorElement = document.getElementById("editorjs");

    if (editorElement) {
      const editor = new EditorJs({
        holder: "editorjs",
        tools: {
          header: {
            class: Header,
            inlineToolbar: ["link"],
          },
          paragraph: {
            class: Paragraph,
            inlineToolbar: true,
          },
          list: {
            class: List,
            inlineToolbar: true,
          },
          code: {
            class: Code,
            inlineToolbar: true,
          },
          quote: {
            class: Quote,
            inlineToolbar: true,
          },
          linkTool: {
            class: LinkTool,
            inlineToolbar: true,
          },
          table: {
            class: Table,
            inlineToolbar: true,
          },
          delimiter: {
            class: Delimiter,
            inlineToolbar: true,
          },
          inlineCode:{
            class: InlineCode,
            inlineToolbar: true,
          },
          raw: {
            class : Raw,
            inlineToolbar: true,
          },
        },
        placeholder: "Start typing your blog content here...",
      });

      editorRef.current = editor;
    }

    // Cleanup function to destroy the editor when the component is unmounted or updated
    return () => {
      if (editorRef.current && editorRef.current.destroy) {
        editorRef.current.destroy();
        editorRef.current = null;
      }
    };
  }, []); // Empty dependency array ensures it runs only once when the component mounts

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");
    try {
      if (!title || !summary || !permalink) {
        setMsg("All fields are required");
        setLoading(false);
        return;
      }

      if (summary.length > 150 || summary.length < 125) {
        setMsg("Summary should be between 125 to 150 characters");
        setLoading(false);
        return;
      }

      if (!/^[a-z0-9-]+$/.test(permalink)) {
        setMsg(
          "Permalink can only contain lowercase letters, digits, and hyphens"
        );
        setLoading(false);
        return;
      }

      try {
        await fetchBlog(permalink);
        setMsg("Permalink is already used");
        setLoading(false);
        return;
      } catch (error) {
        if (error.message !== "Failed to fetch blog") {
          setMsg(
            "An error occurred while checking the permalink. Please try again later."
          );
          setLoading(false);
          return;
        }
      }

      // Save editor content
      const savedData = await editorRef.current.save();

      const error = await newBlog(
        title,
        summary,
        JSON.stringify(savedData),
        tags,
        permalink,
        coverimage
      );
      if (!error) {
        setMsg("");
        setShowModal(true);
      } else {
        setMsg(error.message);
      }
    } catch (error) {
      console.error("Error creating blog:", error);
      setMsg("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleTagChange = (e) => {
    const tags = e.target.value.split(",").map((tag) => tag.trim());
    setTags(tags);
  };

  return (
    <>
      {loading && <Loading />}
      {showModal && (
        <>
          <ModalBackdrop />
          <Modal>
            <ModalContent>
              <ModalHeader>Yeah...</ModalHeader>
              <ModalBody>Blog has been added successfully</ModalBody>
              <ModalFooter>
                <Link to="/admin/manageblog" style={{ width: "100%" }}>
                  <Button className="btn btn-outline-dark">
                    Go to Manage Blogs
                  </Button>
                </Link>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      )}
      <Body>
        <Container>
          <TitleInput
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            name="title"
            placeholder="Blog Title (e.g., How to Code)"
          />
          <SummaryInput
            type="text"
            onChange={(e) => setSummary(e.target.value)}
            value={summary}
            name="summary"
            placeholder="Brief Summary (125-150 characters)"
          />
          <div id="editorjs"></div>
          <TagsInput
            type="text"
            onChange={handleTagChange}
            value={tags.join(", ")}
            name="tag"
            placeholder="Enter tags, separated by commas"
          />
          <PermalinkInput
            type="text"
            onChange={(e) => setPermalink(e.target.value)}
            value={permalink}
            name="permalink"
            placeholder="Custom permalink (e.g., my-first-blog)"
          />
          <Input
            type="file"
            onChange={(e) => setCoverimage(e.target.files[0])}
            name="coverimage"
            accept=".jpg, .png, .jpeg"
          />
          <ErrorMsg>{msg}</ErrorMsg>
          <Button className="btn btn-outline-dark" onClick={handleSubmit}>
            Create Blog
          </Button>
        </Container>
      </Body>
    </>
  );
};

export default NewBlog;
