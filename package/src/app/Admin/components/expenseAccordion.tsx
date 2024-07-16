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
    notes?: string;
    title?: string;
    created_at?: Date;
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

    const groupExpensesByDate = (expenses: Expense[]): Record<string, Expense[]> => {
        return expenses.reduce((acc: Record<string, Expense[]>, expense: Expense) => {
            const date = new Date(expense.created_at).toDateString(); // Convert to a simple date string for grouping
            if (!acc[date]) {
                acc[date] = [];
            }
            acc[date].push(expense);
            return acc;
        }, {});
    };


    useEffect(() => {
      setExpense(Expense);
    }, [Expense]);
    

    const handleOpen = (expense: typeof Expense) => { // Ensure expense is of type Expense
      setExpense(expense);
      setOpen(true);
    };
  const handleClose = () => setOpen(false);

  const filteredExpenses = expenses.filter((expense) =>
    expense.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
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

  
        {sortedDates.map(([date, expenses]) => (
            <div key={date}>
                <Typography variant="h6" style={{ margin: '20px 0' }}>
                {date} {/* Display the date */}
                </Typography>
                {expenses.map((expense) => (
                <Accordion key={expense.id}>
                    <AccordionSummary
                    style={styles.AccordionSummaryStyle}
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id={expense.id.toString()}
                    >
                    <Typography style={styles.AccordionSummaryText} variant="body1">
                        {expense.name}
                    </Typography>
                    <Typography variant="body1">$ {expense.cost}</Typography>
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
          user_id={expense.user_id}
          buttonType={1}
          entityId={String(expense.id)}
          entityType='expenses'
          // Do not pass other props that EditForm might accept but you don't want to include
        />
            </div>
          </AccordionDetails>
                </Accordion>
                ))}
            </div>
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
  AccordionSummaryText: React.CSSProperties;
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
expenseStyle:{
    border: '.5px solid rgba(0,0,0,0.65)',
    marginBottom: '10px',
    borderRadius: '15px',
    padding: '8px 0px 10px 15px',
    backgroundColor: 'rgba(256,256,256,0.4)',
    boxShadow: 'inset 0px -2px 2px 1px rgba(0,0,0,0.75)',

},

};
