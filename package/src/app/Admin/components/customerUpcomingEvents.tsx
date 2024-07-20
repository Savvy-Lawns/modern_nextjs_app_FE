import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { baselightTheme } from '@/utils/theme/DefaultColors';

interface Props {
  title: string;
  name: string;
  address: string;
  phoneNumber: string;
}

const ViewCustomerEvents: React.FC<Props> = ({ title, name, address, phoneNumber }) => {
  const [open, setOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleFormOpen = () => setFormOpen(true);
  const handleFormClose = () => setFormOpen(false);

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Process form data here
    console.log("Form submitted");
    handleFormClose();
  };

  return (
    <React.Fragment>
      <Button
        style={{ backgroundColor: baselightTheme.palette.primary.main, color: '#fff', padding: '20px 15px', marginRight:'10px'}}
        onClick={handleClickOpen}
      >
        View Upcoming Events
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          {/* Display event list */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleFormOpen}>Add Event</Button>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={formOpen} onClose={handleFormClose}>
        <form onSubmit={handleFormSubmit}>
          <DialogTitle>Add New Event</DialogTitle>
          <DialogContent>
            <TextField
              margin="dense"
              id="name"
              label="Customer Name"
              type="text"
              fullWidth
              variant="outlined"
              defaultValue={name}
              disabled
            />
            <TextField
              margin="dense"
              id="address"
              label="Address"
              type="text"
              fullWidth
              variant="outlined"
              defaultValue={address}
              disabled
            />
            <TextField
              margin="dense"
              id="phoneNumber"
              label="Phone Number"
              type="text"
              fullWidth
              variant="outlined"
              defaultValue={phoneNumber}
              disabled
            />
                        {/* Add more fields as needed */}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleFormClose}>Cancel</Button>
                        <Button type="submit">Submit</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </React.Fragment>
    );
}

export default ViewCustomerEvents;


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