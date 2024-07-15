import React, { useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import withAuth from '@/utils/withAuth';
import { Typography } from '@mui/material';

type Props = {
    token: string | undefined;
    entityType: string;
    title?: string;
    buttonType: number;
    [key: string | number]: any; // To accept any other props dynamically
    
};

const AddForm = ({ title, buttonType, entityType, token, ...rest }: Props) => {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
    
        // Initialize a new FormData object
        const formDataObj = new FormData();
    
        // Dynamically construct the data object based on the form fields
        Object.keys(rest).forEach(key => {
            const inputElement = document.getElementById(key) as HTMLInputElement;
            if (inputElement) {
                // Append data to formDataObj instead of creating a simple object
                formDataObj.append(key, inputElement.value);
            }
        });
    
        // Convert formDataObj to JSON
        const formJson = Object.fromEntries(Array.from(formDataObj.entries()));
    
        const apiUrl = `http://127.0.0.1:3000/api/v1/${entityType}`;
    
        try {
            // Ensure the data is nested under the 'service' key
            const requestData = { service: formJson };
    
            const response = await axios.post(apiUrl, requestData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
    
            if (response.status === 200 || response.status === 201) {
                alert(`${entityType} created successfully`);
                handleClose();
            } else {
                throw new Error(`Failed to create ${entityType}. Status code: ${response.status}`);
            }
        } catch (error) {
            console.error(`Error creating ${entityType}:`, error);
        }
    };

    return (
        <React.Fragment>
            {buttonType === 1 && <Button color='secondary' variant='outlined' onClick={handleClickOpen}><Typography variant='h2'>+</Typography></Button>}
            <Dialog open={open} onClose={handleClose}>
                <form onSubmit={handleSubmit}>
                    <DialogTitle>{title} {entityType}</DialogTitle>
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
                        <Button type="submit">Save</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </React.Fragment>
    );
};

export default withAuth(AddForm);