import React, { useState } from "react";
import "./header.css";
import { useDispatch, useSelector } from "react-redux";
import CloseIcon from '@mui/icons-material/Close';
import { createData } from "../../actions/dataAction";
import { useAlert } from "react-alert";

const Header = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  if (modal) {
    document.body.classList.add('active-popup')
  } else {
    document.body.classList.remove('active-popup')
  }
  const [user, setUser] = useState({
    name: "",
    email: "",
    hobbies: "",
    phone_no: ""
  });
  const { name, email, hobbies, phone_no } = user;
  const registerSubmit = (e) => {
    e.preventDefault();
    const myForm = {
      "name": name,
      "email": email,
      "hobbies": hobbies,
      "phone_no": phone_no,
    }
    dispatch(createData(myForm));
    toggleModal();
    window.location.reload(false);
    alert.success("New Data Added Successfully..");
    user.email = "";
    user.name = "";
    user.phone_no = "";
    user.hobbies = "";
  };

  const registerDataChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  return (
    <header>
      <div className="logo">
        DATASTORE
      </div>
      <div className="menu" id="nav">
        <ul>
          <li><button className="btn" onClick={toggleModal}>Add Data</button></li>
        </ul>
      </div>
      {modal && (
        <div className="popup">
          <div onClick={toggleModal} className="popup1"></div>
          <div className="popup-content">
            <h2>Add Data</h2>
            <form className="signUpForm" encType="multipart/form-data" onSubmit={registerSubmit}>
              <div className="signUpName">
                <input type="text" placeholder="Name" required name="name" value={name} onChange={registerDataChange} />
              </div>
              <div className="signUpPhone">
                <input type="text" placeholder="Phone no." required name="phone_no" value={phone_no} onChange={registerDataChange} />
              </div>
              <div className="signUpEmail">
                <input type="email" placeholder="Email" required name="email" value={email} onChange={registerDataChange} />
              </div>
              <div className="signUpPassword">
                <input type="text" placeholder="Hobbies" required name="hobbies" value={hobbies} onChange={registerDataChange} />
              </div>
              <input type="submit" value="SAVE" className="signUpBtn" />
            </form>
            <button className="close-icon" onClick={toggleModal}>
              <CloseIcon />
            </button>
          </div>
        </div>
      )}
    </header>


  );
};

export default Header;