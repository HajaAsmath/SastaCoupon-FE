import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

import "./UploadCoupon.css";
import { useEffect, useRef, useState } from "react";
import { Typography } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import axios from "../../common/axiosInstance";
import UploadStatusDialog from "../Dialog/UploadStatusDialog";

export default function UploadCoupon() {
  const [imageList, setImageList] = useState([]);
  const [images, setImages] = useState(new Map());
  const [dialogOpen, setDialogOpen] = useState(false);
  const [message, setMessage] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isUploadFailed, setIsUploadFailed] = useState(false);
  const today = useRef(new Date());
  const tomorrow = useRef(today.current.setDate(today.current.getDate() + 1));

  useEffect(() => {
    const fetchImages = async () => {
      await axios.get("/images").then((res) => {
        if (res.status === 200) {
          const imagedata = new Map(Object.entries(res.data));
          setImages(imagedata);
          setImageList(imagedata.get("Default"));
        }
      });
    };
    fetchImages();
  }, []);

  const handleChange = (e) => {
    setImageList(images.get(e.target.value));
  };

  const [formValues, setFormValues] = useState({
    couponName: {
      value: "",
      error: false,
      errorMessage: "Error - Enter a coupon name",
    },
    discription: {
      value: "",
      error: false,
      errorMessage: "Error - Enter a discription",
    },
    couponCode: {
      value: "",
      error: false,
      errorMessage: "Error - Enter the coupon code",
    },
    couponImage: {
      value: "",
      error: false,
      errorMessage: "Error - Select a coupon image",
    },
    denomination: {
      value: "",
      error: false,
      errorMessage: "Error - Select a denomination",
    },
    expiryDate: {
      value: tomorrow.current,
      error: false,
      errorMessage: "Error - Select the expiry date",
    },
  });

  const handleFormChange = (e) => {
    let name;
    let value;
    if (e.target.name === "couponImage") {
      name = e.target.name;
      value = e.target.src;
    } else {
      ({ name, value } = e.target);
    }
    setFormValues({
      ...formValues,
      [name]: {
        ...formValues[name],
        value,
      },
    });
  };

  const handleDenominationClick = (e) => {
    if (e.target.type === "button") {
      document.querySelectorAll("#denom").forEach((ele) => {
        ele.classList.remove("active");
      });
      e.target.classList.add("active");
    }
  };

  const handleOnFocus = () => {
    document.querySelectorAll("#denom").forEach((e) => {
      e.classList.remove("active");
    });
  };

  const setErrorForField = (error, newFormValues, currentField) => ({
    ...newFormValues,
    [currentField]: {
      ...newFormValues[currentField],
      error,
    },
  });

  const validateForm = () => {
    const formFields = Object.keys(formValues);
    let newFormValues = { ...formValues };
    let isValid = true;

    for (let index = 0; index < formFields.length; index += 1) {
      const currentField = formFields[index];
      const currentValue = formValues[currentField].value;

      if (currentValue === "") {
        isValid = false;
        newFormValues = setErrorForField(true, newFormValues, currentField);
      } else {
        newFormValues = setErrorForField(false, newFormValues, currentField);
      }
    }
    setFormValues(newFormValues);

    return isValid;
  };

  const createUploadCouponObject = () => ({
    couponName: formValues.couponName.value,
    couponDiscription: formValues.discription.value,
    couponCode: formValues.couponCode.value,
    couponImage: formValues.couponImage.value,
    denomination: formValues.denomination.value,
    expiryDate: formValues.expiryDate.value,
  });

  const handleOnSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (validateForm()) {
      axios
        .post("/uploadCoupon", createUploadCouponObject())
        .then((res) => {
          if (res.status === 200) {
            setMessage("Coupon Uploaded Successfully");
            setDialogOpen(true);
            setIsLoading(false);
            setIsUploadFailed(false);
          }
        })
        .catch((err) => {
          if (err.response.data) {
            setMessage(`Error uploading coupon: ${err.response.data}`);
          } else {
            setMessage("Error uploading coupon");
          }
          setDialogOpen(true);
          setIsLoading(false);
          setIsUploadFailed(true);
        });
    } else {
      setIsLoading(false);
    }
  };

  const handleImageClick = (e) => {
    document.querySelectorAll(".image-container").forEach((ele) => {
      ele.classList.remove("active");
    });
    e.target.parentNode.classList.add("active");
  };

  return (
    <Box className="upload-coupon">
      <UploadStatusDialog
        open={dialogOpen}
        setOpen={setDialogOpen}
        message={message}
        isUploadFailed={isUploadFailed}
      />
      <p id="heading">Upload your coupon</p>
      <form noValidate onSubmit={handleOnSubmit}>
        <TextField
          sx={{ width: "40%", minWidth: 300 }}
          onChange={handleFormChange}
          margin="normal"
          name="couponName"
          id="outlined-basic"
          label="Enter Coupon Name"
          variant="outlined"
          error={formValues.couponName.error}
          helperText={
            formValues.couponName.error && formValues.couponName.errorMessage
          }
        />
        <TextField
          sx={{ width: "40%", minWidth: 300 }}
          onChange={handleFormChange}
          margin="normal"
          name="discription"
          multiline
          id="outlined-basic"
          rows={4}
          label="Enter discription"
          variant="outlined"
          error={formValues.discription.error}
          helperText={
            formValues.discription.error && formValues.discription.errorMessage
          }
        />
        <TextField
          sx={{ width: "40%", minWidth: 300 }}
          onChange={handleFormChange}
          margin="normal"
          name="couponCode"
          id="outlined-basic"
          label="Enter Coupon Code"
          variant="outlined"
          error={formValues.couponCode.error}
          helperText={
            formValues.couponCode.error && formValues.couponCode.errorMessage
          }
        />
        <FormControl sx={{ width: "40%", minWidth: 300 }} margin="normal">
          <InputLabel id="select-label">Choose a image category</InputLabel>
          <Select
            labelId="select-label"
            id="demo-simple-select"
            label="Choose a image category"
            onChange={handleChange}
          >
            {[...images.keys()].map((item) => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Typography
          component="label"
          color="error"
          className={formValues.couponImage.error ? "" : "hide"}
        >
          Error - Select a coupon image
        </Typography>
        <FormControl
          className="image-list"
          sx={{ margin: "20px 0px", flexDirection: "row" }}
        >
          {[...imageList.values()].map((image) => (
            <Box className="image-container">
              <img
                name="couponImage"
                value={image}
                onClick={(e) => {
                  handleFormChange(e);
                  handleImageClick(e);
                }}
                key={image}
                src={image}
                alt="coupon"
              />
            </Box>
          ))}
        </FormControl>
        <span>SELECT A DENOMINATION FOR YOUR COUPON</span>
        <Typography
          component="label"
          color="error"
          className={formValues.denomination.error ? "" : "hide"}
        >
          Error - Select a denomination
        </Typography>
        <Box className="denomination">
          <Button
            name="denomination"
            id="denom"
            onClick={(e) => {
              handleFormChange(e);
              handleDenominationClick(e);
            }}
            value="10"
            variant="outlined"
            size="large"
          >
            10 Credits
          </Button>
          <Button
            name="denomination"
            id="denom"
            onClick={(e) => {
              handleFormChange(e);
              handleDenominationClick(e);
            }}
            value="20"
            variant="outlined"
            size="large"
          >
            20 Credits
          </Button>
          <Button
            name="denomination"
            id="denom"
            onClick={(e) => {
              handleFormChange(e);
              handleDenominationClick(e);
            }}
            value="30"
            variant="outlined"
            size="large"
          >
            30 Credits
          </Button>
          <TextField
            name="denomination"
            type="number"
            onChange={handleFormChange}
            onFocus={handleOnFocus}
            id="outlined-basic"
            label="Enter Credit Amount"
            variant="outlined"
            size="small"
          />
        </Box>
        <span>SELECT EXPIRY DATE OF THE COUPON</span>
        <DesktopDatePicker
          disablePast
          label="Expiry Date"
          inputFormat="DD/MM/YYYY"
          value={formValues.expiryDate.value}
          minDate={tomorrow.current}
          onChange={(newValue) => {
            setFormValues({
              ...formValues,
              expiryDate: {
                ...formValues.expiryDate,
                value: newValue,
              },
            });
          }}
          // eslint-disable-next-line react/jsx-props-no-spreading
          renderInput={(params) => <TextField {...params} />}
        />

        <LoadingButton
          loading={isLoading}
          type="submit"
          sx={{ backgroundColor: "#3C286D", margin: "30px 0px" }}
          size="large"
          variant="contained"
        >
          Upload
        </LoadingButton>
      </form>
    </Box>
  );
}
