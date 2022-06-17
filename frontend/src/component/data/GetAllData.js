import React, { Fragment, useEffect, useState } from "react";
import { DataGrid } from '@mui/x-data-grid';
import "./alldata.css";
import { useSelector, useDispatch } from "react-redux";
import { AllData, deleteData, singleData, updateData, send_Data } from "../../actions/dataAction";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import { useAlert } from "react-alert";
import SelectInput from "@mui/material/Select/SelectInput";

const GetAllData = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const alldata = useSelector((state) => state.alldata.data);
  const getdata = useSelector((state) => state.getData.Data);
  const [modal, setModal] = useState(false);
  const [user, setUser] = useState({
    name: "",
    email: "",
    hobbies: "",
    phone_no: ""
  });

  const selectedData = () => {
    const select = document.querySelectorAll(".Mui-selected");
    var msg = `Data\n`;
    select.forEach((item, index) => {
      const data_p = item.innerText;
      const arr = data_p.split("\n");
      msg = msg + `Data of Student => id :- ${arr[0]}, Name :- ${arr[1]}, Phone No. :- ${arr[2]}, Email :- ${arr[3]}, Hobbies :- ${arr[4]}\n`;
    });
    const s_data = {
      message: msg
    }
    dispatch(send_Data(s_data));
    alert.success("Email Sended Successfully");
  }
  const { name, email, hobbies, phone_no } = user;
  const toggleModal = () => {
    setModal(!modal);
  };
  const deleteDataHandler = (id) => {
    dispatch(deleteData(id));
    window.location.reload(false);
    alert.success("Delete Successfully");
  };
  const updateDataHandler = (id) => {
    dispatch(singleData(id));
    console.log(getdata);
    user.name = getdata.name;
    user.email = getdata.email;
    user.phone_no = getdata.phone_no;
    user.hobbies = getdata.hobbies;
    setModal(!modal);

  };
  if (modal) {
    document.body.classList.add('active-popup')
  } else {
    document.body.classList.remove('active-popup')
  }
  const updateSubmit = (e) => {
    e.preventDefault();
    const myForm = {
      "id": getdata._id,
      "name": name,
      "hobbies": hobbies,
      "phone_no": phone_no,
    }
    dispatch(updateData(myForm));
    window.location.reload(false);
    alert.success("Update Successfully");
  };
  const registerDataChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const rows = [];
  alldata &&
    alldata.forEach((item, index) => {
      rows.push({
        name: item.name,
        id: item._id,
        phone_no: item.phone_no,
        email: item.email,
        hobbies: item.hobbies
      });
    });
  const columns = [
    { field: "id", headerName: "Data ID", minWidth: 250, flex: 1 },
    {
      field: "name",
      headerName: "Name",
      minWidth: 200,
      flex: 0.5,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "phone_no",
      headerName: "Phone No.",
      type: "string",
      minWidth: 180,
      flex: 0.3,
    },

    {
      field: "email",
      headerName: "Email",
      type: "string",
      minWidth: 270,
      flex: 0.5,
    },
    {
      field: "hobbies",
      headerName: "Hobbies",
      type: "string",
      minWidth: 230,
      flex: 0.5,
    },
    {
      field: "actions",
      flex: 0.3,
      headerName: "Update",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Button variant="text" onClick={() => updateDataHandler(params.getValue(params.id, "id"))}><ModeEditIcon /></Button>
          </Fragment>
        );
      },
    },
    {
      field: "action",
      flex: 0.3,
      headerName: "Delete",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Button variant="text" onClick={() => deleteDataHandler(params.getValue(params.id, "id"))}><DeleteIcon /></Button>
          </Fragment>
        );
      },
    },
  ];
  useEffect(() => {
    dispatch(AllData());
  }, [dispatch]);

  return (
    <div className="myDataPage" style={{ width: '100%' }}>
      <button className="btn btns" onClick={() => selectedData()}>Send Data</button>
      <DataGrid
        rows={rows}
        columns={columns}
        disableSelectionOnClick
        className="myDataTable"
        autoHeight
        checkboxSelection
      />
      {modal && (
        <div className="popup">
          <div onClick={toggleModal} className="popup1"></div>
          <div className="popup-content">
            <h2>Update Data</h2>
            <form className="signUpForm" encType="multipart/form-data" onSubmit={updateSubmit}>
              <div className="signUpName">
                <input type="text" placeholder="Name" required name="name" value={name} onChange={registerDataChange} />
              </div>
              <div className="signUpPhone">
                <input type="text" placeholder="Phone no." required name="phone_no" value={phone_no} onChange={registerDataChange} />
              </div>
              <div className="signUpEmail">
                <input type="email" placeholder="Email" required name="email" value={email} onChange={registerDataChange} readOnly />
              </div>
              <div className="signUpPassword">
                <input type="text" placeholder="Hobbies" required name="hobbies" value={hobbies} onChange={registerDataChange} />
              </div>
              <input type="submit" value="Update" className="signUpBtn" />
            </form>
            <button className="close-icon" onClick={toggleModal}>
              <CloseIcon />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GetAllData;