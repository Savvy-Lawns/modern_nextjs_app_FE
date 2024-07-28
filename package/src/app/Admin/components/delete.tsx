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
import { baselightTheme } from '@/utils/theme/DefaultColors';

type Props = {
    entityId: number | string;
    entityType: string;
    title?: string;
    token: string | undefined;
    entityName: string;
    
    
    
};

const DeleteButton = ({ title, entityName,  entityType, entityId, token, ...rest }: Props) => {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleDelete = async (event: React.FormEvent) => {
        event.preventDefault();
    
        
        const entity = entityType.slice(0, -1);
    
        const apiUrl = `http://127.0.0.1:3000/api/v1/${entityType}/${entityId}`;
    
        try {
            // Ensure the data is nested under the 'service' key    
            const response = await axios.delete(apiUrl,  {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
    
            if (response.status === 200 || response.status === 201 || response.status === 204) {
                alert(`${entityName} Deleted successfully`);
                console.log(`${entityName} Deleted successfully`);
                handleClose();
                window.location.href = `/Admin/${entityType}`;
            } else {
                throw new Error(`Failed to delete ${entityType}. Status code: ${response.status}`);
            }
        } catch (error) {
            console.error(`Error deleting ${entityType}:`, error);
        }
    };

    return (
        <React.Fragment>
            <Button sx={Styles.deleteButton} color='error' variant='outlined' onClick={handleClickOpen}><Typography variant='subtitle1'>Delete</Typography></Button>
            <Dialog open={open} onClose={handleClose}>
                
                    
                   <DialogContent>
                        <Typography variant='h4'>Are you sure you want to delete {entityName}?</Typography>
                   </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button style={{color: baselightTheme.palette.error.main}} onClick={handleDelete}>Delete</Button>
                    </DialogActions>
                
            </Dialog>
        </React.Fragment>
    );
};

export default withAuth(DeleteButton);

const Styles = {
    deleteButton: {
       
        
        backgroundColor: baselightTheme.palette.error.main,
        color: '#fff',
        paddingBottom: '8px',
        
        
        textBorder: '1 solid rbga(0,0,0,0.45)',
        borderRadius: '15px',
        '&:hover': {
            backgroundColor: baselightTheme.palette.error.dark,
    },
    
}
}