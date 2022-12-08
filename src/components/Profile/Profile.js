/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from "react";
import "./Profile.css";
import axios from "axios";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import {
  BACKEND_BASE_URL,
  SESSION_STORAGE_KEY,
} from "../../constants/Constants";


function Profile() {
  const navigate = useNavigate();
  const baseURL = BACKEND_BASE_URL;
  const path = "/profile";
  const fullUrl = baseURL.concat(path);

  let firstName = "";
  let lastName;
  let emailId;
  let contact;
  let street;
  let zipCode;

  const [profile, setprofile] = useState({
    ID: "",
    FIRST_NAME: "",
    LAST_NAME: "",
    EMAIL_ID: "",
    CONTACT: "",
    STREET: "",
    CITY: "",
    STATE: "",
    ZIP_CODE: "",
    COUNTRY: "",
    ADDRESS_ID: "",
  });
  // Image uplaod config

 
  // const classes = useStyles();
  // State to store image file
  const [file, setFile] = useState();
  async function handleFile(e) {
    setFile(URL.createObjectURL(e.target.files[0]));
  }

  // Functinality for Save button
  const handleSave = async () => {
    axios
      .post(fullUrl, {
        id: profile.ID, //   change to dynamic once connection is done
        firstname: profile.FIRST_NAME,
        lastname: profile.LAST_NAME,
        contact: profile.CONTACT,
        street: profile.STREET,
        city: profile.CITY,
        state: profile.STATE,
        country: profile.COUNTRY,
        zipcode: profile.ZIP_CODE,
        address_id: profile.ADDRESS_ID,
      })
      .then(() => {
        // alert("Saved Successfully");
      });
  };
  const handleHistory = async () => {
    const obj = {
      id: profile.ID,
    };
    navigate("/coupon-history", {
      state: obj,
    });
  };

  useEffect(() => {
    const { userId } = JSON.parse(localStorage.getItem(SESSION_STORAGE_KEY));

    axios
      .get(fullUrl, {
        params: {
          id: userId,
        },
      })
      .then((res) => {
        firstName = res.data.FIRST_NAME;
        lastName = res.data.LAST_NAME;
        emailId = res.data.EMAIL_ID;
        contact = res.data.CONTACT;
        street = res.data.STREET;
        zipCode = res.data.ZIPCODE;
        let updatedValue = {};

        updatedValue = {
          ID: res.data.ID,
          FIRST_NAME: res.data.FIRST_NAME,
          LAST_NAME: res.data.LAST_NAME,
          EMAIL_ID: emailId,
          CONTACT: contact,
          STREET: street,
          CITY: res.data.CITY,
          STATE: res.data.STATE,
          COUNTRY: res.data.COUNTRY,
          ZIP_CODE: zipCode,
          ADDRESSS_ID: res.data.ADDRESSS_ID,
        };
        setprofile((item) => ({
          ...item,
          ...updatedValue,
        }));
      });
  }, []);

  return (
    <Box className="mainbox">
      <div className="main2">
        <div className="profile1">
          <div className="photo">
            <div className="avatar">
              <Avatar
                className="avatar"
                alt="Remy Sharp"
                src={file}
                sx={{ width: "inherit", height: 200, color: "darkgrey" }}
                variant="square"
              />
            </div>
            <div className="upload">
              
                <Button
                  className="button2"
                  variant="contained"
                  component="label"
                  sx={{
                    ":hover": { backgroundColor: "#d11aff" },
                    backgroundColor: "#3C286D",
                    width: "inherit",
                  }}
                >
                  Upload
                  <input
                    hidden
                    accept="image/*"
                    multiple
                    type="file"
                    onChange={handleFile}
                  />
                </Button>
            
            </div>
            <div className="history">
              <Button
                sx={{ width: "inherit", backgroundColor: "#3C286D" }}
                onClick={handleHistory}
                variant="contained"
                component="label"
              >
                History
              </Button>
            </div>
          </div>
        </div>

        <div className="profile2">
          <label className="perinfo">Personal Information</label>
          <div className="profile21">
            <div className="fullname1">
              <label className="fullname11">First Name</label>
              <TextField
                 className="fullname12"
                size="small"
                style={{ width:350 }}
                onChange={(e) => {
                  setprofile({ ...profile, FIRST_NAME: e.target.value });
                }}
                value={profile.FIRST_NAME}
              />
            </div>
            <div className="fullname1">
              <label className="fullname11">Last Name</label>
              <TextField
                className="fullname12"
                type="text"
                size="small"
                style={{ width: 350 }}
                onChange={(e) => {
                  setprofile({ ...profile, LAST_NAME: e.target.value });
                }}
                value={profile.LAST_NAME}
              />
            </div>
            <div className="fullname1">
              <label className="fullname11">Contact Nos</label>
              <TextField
                className="fullname12"
                type="number"
                size="small"
                style={{ width: 350 }}
                onChange={(e) =>
                  setprofile({ ...profile, CONTACT: e.target.value })
                }
                value={profile.CONTACT}
              />
            </div>
            <div className="fullname1">
              <label className="fullname11">Email</label>
              <TextField
                className="fullname12"
                type="email"
                size="small"
                style={{ width: 350 }}
                onChange={(e) =>
                  setprofile({ ...profile, EMAIL_ID: e.target.value })
                }
                value={profile.EMAIL_ID}
              />
            </div>
          </div>
          <label className="perinfo">Address</label>
          <div className="profile22">
            <div className="fullname1">
              <label className="fullname11">Street</label>
              <TextField
                className="fullname12"
                size="small"
                style={{ width: 350 }}
                onChange={(e) =>
                  setprofile({ ...profile, STREET: e.target.value })
                }
                value={profile.STREET}
              />
            </div>
            <div className="fullname1">
              <label className="fullname11">City</label>
              <TextField
                className="fullname12"
                size="small"
                style={{ width: 350 }}
                onChange={(e) =>
                  setprofile({ ...profile, CITY: e.target.value })
                }
                value={profile.CITY}
              />
            </div>
            <div className="fullname1">
              <label className="fullname11">State</label>
              <TextField
                className="fullname12"
                size="small"
                style={{ width: 350 }}
                onChange={(e) =>
                  setprofile({ ...profile, STATE: e.target.value })
                }
                value={profile.STATE}
              />
            </div>
            <div className="fullname1">
              <label className="fullname11">Zip Code</label>
              <TextField
                className="fullname12"
                type="number"
                size="small"
                style={{ width: 350 }}
                onChange={(e) =>
                  setprofile({ ...profile, ZIP_CODE: e.target.value })
                }
                value={profile.ZIP_CODE}
              />
            </div>
            <div className="fullname1">
              <label className="fullname11">Country</label>
              <TextField
                className="fullname12"
                size="small"
                style={{ width: 350 }}
                onChange={(e) =>
                  setprofile({ ...profile, ZIP_CODE: e.target.value })
                }
                value={profile.COUNTRY}
              />
            </div>
          </div>

          <div>
            <Button
              sx={{
                alignSelf: "center",
                margin: 3,
                width: 200,
                backgroundColor: "#3C286D",
              }}
              onClick={handleSave}
              variant="contained"
              component="label"
            >
              Save
            </Button>
          </div>
        </div>
      </div>
    </Box>
  );
}

export default Profile;
