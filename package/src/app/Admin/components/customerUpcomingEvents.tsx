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
import { format, parseISO } from 'date-fns';
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

interface Event {
  customer_id: number | string;
  event_services_attributes: Array<{
    service_id: number;
    recurrence_type: string;
    start_date: string;
    end_date: string;
    status: string;
    property_metric: number;
    duration: number;
    paid: boolean;
    notes: string;
    recurrence_series_id: number | null;
    service_name: string;
  }>;
}

interface ChildComponentProps {
  events: Event[];
  service_name: string;
}

const groupEventsByMonthAndDay = (events: Event[], servicesMap: { [key: number]: string }) => {
  const groupedEvents: { [month: string]: { [day: string]: Event[] } } = {};

  events.forEach(event => {
    event.event_services_attributes.forEach(service => {
      if (service.start_date) {
        try {
          const eventDate = parseISO(service.start_date);
          const month = format(eventDate, 'MM');
          const day = format(eventDate, 'dd');

          if (!groupedEvents[month]) {
            groupedEvents[month] = {};
          }

          if (!groupedEvents[month][day]) {
            groupedEvents[month][day] = [];
          }

          // Convert service_id to service_name
          const serviceWithDetails = {
            ...service,
            service_name: servicesMap[service.service_id] || 'Unknown Service'
          };

          // Push the event with the updated service details
          groupedEvents[month][day].push({
            ...event,
            event_services_attributes: event.event_services_attributes.map(s => 
              s.service_id === service.service_id ? serviceWithDetails : s
            )
          });
        } catch (error) {
          console.error(`Error parsing date for service: ${service.start_date}`, error);
        }
      } else {
        console.warn(`Service with id ${service.service_id || 'undefined'} has an undefined start_date`);
      }
    });
  });

  return groupedEvents;
};

 

const ViewCustomerEvents: FC<Props> = ({ title, name, address, phoneNumber, id, token, ...rest }) => {
  const [open, setOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [SelectedServices, setSelectedServices] = useState<Array<{ service: Service | null, propertyMetric: number, recurrence: string }>>([]);
  const [startDate, setStartDate] = useState<Date | null | undefined>(new Date());
  const [endDate, setEndDate] = useState<Date | null | undefined>(new Date());

  const { events, loading, error } = useFetchEvents(id);
  const { services } = useFetchServices();

  const servicesMap = services.reduce((acc: { [key: number]: string }, service: Service) => {
    acc[service.id] = service.name;
    return acc;
  }, {});
  const handleSelectedServicesChange = (services: Array<{ duration: any; service: Service | null; propertyMetric: number; recurrence: string }>) => {
   return events
  };

  const groupedEvents = groupEventsByMonthAndDay(events || [], servicesMap);

  

  const handleClickOpen = () => {
    setOpen(true);
    console.log(events)
    console.log(groupedEvents)
 
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
        event_services_attributes: SelectedServices.map(service => ({
          service_id: service.service?.id,
          recurrence_type: service.recurrence,
          start_date: startDate,
          end_date: endDate,
          status: "active",
          property_metric: service.propertyMetric,
          duration: 60,
          paid: false,
          notes: Date.now,
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
        handleFormClose();
        setSelectedServices([]);
      } else {
        throw new Error(`Failed to create customer event. Status code: ${response.status}`);
      }
    } catch (error) {
      console.error(`Error creating customer event:`, error);
    }
  };

  const isItPaid = (paid: boolean) => {
    if (paid) {
      return <span style={{ color: baselightTheme.palette.primary.main }}>Paid</span>;
    } else {
      return <span style={{ color: baselightTheme.palette.warning.main }}>Not Paid</span>;
    }
  };

  const statusColor = (status: string) => {
    if (status === 'active') {
      return <span style={{ color: baselightTheme.palette.primary.light }}>Active</span>;
    } else if (status === 'cancelled') {
      return <span style={{ color: baselightTheme.palette.error.main }}>Cancelled</span>;
    } else if (status === 'completed') {
      return <span style={{ color: baselightTheme.palette.primary.main }}>Completed</span>;
    }
  };

  const getMonthName = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const getMonthById = (monthId: number) => getMonthName[monthId - 1];
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
        {Object.keys(groupedEvents).map(month => (
          
          <Accordion style={Styles.serviceAccordion} sx={{'&.Mui-expanded': { marginBottom: '5px', paddingTop:'0px', paddingBottom: '0px',height:'100%', width:'90%'}}} key={month}>
            
            <AccordionSummary expandIcon={<ExpandMoreIcon />} style={Styles.serviceAccordion} sx={{'&.MuiAccordionSummary-content': {marginTop:'0px', marginBottom:'0px'},'&.MuiButtonBase-root':{minHeight:'12px'},'&.Mui-expanded': { paddingTop:'0px', paddingBottom: '0px', minHeight: '12px', width:'90%', marginTop:'-15px', 
                        marginBottom:'-10px'}}}>
              <Typography variant={'h5'}>{getMonthById(Number(month))}</Typography>
            </AccordionSummary>

            <AccordionDetails sx={{'&.MuiAccordionDetails-root': {padding: '8px 2px 8px',} }}>
              {Object.keys(groupedEvents[month]).map(day => (
                
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
                    {groupedEvents[month][day].map((service, index) => (
                      <div key={index}>
                        <Accordion key={index} style={Styles.serviceAccordionList}>
                          <AccordionSummary expandIcon={<ExpandMoreIcon />} >
                            <Typography>{service.event_services_attributes[index].service_name}<br />{statusColor(service.event_services_attributes[index].status)} - {isItPaid(service.event_services_attributes[index].paid)}</Typography>
                          </AccordionSummary>
                          <AccordionDetails style={Styles.serviceItemDetails}>
                            <Typography style={Styles.eventDetailField}>Duration: {service.event_services_attributes[index].duration} Minutes</Typography>
                            <Typography style={Styles.eventDetailField}>Property Metric: {service.event_services_attributes[index].property_metric}</Typography>
                            <Typography style={Styles.eventDetailField}>Notes: {service.event_services_attributes[index].notes}</Typography>
                          </AccordionDetails>
                        </Accordion>
                      </div>
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
};

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