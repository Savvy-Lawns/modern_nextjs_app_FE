import React, { useState, useEffect, FC } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { baselightTheme } from '@/utils/theme/DefaultColors';
import Autocomplete from '@mui/material/Autocomplete';
import useFetchServices from '../services/services';
import { Service } from './servicesAccordion';
import AddServices from './addServices';
import withAuth from '@/utils/withAuth';
import Cookie from 'js-cookie';
import useFetchEvents from '../customers/events';
import { parseISO, format } from 'date-fns';
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { BorderLeft, BorderRight, Height, TextFormatOutlined } from '@mui/icons-material';



interface Props {
  title: string;
  id: number | string;
  name: string;
  address: string;
  phoneNumber: string;
  token: string | undefined;
}



interface EventService {
  id: number;
  start_date: string;
  // other properties...
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
  id: string;
  type: string;
  attributes: EventAttributes;
  relationships?: EventRelationships;
}

function groupEventsByMonthAndDay(events: Event[], customerId: string) {

  const filteredEvents = events.filter(event => event.customer_id === customerId);
  console.log('filteredEvents:', filteredEvents);
  // Group events by month and day
  const groupedEvents: { [month: string]: { [day: string]: Event[] } } = {};
  const sortedGroupedEvents: { [month: string]: { [day: string]: Event[] } } = {};

  filteredEvents.forEach(event => {
    
    
    
    if (filteredEvents) {
      filteredEvents.forEach(event => {
        // let serviceList = event.attributes.event_services !== undefined ? event.attributes.event_services : event.event_services_attributes;
        let serviceList: any =  event.event_services_attributes;
        if (serviceList === undefined) {
          return;
        } 
        serviceList.forEach((service: any )=> {
          console.log('Service:', service);
          const startDate = parseISO(service.start_date);
          const month = format(startDate, 'MM');
          const day: number | string = format(startDate, 'dd');
          console.log('Month:', month);
          console.log('day: ', day);
          console.log('start_date: ', startDate);
          if (!groupedEvents[month]) {
            groupedEvents[month] = {};
          }

          if (!groupedEvents[month][day]) {
            groupedEvents[month][day] = [];
            
          }

          groupedEvents[month][day].push(service);
          console.log('groupedEvents: ', groupedEvents[month][day]);
          console.log('groupedEvents: ', groupedEvents);
          console.log('event_service Id: ', service.id);
        })
      
      });
  Object.keys(groupedEvents)
    .sort((a, b) => parseInt(a) - parseInt(b))
    .forEach(month => {
      sortedGroupedEvents[month] = groupedEvents[month];
    });
    } 
    }
  )

  return sortedGroupedEvents;
  
};

 

