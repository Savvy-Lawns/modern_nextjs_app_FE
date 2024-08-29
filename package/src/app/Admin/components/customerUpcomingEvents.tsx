import React, { useState, useEffect, FC } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { baselightTheme } from '@/utils/theme/DefaultColors';
import useFetchServices from '../services/services';
import { Service } from './servicesAccordion';
import AddServices from './addServices';
import withAuth from '@/utils/withAuth';
import useFetchEvents from '../customers/events';
import { parseISO, format } from 'date-fns';
import { Accordion, AccordionSummary, AccordionDetails, Typography, duration } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EventSerivceEditForm from './eventServiceEdit';
import MoreButton from './moreButton';


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
  forEach(arg0: (service: any) => void): unknown;
  filter(arg0: (s: any) => boolean): unknown;
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

function groupEventsByMonthAndDay(events: Event[], customerId: string) {
  const filteredEvents = events.filter(event => event.customer_id === customerId);
  console.log('filteredEvents:', filteredEvents);

  // Group events by month and day
  const filteredSortedEvents = filteredEvents.sort((a: any, b: any) => {
    const aDate = parseISO(a.event_services_attributes.start_date);
    const bDate = parseISO(b.event_services_attributes.start_date);
    return aDate.getTime() - bDate.getTime();
  });
  console.log('filteredSortedEvents: ', filteredSortedEvents);

  const groupedEvents: { [month: number]: { [day: number]: Event[] } } = {};

  if (filteredSortedEvents) {
    filteredSortedEvents.forEach(event => {
      const serviceList = event.event_services_attributes;
      if (!serviceList) {
        return;
      }

      serviceList.forEach(service => {
        console.log('Service:', service);
        const startDate = parseISO(service.start_date);
        const month = startDate.getMonth() + 1; // getMonth() returns 0-11, so add 1
        const day = startDate.getDate();
        const dayOfWeek = format(startDate, 'EEEE');
        event.dayOfWeek = dayOfWeek; // Add dayOfWeek to the event object
        console.log('Month:', month);
        console.log('day: ', day);
        console.log('start_date: ', startDate);

        // Filter event_services_attributes to only include services with the same start_date and unique id
        const filteredServices = serviceList.filter(s => s.start_date === service.start_date && s.id === service.id);
        const eventCopy: any = { ...event, event_services_attributes: filteredServices };

        if (!groupedEvents[month]) {
          groupedEvents[month] = {};
        }
        if (!groupedEvents[month][day]) {
          groupedEvents[month][day] = [];
        }
        groupedEvents[month][day].push(eventCopy); // Push the event object with filtered services
        console.log('groupedEvents: ', groupedEvents[month][day]);
      });
    });
  }

  // Sort the months and days
  const sortedGroupedEvents: { [month: number]: { [day: number]: Event[] } } = {};
  Object.keys(groupedEvents)
    .map(month => parseInt(month, 10))
    .sort((a, b) => a - b)
    .forEach(month => {
      sortedGroupedEvents[month] = {};
      Object.keys(groupedEvents[month])
        .map(day => parseInt(day, 10))
        .sort((a, b) => a - b)
        .forEach(day => {
          sortedGroupedEvents[month][day] = groupedEvents[month][day];
        });
    });

  console.log('sorted group events: ', sortedGroupedEvents);
  return sortedGroupedEvents;
}
 

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
  const [serviceFormOpen, setServiceFormOpen] = useState(false);
  const [activeEvent, setActiveEvent] = useState<Event >();


console.log('events before:', events);

