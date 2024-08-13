"use-client"
import { Accordion, AccordionSummary, AccordionDetails, Typography, } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { baselightTheme } from '@/utils/theme/DefaultColors';
import useFetchShiftServices from './shiftServices';
import { use, useEffect, useState } from 'react';



const TodaysServices = ({ onSetFirstService }: { onSetFirstService: any }) => {
  const { shiftServices, loading, error } = useFetchShiftServices();
  const [services, setServices] = useState<any[]>([]);
  const [firstService, setFirstService] = useState<any>(null);

  useEffect(() => {
    setServices(shiftServices);
    
}, [shiftServices]);

  useEffect(() => {
  if (services.length > 0 && services[0]) {
    onSetFirstService(services[0].customer_address);
  }
}, [onSetFirstService, services]); 

  const minutesToHours = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    const time = hours === 0 ? `${remainingMinutes} minutes` : `${hours} hours ${remainingMinutes} minutes`;
    return time;
  };

   const handleSetFirstService = (services: any) => {
    setFirstService(services[0].customer_address);
  };

  
  return (
    
    <div>
      
      {services.map((customer: any) => (
       <Accordion key={customer.id} sx={{'&.MuiAccordion-root': {backgroundColor:baselightTheme.palette.primary.main, borderRadius:'15px', border: `1px solid ${baselightTheme.palette.primary.dark}`,
      }}}>
        <AccordionSummary style={styles.AccordionSummaryStyle} expandIcon={<ExpandMoreIcon /> } sx={{
                '&.MuiAccordionSummary-root': {
                  borderRadius: '15px',
                  borderBottom: `1px solid ${baselightTheme.palette.primary.dark}`,
                  },}}>
        <Typography variant='h6' style={{color:'#fff'}}>{customer.customer_name}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div style={styles.AccordionSummaryStyle}>
          
            
            {customer.event_services.map((service: any) => (
            <div key={service.event_service_id} style={{...styles.servicesCompleted, color:'#fff', backgroundColor:baselightTheme.palette.primary.light, marginLeft:'0px', paddingLeft:'10px',textAlign:'left', marginBottom:'0px',paddingBottom:'0px', paddingTop:'5px', marginTop:'0px'}}>
              <Typography variant='body1'>{service.service_name}</Typography>
              <Typography sx={{fontSize:'10px'}}>{minutesToHours(service.duration)}</Typography>
            </div>
))}
          
          
          </div>

          <div style={{...styles.sideBySide, color:'#fff', marginTop:'10px'}}>
            <div style={{width:'50%', textAlign:'center'}}>
              <Typography>Phone:</Typography>
              <Typography>{customer.customer_phone}</Typography>
              </div>
            <div  style={{width:'50%', textAlign:'center'}}><Typography>{customer.customer_address}</Typography></div>
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