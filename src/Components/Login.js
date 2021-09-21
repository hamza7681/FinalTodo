import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useHistory } from "react-router-dom";
import './design.css';

function Login() {
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

  const onLogin = () => {
    setLoading(true);
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        localStorage.setItem("token", userCredential._tokenResponse.idToken);
        history.push("/dashboard");
      })
      .catch((e) => alert(e.message))
      .finally(() => setLoading(false));
  };

  return (
    <>
      <div className="container login_main">
        <div className="container login_field">
          
          <input
            type="email"
            name="email"
            className="field"
            placeholder='Write your Email...'
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
              <br/>
          <span onClick={onLogin} className="btn_login ">
            {loading ? "Logging you in" : "Login"}
          </span>
          <br/><br/>
          <Link to="/signup" className='link'> Don't have an Account? </Link>
          </div>
          
         
        </div>
      </div>
    </>
  );
}

export default Login;
