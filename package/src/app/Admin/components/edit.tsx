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
import useFetchUsers from '../users/users';
import { useUserContext } from './userContext';

type Props = Partial<{
    token: string;
    entityType: string;
    entityId: string;
    title: string;
    buttonType: number;
    name: string;
    username: string;
    phone_number: string;
    email: string;
    role: number;
    measurement_unit: string;
    price: number;
    notes: string;
    service_type: string;
    address: string;
    cost: number;
    id: number;
   
    
    
}>;

function useDeepCompareEffect(callback: () => void, dependencies: {}[] | undefined) {
    const currentDependenciesRef = useRef<{}[] | undefined>();

    if (!isEqual(currentDependenciesRef.current, dependencies)) {
        currentDependenciesRef.current = dependencies;
    }

    useEffect(callback, [currentDependenciesRef.current]);
}

function EditForm({ title, buttonType, entityId, entityType, token,  ...rest }: Props) {
    const [open, setOpen] = React.useState(false);
    const [formData, setFormData] = useState<{ [key: string]: string | number }>({});
    const {User, setUser} = useUserContext();
    const value = 'Refreshing...';
    const value2 = '';
      const apiURL =  process.env.NEXT_PUBLIC_API_URL
// const apiURL =  'http://127.0.0.1:3000/api/v1'

    const entity = entityType?.slice(0, -1);
    useDeepCompareEffect(() => {
        return setFormData({ ...rest });
    }, [rest]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        
        const  {name, value}  = event.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value.toString(),
        }));
    };
    
    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formDataObj = new FormData();
      
        
        // Append updated form data to formDataObj
        Object.entries(formData).forEach(([key, value]) => {
                formDataObj.set(key, typeof value === 'number' ? value.toString() : value);
           
        });
    
        // Convert formDataObj to JSON
        const formJson = Object.fromEntries(Array.from(formDataObj.entries()));


        try {
            const response = await axios.patch(`${apiURL}/${entityType}/${entityId}`, formJson, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            
           // console.log(entityType, ' updated:', response.data.data);
            alert(`${entity} was updated successfully`);
            window.location.href = `/Admin/${entityType}`;
            
            
            
            
            
            
        } catch (error) {
            alert(`Failed to update ${entity}. Status code: ${error}`);
            // Handle error...
        }
    };
    return (
        
        <React.Fragment>
            {buttonType === 1 && <Button sx={Styles.jobbuttons} color='secondary' variant='outlined' onClick={handleClickOpen}>Edit</Button>}
            {/* Handle other button types as needed */}
            <Dialog style={Styles.overlayWindow} open={open} onClose={handleClose}>
                <form onSubmit={handleSubmit}>
                    <DialogTitle style={{display:'flex', justifyContent:'center'}}>{title}</DialogTitle>
                    <DialogContent>
                        {Object.entries(rest).map(([propName, propValue]) => (
                            <TextField
                                key={propName}
                                margin="dense"
                                id={propName}
                                name={propName}
                                label={propName.charAt(0).toUpperCase() + propName.slice(1)}
                                type="text"
                                fullWidth
                                variant="outlined"
                                defaultValue={String(propValue)}
                                onChange={handleChange} // Convert propValue to a string
                            
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
}
export default withAuth(EditForm);

const Styles = {
  
    overlayWindow: {
       borderRadius: '45px',
    },
    jobbuttons: {
      marginTop: '10px',
      backgroundColor: baselightTheme.palette.secondary.light,
      color: baselightTheme.palette.secondary.contrastText,
      borderRadius: '15px',
   },
};