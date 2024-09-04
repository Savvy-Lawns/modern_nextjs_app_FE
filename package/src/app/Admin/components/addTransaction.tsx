import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import withAuth from '@/utils/withAuth';
import { Typography } from '@mui/material';
import { baselightTheme } from '@/utils/theme/DefaultColors';
import { useRouter } from 'next/router';


type Props = {
    token: string | undefined;
    title?: string;
    event_id: number | string;
    amount: number | string;
    payment_type: string;
    event_service_ids: any[];
    rest: any;
    paidAt: any;
    
};

const AddTransactions = ({ title,  token, event_id, amount, payment_type, event_service_ids, ...rest }: Props) => {
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [paymentType, setPaymentType] = useState(payment_type);
    const [amountValue, setAmount] = useState(amount);
    const [paidAt, setPaidAt] = useState('');
    console.log('amount 1:', amount);
    const today = new Date().toISOString();
      const apiURL =  process.env.NEXT_PUBLIC_API_URL
//const apiURL =  'http://127.0.0.1:3000/api/v1'

    useEffect(() => {
        setAmount(amount);
        setPaidAt(today);
    }, [amount]);
    console.log('event_service_ids:', event_service_ids);
    
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        console.log('event', event)
        // Initialize a new FormData object
        const formDataObj = new FormData();
        console.log('rest:', rest);
        // Dynamically construct the data object based on the form fields
        Object.keys(rest).forEach(key => {
            const inputElement = document.getElementById(key) as HTMLInputElement;
            if (inputElement) {
                // Append data to formDataObj instead of creating a simple object
                formDataObj.append(key, inputElement.value);
            }
        });
       
        // Convert formDataObj to JSON
        const formJson = Object.fromEntries(Array.from(formDataObj.entries()));
        const removeDollarSign = String(amountValue).replace(/\$/g, "");
        const numConvertAmount = Number(removeDollarSign);
        
        
        
    
        try {
            // Ensure the data is nested under the 'service' key
            const requestData = { transaction: {amount: numConvertAmount, payment_type: paymentType, paid_at: paidAt}, event_service_ids: event_service_ids };
            

    
            const response = await axios.post(`${apiURL}/events/${event_id}/transactions`, requestData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            
    
            if (response.status === 200 || response.status === 201) {
                alert(`Payment successfully posted!`);
            
                handleClose();
                window.location.href = `/Admin/billing`;
                
            } else {
                throw new Error(`Failed to make payment. Status code: ${response.status}`);
            }
        } catch (error) {
            console.error(`Error making payment:`, error);
        }
    };

    return (
        <React.Fragment>
           <Button style={Styles.addButton} variant='contained' onClick={handleClickOpen}><Typography variant='body2'>Make Payment</Typography></Button>
            <Dialog open={open} onClose={handleClose}>
                <form onSubmit={handleSubmit}>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogContent>
                            <TextField
                                key={'amount'}
                                margin="dense"
                                id='amount'
                                label='amount'
                                type="text"
                                fullWidth
                                variant="outlined"
                                defaultValue={String(amount)}
                                onChange={(e) => setAmount(e.target.value.replace(/\$/g, ""))}
                            />
                             <TextField
                             key={'payment_type'}
                                select
                                margin="dense"
                                id='payment_type'
                                label='payment_type'
                                type="text"
                                fullWidth
                                variant="outlined"
                                defaultValue={String(payment_type)}
                                value={paymentType}
                                onChange={(e) => setPaymentType(e.target.value)}
                                SelectProps={{
                                    native: true,
                                    }}
                            >
                        
                          
                            <option value=""></option>
                            <option value='cash'>Cash</option>
                            <option value='card'>Card</option>
                            <option value='check'>Check</option>
                            <option value='digital'>Digital</option>
                            <option value='other'>Other</option>
                        </TextField>
                        
                           
                        
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button type="submit">Submit</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </React.Fragment>
    );
};

export default withAuth(AddTransactions);

const Styles = {
    addButton: {
       
        
        backgroundColor: baselightTheme.palette.primary.light,
        color: '#fff',
        paddingBottom: '12px',
        marginBottom: '12px',
        boxShadow: "inset 0px -1px 2px 0px rgba(0,0,0,0.75), 0px 3px 10px 1px rgba(0,0,0,0.75)",
        border: '1px solid rgba(0,0,0,0.45)',
        textBorder: '1 solid rbga(0,0,0,0.45)',
        '&:hover': {
            backgroundColor: baselightTheme.palette.primary.main,
            boxShadow: "inset 0px -1px 2px 0px rgba(0,0,0,0.75), 0px 3px 10px 1px rgba(0,0,0,0.75)",
        border: '1px solid rgba(0,0,0,0.45)',
        textBorder: '1 solid rbga(0,0,0,0.45)',
        },
    },
};