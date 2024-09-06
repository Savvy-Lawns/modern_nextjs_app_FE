"use client";
import React, {  createContext, useContext, useState,Children, useEffect } from 'react';
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
import EditForm from './edit';
import CustomTextField from '@/app/(DashboardLayout)/components/forms/theme-elements/CustomTextField';
import useFetchServices from '../services/services';
import { useServiceContext } from './serviceContext';
import DeleteButton from './delete';

export interface Service {
  id: number;
  name: string;
  measurement_unit: string;
  price: number;
  notes: string;
  service_type: string;
}

type Props = {
    serviceId?: number;
    name?: string;
    measurement_unit?: string; // Update the type of 'measurement' to string
    price?: number;
    notes?: string;
    service_type?: string;
    title?: string; // Add the 'title' property to the 'Props' type
    token?: string | undefined;
};

  const SelectedService = () => {};
  const ServiceAccordion = ({
    serviceId,
    name,
    measurement_unit,
    price,
    notes,
    service_type, 
    token,  
  }: Props) => {
    
   
    const [open, setOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const { services, loading, error } = useFetchServices();
    const { Service, setService } = useServiceContext();



    useEffect(() => {
      setService(Service);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [Service]);
    

    const handleOpen = (service: typeof Service) => { // Ensure service is of type Service
      setService(service);
      setOpen(true);
    };
  const handleClose = () => setOpen(false);

  const filteredServices = services.filter((service) =>
    service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.notes.toLowerCase().includes(searchQuery.toLowerCase()), 
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

<div style={styles.scrollContainer}>
      {filteredServices.map((service) => (
        <Accordion key={service.id}>
          <AccordionSummary
            style={styles.AccordionSummaryStyle}
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id={service.id.toString()}
            >
            <Typography>{service.name}</Typography>
          </AccordionSummary>
          <AccordionDetails style={styles.AccordionDetailsStyle}>
            <Typography sx={styles.serviceStyle}>
            <div>
            <Typography variant='body1'>Measurement Unit:</Typography>
            <Typography variant='body2'>{service.measurement_unit}</Typography>
            </div>
            <div>
            <Typography variant='body1'>Price:</Typography>
            <Typography variant='body2'>$ {Number(service.price).toFixed(2)}</Typography>
            </div>
            <div>
            <Typography variant='body1'>Notes:</Typography>
            <Typography variant='body2'>{service.notes}</Typography>
            </div>
            <div>
            <Typography variant='body1'>Service Type:</Typography>
            <Typography variant='body2'>{service.service_type}</Typography>
            </div>
            
            
            </Typography>
            <div style={styles.sidebyside}>
            <EditForm
          title={`Edit Service ${service.name}`}
          name={service.name}
          measurement_unit={service.measurement_unit}
          price={service.price}
          notes={service.notes}
          service_type={service.service_type}
          buttonType={1}
          entityId={String(service.id)}
          entityType='services'
          // Do not pass other props that EditForm might accept but you don't want to include
        />
        <DeleteButton
        entityType='services' 
        entityId={service.id}
        title={'DeleteButton'}
        token={token}
        entityName={service.name}
           />
            </div>
          </AccordionDetails>
        </Accordion>
      ))}
       
      
       </div>
    
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
  scrollContainer: React.CSSProperties;
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
scrollContainer: {
  overflowY: 'scroll',
  height: '59vh',
  marginBottom: '-45px',
},

};
