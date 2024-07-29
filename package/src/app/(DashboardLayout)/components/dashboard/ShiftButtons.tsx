import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import React, { useState } from 'react';

const ShiftButtons: React.FC = () => {
  const [startDay, setStartDay] = useState(false);
  const [openStartDialog, setOpenStartDialog] = useState(false);
  const [openEndDialog, setOpenEndDialog] = useState(false);
  const [startMileage, setStartMileage] = useState<number | string>('');
  const [endMileage, setEndMileage] = useState<number | string>('');

  const handleStartDay = () => {
    setOpenStartDialog(true);
  };

  const handleEndDay = () => {
    setOpenEndDialog(true);
  };

  const handleStartDialogClose = () => {
    setOpenStartDialog(false);
    setStartDay(true);
  };

  const handleEndDialogClose = () => {
    setOpenEndDialog(false);
    setStartDay(false);
  };

  const startEndDay = () => {
    if (startDay) {
      return (
        <Button variant="contained" color="secondary" style={styles.dayButton} onClick={handleEndDay}>
          End Day
        </Button>
      );
    } else {
      return (
        <Button variant="contained" color="secondary" style={styles.dayButton} onClick={handleStartDay}>
          Start Day
        </Button>
      );
    }
  };

  return (
    <div style={styles.buttonContainer}>
      {startEndDay()}
      <Button variant="contained" color="secondary" style={styles.dayButton}>
        Organize Route
      </Button>

      {/* Start Mileage Dialog */}
      <Dialog open={openStartDialog} onClose={handleStartDialogClose}>
        <DialogTitle>Start Day</DialogTitle>
        <DialogContent>
          <DialogContentText>Please enter the starting mileage:</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="startMileage"
            label="Starting Mileage"
            type="number"
            fullWidth
            value={startMileage}
            onChange={(e) => setStartMileage(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleStartDialogClose} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      {/* End Mileage Dialog */}
      <Dialog open={openEndDialog} onClose={handleEndDialogClose}>
        <DialogTitle>End Day</DialogTitle>
        <DialogContent>
          <DialogContentText>Please enter the ending mileage:</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="endMileage"
            label="Ending Mileage"
            type="number"
            fullWidth
            value={endMileage}
            onChange={(e) => setEndMileage(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEndDialogClose} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ShiftButtons;

const styles: {
  dayButton: React.CSSProperties;
  buttonContainer: React.CSSProperties;
} = {
  dayButton: {
    marginTop: 10,
    borderRadius: 25,
    color: 'white',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
};