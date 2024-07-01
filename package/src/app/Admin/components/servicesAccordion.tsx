"use client";
import React, {  createContext, useContext, useState,Children } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import { BorderBottom, Padding } from '@mui/icons-material';
import { Button, colors } from '@mui/material';
import { text } from 'stream/consumers';
import { baselightTheme } from '@/utils/theme/DefaultColors';
import {  Services } from '@/app/Admin/services/services';
import EditForm from './edit';
import CustomTextField from '@/app/(DashboardLayout)/components/forms/theme-elements/CustomTextField';

type Props = {
    serviceId?: number;
    name?: string;
    measurement?: string; // Update the type of 'measurement' to string
    cost?: number;
    note?: string;
    type?: number;
   
};

  const SelectedService = () => {};
  const ServiceAccordion = ({
    serviceId,
    name,
    measurement,
    cost,
    note,
    type,   
  }: Props) => {
    
   
    const [open, setOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    

  const handleOpen = (service:typeof  Services) => {
    // Set the selected service as an array
    setOpen(true); // Open the overlay
  };
  const handleClose = () => setOpen(false);

  const filteredServices = Services.filter((service) =>
    service.name.toLowerCase().includes(searchQuery.toLowerCase()) 
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
        onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setSearchQuery(e.target.value)} // Update search query on input change
      />

  
      {filteredServices.map((service) => (
        <Accordion key={service.serviceId}>
          <AccordionSummary
            style={styles.AccordionSummaryStyle}
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id={service.serviceId.toString()}
          >
            <Typography>{service.name}</Typography>
          </AccordionSummary>
          <AccordionDetails style={styles.AccordionDetailsStyle}>
            <Typography sx={styles.serviceStyle}>
            <div>
            <Typography variant='body1'>Measurement:</Typography>
            <Typography variant='body2'>{service.measurement}</Typography>
            </div>
            <div>
            <Typography variant='body1'>Cost:</Typography>
            <Typography variant='body2'>{service.cost}</Typography>
            </div>
            <div>
            <Typography variant='body1'>Note:</Typography>
            <Typography variant='body2'>{service.note}</Typography>
            </div>
            <div>
            <Typography variant='body1'>Type:</Typography>
            <Typography variant='body2'>{service.type}</Typography>
            </div>
            
            
            </Typography>
            <div style={styles.sidebyside}>
            <EditForm title={`Edit Service ${service.name}`} name={service.name} measurement={service.measurement} cost={service.cost} note={service.note} type={service.type} />
            </div>
          </AccordionDetails>
        </Accordion>
      ))}
       
      
       
    
    </div>
  );
}

export default ServiceAccordion;
console.log(Object.keys(ServiceAccordion))
export const activeSelection = SelectedService

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
