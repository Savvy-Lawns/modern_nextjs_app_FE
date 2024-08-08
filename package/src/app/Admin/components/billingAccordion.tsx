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
import { TextField } from '@mui/material';


  interface Customer {
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
    status: string;
  }

  interface EventService {
    id: number;
    start_date: string;
    status: string;
    property_metric: number;
    paid: boolean;
    // other properties...
  }

  type Props = {
    token?: string | undefined;
  };
  
  function groupingEvents(events: Event[], services: any[], customers: Customer[], customerId: string, start_date: string, end_date: string) {
    const activeEvents = events.filter(event => event.status === 'active');
    const filteredEvents = activeEvents.filter(event => event.customer_id === customerId);

    const startDate = new Date(start_date);
    const endDate = new Date(end_date);

    const groupedData = filteredEvents.reduce((acc: any, event) => {
        const customer = customers.find(c => c.id === event.customer_id);
        if (!customer) return acc;

        const eventServices = event.attributes.event_services.filter(service => {
            const serviceDate = new Date(service.start_date);
            return serviceDate >= startDate && serviceDate <= endDate && service.status === 'completed' && service.paid === false;
        });

        if (eventServices.length > 0) {
            acc[event.customer_id] = acc[event.customer_id] || {
                name: customer.name,
                address: customer.address,
                email: customer.email,
                phone: customer.phone,
                events: []
            };

            const eventData = {
                event_id: event.event_id,
                status: event.status,
                event_services: eventServices.map(service => {
                    const serviceDetails = services.find(s => s.id === service.id);
                    const total_service_cost = service.property_metric * (serviceDetails ? serviceDetails.price : 0);
                    return {
                        event_service_id: service.id,
                        start_date: service.start_date,
                        status: service.status,
                        service_id: service.id,
                        property_metric: service.property_metric,
                        measurement_unit: serviceDetails ? serviceDetails.measurement_unit : '',
                        total_service_cost
                    };
                })
            };

            acc[event.customer_id].events.push(eventData);
        }

        return acc;
    }, {});

    console.log('groupedData:', groupedData);
    return groupedData;
}
 
const BillingAccordion = ({
    token,
  }: Props) => {
    const { Customer, setCustomer } = useCustomerContext();
    console.log('1. Customer:', Customer);
    const { events } = useFetchEvents(Customer.id);
    console.log('2. Events:', events);
    const { services } = useFetchServices();
    console.log('3. Services:', services);
    const { customers } = useFetchCustomers();
    console.log('4. Customers:', customers);
    const [searchQuery, setSearchQuery] = useState('');
    const [open, setOpen] = useState(false);
    const [groupedData, setGroupedData] = useState<any>({});
    console.log('5. Grouped Data:', groupedData);
    const [start_date, setStartDate] = useState('');
    console.log('6. Start Date:', start_date);
    const [end_date, setEndDate] = useState('');
    console.log('7. End Date:', end_date);
  
    useEffect(() => {
      if (events && services && customers) {
        const grouped = groupingEvents(events, services, Customer, Customer.id, start_date, end_date);
        setGroupedData(grouped);
      }
    }, [events, services, Customer, Customer.id]);
    console.log('5A. Grouped Data:', groupedData);

    const handleStartDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setStartDate(event.target.value);
    };
    const handleEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEndDate(event.target.value);
    }
  
    const handleOpen = (customer: typeof Customer) => {
      setOpen(true);
    };
  
    const handleClose = () => setOpen(false);
    
    const currentMonth = new Date().toLocaleString('default', { month: '2-digit' });
    const lastDayCurrentMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).toLocaleString('default', { day: '2-digit' });

    return (
      <div>
        <CustomTextField
          type="search"
          variant="outlined"
          fullWidth
          label="Search"
          mb='10'
          style={{ marginBottom: '20px' }}
          onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setSearchQuery(e.target.value)}
        />
        <TextField
                        margin="dense"
                        id="start_date"
                        label="Start Date"
                        type="date"
                        fullWidth
                        variant="outlined"
                        value={start_date ? start_date.toString().split('T')[0] : ''}
                        onChange={(e) => handleStartDateChange(e.target.value ? new Date(e.target.value) : null)}
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
                        value={end_date ? end_date.toString().split('T')[0] : ''}
                        onChange={(e) => handleEndDateChange(e.target.value ? new Date(e.target.value) : null)}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        />
  
        <div style={styles.scrollContainer}>
          {/* Render grouped data */}
          {Object.keys(groupedData).map((customerId: string) => (
            <Accordion key={customerId}>
              <AccordionSummary
                style={styles.AccordionSummaryStyle}
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id={customerId}
              >
                <Typography>{groupedData[customerId].name}</Typography>
              </AccordionSummary>
              <AccordionDetails style={styles.AccordionDetailsStyle}>
                <Typography sx={styles.serviceStyle}>
                  <div>
                    <Typography variant='body1'>Phone:</Typography>
                    <Typography variant='body2'>{groupedData[customerId].phone}</Typography>
                  </div>
                  <div>
                    <Typography variant='body1'>Email:</Typography>
                    <Typography variant='body2'>{groupedData[customerId].email}</Typography>
                  </div>
                  {/* Render event details */}
                  {groupedData[customerId].events.map((event: any) => (
                    <div key={event.event_id}>
                      <Typography variant='body1'>Event ID:</Typography>
                      <Typography variant='body2'>{event.event_id}</Typography>
                      <Typography variant='body1'>Status:</Typography>
                      <Typography variant='body2'>{event.status}</Typography>
                      {/* Render event services */}
                      {event.event_services.map((service: any) => (
                        <div key={service.event_service_id}>
                          <Typography variant='body1'>Service ID:</Typography>
                          <Typography variant='body2'>{service.service_id}</Typography>
                          <Typography variant='body1'>Total Cost:</Typography>
                          <Typography variant='body2'>{service.total_service_cost}</Typography>
                        </div>
                      ))}
                    </div>
                  ))}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </div>
      </div>
    );
  };
  
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
