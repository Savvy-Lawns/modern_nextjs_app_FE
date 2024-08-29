"use client";
import React, {  createContext, useContext, useState,Children, Key, ReactNode, useEffect } from 'react';
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
import useFetchCustomers from '../customers/customers';
import EditIcon from '@mui/icons-material/Edit';
import ViewNotes from './customerNotes';
import ViewUpcomingEvents from './customerUpcomingEvents';
import { useCustomerContext } from "./customerContext";
import ViewCustomerEvents from './customerUpcomingEvents';
import DeleteButton from './delete';


type Props = {
    id: string | number;
    name: string;
    address: string;
      phone_number: string;
      email: string;
    token: string | undefined;
    notes: {
      created_at: string;
      note: string;
    }[];
    
    
      
    
  };

  interface Event {
    paid: boolean;
    amount: number;
  }

  const CustomerAccordion = (token:any) => {
    
    const [open, setOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [visibleNotes, setVisibleNotes] = useState(3); // State to manage visible notes
    const [isEditFormVisible, setIsEditFormVisible] = useState(false);
    const { customers, loading, error, } = useFetchCustomers();
    const { Customer, setCustomer } = useCustomerContext();
    const [refresh, setRefresh] = useState(false);


  
    
    useEffect(() => {
      setCustomer(Customer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [Customer]);

    

    
    const toggleEditFormVisibility = () => {
      setIsEditFormVisible(prevState => !prevState);
    };

  const handleOpen = (customer:typeof  customers) => {
    // Set the selected customer as an array
    setOpen(true); // Open the overlay
  };
  const handleClose = () => setOpen(false);
  const handleViewMore = () => {
    setVisibleNotes((prevVisibleNotes) => prevVisibleNotes + 5); // Show 5 more notes on each click
  };
 

  console.log(customers);
  console.log(`Customers: ${Customer}`);

  const filteredCustomers = (customers as unknown as {
    id: Key | string | number;
    customerId: Key | string | number ;
    name: string; 
    eventId: number; 
    dateService: string; 
    services: { service: string; estimatedPrice: number; }[]; 
    status: string; 
    isPaid: boolean; 
    estimatedTime: number; 
    address: string;  
    phone_number: string; 
    email: string; 
    
    notes: { created_at: string; note: string; }[]; 
}[]).filter((customer) => (customer.name || "")?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        
        Object.values(customer.address || {}).some(address =>
          (address|| "").includes(searchQuery) )
        )
      

  function ensureArray<T>(input: T | T[]): T[] {
    if (Array.isArray(input)) {
      return input;
    }
    return input ? [input] : [];
  }

   

  

  return (
    <div >
      <CustomTextField
        style={{  marginBottom: '5px' }}
        type="search"
        variant="outlined"
        fullWidth
        label="Search"
        mb='0'
        
        onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setSearchQuery(e.target.value)} // Update search query on input change
      />

    <div style={styles.scrollContainer}>
      {filteredCustomers.map((customer) => (
        <Accordion key={customer.id}>
          <AccordionSummary
            style={styles.AccordionSummaryStyle}
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id={customer.customerId?.toString() ?? 'text'}
          >
            <Typography>{customer.name}</Typography>
          </AccordionSummary>
          <AccordionDetails style={styles.AccordionDetailsStyle}>
          
            <Typography sx={styles.serviceStyle}>
              
            
              <div style={{display:'flex', flexDirection:'column', marginTop:'10px', marginBottom:'6px', alignItems:'center',marginRight:'10px',}}>
            <Typography variant='h5'>Address:</Typography>
            <Typography variant='subtitle1'>{customer.address}</Typography>
            </div>
            <div style={{display:'flex', flexDirection:'column',  marginBottom:'6px', alignItems:'center',marginRight:'10px',}}>
              <Typography variant='h5' >Phone:</Typography>
            <Typography variant='subtitle1'>{customer.phone_number}</Typography>
            </div>
            <div style={{display:'flex', flexDirection:'column',  marginBottom:'10px', alignItems:'center', marginRight:'10px', }}>
              <Typography variant='h5'>Email:</Typography>
            <Typography variant='subtitle1'>{customer.email}</Typography>
            </div>
            
          <div style={styles.buttonRow}>
            <ViewNotes notes={customer.notes} />
            <ViewCustomerEvents
              title={`Upcoming Events for ${customer.name}`}
              name={customer.name}
              address={customer.address}
              phoneNumber={customer.phone_number}
              token={token}
              id={customer.id?.toString() ?? ''}
            />
              </div>
              <div>
                {/* <ViewUpcomingEvents 
                title={`Upcoming Events of ${customer.customerName}`} 
                upcomingEventsAddress={customer.address} 
                upcomingEventsDateService={customer.dateService} 
                upcomingEventsEstimatedTime={customer.estimatedTime} 
                upcomingEventsServices={customer.services} /> */}
                
              </div>
            
            
            </Typography>
            <div style={styles.sidebyside}>
            <EditForm
              title={`Edit Customer ${customer.name}`}
              name={customer.name}
              phone_number={customer.phone_number}
              email={customer.email}
              address={customer.address}
              entityId={customer.id?.toString()}
              entityType='customers'
              buttonType={1}
              
            />
            <DeleteButton
        entityType='customers' 
        entityId={customer.id?.toString() ?? ''}
        title={'DeleteButton'}
        token={token}
        entityName={customer.name}
           />
            </div>
            
          </AccordionDetails>
        </Accordion>
        
      ))}
       
       </div>
       
    
    </div>
  );
}

export default CustomerAccordion;



const styles: {
  AccordionDetailsStyle: React.CSSProperties;
  AccordionSummaryStyle: React.CSSProperties;
  sidebyside: React.CSSProperties & { flexDirection: 'row' };
  jobbuttons: React.CSSProperties;
  serviceStyle: React.CSSProperties;
  
  
  eventsSection: React.CSSProperties;
  eventItems: React.CSSProperties;
  editFormContainer: React.CSSProperties;
  editFormHidden: React.CSSProperties;
  editFormVisible: React.CSSProperties;
  scrollContainer: React.CSSProperties;
  buttonRow: React.CSSProperties;
  
} = {
  AccordionDetailsStyle: {
    backgroundColor: baselightTheme.palette.primary.main,
    color: baselightTheme.palette.primary.contrastText,
    borderRadius: '0px 0px 15px 15px',
    boxShadow: 'inset 0px -3px 5px 1px rgba(0,0,0,0.75)',
    marginTop: '-20px',
    paddingTop: '20px',
    marginBottom: '0px',
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
    height: '40px',
    
  },
  buttonRow: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    textAlign: 'center',
    marginBottom: '10px',
    
    
  },
  jobbuttons: {
    marginTop: '10px',
    backgroundColor: baselightTheme.palette.secondary.light,
    color: baselightTheme.palette.secondary.contrastText,
    borderRadius: '15px',
  },
  serviceStyle: {
    border: '.5px solid rgba(0,0,0,0.65)',
    marginBottom: '10px',
    borderRadius: '15px',
    padding: '8px 0px 10px 15px',
    backgroundColor: 'rgba(256,256,256,0.4)',
    boxShadow: 'inset 0px -2px 2px 1px rgba(0,0,0,0.75)',
  },

  eventsSection: {
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
  scrollContainer: {
    overflowY: 'scroll',
    height: '59vh',
    marginBottom: '-45px',
  },
  
};
