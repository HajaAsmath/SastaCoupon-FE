// import { useState, useEffect } from 'react';
// import './Profile.css';
// import React from "react";
// import Header from "../header/Header";
// import Footer from "../footer/Footer";
// import axios from "axios";
// import Box from '@mui/material/Box';
// import Avatar from '@mui/material/Avatar';
// import TextField from '@mui/material/TextField';
// import Button from '@mui/material/Button';

// function Profile() {
//   let id = 1;
//   let first_name = 'Milind';
//   let last_name;
//   let email_id;
//   let contact;
//   let street;
//   let zip_code;
//   const [profile, setprofile] = useState({
//     ID: '',
//     FIRST_NAME: '',
//     LAST_NAME: '',
//     EMAIL_ID: '',
//     CONTACT: '',
//     STREET: '',
//     CITY: '',
//     STATE: '',
//     ZIP_CODE: '',
//     COUNTRY: '',
//     ADDRESS_ID:'',
//   });
//   //State to store image file
//   const [file, setFile] = useState();
//   function handleFile(e) {
//     console.log(e.target.files);
//     setFile(URL.createObjectURL(e.target.files[0]));
//   }

//   //Functinality for Save button
//   async function handleSave() {
//     // console.log(profile);
//     axios.post(`http://127.0.0.1:1347/profile`, {
//       id: id,                                        //   change to dynamic once connection is done
//       firstname: profile.FIRST_NAME,
//       lastname:profile.LAST_NAME,
//       contact: profile.CONTACT,
//       street:profile.STREET,
//       city:profile.CITY,
//       state:profile.STATE,
//       country:profile.COUNTRY,
//       zipcode:profile.ZIP_CODE,
//       address_id:profile.ADDRESS_ID,
//     })
//       .then((response) => {
//         alert("Saved Successfully")
//         console.log("hello", response);
//       });

//   }

//   useEffect(() => {
//     axios
//       .get('http://127.0.0.1:1347/profile?',{
//       params:{
//         id:id
//       }
//       })
//       .then(
//         (res) => {
          
//           first_name = res.data.FIRST_NAME;
//           last_name = res.data.LAST_NAME;
//           email_id = res.data.EMAIL_ID;
//           contact = res.data.CONTACT;
//           street = res.data.STREET;
//           zip_code = res.data.ZIPCODE;
//           let updatedValue = {};
//           console.log(res.data);
//           console.log(zip_code);
//           let fullname = first_name.concat(" ", last_name);
//           updatedValue = {
//             "ID": res.data.ID,
//             "FIRST_NAME": res.data.FIRST_NAME,
//             "LAST_NAME": res.data.LAST_NAME,
//             "EMAIL_ID": email_id,
//             "CONTACT": contact,
//             "STREET": street,
//             "CITY": res.data.CITY,
//             "STATE": res.data.STATE,
//             "COUNTRY": res.data.COUNTRY,
//             "ZIP_CODE": zip_code,
//             "ADDRESSS_ID":res.data.ADDRESSS_ID,
//           }
//           setprofile(item => ({
//             ...item,
//             ...updatedValue
//           }));
         
//         }

//       )
//   }, []);

//   return (

//     <Box className='mainbox'>
//       <div className='main2'>
//         <div className='profile1'>

//           <div className='photo'>
//             <Avatar alt="Remy Sharp" src={file}
//               sx={{ width: 190, height: 190, margin: 3, color: 'darkgrey' }}
//               variant="square" />
//             <Button className='button2' variant="contained" component="label" 
//             sx={{ ":hover":{ backgroundColor:'#d11aff'},backgroundColor:'#3C286D' , borderRadius:25 ,}}>
//               Upload
//               <input hidden accept="image/*" multiple type="file"
//                 onChange={handleFile} />
//             </Button>
//           </div>

//           <button className='button1'>HISTORY</button>

//         </div>
//         <div className='profile2'>
//           <label className='perinfo'>Personal Information</label>
//           <div className='profile21'>
//             <div className='fullname1'>

//               <label className='fullname11'>Full Name</label>
//               <TextField className='fullname12' size="small" style={{ width: 350 }}
//                 onChange={e => {
//                   setprofile({ ...profile, FIRST_NAME: e.target.value })
//                   console.log(profile)
//                 }}
//                 value={profile.FIRST_NAME}>
//               </TextField>

//             </div>
//             <div className='fullname1'>

//               <label className='fullname11'>Last Name</label>
//               <TextField className='fullname12' type='text'size="small" style={{ width: 350 }}
//                 onChange={e => {
//                   setprofile({ ...profile, LAST_NAME: e.target.value })
//                   console.log(profile)
//                 }}
//                 value={profile.LAST_NAME}>
//               </TextField>

//             </div>
//             <div className='fullname1'>

//               <label className='fullname11'>Contact Nos</label>
//               <TextField className='fullname12' type='number' size="small" style={{ width: 350 }}
//                 onChange={e => setprofile({ ...profile, CONTACT: e.target.value })}
//                 value={profile.CONTACT}></TextField>

//             </div>
//             <div className='fullname1'>
//               <label className='fullname11'>Email</label>
//               <TextField className='fullname12' type='email' size="small" style={{ width: 350 }}
//                 onChange={e => setprofile({ ...profile, EMAIL_ID: e.target.value })}
//                 value={profile.EMAIL_ID}></TextField>
//             </div>
//           </div>
//           <label className='perinfo1' >Address</label>
//           <div className='profile22'>
//             <div className='fullname'>

//               <label className='fullname11'>Street</label>
//               <TextField className='fullname12' size="small" style={{ width: 350 }}
//                 onChange={e => setprofile({ ...profile, STREET: e.target.value })}
//                 value={profile.STREET}>
//               </TextField>
//             </div>
//             <div className='fullname'>
//               <label className='fullname11'>City</label>
//               <TextField className='fullname12' size="small" style={{ width: 350 }}
//                 onChange={e => setprofile({ ...profile, CITY: e.target.value })}
//                 value={profile.CITY}>
//               </TextField>


//             </div>
//             <div className='fullname'>
//               <label className='fullname11'>State</label>
//               <TextField className='fullname12' size="small" style={{ width: 350 }}
//                 onChange={e => setprofile({ ...profile, STATE: e.target.value })}
//                 value={profile.STATE}>
//               </TextField>
//             </div>
//             <div className='fullname'>
//               <label className='fullname11'>Zip Code</label>
//               <TextField className='fullname12' type='number' size="small" style={{ width: 350 }}
//                 onChange={e => setprofile({ ...profile, ZIP_CODE: e.target.value })}
//                 value={profile.ZIP_CODE}>
//               </TextField>
//             </div>
//             <div className='fullname'>

//               <label className='fullname11'>Country</label>
//               <TextField className='fullname12' size="small" style={{ width: 350 }}
//                 onChange={e => setprofile({ ...profile, ZIP_CODE: e.target.value })}
//                 value={profile.COUNTRY}>
//               </TextField>

//             </div>
//           </div>

//           <button className='button' onClick={handleSave} >Save</button>
//           {/* <Button className='button' size = "small" variant="contained" 
//            onClick={handleSave}>Save</Button> */}
//         </div>
//       </div>

//     </Box>

//   );
// }

// export default Profile;