useEffect(() => {
  if (open) {
    const active = events.find(event => event.customer_id === id);
    setActiveEvent(active || undefined);
    console.log('active:', active);
  }

  return () => {
    setActiveEvent(undefined); // Clean up when the dialog closes
  };
}, [open, events]);
console.log('events after:', events);

  const servicesMap = services.reduce((acc: { [key: number]: string }, service: Service) => {
    acc[service.id] = service.name;
    return acc;
  }, {});
  const handleSelectedServicesChange = (services: Array<{ duration: number | any; service: Service | null; propertyMetric: number; recurrence: string; }>) => {
    setSelectedServices(services);
  };

  
  
  // const activeEventFieldId = activeEvent.event_id
  const activeEventFieldId = activeEvent ? activeEvent.event_id : null;
  
  console.log('activeEventFeidlId', activeEventFieldId)
  console.log('events bulk:', events);
 

  const handleClickOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    console.log('Selected Services:', SelectedServices);
  }, [SelectedServices]);

 const groupedEvents = groupEventsByMonthAndDay(events, id.toString());

 

 const handleClose = () => {
  setOpen(false);
  setActiveEvent(undefined); // Reset the active event when the dialog closes
};

  const handleFormOpen = () => { setFormOpen(true), console.log(`id: ${id}`) };

  const handleFormClose = () => {
    console.log("Form closed");
    setFormOpen(false);
    
  };
  const handleServiceFormOpen = () => {
    setServiceFormOpen(true);
    console.log(`id: ${id}`);
  };

  const handleServiceFormClose = () => {
    console.log("Service form closed");
    setServiceFormOpen(false);
  };

  const handleAddServiceToActiveEvent = () => {
    if (activeEvent) {
      setFormOpen(true);
      console.log(`Adding service to event id: ${activeEventFieldId}`);
    }
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
          recurrence_series_id: null,
          notes: formJson.notes,
        }))
      }
    };
  
    const apiUrl = `http://10.0.0.198:3000/api/v1/customers/${id}/events`;
  
    try {
      const response = await axios.post(apiUrl, requestData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
  
      if (response.status === 200 || response.status === 201) {
        alert(`Customer event ${activeEvent ? 'service added' : 'created'} successfully`);
        console.log("Event submitted");
        console.log("requestData: ", requestData);
        handleFormClose();
        setSelectedServices([]);
        window.location.href = `/Admin/customers`;
      } else {
        throw new Error(`Failed to ${activeEvent ? 'add service to' : 'create'} customer event. Status code: ${response.status}`);
      }
    } catch (error) {
      console.error(`Error ${activeEvent ? 'adding service to' : 'creating'} customer event:`, error);
    }
  };

  const handleServiceFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log('activeEventFieldId:', activeEventFieldId);

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
      event_services: SelectedServices.map(service => ({
        event_id: activeEventFieldId, 
        service_id: service.service?.id,
        recurrence_type: service.recurrence,
        start_date: startDate,
        end_date: endDate,
        status: "active",
        property_metric: service.propertyMetric,
        duration: service.duration,
        paid: false,
        recurrence_series_id: null,
        notes: formJson.notes,
      }))
    };

    console.log('requestData before send:', requestData);
    
  

    const apiUrl = `http://10.0.0.198:3000/api/v1/customers/${id}/events/${activeEventFieldId}/event_services`;

    try {
      const response = await axios.post(apiUrl, requestData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.status === 200 || response.status === 201) {
        alert(`Event service added successfully`);
        console.log("Service submitted");
        console.log("requestData: ", requestData);
        handleServiceFormClose();
        setSelectedServices([]);
        window.location.href = `/Admin/customers`;
      } else {
        throw new Error(`Failed to add event service. Status code: ${response.status}`);
      }
    } catch (error) {
      console.error(`Error adding event service:`, error);
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
    console.log('grouped Events',groupedEvents);

    console.log('services:', services);
    console.log('serviceId:', serviceId);
    for (const service of services) {
      console.log('services id:', service.id);
      if (service.id === serviceId) {
        return service.name;
      }
    }
    return "service not found";
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
        <DialogContent sx={{'&.MuiDialogContent-root': {padding: '20px 10px', width:'100%', display:"flex", flexDirection:'column', justifyContent:'center', margin:'0 auto', }}}>
          <div>
        {Object.keys(groupedEvents).map((month: string | number) => (
          
          <Accordion style={Styles.serviceAccordion} sx={{'&.Mui-expanded': { marginBottom: '5px', paddingTop:'0px', paddingBottom: '0px',height:'auto', width:'90%', }}} key={month}>
            
            <AccordionSummary expandIcon={<ExpandMoreIcon />} style={Styles.serviceAccordion} sx={{'&.MuiAccordionSummary-content': {marginTop:'0px', marginBottom:'0px'},'&.MuiButtonBase-root':{minHeight:'12px'},'&.Mui-expanded': { paddingTop:'0px', paddingBottom: '0px', minHeight: 'auto', width:'90%', marginTop:'-15px', 
                        marginBottom:'-10px'}}}>
              <Typography variant={'h5'}>{getMonthByIndex(Number(month))}</Typography>
            </AccordionSummary>

            <AccordionDetails sx={{'&.MuiAccordionDetails-root': {padding: '8px 2px 8px',} }}>
              {Object.keys(groupedEvents[month as number]).map((day: string | number) => (
                console.log('day:', day),
                <Accordion style={Styles.serviceDayAccordion} key={day}  sx={{'&.Mui-expanded': {marginTop: '0px', marginBottom: '0px', paddingTop:'0px', paddingBottom: '0px', minHeight: 'auto', width:'90%'}, '&.MuiAccordion-root': {marginBottom:'6px'}}}>

                  <AccordionSummary expandIcon={<ExpandMoreIcon />} 
                  sx={{
                    '&.MuiAccordionSummary-content': {
                      marginTop:'0px', 
                      marginBottom:'0px', },
                    '&.MuiButtonBase-root':{
                      minHeight:'auto', 
                      marginTop:'0px', 
                      marginBottom:'0px'},
                      '&.Mui-expanded': { 
                        paddingTop:'-10px', 
                        paddingBottom: '0px',   
                        marginTop:'-8px', 
                        marginBottom:'-10px'}}}>

                    <Typography variant={'h6'}>{day} - {groupedEvents[month as number][day as number][0].dayOfWeek} </Typography>
                  </AccordionSummary>
                  <AccordionDetails sx={{'&.MuiAccordionDetails-root': {padding: '8px 8px 8px', } }}>
                    
                  {groupedEvents[month as number][day as number].map((event: any, index: any) => (
                    console.log('event:', event),
                    event.event_services_attributes.map((service: any) => (
                      console.log('service:', service),
                      console.log('service id:', service.service_id),
                  <Accordion key={index} sx={{'&.MuiAccordion-root': {backgroundColor:baselightTheme.palette.primary.dark}}}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />} style={Styles.serviceAccordionList} sx={{'&.Mui-expanded': {marginTop: '0px', marginBottom: '0px', paddingTop:'0px', paddingBottom: '0px', minHeight: 'auto', width:'90%', }}}>
                    <Typography variant={'h6'}>{getServiceName(service.service_id)}</Typography>
                    
                  </AccordionSummary>
                  <AccordionDetails style={Styles.serviceItemDetails}>
                    <div>Start Date: {service.start_date}</div>
                    <div>Duration: {service.duration}</div>
                    
                    <div>Status: {statusColor(service.status)}</div>
                    <div>Paid: {isItPaid(service.paid)}</div>
                    <div>Property Metric: {service.property_metric}</div>
                    <div>Recurrence Type: {service.recurrence_type}</div>
                    <div>notes: {service.notes}</div>
                    
                    <div style={Styles.sideBySide}>
                      <div  style={{marginRight:'5px'}}>
                        <MoreButton title="More..." token={token} service_id={service.service_id} start_date={service.start_date} event_service_id={service.id} event_id={activeEventFieldId} customer_id={Number(id)}   />
                    
                    </div><div style={{marginLeft:'5px'}}>
                    <EventSerivceEditForm title="Edit Scheduled Service" event_id={activeEventFieldId} customer_id={Number(id)}  duration={service.duration} status={service.status}  property_metric={service.property_metric} notes={service.notes}  token={token} service_id={service.service_id} start_date={service.start_date} event_service_id={service.id} redirect={1} />
                    </div>
                    </div>
                    </AccordionDetails>
                    
                  </Accordion>
                ))
              ))}


                  </AccordionDetails>
                </Accordion>
              ))}
            </AccordionDetails>
          </Accordion>
        ))}
        </div>
        </DialogContent>
        <DialogActions>
        {activeEvent ? (
  <Button variant="contained" color="primary" onClick={handleServiceFormOpen}>
    Add Service
  </Button>
) : (
  <Button variant="contained" color="primary" onClick={handleFormOpen}>
    Add Event
  </Button>
)}
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
      <Dialog open={serviceFormOpen} onClose={handleServiceFormClose}>
        <form id="add_new_event_service" onSubmit={handleServiceFormSubmit}>
          <DialogTitle>Add New Service</DialogTitle>
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
           
            <AddServices onSelectedServicesChange={handleSelectedServicesChange} />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleServiceFormClose}>Cancel</Button>
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
    TextFormatOutlined: '#000',
    textalign: 'center',
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
  sideBySide:{
    display: 'flex',
    Margin: '0px',
    
  },
  accordionOverflow: {
    overflow: 'auto',
    height: '90%',
  }

};
