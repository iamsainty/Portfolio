import React, { useContext, useState } from "react";
import { auth, googleProvider } from "./FirebaseConfig"; // import Firebase configuration
import {
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
} from "firebase/auth";
import { signInWithPopup } from "firebase/auth";
import firebaseAuthContext from "../context/firebaseAuth/firebaseAuthContext";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { signup } = useContext(firebaseAuthContext);

  // Handle sign-up with email and password
  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Create a user with email and password
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Update the user's profile with the name
      await updateProfile(user, { displayName: name });

      // Send email verification
      await sendEmailVerification(user);

      console.log(user);

      signup(
        user.displayName,
        user.email,
        user.emailVerified,
        user.uid,
        user.photoURL
      );

      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  // Handle Google sign-up
  const handleGoogleSignUp = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      signup(
        user.displayName,
        user.email,
        user.emailVerified,
        user.uid,
        user.photoURL
      );

    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>

      {/* Sign Up Form */}
      <form onSubmit={handleSignUp}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            required
          />
        </div>

        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>

        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Signing Up..." : "Sign Up"}
        </button>
      </form>

      {/* Google Sign-Up Button */}
      <button onClick={handleGoogleSignUp}>Sign Up with Google</button>
    </div>
  );
}

export default SignUp;
