"use client";
import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { Typography, Select, MenuItem, Button } from '@mui/material';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import CustomTextField from '@/app/(DashboardLayout)/components/forms/theme-elements/CustomTextField';
import { baselightTheme } from '@/utils/theme/DefaultColors';

// Assuming the rest of your imports and the UserAccordion component are defined above
type Props = {
    name?: JSX.Element;
    phone?: JSX.Element;
    email?: JSX.Element;
    acctType?: JSX.Element;
    mileage?: JSX.Element;
    hours?: JSX.Element;
  };

const EditOverlay = ({
    name,
  phone,
  email,
  acctType,
  mileage,
  hours,    
}: Props) => {
  // State to control the visibility of the overlay screen
  const [open, setOpen] = useState(false);

  // Function to toggle the overlay screen visibility
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      
      
      {/* Overlay Screen using DashboardCard */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="Edit User"
        aria-describedby="edit-user"
      >
        <Box sx={Styles.modalStyle}>
          <DashboardCard title="Edit User">
            {/* Your form or content for editing goes here */}
            <div>
            <Box mt="25px">
              <div>
                <Typography
                    variant="subtitle1"
                    fontWeight={600}
                    component="label"
                    htmlFor="name"
                    mb="5px"
                    >
                    Name:
                </Typography>
                <CustomTextField type="name" variant="outlined" label={name} fullWidth />
              </div>
              <div>
                <Typography
                    variant="subtitle1"
                    fontWeight={600}
                    component="label"
                    htmlFor="phone"
                    mb="5px"
                    >
                    Phone:
                </Typography>
                <CustomTextField type="phone" variant="outlined" label={phone} fullWidth />
              </div>
              <div>
                <Typography
                    variant="subtitle1"
                    fontWeight={600}
                    component="label"
                    htmlFor="email"
                    mb="5px"
                    >
                    Email:
                </Typography>
                <CustomTextField type="email" variant="outlined" label={email} fullWidth />
              </div>
              <div>
                <Typography
                    variant="subtitle1"
                    fontWeight={600}
                    component="label"
                    htmlFor="acctType"
                    mb="5px"
                >
                    Account Type:
                </Typography>
                <Select
                    labelId="acctType-label"
                    id="acctType"
                    fullWidth
                    variant="outlined"
                    defaultValue=""
                    displayEmpty
                >
                    <MenuItem value="" disabled>Select Account Type</MenuItem>
                    <MenuItem value="admin">Admin</MenuItem>
                    <MenuItem value="worker">Worker</MenuItem>
                </Select>
              </div>
              <div>
                <Typography
                    variant="subtitle1"
                    fontWeight={600}
                    component="label"
                    htmlFor="mileage"
                    mb="5px"
                    >
                    Mileage:
                </Typography>
                <CustomTextField type="mileage" variant="outlined" label={mileage} fullWidth />
              </div>
              <div>
                <Typography
                    variant="subtitle1"
                    fontWeight={600}
                    component="label"
                    htmlFor="email"
                    mb="5px"
                    >
                    Hours:
                </Typography>
                <CustomTextField type="hours" variant="outlined" label={hours} fullWidth />
              </div>

            </Box>
            <div style={Styles.sidebyside}>
          <Button sx={Styles.jobbuttons} color='secondary' variant='outlined' onClick={handleClose}>Submit</Button>
          <Button sx={Styles.jobbuttons} color='secondary' variant='outlined' onClick={handleClose}>Cancel</Button>

          </div>
            {/* Close button or similar to trigger handleClose */}
            </div>
          </DashboardCard>
        </Box>
      </Modal>
    </div>
  );
}

// Add styles for the modal
const Styles = {
    modalStyle:{
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
},
sidebyside: {
    display: 'flex',
    flexDirection: 'row' as const, // Fix applied here
    justifyContent: 'space-evenly',
    
},
jobbuttons: {
    marginTop: '10px',
    backgroundColor: baselightTheme.palette.secondary.light,
    color: baselightTheme.palette.secondary.contrastText,
    borderRadius: '15px',
 },
}

export default EditOverlay;