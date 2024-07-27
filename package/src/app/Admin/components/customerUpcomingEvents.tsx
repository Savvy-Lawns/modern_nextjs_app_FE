import React, { useState, useEffect, FC, ReactNode } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField, { FilledTextFieldProps, OutlinedTextFieldProps, StandardTextFieldProps, TextFieldVariants } from '@mui/material/TextField';
import { baselightTheme } from '@/utils/theme/DefaultColors';
import Autocomplete from '@mui/material/Autocomplete';
import useFetchServices from '../services/services'
import { Service } from './servicesAccordion';
import AddServices from './addServices';
import withAuth from '@/utils/withAuth';
import { rest } from 'lodash';
import Cookie from 'js-cookie';


interface Props {
  title: string;
  id: number | string;
  name: string;
  address: string;
  phoneNumber: string;
  token: string | undefined;
  

}

const ViewCustomerEvents: FC<Props> = ({ title, name, address, phoneNumber, id, token }) => {
  const [open, setOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [SelectedServices, setSelectedServices] = useState<Array<{ service: Service | null, propertyMetric: number, recurrence: string }>>([]);
  const [startDate, setStartDate] = useState<Date | null | undefined>(new Date());
  const [endDate, setEndDate] = useState<Date | null | undefined>(new Date());

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleFormOpen = () => setFormOpen(true);
  const handleFormClose = () => {
    console.log("Form closed");
    setFormOpen(false);
  }

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    // Set API call here
    
    // Initialize a new FormData object
    const formDataObj = new FormData();
    
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
    const customer = 'customers';
    const customerId = id;

    const apiUrl = `http://127.0.0.1:3000/api/v1/customers/${customerId}/events`;

    try {
        // Ensure the data is nested under the 'service' key
        const requestData = { [customer.slice(0, -1)]: formJson };

        const response = await axios.post(apiUrl, requestData, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (response.status === 200 || response.status === 201) {
            alert(`customers event created successfully`);
            console.log("Event submitted");
            handleFormClose();
            setSelectedServices([]);
        } else {
            throw new Error(`Failed to create customers event. Status code: ${response.status}`);
        }
    } catch (error) {
        console.error(`Error creating customers event:`, error);
    }
  }

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
        <form id="add_new_event" onSubmit={handleFormSubmit}>
          <DialogTitle>Add New Event</DialogTitle>
          <DialogContent>
            <TextField
              margin="dense"
              id="start_date"
              label="Start Date"
              type="date"
              fullWidth
              variant="outlined"
              value={startDate ? startDate.toISOString().split('T')[0] : ''}
              onChange={(e) => setStartDate(e.target.value ? new Date(e.target.value) : null)}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              margin="dense"
              id="end_date"
              label="End Date"
              type="date"
              fullWidth
              variant="outlined"
              value={endDate ? endDate.toISOString().split('T')[0] : ''}
              onChange={(e) => setEndDate(e.target.value ? new Date(e.target.value) : null)}
              InputLabelProps={{
                shrink: true,
              }}
            />
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
            <AddServices />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleFormClose}>Cancel</Button>
            <Button type="submit">Submit</Button>
          </DialogActions>
        </form>
      </Dialog>
    </React.Fragment>
  );
};

export default withAuth(ViewCustomerEvents);

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
  },
  eventDetailField: {
    marginBottom: '10px',
    marginTop: '8px',
  },
};