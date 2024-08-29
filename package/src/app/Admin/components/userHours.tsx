import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { baselightTheme } from '@/utils/theme/DefaultColors';
import { Typography } from '@mui/material';

type Props = {
    hours: {
        created_at: string;
        total_hours: number;
    }[];
};

export default function ViewHours({ hours }: Props) {
    const [open, setOpen] = React.useState(false);
    // Ensure displayData is initialized with an array
    const [displayData, setDisplayData] = React.useState<Array<{ created_at: string; total_hours: number; }>>(Array.isArray(hours) ? hours : []);

    const handleClickOpen = () => {
        setOpen(true);
        // Ensure setDisplayData is always called with an array
        setDisplayData(Array.isArray(hours) ? hours : []);
    };

    const handleClose = () => {
        setOpen(false);
    };

    // Debugging: Log the type of displayData before calling reduce
    console.log('Type of displayData:', typeof displayData, Array.isArray(displayData) ? 'Array' : 'Not Array');

    const hoursTotal = Array.isArray(displayData) ? displayData.reduce((acc, item) => acc + item.total_hours, 0) : 0;
    
    

    
    return (
        <React.Fragment>
            <div style={{ display: 'flex', justifyContent: 'space-around', marginRight: '20px', marginTop: '15px', marginBottom: '10px' }}>
                <Button
                    type="submit"
                    style={{ backgroundColor: baselightTheme.palette.primary.main, color: '#fff' }}
                    onClick={handleClickOpen}
                >
                    View Hours
                </Button>
            </div>

            <Dialog style={Styles.overlayWindow} open={open} onClose={handleClose} >
                <DialogTitle style={{ display: 'flex', justifyContent: 'center' }}>Hours Details</DialogTitle>
                <DialogContent>
                    <div style={Styles.hoursTable}>
                    <Typography variant='body1'>Date</Typography>
                    <Typography variant='body1'>Hours</Typography>
                      </div>
                      <div>
                            {displayData.map((item, index) => (
                                <div style={Styles.hoursTable} key={index}>
                                    <Typography variant='body2'>{item.created_at}</Typography>
                                    <Typography variant='body2'>{item.total_hours}</Typography>
                                </div>
                            ))}
                       <div style={Styles.totalHours}><Typography variant='body1'>Total Hours:  {hoursTotal}</Typography></div>

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
    hoursTable: {
        minWidth: '200px',
        width: '100%',
        display: 'flex',
        height: '100%',
        maxHeight: '1000px',
        overflow: 'scroll',
        justifyContent: 'space-between',
    },
    totalHours: {
        display: 'flex',
        justifyContent: 'flex-end',
    }
};