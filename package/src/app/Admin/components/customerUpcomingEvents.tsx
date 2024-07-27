import React, { useState, useEffect } from 'react';
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

interface Props {
  title: string;
  name: string;
  address: string;
  phoneNumber: string;
}

const ViewCustomerEvents: React.FC<Props> = ({ title, name, address, phoneNumber }) => {
  const [open, setOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
 const [SelectedServices, setSelectedServices] = useState<Array<{ service: Service | null, propertyMetric: number, recurrence: string }>>([]);
  const [startDate, setStartDate] = useState<Date | null | undefined>(new Date());
  const [endDate, setEndDate] = useState<Date | null | undefined>(new Date());

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  console.log("Event Form Closed");

  const handleFormOpen = () => setFormOpen(true);
  const handleFormClose = () => {
    console.log("Form closed");
    setFormOpen(false);
};
  
  
  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Set API call here
    
    console.log("Event submitted");
    handleFormClose();
    setSelectedServices([]);
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
            {/* <Autocomplete
            style={Styles.eventDetailField}
              options={services}
              getOptionLabel={(option) => option.name}
              onChange={(event, newValue) => handleServiceSelect(newValue)}
              renderInput={(params) => <TextField {...params} label="Select Service" />}
            />
            {renderSelectedServices()}
            <Dialog open={metricAndRecurrenceDialogOpen} onClose={handleMetricAndRecurrenceDialogClose}>
              <form id="service_details" onSubmit={handleMetricAndRecurrenceSubmit}>
                <DialogTitle>Enter Service Details</DialogTitle>
                <DialogContent>
                  <TextField
                    label="Property Metric"
                    type="number"
                    fullWidth
                    variant="outlined"
                    value={propertyMetric}
                    onChange={(e) => setPropertyMetric(e.target.value)}
                    style={Styles.eventDetailField}
                  />
                  <TextField
                    label="Recurrence"
                    select
                    fullWidth
                    variant="outlined"
                    value={recurrence}
                    onChange={(e) => setRecurrence(e.target.value)}
                    SelectProps={{
                      native: true,
                    }}
                  >
                    <option value=""></option>
                    <option value="one-time">One Time</option>
                    <option value="weekly">Weekly</option>
                    <option value="bi-weekly">Bi-Weekly</option>
                    <option value="monthly">Monthly</option>
                  </TextField>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleMetricAndRecurrenceDialogClose}>Cancel</Button>
                  <Button type="submit">Submit</Button>
                </DialogActions>
              </form>
            </Dialog> */}

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
  },
  eventDetailField: {
    marginBottom: '10px',
    marginTop: '8px',
  },
};