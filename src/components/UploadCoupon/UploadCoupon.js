import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

import "./UploadCoupon.css"
import { useEffect, useState } from 'react';
import axios from '../../common/axiosInstance';
import { Typography } from '@mui/material';
import UploadStatusDialog from '../Dialog/UploadStatusDialog';
import LoadingButton from '@mui/lab/LoadingButton';

export default function UploadCoupon(props) {

    const [imageList, setImageList] = useState([]);
    const [images, setImages] = useState(new Map());
    const [dialogOpen, setDialogOpen] = useState(false);
    const [message, setMessage] = useState();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchImages = async () => {
                await axios.get('/images').then((res) => {
                if(res.status === 200) {
                    const imagedata =  new Map(Object.entries(res.data))
                    setImages(imagedata);
                    setImageList(imagedata.get('Default'));
                }
            })
        }
        fetchImages(); 
    }, []);

    const handleChange = (e) => { 
        setImageList(images.get(e.target.value));
    }

    const [formValues, setFormValues] = useState({
        couponName: {
            value: '',
            error: false,
            errorMessage: 'Error - Enter a coupon name'
        },
        discription: {
            value: '',
            error: false,
            errorMessage: 'Error - Enter a discription'
        },
        couponCode: {
            value: '',
            error: false,
            errorMessage: 'Error - Enter the coupon code'
        },
        couponImage: {
            value: '',
            error: false,
            errorMessage: 'Error - Select a coupon image'
        },
        denomination: {
            value: '',
            error: false,
            errorMessage: 'Error - Select a denomination'
        },
        expiryDate: {
            value: new Date(),
            error: false,
            errorMessage: 'Error - Select the expiry date'
        }
    });

    const handleFormChange = (e) => {
        let name, value;
        if(e.target.name === 'couponImage') {
            name = e.target.name;
            value = e.target.src;
        } else {
            ({name, value} = e.target);
        }
        setFormValues({
        ...formValues, [name] : {
                ...formValues[name], value,
            }
        })
    }

    const handleDenominationClick = (e) => {
        if(e.target.type === 'button') {
            document.querySelectorAll('#denom').forEach(e => {
                e.classList.remove('active');
            })
            e.target.classList.add('active');
        }
    }

    const handleOnFocus = () => {
        document.querySelectorAll('#denom').forEach(e => {
            e.classList.remove('active');
        });
    }

    const handleOnSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        if(validateForm()) {
            axios.post('/uploadCoupon', createUploadCouponObject()).then((res) => {
                if(res.status === 200) {
                    setMessage('Coupon Uploaded Successfully');
                    setDialogOpen(true);
                    setIsLoading(false);
                } else {
                    setMessage('Error uploading coupon');
                    setDialogOpen(true);
                    setIsLoading(false);
                    throw new Error(res.status);
                }
            }).catch(err => {
                console.log(err);
            })
        }
    }

    const createUploadCouponObject = () => {
        return {
            couponName: formValues.couponName.value,
            couponDiscription: formValues.discription.value,
            couponCode: formValues.couponCode.value,
            couponImage: formValues.couponImage.value,
            denomination: formValues.denomination.value,
            expiryDate: formValues.expiryDate.value
        }
    }

    const validateForm = () => {
        const formFields = Object.keys(formValues);
        let newFormValues = {...formValues};
        let isValid = true;
    
        for (let index = 0; index < formFields.length; index++) {
          const currentField = formFields[index];
          const currentValue = formValues[currentField].value;
    
          if(currentValue === ''){
            isValid = false;
            newFormValues = setErrorForField(true, newFormValues, currentField);
          } else {
            newFormValues = setErrorForField(false, newFormValues, currentField);
          }
        }
        setFormValues(newFormValues);

        return isValid;
    }
 
    const setErrorForField = (error, newFormValues, currentField) => {
        return newFormValues = {
            ...newFormValues,
            [currentField]:{
              ...newFormValues[currentField],
              error:error
            }
        }
    }

    const handleImageClick = (e) => {
        document.querySelectorAll('.image-container').forEach(e => {
            e.classList.remove('active');
        });
        e.target.parentNode.classList.add('active')
    }

    return <Box className='upload-coupon'>
        <UploadStatusDialog open={dialogOpen} setOpen={setDialogOpen} message={message}/>
        <p id="heading">Upload your coupon</p>
        <form noValidate onSubmit={handleOnSubmit}>
        <TextField sx={{width: '40%', minWidth: 300}} onChange={handleFormChange} margin="normal" name="couponName" id="outlined-basic" label="Enter Coupon Name" variant="outlined" error={formValues.couponName.error} helperText={formValues.couponName.error && formValues.couponName.errorMessage}/>
        <TextField sx={{width: '40%', minWidth: 300}} onChange={handleFormChange} margin="normal" name="discription" multiline id="outlined-basic" rows={4} label="Enter discription" variant="outlined" error={formValues.discription.error} helperText={formValues.discription.error && formValues.discription.errorMessage}/>
        <TextField sx={{width: '40%', minWidth: 300}} onChange={handleFormChange} margin="normal" name="couponCode" id="outlined-basic" label="Enter Coupon Code" variant="outlined" error={formValues.couponCode.error} helperText={formValues.couponCode.error && formValues.couponCode.errorMessage}/>
        <FormControl sx={{width: '40%', minWidth: 300}} margin="normal">
            <InputLabel id="select-label">Choose a image category</InputLabel>
            <Select
                labelId="select-label"
                id="demo-simple-select"
                label="Choose a image category"
                defaultValue="Default"
                onChange={handleChange}
            >
                {[...images.keys()].map((item,key) => {
                    return <MenuItem key={key} value={item}>{item}</MenuItem>
                })}
            </Select>
        </FormControl>
        <Typography component='label' color='error' className={formValues.couponImage.error?'':'hide'}>Error - Select a coupon image</Typography>
        <FormControl  className="image-list" sx={{margin: '20px 0px', flexDirection: 'row'}}>
                {[...imageList.values()].map((image, key) => {
                    return <Box className="image-container"><img name='couponImage' value={image} onClick={(e) => {
                        handleFormChange(e);
                        handleImageClick(e);
                    }} key={key} src={image} alt="coupon"/></Box>
                })}
        </FormControl>
        <span>SELECT A DENOMINATION FOR YOUR COUPON</span>
        <Typography component='label' color='error' className={formValues.denomination.error?'':'hide'}>Error - Select a denomination</Typography>
        <Box className='denomination'>
            <Button name="denomination" id="denom" onClick={(e) => {
                handleFormChange(e);
                handleDenominationClick(e);
            }} value="10" variant="outlined" size="large">10 Credits</Button>
            <Button name="denomination" id="denom" onClick={(e) => {
                handleFormChange(e);
                handleDenominationClick(e);
            }}  value="20" variant="outlined" size="large">20 Credits</Button>
            <Button name="denomination" id="denom" onClick={(e) => {
                handleFormChange(e);
                handleDenominationClick(e);
            }}  value="30" variant="outlined" size="large">30 Credits</Button>
            <TextField name="denomination" type='number' onChange={handleFormChange} onFocus={handleOnFocus} id="outlined-basic" label="Enter Credit Amount" variant="outlined" size="small" />
        </Box>
        <span>SELECT EXPIRY DATE OF THE COUPON</span>
        <DesktopDatePicker
          disablePast
          label="Expiry Date"
          inputFormat="DD/MM/YYYY"
          value={formValues.expiryDate.value}
          onChange={(newValue) => {
              setFormValues({...formValues, expiryDate: {
                  ...formValues.expiryDate, value: newValue
              }})
          }}
          renderInput={(params) => <TextField {...params} />}
        />

        <LoadingButton type='submit' sx={{backgroundColor: '#3C286D', margin: '30px 0px'}} size='large' variant="contained">Upload</LoadingButton>
        </form>
    </Box>
}