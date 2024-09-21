"use client";
import React, {  createContext, useContext, useState,Children, useEffect } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import { BorderBottom, Padding } from '@mui/icons-material';
import { Button, colors, Dialog, DialogActions, DialogContent } from '@mui/material';
import { text } from 'stream/consumers';
import { baselightTheme } from '@/utils/theme/DefaultColors';
import EditForm from './edit';
import CustomTextField from '@/app/(DashboardLayout)/components/forms/theme-elements/CustomTextField';
import useFetchExpenses from '../expenses/expenses';
import { useExpenseContext } from './expenseContext';
import useFetchFinanceReport from '../finance/finance';
import Cookie from 'js-cookie';
import axios from 'axios';

interface Expense {
    id: number;
    name: string;
    measurement_unit: string;
    cost: number; 
    notes: string;
    expense_type: string;
    created_at: Date; 
};
interface Report {
    name: string;
    start_date: Date;
    end_date: Date;
    total_revenue: string;
    total_expenses: string;
    total_miles: string;
    total_hours_worked: string;
};

type Props = {
    expenseId?: number;
    name?: string;
    cost?: number;
    user_id?: number;
    expense_type?: string;
    title?: string;
    created_at?: Date;
    notes?: string; // Add the 'notes' property to the Props interface
};

  
  const FinanceAccordion = ({
    expenseId,
    name,
    cost,
    notes,
    user_id,
    expense_type,
    created_at,
  }: Props) => {
    
   
    const [open, setOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const { expenses, loading, error } = useFetchExpenses();
    const { Expense, setExpense } = useExpenseContext();
    const { reports} = useFetchFinanceReport();
    const [report, setReport] = useState();
    const [allReports, setAllReports] = useState(reports);
    const [start_date, setStartDate] = useState('');
    const [end_date, setEndDate] = useState('');
    const [openReport, setOpenReport] = useState(false);
    const [newGeneratedReport, setNewGeneratedReport] = useState<Report | undefined >();
    const apiURL =  process.env.NEXT_PUBLIC_API_URL




    useEffect(() => {
      setExpense(Expense);
      if (reports) {
      setAllReports(reports);
    }
    }, [Expense, setExpense]);
    

    const handleOpen = () => { 
      setOpen(true);
    };
  const handleClose = () => setOpen(false);
  const handleOpenReport = () => { 
    setOpenReport(true);
  };
  const handleCloseReport = () => {setOpenReport(false); handleCloseReport(); handleClose();}

  const handleGenerateReport = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data: any = {start_date: start_date, end_date: end_date};
    if (!data) return;
    const token = Cookie.get('token');
    if (!token) {
      alert('Token not found. User must be authenticated.');
      window.location.href = '/authentication/login';
      return;
    }

    try {
      const dates = {start_date: start_date, end_date: end_date};
      const response:any = await axios.post(`${apiURL}/summaries/generate`, dates, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
    }    
  });

  if (response.status === 200 || response.status === 201) {
    alert(`Report saved successfully`);
    setNewGeneratedReport(response.data);
    handleOpenReport();
    

    
    
} else {
    alert(`Failed to save the report. Status code: ${response.status}`)
    throw new Error(`Failed to save the report. Status code: ${response.status}`);
}

  const data = response.data;
  
  setReport(data);
} catch (error) {
  console.error('Failed to fetch users:', error);
  alert(`Failed to generate reports: ${error}`);
}  finally {
  handleOpenReport();
}
}

const handleSaveReport = async (event: React.FormEvent<HTMLFormElement>) => {
  
  if (!newGeneratedReport) return;

  const token = Cookie.get('token');
  if (!token) {
    alert('Token not found. User must be authenticated.');
    window.location.href = '/authentication/login';
    return;
  }

  try {
    const response = await axios.post(`${apiURL}/summaries`,report,  {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
  }    
});

if (response.status === 200 || response.status === 201) {
  alert(`Report saved successfully`);
} else {
  alert(`Failed to generate reports: ${error}`);
  throw new Error('Network response was not ok');
}

const data = response.data;

setReport(data);
} catch (error) {
console.error('Failed to fetch users:', error);
alert(`Failed to generate reports: ${error}`);
}  finally {
handleOpenReport();
}};

