import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { baselightTheme } from '@/utils/theme/DefaultColors';
import { IconCirclePlus, IconPencil } from '@tabler/icons-react';
import { Typography } from '@mui/material';

type Props = {
    title?: string;
    userId?: number;
    name?: string;
    phone?: string;
    email?: string;
    acctType?: number;
    mileage?: number;
    hours?: number;
    serviceMeasurement?: string;
    serviceCost?: number;
    serviceType?: number;
    
    customerName?: string;
    
    customerNoteDate?: string;
    customerNote?: string;
   
    
    upcomingEventsId?: number;
    upcomingEventsDateService?: string;
    upcomingEventsStatus?: string;
    upcomingEventsIsPaid?: boolean;
    upcomingEventsEstimatedTime?: number;
    upcomingEventsNoteDate?: string;
    upcomingEventsNote?: string;
    upcomingEventsServices?: {
        service: string;
        estimatedPrice: number;
    }[];
    
   
      
    address?: string;
   
     
    

    buttonType: number;
};

export default function EditForm({ title, buttonType,  ...rest }: Props) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    // Debugging: Log the rest props to see what's being passed
    console.log('Rest props:', rest);

    return (
        <React.Fragment>
            {buttonType === 1 && <Button sx={Styles.jobbuttons} color='secondary' variant='outlined' onClick={handleClickOpen}>Edit</Button>}
{buttonType === 2 && <IconPencil size={20} onClick={handleClickOpen}/>}
{buttonType === 3 && <div style={{display:'flex'}} onClick={handleClickOpen}><Typography variant='body2'>+ Add New</Typography>
</div>}

            
            <Dialog style={Styles.overlayWindow} open={open} onClose={handleClose}>
                <form
                    onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
                        event.preventDefault();
                        const formData = new FormData(event.currentTarget);
                        const formJson = Object.fromEntries(formData.entries());
                        console.log(formJson); // Now logs all form fields
                        handleClose();
                    }}
                >
                    <DialogTitle style={{display:'flex', justifyContent:'center'}}>{title}</DialogTitle>
                    <DialogContent>
                        {Object.entries(rest).map(([propName, propValue]) => (
                            <TextField
                                key={propName}
                                margin="dense"
                                id={propName}
                                label={propName.charAt(0).toUpperCase() + propName.slice(1)}
                                type="text"
                                fullWidth
                                variant="outlined"
                                defaultValue={propValue}
                            />
                        ))}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button type="submit">Save</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </React.Fragment>
    );
}

const Styles = {
  
    overlayWindow: {
       borderRadius: '45px',
    },
    jobbuttons: {
      marginTop: '10px',
      backgroundColor: baselightTheme.palette.secondary.light,
      color: baselightTheme.palette.secondary.contrastText,
      borderRadius: '15px',
   },
};