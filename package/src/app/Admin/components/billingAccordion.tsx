import React, { useState, useEffect, use } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { TextField } from '@mui/material';
import { baselightTheme } from '@/utils/theme/DefaultColors';
import CustomTextField from '@/app/(DashboardLayout)/components/forms/theme-elements/CustomTextField';
import AddTransactions from './addTransaction';
import useFetchUnpaidServices from '../billing/billing';

const BillingAccordion = ({ token }: { token?: string }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [start_date, setStartDate] = useState('');
  const [end_date, setEndDate] = useState('');
  const [amount, setAmount] = useState('');
  const { unpaidServices } = useFetchUnpaidServices(start_date, end_date);
  const [displayData, setDisplayData] = useState(unpaidServices);

 

  console.log('unpaidServices billingpage TOP:', unpaidServices);
  console.log('displayData billingpage TOP:', displayData);
  useEffect(() => {
    const currentMonth = new Date().toLocaleString('default', { month: '2-digit' });
    const lastDayCurrentMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).toLocaleString('default', { day: '2-digit' });
    const currentYear = new Date().getFullYear();
    const currentLastDayMonthYear = `${currentYear}-${currentMonth}-${lastDayCurrentMonth}`;
    const currentFirstDayMonthYear = `${currentYear}-${currentMonth}-01`;

    setStartDate(currentFirstDayMonthYear);
    setEndDate(currentLastDayMonthYear);
  }, []);


  useEffect(() => {
    setDisplayData(unpaidServices);
    
  }, [unpaidServices]);

console.log('unpaidServices billingpage 2:', unpaidServices);
console.log('displayData billingpage 2:', displayData);
  const handleStartDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(event.target.value);
  };

  console.log('unpaidServices (billingpage):', unpaidServices);
  console.log('displayData (billingpage):', displayData);
  console.log('start_date:', start_date);
  console.log('end_date:', end_date);

  const event_service_ids_list: Array<any> = [];
  const event_service_ids = displayData.map((customer: any) => {
    customer.events.map((event: any) => {
      event.event_services.map((service: any) => 
      { event_service_ids_list.push(service.id) });
    });
    console.log('event_service_ids_list:', event_service_ids_list);
    return event_service_ids_list;
  
  });
  let totalServiceCost = 0;
    const calculateTotal = displayData.map((customer: any) => {
      customer.events.map((event: any) => {
        event.event_services.map((service: any) => 
        { totalServiceCost += Number(service.total_service_cost) });
      });
      return totalServiceCost;
    });

  return (
    <div>
      <CustomTextField
        type="search"
        variant="outlined"
        fullWidth
        label="Search"
        mb="10"
        style={{ marginBottom: '20px' }}
        onChange={(e: any) => setSearchQuery(e.target.value)}
      />
      <div style={styles.sideBySide}>
        <TextField
          margin="dense"
          id="start_date"
          label="Start Date"
          type="date"
          fullWidth
          variant="outlined"
          value={start_date}
          onChange={handleStartDateChange}
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
          value={end_date}
          onChange={handleEndDateChange}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>
      <div style={styles.scrollContainer}>
      
        {displayData.map((customer: any) => (
          <Accordion key={customer.id} sx={{'&.MuiAccordion-root': {backgroundColor:baselightTheme.palette.primary.main, borderRadius:'15px', border: `1px solid ${baselightTheme.palette.primary.dark}`,
          }}}>
            <AccordionSummary style={styles.AccordionSummaryStyle} expandIcon={<ExpandMoreIcon /> } sx={{
                    '&.MuiAccordionSummary-root': {
                      borderRadius: '15px',
                      borderBottom: `1px solid ${baselightTheme.palette.primary.dark}`,
                      },}}>
              <Typography>{customer.name}</Typography>
            </AccordionSummary>
            <AccordionDetails style={styles.AccordionDetailsStyle} sx={{
                    '&.MuiAccordionSummary-content': {
                      borderRadius:'15px' },}}>
                        <div style={{marginBottom:'10px'}}>
              <Typography>{customer.address}</Typography>
              </div>
              {customer.events.map((event: any) => (
                <div key={event.id}>
                  <div style={{...styles.sideBySide, width:'100%'}}>
                  <div style={{...styles.sideBySide, width:'60%', verticalAlign:'middle'}}>
                  <Typography>Total: ${calculateTotal}</Typography>
                  <Typography>Amount Paid: {event.amount_paid}</Typography>
                  </div><div>
                  <AddTransactions token={token} event_id={event.id} amount={`$${calculateTotal}`} payment_type={''} event_service_ids={event_service_ids} title={`Submit Payment`} rest={undefined}  /></div></div>
                  {event.event_services.map((service: any) => (
                    <div key={service.id} style={{ ...styles.sideBySide, border: `1px solid ${baselightTheme.palette.primary.light}`, borderRadius:'15px' }}>
                      <div style={styles.servicesCompleted}>
                      <Typography>{service.service_name}</Typography>
                      
                      
                      <Typography>Duration: {service.duration}</Typography>
                        </div>
                        <div style={styles.servicesCost}>
                      <Typography>Cost:<br /> {service.total_service_cost}</Typography>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
              
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