const ViewCustomerEvents: FC<Props> = ({ title, name, address, phoneNumber, id, token, ...rest }) => {
  const [open, setOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [SelectedServices, setSelectedServices] = useState<Array<{
    duration: any; service: Service | null, propertyMetric: number, recurrence: string 
}>>([]);
  const [startDate, setStartDate] = useState<Date | null | undefined>(new Date());
  const [endDate, setEndDate] = useState<Date | null | undefined>(new Date());

  const { events, loading, error } = useFetchEvents(id);
  const { services } = useFetchServices();
  

  

  const servicesMap = services.reduce((acc: { [key: number]: string }, service: Service) => {
    acc[service.id] = service.name;
    return acc;
  }, {});
  const handleSelectedServicesChange = (services: Array<{ duration: number | any; service: Service | null; propertyMetric: number; recurrence: string; }>) => {
    setSelectedServices(services);
  };

  useEffect(() => {
    console.log('Selected Services:', SelectedServices);
  }, [SelectedServices]);

 const groupedEvents = groupEventsByMonthAndDay(events, id.toString());
  
  

  const handleClickOpen = () => {
    setOpen(true);
    console.log('bulk data: ', events);
   
    console.log('customer id from parameter:', id);
    
    console.log('grouped data: ', groupEventsByMonthAndDay(events, id.toString()));
    console.log('Selected Services:', services);
    // var myId = '2';
    // var  myEvents = events.filter(event => event.customer_id == myId);
    // console.log('filtered events: ', myEvents);
 
  };

  const handleClose = () => setOpen(false);

  const handleFormOpen = () => { setFormOpen(true), console.log(`id: ${id}`) };

  const handleFormClose = () => {
    console.log("Form closed");
    setFormOpen(false);
    
  };

  const handleFormSubmit = async (event: React.FormEvent) => {
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

    


      
    const requestData = {
      event: {
        customer_id: id,
        notes: Date.now().toString(),
        event_services_attributes: SelectedServices.map(service => ({
          service_id: service.service?.id,
          recurrence_type: service.recurrence,
          start_date: startDate,
          end_date: endDate,
          status: "active",
          property_metric: service.propertyMetric,
          duration: service.duration,
          paid: false,
          
          recurrence_series_id: null
        }))
      }
    };
    console.log(SelectedServices);

    const apiUrl = `http://127.0.0.1:3000/api/v1/customers/${id}/events`;

    try {
      const response = await axios.post(apiUrl, requestData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.status === 200 || response.status === 201) {
        alert(`Customer event created successfully`);
        console.log("Event submitted");
        console.log("requestData: ", requestData);
        handleFormClose();
        setSelectedServices([]);
        window.location.href = `/Admin/customers`;
      } else {
        throw new Error(`Failed to create customer event. Status code: ${response.status}`);
      }
    } catch (error) {
      console.error(`Error creating customer event:`, error);
    }
  };

  const isItPaid = (paid: boolean |string) => {
    if (paid) {
      return <span style={{ color: baselightTheme.palette.primary.main }}>Paid</span>;
    } else {
      return <span style={{ color: baselightTheme.palette.warning.main }}>Not Paid</span>;
    }
  };

  const statusColor = (status: any) => {
    if (status === 'active') {
      return <span style={{ color: baselightTheme.palette.primary.light }}>Active</span>;
    } else if (status === 'cancelled') {
      return <span style={{ color: baselightTheme.palette.error.main }}>Cancelled</span>;
    } else if (status === 'completed') {
      return <span style={{ color: baselightTheme.palette.primary.main }}>Completed</span>;
    }
  };

  const getMonthName = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const getMonthByIndex = (monthIndex: number) => getMonthName[monthIndex - 1];

  const getServiceName = (serviceId: number| string | undefined) => {
    for (const service of services) {
      if (service.id === serviceId) {
        return service.name;
      }
    }
    return "service not found"; // or return a default message like "Service not found"
  };
  

  return (
    <React.Fragment>
      <Button
        style={{ backgroundColor: baselightTheme.palette.primary.main, color: '#fff', padding: '20px 15px', marginRight: '10px' }}
        onClick={handleClickOpen}
      >
        View Upcoming Services
      </Button>
      <Dialog open={open} onClose={handleClose} sx={{'&.MuiDialog-paperWidthSm': {
    width: '100%', maxWidth:'100%'
  }}}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent sx={{'&.MuiDialogContent-root': {padding: '20px 10px', width:'100%', display:"flex", flexDirection:'column', justifyContent:'center', margin:'0 auto', overflowY:'scroll'}}}>
        {Object.keys(groupedEvents).map((month: string | number) => (
          
          <Accordion style={Styles.serviceAccordion} sx={{'&.Mui-expanded': { marginBottom: '5px', paddingTop:'0px', paddingBottom: '0px',height:'100%', width:'90%'}}} key={month}>
            
            <AccordionSummary expandIcon={<ExpandMoreIcon />} style={Styles.serviceAccordion} sx={{'&.MuiAccordionSummary-content': {marginTop:'0px', marginBottom:'0px'},'&.MuiButtonBase-root':{minHeight:'12px'},'&.Mui-expanded': { paddingTop:'0px', paddingBottom: '0px', minHeight: '12px', width:'90%', marginTop:'-15px', 
                        marginBottom:'-10px'}}}>
              <Typography variant={'h5'}>{getMonthByIndex(Number(month))}</Typography>
            </AccordionSummary>

            <AccordionDetails sx={{'&.MuiAccordionDetails-root': {padding: '8px 2px 8px',} }}>
              {Object.keys(groupedEvents[month]).map((day: string | number) => (
                
                <Accordion style={Styles.serviceDayAccordion} key={day}  sx={{'&.Mui-expanded': {marginTop: '0px', marginBottom: '0px', paddingTop:'0px', paddingBottom: '0px', minHeight: '100%', width:'90%'}}}>

                  <AccordionSummary expandIcon={<ExpandMoreIcon />} 
                  sx={{
                    '&.MuiAccordionSummary-content': {
                      marginTop:'0px', 
                      marginBottom:'0px', },
                    '&.MuiButtonBase-root':{
                      minHeight:'100%', 
                      marginTop:'0px', 
                      marginBottom:'0px'},
                      '&.Mui-expanded': { 
                        paddingTop:'-10px', 
                        paddingBottom: '0px',   
                        marginTop:'-8px', 
                        marginBottom:'-10px'}}}>

                    <Typography variant={'h6'}>{day}</Typography>
                  </AccordionSummary>
                  <AccordionDetails sx={{'&.MuiAccordionDetails-root': {padding: '8px 8px 8px', } }}>
                    
                  {groupedEvents[month][day].map((service: any, index: any) => (
                  <Accordion key={index}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />} style={Styles.serviceAccordionList} sx={{'&.Mui-expanded': {marginTop: '0px', marginBottom: '0px', paddingTop:'0px', paddingBottom: '0px', minHeight: '100%', width:'90%'}}}>
                    <Typography variant={'h6'}>{getServiceName(service.service_id)}</Typography>
                  </AccordionSummary>
                  <AccordionDetails style={Styles.serviceItemDetails}>
                    <p>Start Date: {service.start_date}</p>
                    <p>Duration: {service.duration}</p>
                    
                    <p>Status: {statusColor(service.status)}</p>
                    <p>Paid: {isItPaid(service.paid)}</p>
                    <p>Property Metric: {service.property_metric}</p>
                    <p>Recurrence Type: {service.recurrence_type}</p>
                    </AccordionDetails>
                    
                  </Accordion>
                ))}

                  

                  </AccordionDetails>
                </Accordion>
              ))}
            </AccordionDetails>
          </Accordion>
        ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleFormOpen}>Add Event</Button>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={formOpen} onClose={handleFormClose}>
        <form id="add_new_event" onSubmit={handleFormSubmit}>
          <DialogTitle>Add New Event</DialogTitle>
          <DialogContent>
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
              value={endDate ? endDate.toISOString().split('T')[0] : ''}
              onChange={(e) => setEndDate(e.target.value ? new Date(e.target.value) : null)}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              margin="dense"
              id="name"
              label="Customer Name"
              type="text"
              fullWidth
              variant="outlined"
              defaultValue={name}
              disabled
            />
            <TextField
              margin="dense"
              id="address"
              label="Address"
              type="text"
              fullWidth
              variant="outlined"
              defaultValue={address}
              disabled
            />
            <TextField
              margin="dense"
              id="phoneNumber"
              label="Phone Number"
              type="text"
              fullWidth
              variant="outlined"
              defaultValue={phoneNumber}
              disabled
            />
            <TextField
              margin="dense"
              id="notes"
              label="Notes"
              type="text"
              fullWidth
              variant="outlined"
              defaultValue={''}
              
            />
            <AddServices onSelectedServicesChange={handleSelectedServicesChange} />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleFormClose}>Cancel</Button>
            <Button type="submit">Submit</Button>
          </DialogActions>
        </form>
      </Dialog>
    </React.Fragment>
  );
}

export default withAuth(ViewCustomerEvents);

const Styles = {
  overlayWindow: {
    borderRadius: '45px',
    width: '100%',
  },
  
  eventDetailField: {
    marginBottom: '0px',
    marginTop: '0px',
  },
  serviceAccordion: {
    width: '100%',
    padding: '0px 10px',
    backgroundColor: baselightTheme.palette.primary.main,
    marginTop: '3px',
    color: '#fff',
    
  },
  serviceDayAccordion: {
    width: '100%',
    margin: '0px',
    backgroundColor: baselightTheme.palette.primary.light,
    color: '#fff',
    TextFormatOutlined: '#000'
  },
  serviceAccordionList:{
    width: '100%',
    margin: '0px',
    backgroundColor: baselightTheme.palette.primary.dark,
    marginBottom: '5px',
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
