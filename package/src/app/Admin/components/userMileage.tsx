import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { baselightTheme } from '@/utils/theme/DefaultColors';
import { Typography } from '@mui/material';

type Props = {
    mileage: {
        created_at: string;
        miles: number;
    }[];
};

export default function ViewMileage({ mileage }: Props) {
    const [open, setOpen] = React.useState(false);
    // Directly use the mileage prop for displayData
    const [displayData, setDisplayData] = React.useState(mileage);

    const handleClickOpen = () => {
        setOpen(true);
        setDisplayData(mileage); // Directly set mileage to displayData
    };

    const handleClose = () => {
        setOpen(false);
    };

    const milesTotal = displayData.reduce((acc, item) => acc + item.miles, 0);

    return (
        <React.Fragment>
            <div style={{ display: 'flex', justifyContent: 'space-around', marginRight: '20px', marginTop: '15px', marginBottom: '10px' }}>
                <Button
                    type="submit"
                    style={{ backgroundColor: baselightTheme.palette.primary.main, color: '#fff' }}
                    onClick={handleClickOpen}
                >
                    View Mileage
                </Button>
            </div>

            <Dialog style={Styles.overlayWindow} open={open} onClose={handleClose} >
                <DialogTitle style={{ display: 'flex', justifyContent: 'center' }}>Mileage Details</DialogTitle>
                <DialogContent>
                    <div style={Styles.mileageTable}>
                    <Typography variant='body1'>Date</Typography>
                    <Typography variant='body1'>Miles</Typography>
                      </div>
                      <div>
                            {displayData.map((item, index) => (
                                <div style={Styles.mileageTable} key={index}>
                                    <Typography variant='body2'>{item.created_at}</Typography>
                                    <Typography variant='body2'>{item.miles}</Typography>
                                </div>
                            ))}
                       <div style={Styles.totalMiles}><Typography variant='body1'>Total Miles:  {milesTotal}</Typography></div>

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
    mileageTable: {
        minWidth: '200px',
        width: '100%',
        display: 'flex',
        height: '100%',
        maxHeight: '1000px',
        overflow: 'scroll',
        justifyContent: 'space-between',
    },
    totalMiles: {
        display: 'flex',
        justifyContent: 'flex-end',
    }
};