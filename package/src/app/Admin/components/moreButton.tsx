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
import { Accordion, AccordionSummary, Typography, AccordionDetails } from '@mui/material';
import DotsIcon from '@mui/icons-material/ExpandMore';
import zIndex from '@mui/material/styles/zIndex';
import { Style } from '@mui/icons-material';


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

function MoreButton({ title, buttonType, entityId, entityType, token,  ...rest }: Props) {
    const [open, setOpen] = React.useState(false);
    const [formData, setFormData] = useState<{ [key: string]: string | number }>({});
    const {User, setUser} = useUserContext();
    const value = 'Refreshing...';
    const value2 = '';

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
            const response = await axios.patch(`http://127.0.0.1:3000/api/v1/${entityType}/${entityId}`, formJson, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            
            console.log(entityType, ' updated:', response.data.data);
            alert(`${response.data.data.attributes.username} was updated successfully`);
            window.location.href = `/Admin/${entityType}`;
            
            
            
            
            
            
        } catch (error) {
            // Handle error...
        }
    };
    return (
        
        <React.Fragment>
            <Accordion  sx={{
                '&.MuiAccordion-root': {
                    boxShadow: 'none',
                    borderRadius: '15px',
                    border: `${baselightTheme.palette.secondary.main} .5px solid`,
                    marginTop: '10px',
                    backgroundColor: baselightTheme.palette.secondary.light,
                    width: '80%',
                    
                },
                '&.Mui-expanded': { 
                marginBottom: '5px', 
                paddingTop:'0px', 
                paddingBottom: '0px',
               
                
                borderRadius: '15px',
                textAlign: 'center',
                backgroundColor: baselightTheme.palette.secondary.light,
                marginTop: '10px',
                
                },
                '&.Mui-expanded:first-of-type': {
                    marginTop: '10px',
                    
                    textAlign: 'center',
                    backgroundColor: baselightTheme.palette.secondary.light,
                },
                }} >
            
            <AccordionSummary 
            expandIcon={<DotsIcon />} 
            sx={{
                '&.MuiAccordionSummary-content': 
                    {
                    marginBottom:'0px',
                    marginTop:'10px',
                    backgroundColor: baselightTheme.palette.secondary.light,
                },
                '&.MuiButtonBase-root':
                    {minHeight:'12px',
                        backgroundColor: baselightTheme.palette.secondary.light,
                        borderRadius: '15px',
                        
                        textAlign: 'center',
                        border: 'none', 
                    },
                '&.Mui-expanded': { 
                    backgroundColor: baselightTheme.palette.secondary.light,
                    paddingTop:'0px', 
                    paddingBottom: '0px',
                    minHeight: '12px', 
                    width:'90%', 
                    marginTop: '0px',
                    marginBottom:'-10px'
                    }}}>
              <Typography variant={'subtitle2'}>More...</Typography>
            </AccordionSummary>

            <AccordionDetails sx={{'&.MuiAccordionDetails-root': {padding: '8px 2px 8px', backgroundColor:baselightTheme.palette.secondary.light, borderRadius:'15px'} }}>
            <Button sx={ {color:'#fff'}} variant='contained' color='primary' style={Styles.jobbuttons}><Typography variant={'body2'}>Reschedule</Typography></Button>
            <Button color={'error'} variant='contained'><Typography variant={'body2'}>Delete</Typography></Button>
            </AccordionDetails>
            </Accordion>
                
        </React.Fragment>
    );
}
export default withAuth(MoreButton);

const Styles = {
  
    overlayWindow: {
       borderRadius: '45px',
    },
    jobbuttons: {
      marginBottom: '15px',
      
      
   },
   serviceAccordion: {
    width: '80%',
    borderRadius: '15px',
    textAlign: 'center',
    backgroundColor: baselightTheme.palette.secondary.light,
    marginTop: '10px',
    marginLeft: '20px',
    color: '#000',
    justifyContent: 'center',
    
  },
  serviceDayAccordion: {
    width: '100%',
    margin: '0px',
    
    color: '#fff',
    TextFormatOutlined: '#000',
    textalign: 'center',
  },
  serviceAccordionList:{
    width: '100%',
    margin: '0px',
    backgroundColor: baselightTheme.palette.primary.dark,
    marginBottom: '0px',
    color: '#fff',

  },
  serviceItemDetails: {
    backgroundColor: '#F2F6FA',
    borderLeft: '1px solid #000',
    borderBottom: '1px solid #000',
    BorderRight: '1px solid #000',
    color: '#000',
    
  },
};