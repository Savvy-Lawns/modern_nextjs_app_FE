"use client";
import React, {  createContext, useContext, useState,Children, useEffect, Key } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import { nth, set } from 'lodash';
import { BorderBottom, Padding } from '@mui/icons-material';
import { Button, colors } from '@mui/material';
import { text } from 'stream/consumers';
import { baselightTheme } from '@/utils/theme/DefaultColors';
import EditForm from './edit';
import CustomTextField from '@/app/(DashboardLayout)/components/forms/theme-elements/CustomTextField';
import ViewMileage from './userMileage';
import ViewHours from './userHours';
import Cookie from 'js-cookie'; 
import useFetchUsers from '../users/users';

import { useUserContext } from './userContext'; 

type Props = {
  index: Key | null | undefined;
  
  id?: string;
  username?: string;
  phone?: string;
  email?: string;
  acctType?: number;
  mileage?: {
  miles?: number;
  created_at?: string;
  }[];
  hours?:{
    total_hours?: number;
    created_at?: string;
    }[];
  
  };

   
  const SelectedUser = () => {};
  const UserAccordion = ({
    id,
    username,
    phone,
    email,
    acctType,
    mileage,
    hours,    
  }: Props) => {
    
    
    const [open, setOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const { User, setUser } = useUserContext();
    const { users, loading, error } = useFetchUsers();
    

    useEffect(() => {
      setUser(users);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [users]);

    
    const handleOpen = (user: typeof User) => {
      setUser(user); // Update the selected user in context
      setOpen(true); // Open the overlay
    };
  const handleClose = () => setOpen(false);

  const filteredUsers = Array.isArray(User) ? User.filter((user) =>
    user.username?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.phone?.includes(searchQuery)
  ) : [];
  
  
  return (
    <div>
      <CustomTextField
        type="search"
        variant="outlined"
        fullWidth
        label="Search"
        mb='10'
        style={{ marginBottom: '20px' }}
        onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setSearchQuery(e.target.value)} // Update search query on input change
      />

  
{filteredUsers.map((user) => (
  
        <Accordion key={user.id}>
          <AccordionSummary
            style={styles.AccordionSummaryStyle}
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id={user.id!.toString()}
          >
            <Typography>{user.username}</Typography>
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
              {/* <ViewMileage mileage={user.mileage} />
              <ViewHours hours={user.hours} /> */}
            </Typography>
            <div style={styles.sidebyside}>
              <EditForm entityId={user.id ?? ''} entityType={'users'} title={`Edit User ${user.username}`} username={user.username} phone_number={user.phone} email={user.email} role={user.acctType}  buttonType={1} />
            </div>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}
export default UserAccordion;


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
