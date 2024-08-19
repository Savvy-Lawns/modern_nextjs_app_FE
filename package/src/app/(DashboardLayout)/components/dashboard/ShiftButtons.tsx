import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useUserContext } from '@/app/Admin/components/userContext';



type Props = {
  token: string | undefined;
  
  title?: string;
  [key: string | number]: any; // To accept any other props dynamically
  
};

const ShiftButtons = ({ title,  token,  ...rest  }: Props) => {
  const [open, setOpen] = useState(false);
  
  const [mileage_id, setMileageId] = useState<number | string>('');
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
    
  };

  const handleEndDialogClose = () => {
    setOpenEndDialog(false);
    
  };

  const handleStartDaySubmit = async (event: React.FormEvent) => {
    event.preventDefault();

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
  

    const apiUrl = `http://127.0.0.1:3000/api/v1/mileages`;
    const entity = 'mileage';
    try {
        // Ensure the data is nested under the 'service' key
        const requestData = { [entity]: formJson };

        const response = await axios.post(apiUrl, requestData, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (response.status === 200 || response.status === 201) {
            alert(`Mileage posted successfully`);
            console.log('response', response.data.data.id);
            localStorage.setItem('mileage_id', response.data.data.id);
            setMileageId(response.data.data.id)
            setStartDay(true);
            handleStartDialogClose();
        
            
        } else {
            throw new Error(`Failed to post starting miles. Status code: ${response.status}`);
        }
    } catch (error) {
        console.error(`Error creating starting miles:`, error);
    }
};


  
  useEffect(() => {
    
    const storedId = localStorage.getItem('mileage_id');
    const storedEndMileage = localStorage.getItem('end_mileage');
    if (storedEndMileage) {
    setStartMileage(storedEndMileage);
    }

    if (storedId) {
      setMileageId(storedId);
        setStartDay(true);
    } else {
        setStartDay(false);
    }
}, []);

const handleEndDaySubmit = async (event: React.FormEvent) => {
  event.preventDefault();

  // Initialize a new FormData object
  const formDataObj = new FormData();

  // Dynamically construct the data object based on the form fields
  Object.keys(rest).forEach(key => {
      const inputElement = String(endMileage);
     
      
      
      console.log('inputElement:', inputElement);
      if (inputElement) {
          // Append data to formDataObj instead of creating a simple object
          formDataObj.append('end_mileage', inputElement);
      }
  });
  console.log('formDataObj: ', formDataObj);

  // Convert formDataObj to JSON
  const formJson = Object.fromEntries(Array.from(formDataObj.entries()));
 

  const apiUrl = `http://127.0.0.1:3000/api/v1/mileages/${mileage_id}`;
  const entity = 'mileage';
  try {
      // Ensure the data is nested under the 'service' key
      const requestData = { [entity]: formJson };

      const response = await axios.put(apiUrl, requestData, {
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
          },
      });

      if (response.status === 200 || response.status === 201) {
          alert(`Mileage posted successfully`);
         localStorage.removeItem('mileage_id');
          localStorage.setItem('end_mileage', String(endMileage));
          setStartDay(false);
          handleEndDialogClose();
      
          
      } else {
          throw new Error(`Failed to post starting miles. Status code: ${response.status}`);
      }
  } catch (error) {
      console.error(`Error creating starting miles:`, error);
  }
};


  

  const startEndDay = () => {
    if (startDay) {
      return (
        <Button variant="contained" color="error" style={styles.dayButton} onClick={handleEndDay}>
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
        <form onSubmit={handleStartDaySubmit}>
        <DialogTitle>Start Day</DialogTitle>
        <DialogContent>
          <DialogContentText>Please enter the starting mileage:</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="mileage_start"
            label="Starting Mileage"
            type="number"
            fullWidth
            value={startMileage}
            onChange={(e) => setStartMileage(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button type='submit' color="primary">
            Submit
          </Button>
        </DialogActions>
        </form>
      </Dialog>

      {/* End Mileage Dialog */}
      <Dialog open={openEndDialog} onClose={handleEndDialogClose}>
        <form onSubmit={handleEndDaySubmit}>
        <DialogTitle>End Day</DialogTitle>
        <DialogContent>
          <DialogContentText>Please enter your mileage:</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="mileage_end"
            label="Ending Mileage"
            type="number"
            fullWidth
            value={endMileage}
            onChange={(e) => setEndMileage(e.target.value)}
            required     
            key={'mileage_end'}
          />
        </DialogContent>
        <DialogActions>
          <Button type='submit' color="primary">
            Submit
          </Button>
        </DialogActions>
        </form>
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
    marginTop: '0px',
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