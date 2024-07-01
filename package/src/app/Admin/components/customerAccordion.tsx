"use client";
import React, {  createContext, useContext, useState,Children } from 'react';
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

type Props = {
    customerId: string;
    customerName: string;
    address: {
      addressName: string;
      street1: string;
      street2: string;
      city: string;
      state: string;
      zip: string;
    }[];
    onSiteContact: {
      name: string;
      phone: string;
      email: string;
    }[];
    notes: {
      date: string;
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
      address: {
        addressName: string;
        street1: string;
        street2: string;
        city: string;
        state: string;
        zip: string;
      };
      onSiteContact: {
        name: string;
        phone: string;
        email: string;
      };
      notes: {
        date: string;
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
    onSiteContact,
    notes,
    upcomingEvents, 
      
  }: Props) => {
    
    const [open, setOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [visibleNotes, setVisibleNotes] = useState(3); // State to manage visible notes

    

    const Customers = data
  const handleOpen = (customer:typeof  Customers) => {
    // Set the selected customer as an array
    setOpen(true); // Open the overlay
  };
  const handleClose = () => setOpen(false);
  const handleViewMore = () => {
    setVisibleNotes((prevVisibleNotes) => prevVisibleNotes + 5); // Show 5 more notes on each click
  };

  const filteredCustomers = Customers.filter((customer) => (customerName || "")?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      Object.values(customer.onSiteContact || {}).some(onSiteContact =>
        (onSiteContact.phone || "").includes(searchQuery) || (onSiteContact.email || "").toLowerCase().includes(searchQuery.toLowerCase())
      ) ||
      Object.values(customer.address || {}).some(address =>
        (address.street1 || "").includes(searchQuery) || address.city.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );

  function ensureArray<T>(input: T | T[]): T[] {
    if (Array.isArray(input)) {
      return input;
    }
    return input ? [input] : [];
  }

    function handleEdit(event: { eventId: number; dateService: string; services: { service: string; estimatedPrice: number; }[]; status: string; isPaid: boolean; estimatedTime: number; address: { addressName: string; street1: string; street2: string; city: string; state: string; zip: string; }; onSiteContact: { name: string; phone: string; email: string; }; notes: { date: string; note: string; }[]; } | { eventId: number; dateService: string; services: { service: string; estimatedPrice: number; }[]; status: string; isPaid: boolean; estimatedTime: number; address: { addressName: string; street1: string; street2: string; city: string; state: string; zip: string; }; onSiteContact: { name: string; phone: string; email: string; }; notes: { date: string; note: string; }[]; }) {
      throw new Error('Function not implemented.');
    }

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
            id={customer.customerId.toString()}
          >
            <Typography>{customer.customerName}</Typography>
          </AccordionSummary>
          <AccordionDetails style={styles.AccordionDetailsStyle}>
            <Typography sx={styles.serviceStyle}>
            <div>
            <Typography variant='body1'>Address:</Typography>
            {customer.address.map((addr, index) => (
              <div style={{marginLeft:'5px'}} key={index}>
                <Typography variant='body2'>{addr.addressName}</Typography>
                <Typography variant='body2'>{addr.street1}, {addr.street2}</Typography>
                <Typography variant='body2'>{addr.city}, {addr.state} {addr.zip}</Typography>
              </div>
            ))}
            </div>
            <div>
            <Typography variant='body1' >Contact:</Typography>
            {(ensureArray(customer.onSiteContact)).map((osc, index) => (
              <div style={{marginLeft:'5px'}} key={osc.name}>
                <Typography variant='body2'>{osc.name}</Typography>
                <Typography variant='body2'>{osc.phone}</Typography>
                <Typography variant='body2'>{osc.email}</Typography>
              </div>
            ))}
            </div>
            <div>
                <Typography variant='body1' style={{marginTop:'10px'}}>
               
                </Typography>
            </div>
            <div>
                <Typography variant='body1' style={{marginTop:'10px'}}>Notes:</Typography>
                <div style={styles.notesSection}>
                {[...customer.notes].reverse().slice(0, visibleNotes).map((note, index) => (
                  <div style={styles.noteItems} key={index}>
                    <Typography variant='body2'>{note.date}: </Typography>
                    <Typography variant='body2'>{note.note}</Typography>
                  </div>
                ))}
                {visibleNotes < customer.notes.length && (
                  <Button onClick={handleViewMore} style={{color:'#fff', textDecoration:'underline'}} >View more</Button>
                )}                
                </div>
              </div>
              <div>
                <Typography variant='body1' style={{marginTop:'10px'}}>Upcoming Jobs:</Typography>
                <div style={styles.eventsSection}>
                  {[...customer.upcomingEvents].reverse().slice(0, visibleNotes).map((event, index) => (
                    <div style={styles.eventItems} key={index}>
                      <Accordion style={{backgroundColor:"rgba(0,0,0,0)",  width:'100%'}}>
                      <AccordionSummary
                        style={styles.AccordionSummaryStyle}
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id={customer.customerId.toString()}
                      >
                          {event.dateService}: <br />{event.status} - {event.isPaid ? "Paid" : "Unpaid"}
                        </AccordionSummary>
                        <AccordionDetails style={styles.AccordionDetailsStyle}>
                          <Typography variant='body1' style={{marginTop:'5px'}}>
                            Address:
                            </Typography>
                        <Typography variant='caption'>
                        {event.address.street1}, {event.address.street2},
                        <br/> {event.address.city}, {event.address.state} {event.address.zip}
                      </Typography>
                      <br/>
                      <Typography variant='body1' style={{marginTop:'5px'}}>
                            Contact:
                            </Typography>
                      <Typography variant='caption'>
                        {event.onSiteContact.name} - {event.onSiteContact.phone}
                        
                      </Typography>
                      <Typography variant='body1' style={{marginTop:'5px'}}>
                            Services:
                            </Typography>
                            {customer.upcomingEvents.map((event) => (
                              <ul key={event.eventId} style={{marginTop:"1px"}}>
                               <Typography variant='body2' style={{marginLeft:"-20px"}}> {(event.services || []).map((service, index) => (
                                  <li key={index}>{service.service}: ${service.estimatedPrice}</li>
                                ))} </Typography>
                              </ul>
                            ))}

                      <div style={{display:'flex', justifyContent:'center'}}>
                      
                      </div>
                      </AccordionDetails>
                      </Accordion>
                      <Typography variant='body2'>
                        
                        
                        <br/>
                        
                      </Typography>
                      
                      
                    </div>
                  ))}
                  {visibleNotes < customer.upcomingEvents.length && (
                    <Button onClick={handleViewMore} style={{color:'#fff', textDecoration:'underline'}} >View more</Button>
                  )}                
                </div>
              </div>
            
            
            </Typography>
            <div style={styles.sidebyside}>
            <EditForm
              title={`Edit Customer ${customer.customerName}`}
              customerId={customer.customerId}
              customerName={customer.customerName}
              address={customer.address}
              onSiteContact={customer.onSiteContact}
              notes={customer.notes}
              upcomingEvents={customer.upcomingEvents}
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

};
