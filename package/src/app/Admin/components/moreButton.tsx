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
import { Accordion, AccordionSummary, Typography, AccordionDetails, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';
import DotsIcon from '@mui/icons-material/ExpandMore';
import zIndex from '@mui/material/styles/zIndex';
import { Style } from '@mui/icons-material';


type Props = Partial<{
    title: string;
    customer_id: number | string;
    event_id: number| string| null;
    event_service_id: number;
    start_date: string;
    end_date: string;
    token: string;
    recurrence_series_id: number | string;
    service_id: number | string;
   
    
    
}>;

function useDeepCompareEffect(callback: () => void, dependencies: {}[] | undefined) {
    const currentDependenciesRef = useRef<{}[] | undefined>();

    if (!isEqual(currentDependenciesRef.current, dependencies)) {
        currentDependenciesRef.current = dependencies;
    }

    useEffect(callback, [currentDependenciesRef.current]);
}

function MoreButton({ title,  customer_id, event_id, event_service_id, start_date, end_date, token, recurrence_series_id, ...rest }: Props) {
    const [openConfirmation, setOpenConfirmation] = React.useState(false);
    const [openReschedule, setOpenReschedule] = React.useState(false);
    const [startDate, setStartDate] = React.useState<Date | null>(start_date ? new Date(start_date) : null);
    const [endDate, setEndDate] = React.useState<Date | null>(end_date ? new Date(end_date) : null);
    const [formData, setFormData] = useState<{ [key: string]: string | number }>({});
    const [rescheduleOption, setRescheduleOption] = useState<string>('single');
      //const apiURL =  process.env.NEXT_PUBLIC_API_URL
const apiURL =  'http://127.0.0.1:3000/api/v1'

    const value = 'Refreshing...';
    const value2 = '';

    useDeepCompareEffect(() => {
        return setFormData({ ...rest });
    }, [rest]);

    
    const handleConfirmationOpen = () => setOpenConfirmation(true);
    const handleConfirmationClose = () => setOpenConfirmation(false);
    const handleRescheduleOpen = () => setOpenReschedule(true);
    const handleRescheduleClose = () => setOpenReschedule(false);

    const handleRescheduleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formDataObj = new FormData();
        Object.keys(rest).forEach(key => {
            const inputElement = document.getElementById(key) as HTMLInputElement;
            if (inputElement) {
                formDataObj.append(key, inputElement.value);
            }
        });

        const formJson = Object.fromEntries(Array.from(formDataObj.entries()));
        const startDateElement = document.getElementById('start_date') as HTMLInputElement;
        const endDateElement = document.getElementById('end_date') as HTMLInputElement;
        const startDate = startDateElement ? startDateElement.value : '';
        const endDate = endDateElement ? endDateElement.value : '';

        const changeSingleRequestData = {
            new_start_date: String(startDate),
            new_end_date: String(endDate),
        };
        const changeRequestData = {
            new_start_date: startDate,
        
        };
        console.log('rescheduleOption:', rescheduleOption);
        try {
            let response;
            if (rescheduleOption === 'single') {
                response = await axios.patch(`${apiURL}/event_services/${event_service_id}/reschedule_single_in_series`, changeSingleRequestData, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });
            } else if (rescheduleOption === 'series') {
                response = await axios.patch(`${apiURL}/event_services/${event_service_id}/reschedule_series`, changeRequestData, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });
            } else if (rescheduleOption === 'one-time') {
                response = await axios.patch(`${apiURL}/customers/${customer_id}/events/${event_id}/event_services/${event_service_id}`, changeRequestData, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });
            }

            console.log('Service has been rescheduled:', changeRequestData);
            alert(`Scheduled Service was rescheduled successfully`);
            window.location.href = `/Admin/customers`;
        } catch (error) {
            // Handle error...
        }
    };

    const handleEventServiceDelete = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        

        try {
            const response = await axios.delete(`${apiURL}/customers/${customer_id}/events/${event_id}/event_services/${event_service_id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            
            console.log('Scheduled Service has been deleted:', response.data.data);
            alert(`Scheduled Service was deleted successfully`);
            window.location.href = `/Admin/customers`;
            
            
            
            
            
            
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
                    width: '100%',
                    
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
                    width:'100%', 
                    marginTop: '0px',
                    marginBottom:'-10px'
                    }}}>
              <Typography variant={'subtitle2'}>More...</Typography>
            </AccordionSummary>

            <AccordionDetails sx={{'&.MuiAccordionDetails-root': {padding: '8px 2px 8px', backgroundColor:baselightTheme.palette.secondary.light, borderRadius:'15px'} }}>
            <Button sx={ {color:'#fff'}} variant='contained' color='primary' style={Styles.jobbuttons} onClick={handleRescheduleOpen}><Typography variant={'body2'}>Reschedule</Typography></Button>
            <Dialog style={Styles.overlayWindow} open={openReschedule} onClose={handleRescheduleClose}>
                <form onSubmit={handleRescheduleSubmit}>
                    <DialogTitle style={{display:'flex', justifyContent:'center'}}>Reschedule Service</DialogTitle>
                    <DialogContent>
                    <FormControl component="fieldset">
        <FormLabel component="legend">Reschedule Option</FormLabel>
        <RadioGroup
            aria-label="reschedule-option"
            name="reschedule-option"
            value={rescheduleOption}
            onChange={(e) => setRescheduleOption(e.target.value)}
        >
            <FormControlLabel value="single" control={<Radio />} label="Reschedule Single Event" />
            <FormControlLabel value="series" control={<Radio />} label="Reschedule Event Series" />
            <FormControlLabel value="one-time" control={<Radio />} label="Reschedule as One-Time Event" />
        </RadioGroup>
    
                    <TextField
                        margin="dense"
                        id="start_date"
                        label="Start Date"
                        type="date"
                        fullWidth
                        variant="outlined"
                        value={startDate ? startDate.toISOString().split('T')[0] : ''}
                        onChange={(e) => setStartDate(e.target.value ? new Date(e.target.value) : null)}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        />
                        <TextField
                        margin="dense"
                        id="end_date"
                        label="End Date"
                        type="date"
                        fullWidth
                        variant="outlined"
                        defaultValue={'2024-11-31'}
                        value={endDate ? endDate.toISOString().split('T')[0] : ''}
                        onChange={(e) => setEndDate(e.target.value ? new Date(e.target.value) : null)}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        /></FormControl>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleRescheduleClose}>Cancel</Button>
                        <Button type="submit">Submit</Button>
                    </DialogActions>
                </form>
                </Dialog>
            <form onSubmit={handleEventServiceDelete}>
              <Button type="submit" color={'error'} variant='contained'><Typography variant={'body2'}>Delete</Typography></Button>
            </form>
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
  eventDetailField: {
    marginBottom: '0px',
    marginTop: '0px',
  },
};