import React from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home/Home";
import Disclaimer from "./components/Pages/Disclaimer";
import Footer from "./components/Footer";
import PrivacyPolicy from "./components/Pages/PrivacyPolicy";
import Projects from "./components/Projects/Projects";
import Blog from "./components/Blog/Blog";
import YourPortfolio from "./components/YourPortfolio/YourPortfolio";
import Certificates from "./components/Certification/Certificates";
import GDPRCompliance from "./components/Pages/GDPRCompliance";
import About from "./components/Pages/About";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Account/Login";
// import Register from "./components/Account/Register";
import BlogPost from "./components/Blog/BlogPost";
import Dashboard from "./components/AdminPanel/Dashboard";
import NewBlog from "./components/AdminPanel/manageblog/NewBlog";
import BlogState from "./components/context/blogs/BlogState";
import ManageBlog from "./components/AdminPanel/manageblog/ManageBlogs";
import EditBlog from "./components/AdminPanel/manageblog/EditBlog";
import NotFound from "./components/NotFound";
import BlogCategory from "./components/Blog/BlogCategory";
import AuthState from "./components/context/auth/AuthState";
import FirebaseAuthState from "./components/context/firebaseAuth/FirebaseAuthState";
import SignIn from "./components/FirebaseAuth/SignIn";
import SignUp from "./components/FirebaseAuth/SignUp";
import CommentState from "./components/context/comment/CommentState";
import UserAuthState from "./components/context/userAuth/UserAuthState";
import ManageProfile from "./components/User/ManageProfile/ManageProfile";
import UserState from "./components/context/user/UserState";
import BlogActivityState from "./components/context/blogActivity/BlogActivityState";

function App() {
  return (
    <div>
      <Router>
        <BlogActivityState>
          <CommentState>
            <UserState>
              <UserAuthState>
                <FirebaseAuthState>
                  <AuthState>
                    <BlogState>
                      <Navbar />
                      <Routes>
                        <Route exact path="/" element={<Home />} />

                        {/* Routes for user authentication */}
                        <Route path="/signin" element={<SignIn />} />
                        <Route path="/signup" element={<SignUp />} />

                        {/* Routes for authentication */}
                        <Route
                          exact
                          path="/login"
                          element={<Login title="Login - Sainty" />}
                        />
                        {/* <Route exact path="/register" element={<Register title='Register - Sainty' />} /> */}

                        {/* Routes for webpages */}
                        <Route exact path="/projects" element={<Projects />} />
                        <Route
                          exact
                          path="/certifications"
                          element={
                            <Certificates title="Certificates - Sainty" />
                          }
                        />
                        <Route
                          exact
                          path="/your-portfolio"
                          element={
                            <YourPortfolio title="Your Portfolio - Sainty" />
                          }
                        />

                        {/* Blog Routes */}
                        <Route
                          exact
                          path="/blog"
                          element={<Blog title="Blog - Sainty" />}
                        />
                        <Route
                          exact
                          path="/blog/tag/:tag"
                          element={<BlogCategory />}
                        />
                        <Route
                          exact
                          path="/blog/:permalink"
                          element={<BlogPost />}
                        />

                        {/* Routes for admin panel operations */}
                        <Route
                          exact
                          path="/admin"
                          element={<Dashboard title="Admin - Sainty" />}
                        />

                        {/* Routes for managing blogs */}
                        <Route
                          exact
                          path="/admin/newblog"
                          element={<NewBlog title="New Blog -Sainty" />}
                        />
                        <Route
                          exact
                          path="/admin/manageblog"
                          element={<ManageBlog title="Delete Blog -Sainty" />}
                        />
                        <Route
                          exact
                          path="/admin/editblog/:permalink"
                          element={<EditBlog title="Edit Blog -Sainty" />}
                        />

                        {/* Routes for legal Pages */}
                        <Route
                          exact
                          path="/about"
                          element={<About title="About - Sainty" />}
                        />
                        <Route
                          exact
                          path="/disclaimer"
                          element={<Disclaimer title="Disclaimer - Sainty" />}
                        />
                        <Route
                          exact
                          path="/privacy-policy"
                          element={
                            <PrivacyPolicy title="Privacy Policy - Sainty" />
                          }
                        />
                        <Route
                          exact
                          path="/gdpr-compliance"
                          element={
                            <GDPRCompliance title="GDPR Compliance - Sainty" />
                          }
                        />

                        {/* Routes for user */}
                        <Route
                          exact
                          path="/profile"
                          element={<ManageProfile title="Profile - Sainty" />}
                        />

                        {/* Handling error page */}
                        <Route
                          exact
                          path="*"
                          element={<NotFound title="404 Error - Sainty" />}
                        />
                      </Routes>
                      <Footer />
                    </BlogState>
                  </AuthState>
                </FirebaseAuthState>
              </UserAuthState>
            </UserState>
          </CommentState>
        </BlogActivityState>
      </Router>
    </div>
  );
}

export default App;
