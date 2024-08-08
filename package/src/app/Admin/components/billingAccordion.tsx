"use client";
import React, {  createContext, useContext, useState,Children, useEffect, Key } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { baselightTheme } from '@/utils/theme/DefaultColors';
import EditForm from './edit';
import CustomTextField from '@/app/(DashboardLayout)/components/forms/theme-elements/CustomTextField';

import useFetchCustomers from '../customers/customers';
import useFetchEvents from '../customers/events';
import DeleteButton from './delete'
import { useCustomerContext } from './customerContext'; 
import useFetchServices from '../services/services';
import { useServiceContext } from './serviceContext';
import { useEventContext } from './eventContext';


  interface Customers {
    id: string;
    name: string;
    phone: string;
    email: string;
    address: string;
    notes: string;

  }

  interface EventAttributes {
    id: string | number;
    status: string;
    amount_paid: number;
    estimated_service_cost: number;
    balance: number;
    created_at: string;
    updated_at: string;
    event_services: EventService[];
  }
  
  interface EventRelationships {
    customer: {
      data: {
        id: string;
      };
    };
  }
  
  interface Event {
    customer_id: string;
    event_services_attributes: EventAttributes;
    event_id: string | number;
    type: string;
    attributes: EventAttributes;
    relationships?: EventRelationships;
    dayOfWeek: string;
  }

  interface EventService {
    id: number;
    start_date: string;
    // other properties...
  }

  type Props = {
    token?: string | undefined;
  };
   
 
  const BillingAccordion = ({
    
    
    token,   
  }: Props) => {
    
    
    
    const { customers } = useFetchCustomers();
    const { Customer, setCustomer } = useCustomerContext();
    const { events, loading, error } = useFetchEvents(Customer.id);
    const { services } = useFetchServices();
    const [searchQuery, setSearchQuery] = useState('');
    
    
    const [open, setOpen] = useState(false);

    useEffect(() => {
      setCustomer(customers);
      
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [customers]);


    const handleOpen = (customer: typeof Customer) => {
        setCustomer(Customer); // Update the selected user in context
      setOpen(true); // Open the overlay
    };
  const handleClose = () => setOpen(false);

  const completedUnpaid = {

  };
  
  
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
{completedUnpaid.map((customer) => (
  
        <Accordion key={user.id}>
          <AccordionSummary
            style={styles.AccordionSummaryStyle}
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id={user.id!.toString()}
          >
            <Typography>{user.username}</Typography>
          </AccordionSummary>
          <AccordionDetails style={styles.AccordionDetailsStyle}>
            <Typography sx={styles.serviceStyle}>
              <div>
                <Typography variant='body1'>Phone:</Typography>
                <Typography variant='body2'>{user.phone}</Typography>
              </div>
              <div>
                <Typography variant='body1'>Email:</Typography>
                <Typography variant='body2'>{user.email}</Typography>
              </div>
              <div>
                <Typography variant='body1'>Account Type:</Typography>
                <Typography variant='body2'>{user.acctType}</Typography>
              </div>
              {/* <ViewMileage mileage={user.mileage} />
              <ViewHours hours={user.hours} /> */}
            </Typography>
            <div style={styles.sidebyside}>
              <EditForm entityId={user.id ?? ''} entityType={'users'} title={`Edit User ${user.username}`} username={user.username} phone_number={user.phone} email={user.email} role={user.acctType}  buttonType={1} />
              <DeleteButton
        entityType='users' 
        entityId={user.id?.toString() ?? ''}
        title={'DeleteButton'}
        token={token}
        entityName={user.username}
           />
            </div>
          </AccordionDetails>
        </Accordion>
      ))}
      </div>
    </div>
  );
}
export default BillingAccordion;


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
  height: '58vh',
  marginBottom: '-45px',
},

};
