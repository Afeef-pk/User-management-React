import React, { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { AdminAPI } from "../../../Apl";
import './AdminEditUser.css'

function AdminEditUser() {
  const navigate = useNavigate();
  const [Errmessage, setErrmessage] = useState("");
  const location = useLocation();
  const editEmail = useRef();
  const editName = useRef();
  const userId = location.state._id;
  const userName = location.state.name;
  const userEmail = location.state.email;

  const submitHandle = () => {
    const UserEditeEmail = editEmail.current.value;
    const UserEditeName = editName.current.value;
    console.log(UserEditeEmail);
    if (
      UserEditeName !== "" &&
      UserEditeEmail !== "" &&
      UserEditeEmail.includes("@")
    ) {
      axios
        .post(
          `${AdminAPI}EditeUser`,
          { UserEditeEmail, UserEditeName, userId },
          { withCredentials: true }
        )
        .then((response) => {
          console.log(response.data);
          const result = response.data;
          console.log("okok");
          console.log(result);
          if (result.EditeUser) {
            navigate("/admin");
          } else {
            setErrmessage(result.message);
          }
        });
    } else {
      setErrmessage("Email or UserName wrong");
    }
  };

  return (
    <>
      <div className="container d-flex  ">
        <div className="edituser">
        <h1 className="fw-bold mb-5 text-center text-light">Edit Details</h1>
          <div className="form-outline mb-4 text-light">
            <label className="form-label" for="form3Example1 ">
              {" "}
              Name
            </label>
            <input
              name="Name"
              type="text"
              id="username"
              ref={editName}
              defaultValue={userName}
              className="form-control"
            />
          </div>
          <div className="form-outline mb-4 mt-5 text-light">
            <label className="form-label" for="form2Example1">
              Email address
            </label>
            <input
              type="email"
              id="userEmail"
              className="form-control"
              ref={editEmail}
              defaultValue={userEmail}
              name="Email"
            />
          </div>
          <div className="text-center">
          {Errmessage.length > 0 && <p style={{ color: "red" }}>{Errmessage}</p>}
            <button
              id="btn-submit"
              type="button"
              onClick={submitHandle}
              className="btn btn-primary btn-block mb-4">
              Edit Details
            </button>
          </div>
        </div>
       
      </div>
    </>
  );
}

export default AdminEditUser;
