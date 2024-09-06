"use client";
import React, {  createContext, useContext, useState,Children, useEffect } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import { BorderBottom, Padding } from '@mui/icons-material';
import { Button, colors } from '@mui/material';
import { text } from 'stream/consumers';
import { baselightTheme } from '@/utils/theme/DefaultColors';
import EditForm from './edit';
import CustomTextField from '@/app/(DashboardLayout)/components/forms/theme-elements/CustomTextField';
import useFetchExpenses from '../expenses/expenses';
import { useExpenseContext } from './expenseContext';

interface Expense {
    id: number;
    name: string;
    measurement_unit: string;
    cost: number; 
    notes: string;
    expense_type: string;
    created_at: Date; 
}

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

  const SelectedExpense = () => {};
  const ExpenseAccordion = ({
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

    const groupExpensesByDate = (expenses: any[]): Record<any, { expenses: Expense[]; total: number; notes: string; }> => {
        return expenses.reduce((acc: Record<any, { expenses: Expense[]; total: number; notes: string; }>, expense: Expense) => {
            const date = new Date(expense.created_at).toDateString(); // Convert to a simple date string for grouping
            if (!acc[date]) {
                acc[date] = { expenses: [], total: 0, notes: '' };
            }
            
            acc[date].expenses.push(expense);
            acc[date].total += Number(expense.cost); // Add expense cost to total for the day
            return acc;
        }, {});
    };


    useEffect(() => {
      setExpense(Expense);
    }, [Expense, setExpense]);
    

    const handleOpen = (expense: typeof Expense) => { // Ensure expense is of type Expense
      setExpense(expense);
      setOpen(true);
    };
  const handleClose = () => setOpen(false);

  const filteredExpenses = expenses.filter((expense:any) =>
    expense.notes.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const groupedExpenses = groupExpensesByDate(filteredExpenses);
  const sortedDates = Object.entries(groupedExpenses).sort((a, b) => new Date(b[0]).getTime() - new Date(a[0]).getTime());
  
  
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

 
{sortedDates.map(([date, { expenses, total }]) => (
            <Accordion key={date}  style={styles.accordionDate}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id={`panel1a-header-${date}`}
                    style={styles.accordionDateSummary}>

                    <Typography variant="h6" style={{ margin: '0 0', paddingLeft: '5px' }}>
                        {date}
                        <Typography variant="body2" style={{ display: 'block', margin:"5px 0px 0px 8px" }}>
                            Total: $ {Number(total).toFixed(2)}
                        </Typography>
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {expenses.map((expense) => (
                <Accordion key={expense.id} sx={styles.accordionStyle}>
                    <AccordionSummary
                    style={styles.AccordionSummaryStyle}
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id={expense.id.toString()}
                    >
                        <div style={{width: '100%', display:'flex', justifyContent:'space-between', paddingLeft:'10px', paddingRight:'20px'}}>
                    <Typography  variant="body1">{expense.name}</Typography>

                     <Typography variant="body1">$ {Number(expense.cost).toFixed(2)}</Typography>
                     </div>
                    </AccordionSummary>
                    <AccordionDetails style={styles.AccordionDetailsStyle}>
            <Typography sx={styles.expenseStyle}>
           
            
            <div>
            <Typography variant='body1'>Notes:</Typography>
            <Typography variant='body2'>{expense.notes}</Typography>
            </div>
            
            
            
            </Typography>
            <div style={styles.sidebyside}>
            <EditForm
          title={`Edit Expense ${expense.name}`}
          name={expense.name}
          cost={expense.cost}
          notes={expense.notes}
          buttonType={1}
          entityId={String(expense.id)}
          entityType='expenses'
          // Do not pass other props that EditForm might accept but you don't want to include
        />
            </div>
          </AccordionDetails>
                </Accordion>
                
            ))}
            </AccordionDetails>
        </Accordion>
    ))}
    
</div>
         
       
  );
}

export default ExpenseAccordion;
console.log(Object.keys(ExpenseAccordion))
export const activeSelection = SelectedExpense

const styles: {
  AccordionDetailsStyle: React.CSSProperties;
  AccordionSummaryStyle: React.CSSProperties;
  sidebyside: React.CSSProperties & { flexDirection: 'row' };
  jobbuttons: React.CSSProperties;
  expenseStyle: React.CSSProperties;
  accordionDateSummary: React.CSSProperties;
  accordionDate: React.CSSProperties;
  accordionStyle: React.CSSProperties;
  
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
    
    
    borderBottom: "3px solid rgba(0,0,0,0.75)",
    
},
accordionDate: {
    backgroundColor: baselightTheme.palette.primary.main,
    borderBottom: "3px solid rgba(0,0,0,0.75)",
    borderBottomLeftRadius: '15px',
    borderBottomRightRadius: '15px',
    marginBottom: '5px',
},

};
