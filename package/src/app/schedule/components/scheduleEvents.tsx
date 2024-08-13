import React, { useState, useEffect, FC, use } from 'react';

import { baselightTheme } from '@/utils/theme/DefaultColors';
import useFetchServices from '@/app/Admin/services/services';
import { Service } from '@/app/Admin/components/servicesAccordion';

import withAuth from '@/utils/withAuth';
import Cookie from 'js-cookie';
import useFetchEvents from './events';
import { parseISO, format } from 'date-fns';
import { Accordion, AccordionSummary, AccordionDetails, Typography, duration, TextField } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EventSerivceEditForm from '@/app/Admin/components/eventServiceEdit';
import MoreButton from '@/app/Admin/components/moreButton';

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

function groupEventsByMonthAndDay(events: Event[], date: string) {
    const parsedDate = parseISO(date);
    console.log('filteredEvents parsedDate:', parsedDate);
    const filteredEvents = events.map(event => {
      const filteredServices = (event.event_services_attributes as EventAttributes).filter(service =>
        parseISO(service.start_date) >= parsedDate
      );
      return { ...event, event_services_attributes: filteredServices };
    });
    console.log('filteredEvents:', filteredEvents);
  
    const groupedEvents: { [month: number]: { [day: number]: Event[] } } = {};
    if (filteredEvents) {
      filteredEvents.forEach(event => {
        const serviceList = event.event_services_attributes as EventAttributes;
        if (!serviceList) {
          return;
        }
        serviceList.forEach((service: { start_date: string; id: string | number; }) => {
          if (!service.start_date) {
            return; // Skip if start_date is undefined
          }
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
          const filteredServices = serviceList.filter((s: { start_date: any; id: any; }) => s.start_date === service.start_date && s.id === service.id);
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
    return groupedEvents;
  }

const ScheduleEvents  = () => {
  
    const [date, setDate] = useState<string>(format(new Date(), 'yyyy-MM-dd'));
    const [activeEvent, setActiveEvent] = useState<Event >();

    const { events, loading, error } = useFetchEvents();
    const { services } = useFetchServices();
    const today = String(Date.now());
useEffect(() => {
    
    if (events) {
        
        console.log('events:', events);
    }
});


console.log('events after:', events);

 


  
 
  
 


 

 const groupedEvents = groupEventsByMonthAndDay(events, date);

 


    const handleDateChange =  (event: React.ChangeEvent<HTMLInputElement>) => {
        setDate(event.target.value);
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
    
      
          <div>
            <div style={{display:'flex', justifyContent:'center', marginBottom:'10px'}}>
            <TextField
              id="date"
              label="Date"
              type="date"
              value={date}
              onChange={handleDateChange}
              InputLabelProps={{
                shrink: true,
              }} />
              </div>
        {Object.keys(groupedEvents).map((month: string | number) => (
          
          <Accordion style={Styles.serviceAccordion} sx={{'&.Mui-expanded': { marginBottom: '5px', paddingTop:'0px', paddingBottom: '0px',height:'100%', width:'90%', }}} key={month}>
            
            <AccordionSummary expandIcon={<ExpandMoreIcon />} style={Styles.serviceAccordion} sx={{'&.MuiAccordionSummary-content': {marginTop:'0px', marginBottom:'0px'},'&.MuiButtonBase-root':{minHeight:'12px'},'&.Mui-expanded': { paddingTop:'0px', paddingBottom: '0px', minHeight: '12px', width:'90%', marginTop:'-15px', 
                        marginBottom:'-10px'}}}>
              <Typography variant={'h5'}>{getMonthByIndex(Number(month))}</Typography>
            </AccordionSummary>

            <AccordionDetails sx={{'&.MuiAccordionDetails-root': {padding: '8px 2px 8px',} }}>
              {Object.keys(groupedEvents[month as number]).map((day: string | number) => (
                console.log('day:', day),
                <Accordion style={Styles.serviceDayAccordion} key={day}  sx={{'&.Mui-expanded': {marginTop: '0px', marginBottom: '0px', paddingTop:'0px', paddingBottom: '0px', minHeight: '100%', width:'90%'}, '&.MuiAccordion-root': {marginBottom:'6px'}}}>

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

                    <Typography variant={'h6'}>{day} - {groupedEvents[month as number][day as number][0].dayOfWeek} </Typography>
                  </AccordionSummary>
                  <AccordionDetails sx={{'&.MuiAccordionDetails-root': {padding: '8px 8px 8px', } }}>
                    
                  {groupedEvents[month as number][day as number].map((event: any, index: any) => (
                    console.log('event:', event),
                    event.event_services_attributes.map((service: any) => (
                      console.log('service:', service),
                      console.log('service id:', service.service_id),
                  <Accordion key={index} sx={{'&.MuiAccordion-root': {backgroundColor:baselightTheme.palette.primary.dark}}}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />} style={Styles.serviceAccordionList} sx={{'&.Mui-expanded': {marginTop: '0px', marginBottom: '0px', paddingTop:'0px', paddingBottom: '0px', minHeight: '100%', width:'90%', }}}>
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
        
     
    
  );
}

export default withAuth(ScheduleEvents);

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
// function isAfter(arg0: Date, parsedDate: Date): boolean {
//     throw new Error('Function not implemented.');
// }

