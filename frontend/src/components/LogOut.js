import React, { useContext, useState } from "react";
import { UserContext } from "../App";

import Button from "react-bootstrap/esm/Button";
import { useNavigate } from "react-router-dom";
const LogOut = () => {
  const [islogOut, setIsLoggedOut] = useState(false);
  const navigate = useNavigate();
  const { token, setToken, setIsLoggedIn } = useContext(UserContext);
  console.log("logout");
  localStorage.clear();
  setToken(null);

  setIsLoggedIn(false);
  setIsLoggedOut(true);

  return (
    <div>
      {/* {islogOut ? (
        <>
          {" "}
          
          <Button
            onClick={() => {
              navigate("/login");
            }}
          >
            Login
          </Button>{" "}
        </>
      ) : null} */}
    </div>
  );
};

export default LogOut;
