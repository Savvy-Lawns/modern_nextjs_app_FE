"use client";
import React, {  createContext, useContext, useState,Children, Key, ReactNode } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import { nth } from 'lodash';
import { BorderBottom, Padding } from '@mui/icons-material';
import { Button, colors } from '@mui/material';
import { text } from 'stream/consumers';
import { baselightTheme } from '@/utils/theme/DefaultColors';
import EditForm from './edit';
import CustomTextField from '@/app/(DashboardLayout)/components/forms/theme-elements/CustomTextField';
import {Customers as data} from '@/app/Admin/customers/customers';
import EditIcon from '@mui/icons-material/Edit';
import ViewNotes from './customerNotes';
import ViewUpcomingEvents from './customerUpcomingEvents';

type Props = {
    customerId: string;
    customerName: string;
    address: string;
      phone: string;
      email: string;
    
    notes: {
      created_at: string;
      note: string;
    }[];
    upcomingEvents: {
      eventId: number;
      dateService: string;
      service: string;
      estimatedPrice: number;
      status: string;
      isPaid: boolean;
      estimatedTime: number;
      address: string;
    
      notes: {
        created_at: string;
        note: string;
      }[];
      services: {
        service: string;
        estimatedPrice: number;
      }[];
    }[];
  };

  interface Event {
    paid: boolean;
    amount: number;
  }

  const SelectedCustomer = () => {};

  const CustomerAccordion = ({
    customerId,
    customerName,
    address,
    phone,
    email,
    notes,
    upcomingEvents, 
      
  }: Props) => {
    
    const [open, setOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [visibleNotes, setVisibleNotes] = useState(3); // State to manage visible notes
    const [isEditFormVisible, setIsEditFormVisible] = useState(false);
    

    const toggleEditFormVisibility = () => {
      setIsEditFormVisible(prevState => !prevState);
    };

    const Customers = data
  const handleOpen = (customer:typeof  Customers) => {
    // Set the selected customer as an array
    setOpen(true); // Open the overlay
  };
  const handleClose = () => setOpen(false);
  const handleViewMore = () => {
    setVisibleNotes((prevVisibleNotes) => prevVisibleNotes + 5); // Show 5 more notes on each click
  };

  

  const filteredCustomers = (Customers as unknown as {
    customerId: Key | null | undefined;
    customerName: ReactNode; eventId: number; dateService: string; services: { service: string; estimatedPrice: number; }[]; status: string; isPaid: boolean; estimatedTime: number; address: string;  phone: string; email: string; notes: { created_at: string; note: string; }[]; 
}[]).filter((customer) => (customerName || "")?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        
        Object.values(customer.address || {}).some(address =>
          (address|| "").includes(searchQuery) )
        )
      

  function ensureArray<T>(input: T | T[]): T[] {
    if (Array.isArray(input)) {
      return input;
    }
    return input ? [input] : [];
  }

    function handleEdit(event: { eventId: number; dateService: string; services: { service: string; estimatedPrice: number; }[]; status: string; isPaid: boolean; estimatedTime: number; address: { addressName: string; street1: string; street2: string; city: string; state: string; zip: string; }; onSiteContact: { name: string; phone: string; email: string; }; notes: { created_at: string; note: string; }[]; } | { eventId: number; dateService: string; services: { service: string; estimatedPrice: number; }[]; status: string; isPaid: boolean; estimatedTime: number; address: { addressName: string; street1: string; street2: string; city: string; state: string; zip: string; }; onSiteContact: { name: string; phone: string; email: string; }; notes: { created_at: string; note: string; }[]; }) {
      throw new Error('Function not implemented.');
    }

    const flattenedCustomers = filteredCustomers.map(customer => ({
      ...customer,
      address: customer.address,
      
      // Assume there's a way to derive or include the 'note' property here
      note: "Example note" // Placeholder, adjust based on actual data
    }));

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

  
      {filteredCustomers.map((customer) => (
        <Accordion key={customer.customerId}>
          <AccordionSummary
            style={styles.AccordionSummaryStyle}
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id={customer.customerId?.toString() ?? ''}
          >
            <Typography>{customer.customerName}</Typography>
          </AccordionSummary>
          <AccordionDetails style={styles.AccordionDetailsStyle}>
            <Typography sx={styles.serviceStyle}>
            <div>
            <Typography variant='body1'>Address:</Typography>
            <Typography variant='body2'>{customer.address}</Typography>
            </div>
            <div>
            <div style={{ justifyContent:'space-between', width:"100%"}}><Typography variant='body1' >Phone:
              </Typography></div>
            <Typography variant='body2'>{customer.phone}</Typography>
            <div style={{ justifyContent:'space-between', width:"100%"}}><Typography variant='body1'>Email:</Typography></div>
            <Typography variant='body2'>{customer.email}</Typography>
            </div>
           
            <ViewNotes notes={customer.notes} />
                
              
              <div>
                <ViewUpcomingEvents 
                title={`Upcoming Events of ${customer.customerName}`} 
                upcomingEventsAddress={customer.address} 
                upcomingEventsDateService={customer.dateService} 
                upcomingEventsEstimatedTime={customer.estimatedTime} 
                upcomingEventsServices={customer.services} />
                
              </div>
            
            
            </Typography>
            <div style={styles.sidebyside}>
            <EditForm
              title={`Edit Customer ${customer.customerName}`}
              customerName={customer.customerName}
              phone={customer.phone}
              email={customer.email}
              
              buttonType={1}
            />
            </div>
          </AccordionDetails>
        </Accordion>
      ))}
       
      
       
    
    </div>
  );
}

export default CustomerAccordion;
console.log(Object.keys(CustomerAccordion))
export const activeSelection = SelectedCustomer

const styles: {
  AccordionDetailsStyle: React.CSSProperties;
  AccordionSummaryStyle: React.CSSProperties;
  sidebyside: React.CSSProperties & { flexDirection: 'row' };
  jobbuttons: React.CSSProperties;
  serviceStyle: React.CSSProperties;
  notesSection: React.CSSProperties;
  noteItems: React.CSSProperties;
  eventsSection: React.CSSProperties;
  eventItems: React.CSSProperties;
  editFormContainer: React.CSSProperties;
  editFormHidden: React.CSSProperties;
  editFormVisible: React.CSSProperties;
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
notesSection:{
  backgroundColor: 'rgba(0,0,0, .4)',
  borderRadius: '15px',
  width: '98%',
  marginLeft: '-5px',
  paddingLeft: '10px',
  paddingTop: '8px',
  paddingBottom: '15px',
  boxShadow: 'inset 0px -2px 2px 1px rgba(0,0,0,0.75)',
  
},
noteItems: {
paddingTop: '5px',
borderBottom: '1px solid rgba(255,255,255,0.45)',
width: '90%',
},
eventsSection:{
  backgroundColor: 'rgba(0,0,0, .4)',
  borderRadius: '15px',
  width: '98%',
  marginLeft: '-5px',
  paddingLeft: '10px',
  paddingTop: '8px',
  paddingBottom: '8px',
  boxShadow: 'inset 0px -2px 2px 1px rgba(0,0,0,0.75)',
},
eventItems: {
  paddingTop: '5px',
  borderBottom: '1px solid rgba(255,255,255,0.45)',
  width: '95%',
  },
editFormContainer: {
    transition: 'transform 0.3s ease-in-out',
  },
  
editFormHidden: {
    transform: 'translateX(100%)',
  },
  
  editFormVisible: {
    transform: 'translateX(0)',
  },
};
