import React, { useEffect } from "react";
// import { useHistory } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import Todo from "../Containers/Todo";
import './design.css'

function Dashboard({ history }) {
  // const history = useHistory();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      history.push("/dashboard");
    }
  }, []);

  const logout = () => {
    signOut(auth)
      .then(() => {
        localStorage.removeItem("token");
        history.push("/");
      })
      .catch((e) => alert(e.message));
  };

  const auth = getAuth();
  const user = auth.currentUser;

  return (
    <>
      <div className="container-fluid bg-light nav_bar">
        <div className='container' style={{paddingTop:'20px'}}>
        <div className="row">
          <div className="col-8">
            <h3 className="login_name" href="#" >
              {user && user.displayName}
            </h3>
          </div>
         
          <div className="col-4">
            <span onClick={logout} className='btn_logout'>Log Out</span>
          </div>
        </div>
        </div>
      </div>

      <Todo />
    </>
  );
}

export default Dashboard;
