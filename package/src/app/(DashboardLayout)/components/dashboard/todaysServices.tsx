"use-client"
import { Accordion, AccordionSummary, AccordionDetails, Typography, } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { baselightTheme } from '@/utils/theme/DefaultColors';
import useFetchShiftServices from './shiftServices';
import { use, useEffect, useState } from 'react';
import CompleteEventServices from '@/app/Admin/components/complete';



const TodaysServices = ({ onSetFirstService }: { onSetFirstService: any }) => {
  const { shiftServices, loading, error } = useFetchShiftServices();
  const [services, setServices] = useState<any[]>([]);
  const [firstService, setFirstService] = useState<any>(null);
  const [serviceNameList, setServiceNameList] = useState<any[]>([]);
  const [completedEventServices, setCompletedEventServices] = useState<any[]>([]);
  const [addressList, setAddressList] = useState<any[]>([]);
  
  console.log('ShiftServices:', shiftServices);

  useEffect(() => {
    const sortCompletedServices = () => {
      const completedCustomers:any = [];
      const activeCustomers:any = [];
      const uniqueCustomerIds = new Set();
  
      shiftServices.forEach((customer: any) => {
        if (!uniqueCustomerIds.has(customer.customer_id)) {
          uniqueCustomerIds.add(customer.customer_id);
          const allServicesCompleted = customer.event_services.every((service: any) => service.status === 'completed');
          if (allServicesCompleted) {
            completedCustomers.push(customer);
          } else {
            activeCustomers.push(customer);
          }
        }
      });
  
      // Combine active customers with completed customers at the end
      const sortedServices = [...activeCustomers, ...completedCustomers];
      setServices(sortedServices);
    };
  
    sortCompletedServices();
  }, [shiftServices]);

useEffect(() => {
  let addresses: any = [];
  services.map((customer: any) => {
    addresses.push(customer.customer_address);
  });
  setAddressList(addresses);
});

  useEffect(() => {
  if (services[0]) {
    
    onSetFirstService(services[0].customer_address);
  }
}, [onSetFirstService, services]); 


  useEffect(() => {
    let serviceNames_list: any = [];
    services.map((customer: any) => {
      customer.event_services.map((service: any) => {
        serviceNames_list.push(service.service_name);
      });
    });
  });

  const minutesToHours = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    const time = hours === 0 ? `${remainingMinutes} minutes` : `${hours} hours ${remainingMinutes} minutes`;
    return time;
  };
console.log('services2 useeffect: ', services);
  const handleSetFirstService = (services: any) => {
    setFirstService(services[0].customer_address);
  };
console.log('firstService:', firstService); 

  const listEventServiceId: any = [];
  const handleListEventServiceId = (event_service_id: number) => {

    listEventServiceId.push(event_service_id);
  };

 const uniqueCompleted = [...new Set(completedEventServices.map((customer: any) => customer.customer_id))];

  const event_service_ids_list: Array<any> = [];

  const event_service_ids = services.map((customer: any) => {
    
      customer.event_services.map((service: any) => 
      { event_service_ids_list.push(service.event_service_id) });
  
    console.log('event_service_ids_list:', event_service_ids_list);
    return event_service_ids_list;
  
  });


  
  return (
    
    <div>
      
      {services.map((customer: any) => (
       <Accordion key={customer.id} sx={{'&.MuiAccordion-root': {backgroundColor:baselightTheme.palette.primary.main, borderRadius:'15px', border: `1px solid ${baselightTheme.palette.primary.dark}`
      }}}>
        <AccordionSummary style={styles.AccordionSummaryStyle} expandIcon={<ExpandMoreIcon /> } sx={{
                '&.MuiAccordionSummary-root': {
                  borderRadius: '15px',
                  borderBottom: `1px solid ${baselightTheme.palette.primary.dark}`,
                  }, '&.MuiAccordionSummary-content': {margin:' 0px'}}}>
        <Typography variant='h6' style={{color:'#fff'}}>{customer.customer_name}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div style={styles.AccordionSummaryStyle}>
          
            <div style={{...styles.sideBySide, justifyContent:'space-evenly'}}> 
              <div style={{width:'60%', paddingBottom:'10px'}}>

            {customer.event_services.map((service: any) => (
            <div key={service.event_service_id} style={{...styles.servicesCompleted, color:'#fff', backgroundColor:baselightTheme.palette.primary.light, marginLeft:'0px', paddingLeft:'10px',textAlign:'left', marginBottom:'0px',paddingBottom:'0px', paddingTop:'5px', marginTop:'10px'}}>

              <Typography variant='subtitle2'>{service.service_name}</Typography>
              <Typography sx={{fontSize:'10px', lineHeight:'13px'}}>{minutesToHours(service.duration)}</Typography>
              <Typography sx={{fontSize:'10px', lineHeight:'13px'}}>Notes: {service.notes}</Typography>
              <Typography sx={{fontSize:'10px', lineHeight:'13px'}}>Status: {service.status}</Typography>
            </div>
        ))}
        </div>
            <div style={{width:'25%', verticalAlign:'middle', position:'relative', marginRight:'50px'}}> 
            <CompleteEventServices  buttonType={1} event_service_ids={customer.event_services.map((service: any) => (
              {event_service_id: service.event_service_id,
              service_name: service.service_name, duration:service.duration, property_metric:service.property_metric, notes:service.notes}))} customer_id={customer.customer_id} event_id={customer.event_services[0].event_id}  />
            
            </div>
            </div>
        
          
          </div>
  

          <div style={{...styles.sideBySide, color:'#fff', marginTop:'10px'}}>
            <div style={{width:'50%', textAlign:'center'}}>
              <Typography variant='h6'>Phone:</Typography>
              <Typography variant='body2'>{customer.customer_phone}</Typography>
              </div>
              
            <div  style={{width:'50%', textAlign:'center'}}>
            <Typography variant='h6'>Address:</Typography>
              <Typography variant='body2'>{customer.customer_address}</Typography></div>
           
            </div>
          </AccordionDetails>
        
        </Accordion>
      ))}


       

    </div>
      
      )}
      

export default TodaysServices;

const styles: {
  AccordionDetailsStyle: React.CSSProperties;
  AccordionSummaryStyle: React.CSSProperties;
  sideBySide: React.CSSProperties;
  serviceStyle: React.CSSProperties;
  scrollContainer: React.CSSProperties;
  servicesCompleted: React.CSSProperties;
  servicesCost: React.CSSProperties;
} = {
  AccordionDetailsStyle: {
    backgroundColor: baselightTheme.palette.primary.main,
    color: baselightTheme.palette.primary.contrastText,
    borderRadius: '0px 0px 15px 15px',
  },
  AccordionSummaryStyle: {
    backgroundColor: baselightTheme.palette.primary.light,
    color: baselightTheme.palette.primary.contrastText,
    borderRadius: '15px 15px 15px 15px ',
    verticalAlign: 'middle',
  },
  sideBySide: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: '10px',
  },
  serviceStyle: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  scrollContainer: {
    maxHeight: '400px',
    overflowY: 'auto',
  },
  servicesCompleted: {
    backgroundColor: baselightTheme.palette.primary.light,
    padding: '10px',
    borderRadius: '15px 0 0 15px',
    width: '65%',
  },
  servicesCost: {
    textAlign: 'center',
    verticalAlign: 'middle',
    margin: 'auto',
    padding: '10px',
    backgroundColor: 'rgba(0,0,0,0.5)',
    width: '35%',
    borderRadius: '0 15px 15px 0 ',
  },
};