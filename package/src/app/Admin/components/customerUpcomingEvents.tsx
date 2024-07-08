import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { baselightTheme } from '@/utils/theme/DefaultColors';
import { Typography } from '@mui/material';
import { BorderBottom } from '@mui/icons-material';

type Props = {
        title: string;
        upcomingEventsEventId: number;
        upcomingEventsDateService: string;
        upcomingEventsService: string;
        upcomingEventsEstimatedPrice: number;
        upcomingEventsStatus: string;
        upcomingEventsIsPaid: boolean;
        upcomingEventsEstimatedTime: number;
        upcomingEventsAddress: string;
        notesCreated_at: string;
        notesNote: string;
        servicesService: string;
        servicesEstimatedPrice: number;
        servicesEstimatedTime: number;
};

export default function ViewCustomerEvents({ title, ...rest }: Props) {
    const [open, setOpen] = React.useState(false);
    // Ensure displayData is initialized with an array
    

    const handleClickOpen = () => {
        setOpen(true);
        // Ensure setDisplayData is always called with an array
    };

    const handleClose = () => {
        setOpen(false);
    };


    
    

    
    return (
        <React.Fragment>
            <div style={{ display: 'flex', justifyContent: 'space-around', marginRight: '20px', marginTop: '15px', marginBottom: '10px' }}>
                <Button
                    type="submit"
                    style={{ backgroundColor: baselightTheme.palette.primary.main, color: '#fff' }}
                    onClick={handleClickOpen}
                >
                    View Upcoming Events
                </Button>
            </div>

            <Dialog style={Styles.overlayWindow} open={open} onClose={handleClose} >
                <DialogTitle style={{ display: 'flex', justifyContent: 'center' }}>{title}</DialogTitle>
                <DialogContent>
                    <div style={Styles.notesTable}>
                    
                      </div>
                      <div >
                            
                       

                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}

const Styles = {
    overlayWindow: {
        borderRadius: '45px',
        width: '100%',
    },
    notesTable: {
        minWidth: '200px',
        width: '100%',
        display: 'flex',
        height: '100%',
        maxHeight: '1000px',
        overflow: 'scroll',
        justifyContent: 'space-around',

    },
    totalNotes: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    notesData: {
        minWidth: '200px',
        width: '100%',
        display: 'flex',
        height: '100%',
        maxHeight: '1000px',
        overflow: 'scroll',
        justifyContent: 'space-around',
        borderBottom: "1px solid black",
        marginBottom: "10px",
    }
};