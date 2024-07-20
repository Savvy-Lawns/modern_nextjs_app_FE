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
    notes: {
        created_at: string;
        note: string;
    }[];
};

export default function ViewNotes({ notes }: Props) {
    const [open, setOpen] = React.useState(false);
    // Ensure displayData is initialized with an array
    const [displayData, setDisplayData] = React.useState<Array<{ created_at: string; note: string; }>>(Array.isArray(notes) ? notes : []);

    const handleClickOpen = () => {
        setOpen(true);
        // Ensure setDisplayData is always called with an array
        setDisplayData(Array.isArray(notes) ? notes : []);
    };

    const handleClose = () => {
        setOpen(false);
    };

    // Debugging: Log the type of displayData before calling reduce
    console.log('Type of displayData:', typeof displayData, Array.isArray(displayData) ? 'Array' : 'Not Array');

    
    

    
    return (
        <React.Fragment>
            <div style={{ display: 'flex', justifyContent: 'center', marginRight:'10px', marginBottom: '10px' }}>
                <Button
                    type="submit"
                    style={{ backgroundColor: baselightTheme.palette.primary.main, color: '#fff', padding: '20px 10px', width:'100%' }}
                    onClick={handleClickOpen}
                >
                    View Notes
                </Button>
            </div>

            <Dialog style={Styles.overlayWindow} open={open} onClose={handleClose} >
                <DialogTitle style={{ display: 'flex', justifyContent: 'center' }}>Notes Details</DialogTitle>
                <DialogContent>
                    <div style={Styles.notesTable}>
                    <Typography variant='body1'>Date</Typography>
                    <Typography variant='body1'>Notes</Typography>
                      </div>
                      <div >
                            {displayData.map((item, index) => (
                                <div style={Styles.notesData} key={index}>
                                    <Typography style={{width:"40%"}} variant='body2'>{item.created_at}</Typography>
                                    <Typography style={{width:"60%"}}variant='body2'>{item.note}</Typography>
                                </div>
                            ))}
                       

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