function CalculateTotalProfit(revenue: string, expenses: string) {
  const totalRevenue = parseFloat(revenue);
  const totalExpenses = parseFloat(expenses);

  return totalRevenue - totalExpenses;
};
 
  
  
  return (
    <React.Fragment>
      <div style={styles.ReportList}>
  {reports ? (reports.map((report: Report) => (
    <Accordion style={styles.accordionStyle}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        style={styles.accordionDateSummary}
      >
        <Typography style={styles.accordionDate}>{report.name}</Typography>
      </AccordionSummary>
      <AccordionDetails style={styles.AccordionDetailsStyle}>
        <Typography>Total Revenue: {report.total_revenue}</Typography>
        <Typography>Total Expenses: {report.total_expenses}</Typography>
        <Typography>Total Profit: {CalculateTotalProfit(report.total_revenue, report.total_expenses)}</Typography>
        <Typography>Total Miles: {report.total_miles}</Typography>
      </AccordionDetails>
    </Accordion>
  ))) : (
    <Typography style={{marginBottom:'15px'}}>No reports found, please try to refresh.</Typography>
  )}


  <Button
    variant="contained"
    color="primary"
    onClick={handleOpen} 
    >Generate a Report</Button>

</div>
<Dialog open={open} onClose={handleClose}>
  <form onSubmit={handleGenerateReport}>
  <DialogContent>
    <Typography variant="h5">Generate a report</Typography>
    <CustomTextField
      type="date"
      variant="outlined"
      fullWidth
      label="Start Date"
      mb="10"
      style={{ marginBottom: '20px' }}
      onChange={(e: any) => setStartDate(e.target.value)} />
    <CustomTextField 
      type="date"
      variant="outlined"
      fullWidth
      label="End Date"
      mb="10"
      style={{ marginBottom: '20px' }}
      onChange={(e: any) => setEndDate(e.target.value)} />
  </DialogContent>
  <DialogActions>
    <Button type="submit" >Submit</Button>
    <Button onClick={handleClose}>Cancel</Button>
  </DialogActions>
  </form>
  </Dialog>

  
    {newGeneratedReport ? (
      <Dialog open={openReport} onClose={handleCloseReport}>
    <form onSubmit={handleSaveReport}>
      <DialogContent>
        <Typography variant="h5">{newGeneratedReport.name}</Typography> 
        <Typography variant="h6">Total Revenue: {newGeneratedReport.total_revenue}</Typography>
        <Typography variant="h6">Total Expenses: {newGeneratedReport.total_expenses}</Typography>
        <Typography variant="h6">Total Profit: {CalculateTotalProfit(newGeneratedReport.total_revenue, newGeneratedReport.total_expenses)}</Typography>
        <Typography variant="h6">Total Miles: {newGeneratedReport.total_miles}</Typography>
        <Typography variant="h6">Total Hours Worked: {newGeneratedReport.total_hours_worked}</Typography>
  </DialogContent>
  <DialogActions>
    <Button type="submit" >Submit</Button>
    <Button onClick={handleCloseReport}>Cancel</Button>
  </DialogActions>
  </form> 
  </Dialog>) : (
    <Dialog open={openReport} onClose={handleCloseReport}>
    <DialogContent>
    <Typography variant="h5">Sorry!</Typography>
    <Typography variant="h6">Failed to generate a report</Typography>
  </DialogContent>
  <DialogActions>
    <Button type="submit" >Retry?</Button>
    <Button onClick={handleCloseReport}>Cancel</Button>
  </DialogActions>
  </Dialog>
  )
  }
  
         
</React.Fragment>
  );
}

export default FinanceAccordion;



const styles: {
  AccordionDetailsStyle: React.CSSProperties;
  AccordionSummaryStyle: React.CSSProperties;
  sidebyside: React.CSSProperties & { flexDirection: 'row' };
  jobbuttons: React.CSSProperties;
  expenseStyle: React.CSSProperties;
  accordionDateSummary: React.CSSProperties;
  accordionDate: React.CSSProperties;
  accordionStyle: React.CSSProperties;
  ReportList: React.CSSProperties;
} = {
    accordionStyle: {
        backgroundColor: 'transparent',
        boxShadow: 'none',
        border: 'none',
        marginBottom: '0px',
        height: 'auto',
        marginTop: '-1px',
        
    },
 AccordionDetailsStyle: {
    backgroundColor: baselightTheme.palette.primary.dark,
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
expenseStyle:{
    border: '.5px solid rgba(0,0,0,0.65)',
    marginBottom: '10px',
    borderRadius: '15px',
    padding: '8px 0px 10px 15px',
    backgroundColor: 'rgba(256,256,256,0.4)',
    boxShadow: 'inset 0px -2px 2px 1px rgba(0,0,0,0.75)',

},
accordionDateSummary: {
    backgroundColor: baselightTheme.palette.primary.main,
    color: baselightTheme.palette.primary.contrastText,
    borderBottom: '1px solid rgba(0,0,0,0.75)',
    marginBottom: '10px',
    
    
   
    
},
accordionDate: {
    backgroundColor: baselightTheme.palette.primary.main,
   
    
},
ReportList: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',

    
},


};
