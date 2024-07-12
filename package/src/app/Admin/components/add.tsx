import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import isEqual from 'lodash/isEqual';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { baselightTheme } from '@/utils/theme/DefaultColors';
import withAuth from '@/utils/withAuth';
import { BorderBottom, PlusOneRounded } from '@mui/icons-material';
import { Typography } from '@mui/material';
import { drop } from 'lodash';

type Props = {
    token: string | undefined;
    entityType: string;
    title?: string;
    // Other props...
    buttonType: number;
};

// Fixed to use the correct dependency


const Styles = {
  
    overlayWindow: {
       borderRadius: '45px',
    },
    jobbuttons: {
      display: 'flex',
      position: 'fixed',
      left: '75%',
      bottom: '3.25%',
      backgroundColor: baselightTheme.palette.primary.main,
      color: '#fff',
      borderRadius: '60%',
      paddingBottom: '13px',
      border: '1px solid rgba(0,0,0,0.95)',
        zIndex: 1000,
        boxShadow: "inset 0px -1px 8px 1px rgba(0,0,0,0.75), 0px 3px 2px 0px rgba(0,0,0,0.75)",


   },
};

function AddForm({ title, buttonType, entityType, token, ...rest }: Props) {
    const [open, setOpen] = React.useState(false);



    
    
    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        
        // Collect form data
        const customerData = {
            customer: {
                name: (document.getElementById('name') as HTMLInputElement).value,
                email: (document.getElementById('email') as HTMLInputElement).value,
                phone: (document.getElementById('password') as HTMLInputElement).value,
                address: (document.getElementById('address') as HTMLInputElement).value,
            }
        };
    
        const jsonCustomer = JSON.stringify(customerData);
        
        const apiUrl = 'http://127.0.0.1:3000/api/v1/' + entityType;
    
        if (!customerData.customer.name || !customerData.customer.email || !customerData.customer.address ||  !customerData.customer.phone) {
            console.error('Please fill in all fields.');
            return; // Stop the form submission
        }
        
       
        
            // Log the customer data being sent
            console.log('Sending customer data:', jsonCustomer);
        
            try {
                // Make the API call
                const response = await axios.post(`http://127.0.0.1:3000/api/v1/${entityType}`, jsonCustomer, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });
        
                // Check for a successful response (status code 200 or 201)
                if (response.status === 200 || response.status === 201) {
                    // Log the successful creation
                    console.log(`${entityType} created successfully:`, response.data);
                    
                    // Alert the user of the successful creation
                    alert(`${response.data.data.attributes.name} ${customerData.customer.name} was created successfully`);
        
                    // Close the dialog
                    handleClose();
                } else {
                    // If the status code is not successful, throw an error
                    throw new Error(`Failed to create ${entityType}. Status code: ${response.status}`);
                }
            } catch (error) {
                // Log any error that occurs during the API call or status code check
                console.error(`Error creating ${entityType}:`, error);
            }
        };


    return (
        
        <React.Fragment>
            {buttonType === 1 && <Button sx={Styles.jobbuttons} color='secondary' variant='outlined' onClick={handleClickOpen}><Typography variant='h2'>+</Typography></Button>}
            {/* Handle other button types as needed */}
            <Dialog style={Styles.overlayWindow} open={open} onClose={handleClose}>
                <form onSubmit={handleSubmit}>
                    <DialogTitle style={{display:'flex', justifyContent:'center'}}>{title} {entityType}
                    </DialogTitle>
                    <DialogContent>
                        {Object.entries(rest).map(([propName, propValue]) => (
                            <TextField
                                key={propName}
                                margin="dense"
                                id={propName}
                                label={propName.charAt(0).toUpperCase() + propName.slice(1)}
                                type="text"
                                fullWidth
                                variant="outlined"
                                defaultValue={String(propValue)}
                            />
                        ))}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button type="submit">Save</Button>                    </DialogActions>
                </form>
            </Dialog>
        </React.Fragment>
    );
};

export default withAuth(AddForm);
