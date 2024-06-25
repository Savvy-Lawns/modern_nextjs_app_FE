"use client";
import React, {  createContext, useContext, useState,Children } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import { nth } from 'lodash';
import { BorderBottom, Padding } from '@mui/icons-material';
import { Button, colors } from '@mui/material';
import { text } from 'stream/consumers';
import { baselightTheme } from '@/utils/theme/DefaultColors';
import EditOverlay from '@/app/Admin/components/overlay';
import {  Users, active } from '@/app/Admin/users/users';
import EditForm from './edit';
import CustomTextField from '@/app/(DashboardLayout)/components/forms/theme-elements/CustomTextField';

type Props = {
  userId?: number;
    name?: string;
    phone?: string;
    email?: string;
    acctType?: number;
    mileage?: number;
    hours?: number;
  };

  const SelectedUser = () => {};
  const UserAccordion = ({
    userId,
    name,
    phone,
    email,
    acctType,
    mileage,
    hours,    
  }: Props) => {
    
   
    const [open, setOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    

  const handleOpen = (user:typeof  Users) => {
    // Set the selected user as an array
    setOpen(true); // Open the overlay
  };
  const handleClose = () => setOpen(false);

   const filteredUsers = Users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.phone.includes(searchQuery)
  );

  return (
    <div>
      <CustomTextField
        type="search"
        variant="outlined"
        fullWidth
        label="Search"
        mb='10'
        style={{ marginBottom: '20px' }}
        onChange={(e) => setSearchQuery(e.target.value)} // Update search query on input change
      />

  
      {filteredUsers.map((user) => (
        <Accordion key={user.userId}>
          <AccordionSummary
            style={styles.AccordionSummaryStyle}
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id={user.userId.toString()}
          >
            <Typography>{user.name}</Typography>
          </AccordionSummary>
          <AccordionDetails style={styles.AccordionDetailsStyle}>
            <Typography sx={styles.serviceStyle}>
            <div>
            <Typography variant='body1'>Phone:</Typography>
            <Typography variant='body2'>{user.phone}</Typography>
            </div>
            <div>
            <Typography variant='body1'>Email:</Typography>
            <Typography variant='body2'>{user.email}</Typography>
            </div>
            <div>
            <Typography variant='body1'>Account Type:</Typography>
            <Typography variant='body2'>{user.acctType}</Typography>
            </div>
            <div>
            <Typography variant='body1'>Mileage:</Typography>
            <Typography variant='body2'>{user.mileage?.toString()}</Typography>
            </div>
            <div>
            <Typography variant='body1'>Hours:</Typography>
            <Typography variant='body2'>{user.hours?.toString()}</Typography>
            </div>
            
            </Typography>
            <div style={styles.sidebyside}>
            <EditForm title={`Edit User ${user.name}`} name={user.name} phone={user.phone} email={user.email} acctType={user.acctType} mileage={user.mileage} hours={user.hours}/>
            </div>
          </AccordionDetails>
        </Accordion>
      ))}
       
      
       
    
    </div>
  );
}

export default UserAccordion;
console.log(Object.keys(UserAccordion))
export const activeSelection = SelectedUser

const styles: {
  AccordionDetailsStyle: React.CSSProperties;
  AccordionSummaryStyle: React.CSSProperties;
  sidebyside: React.CSSProperties & { flexDirection: 'row' };
  jobbuttons: React.CSSProperties;
  serviceStyle: React.CSSProperties;
} = {
 AccordionDetailsStyle: {
    backgroundColor: baselightTheme.palette.primary.main,
    color: baselightTheme.palette.primary.contrastText,
    borderRadius: '0px 0px 15px 15px',
    boxShadow: 'inset 0px -3px 5px 1px rgba(0,0,0,0.75)',
    marginTop: '-20px',
    paddingTop: '20px',
    marginBottom: '10px',
 },
 AccordionSummaryStyle: {
    backgroundColor: baselightTheme.palette.primary.light,
    color: baselightTheme.palette.primary.contrastText,
    borderRadius: '15px 15px 15px 15px',
    boxShadow: '0px 2px 2px 1px rgba(0,0,0,0.75)',
    border: ".5px solid rgba(0,0,0,0.75)",
    marginBottom: '10px',
 },
sidebyside: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    textAlign: 'center',
},
 jobbuttons: {
    marginTop: '10px',
    backgroundColor: baselightTheme.palette.secondary.light,
    color: baselightTheme.palette.secondary.contrastText,
    borderRadius: '15px',
 },
serviceStyle:{
    border: '.5px solid rgba(0,0,0,0.65)',
    marginBottom: '10px',
    borderRadius: '15px',
    padding: '8px 0px 10px 15px',
    backgroundColor: 'rgba(256,256,256,0.4)',
    boxShadow: 'inset 0px -2px 2px 1px rgba(0,0,0,0.75)',

},

};
