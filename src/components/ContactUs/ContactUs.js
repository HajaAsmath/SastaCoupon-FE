import LoadingButton from "@mui/lab/LoadingButton";
import { Box, TextField, Typography } from "@mui/material";
import { useState } from "react";
import axios from "../../common/axiosInstance";
import ContactUsDialog from "../Dialog/ContactUsDialog";

export default function ContactUs() {
     const [loading, setLoading] = useState(false);
     const [dialogOpen, setDialogOpen] = useState(false);
     const [message, setMessage] = useState();

     const [formValues, setFormValues] = useState({
          customerName: {
              value: '',
              error: false,
              errorMessage: 'Error - Enter a name'
          },
          customerEmail: {
              value: '',
              error: false,
              errorMessage: 'Error - Enter a email'
          },
          orderId: {
               value: '',
          },
           message: {
               value: '',
               error: false,
               errorMessage: 'Error - Enter a message'
           },
     });

     const handleFormChange = (e) => {
          let {name, value} = e.target;
          setFormValues({
          ...formValues, [name] : {
                  ...formValues[name], value,
              }
          })
     }

     const handleOnSubmit = (e) => {
          e.preventDefault();
          setLoading(true);
          axios.post('/contactUs', createContactUsObject()).then((res) => {
               if(res.status === 200) {
                    setMessage('Form Uploaded Successfully. Team will repond to your query shortly');
                    setDialogOpen(true);
                    setLoading(false);
               }
          }).catch(err => {
               setLoading(false);
               if(err.response.data) {
                    setMessage('Error uploading form: '+err.response.data);
               } else {
                    setMessage('Error uploading form');
               }
               setDialogOpen(true);
          });
     }

     const createContactUsObject = () => {
          return {
               customerName: formValues.customerName.value,
               customerEmail: formValues.customerEmail.value,
               orderId: formValues.orderId.value,
               message: formValues.message.value
          }
     }


     return <Box className='contact-us' sx={{maxWidth: '50%', 
     minWidth: '340px', 
     boxShadow: '0px 0px 7px 2px rgba(0, 0, 0, 0.10)',
     borderRadius: '5px', margin: '50px auto', padding: '50px'}}>
          <ContactUsDialog open={dialogOpen} setOpen={setDialogOpen} message={message}/>
     <Typography sx={{color:'#3C286D', fontSize:28, fontWeight: 'bolder',fontFamily: 'patuaOne',
lineHeight: '138.6%',marginBottom: 3}}>Contact Us</Typography>
     <Box component='form' onSubmit={handleOnSubmit} sx={{display: 'flex', flexDirection: 'column',alignItems: 'center'}}>
        <TextField sx={{width: '40%', minWidth: 300}} onChange={handleFormChange} required margin="normal" name="customerName" id="outlined-basic" label="Name" variant="outlined" 
        error={formValues.customerName.error} 
        helperText={formValues.customerName.error && formValues.customerName.errorMessage}
        />
        <TextField sx={{width: '40%', minWidth: 300}} onChange={handleFormChange} required type='email' margin="normal" name="customerEmail" id="outlined-basic" label="Email" variant="outlined" 
        error={formValues.customerEmail.error} 
        helperText={formValues.customerEmail.error && formValues.customerEmail.errorMessage}
        />
        <TextField sx={{width: '40%', minWidth: 300}} onChange={handleFormChange} type='number' margin="normal" name="orderId" id="outlined-basic" label="Order Id" variant="outlined"/>
        <TextField sx={{width: '40%', minWidth: 300}} onChange={handleFormChange} required multiline rows={4} margin="normal" name="message" id="outlined-basic" label="Message" variant="outlined" 
        error={formValues.message.error} 
        helperText={formValues.message.error && formValues.message.errorMessage}
        />
        <LoadingButton loading={loading} type='submit' sx={{backgroundColor: '#3C286D', margin: '30px 0px'}} size='large' variant="contained">Submit</LoadingButton>
     </Box>
     </Box>
}