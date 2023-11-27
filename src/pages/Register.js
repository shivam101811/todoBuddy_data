import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom/dist";
import { toast } from "react-toastify";

const Register = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
  });
const navigate = useNavigate()

  
  useEffect(() => {
    // Fetch user data on component mount
    const fetchData = async () => {
      try {
        const response = await axios.get("https://todobuddyy.onrender.com/user");
        // You can handle the response data as needed
        // console.log(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []); // Run only on component mount

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Destructure credentials object
    const { username, password, confirmPassword, email } = credentials;

    // Check for empty fields
    if (!username || !password || !confirmPassword || !email) {
      return toast.error("Please fill in all the fields");
    }

    // Validate password match
    if (credentials.password !== credentials.confirmPassword) {
      return toast.error("Passwords do not match");
    }

    if (!isValidEmail(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    try {
      // Check if the username or email already exists
      const userResponse = await axios.get("https://todobuddyy.onrender.com/user");
      const userExists = userResponse.data.some(
        (user) => user.username === username || user.email === email
      );

      if (userExists) {
        toast.error("Username or email already exists");
      } else {
        // Send a POST request using Axios
        const response = await axios.post("https://todobuddyy.onrender.com/user", {
          username,
          password,
          email,
        });

        // Check if the response status is OK
        if (response.status !== 201) {
          throw new Error("Registration failed");
        }

        toast.success("User registered successfully");
        navigate('/login');
      }
    } catch (error) {
      console.error(error);
      toast.error("Registration failed");
    }
  };

  const isValidEmail = (email) => {
    // Basic email validation, you can enhance this as needed
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };


  

  return (
    <div>
    <div className="container-fluid p-0">
      <div className="row g-0">
        <div className="col-xl-9">
          <div className="auth-full-bg pt-lg-5 p-4">
            <div className="w-100">
              <div className="bg-overlay"></div>
              <div className="Heading d-flex h-100 justify-content-center align-items-center flex-column" style={{ fontSize: "100px", color: "black" }}>
                TodoBuddy
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3">
          <div className="auth-full-page-content p-md-5 p-4">
            <div className="w-100">
              <div className="d-flex flex-column h-100">
                <div className="mb-4 mb-md-5">
                  {/* ... (Logo) */}
                </div>
                <div className="my-auto">
                  <div>
                    <h5 className="text-primary">Create an Account</h5>
                    <p className="text-light">Sign up to get started with TodoBuddy.</p>
                  </div>
                  <div className="mt-4">
                    <form onSubmit={handleSubmit}>
                      <div className="mb-3">
                        <label htmlFor="username" className="text-light">Username</label>
                        <input
                          type="text"
                          className="form-control"
                          id="username"
                          placeholder="Enter username"
                          value={credentials.username}
                          onChange={(event) => setCredentials((prev) => ({ ...prev, username: event.target.value }))}
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="password" className="text-light">Password</label>
                        <input
                          type="password"
                          className="form-control"
                          id="password"
                          placeholder="Enter password"
                          value={credentials.password}
                          onChange={(event) => setCredentials((prev) => ({ ...prev, password: event.target.value }))}
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="confirmPassword" className="text-light">Confirm Password</label>
                        <input
                          type="password"
                          className="form-control"
                          id="confirmPassword"
                          placeholder="Confirm password"
                          value={credentials.confirmPassword}
                          onChange={(event) => setCredentials((prev) => ({ ...prev, confirmPassword: event.target.value }))}
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="email" className="text-light">Email</label>
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          placeholder="Enter email"
                          value={credentials.email}
                          onChange={(event) => setCredentials((prev) => ({ ...prev, email: event.target.value }))}
                        />
                      </div>
                      <div className="mt-3 d-grid">
                        <button className="btn btn-primary waves-effect waves-light" type="submit">
                          Register
                        </button>
                      </div>
                    </form>
                  </div>
                  <div className="mt-3 text-center">
                    <p className="text-light mb-0">
                      Already have an account? <Link to="/login" className="text-primary">Login here</Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default Register;
