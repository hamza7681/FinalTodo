import React, { useState,useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import './design.css'

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      history.push("/dashboard");
    }
  }, []);

  const onSignup = () => {
    setLoading(true);
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        updateProfile(auth.currentUser, { displayName: name })
          .then(() => history.push("/"))
          .catch((e) => alert(e.message));
      })
      .catch((e) => alert(e.message))
      .finally(() => setLoading(false));
  };

  return (
    <>
      <div className="container login_main2">
        <div className="container login_field2">
         
          <input
            type="text"
            name="name"
            className="field"
            placeholder='Write Your Name...'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
         <br/><br/>
          <input
            type="email"
            name="email"
            className="field"
            placeholder='Write Your Email...'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
       <br/><br/>
          <input
            type="password"
            name="password"
            className="field"
            placeholder='Write Your Password...'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br/><br/>
          <div className='text-center'>
          <span className="btn_login" onClick={onSignup}>
            {loading ? "Creating user ..." : "Sign Up"}
          </span>
          <br/><br/>
          <Link to="/" className='link'> Already have an Account? </Link>
          </div>
          
        </div>
      </div>
    </>
  );
}

export default Signup;
