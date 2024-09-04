import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import isEqual from 'lodash/isEqual';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import { IconCheck, IconEdit, IconPlus } from '@tabler/icons-react';
import { baselightTheme } from '@/utils/theme/DefaultColors';
import withAuth from '@/utils/withAuth';
import { useUserContext } from './userContext';
import AddServices from './addServices';
import useFetchServices from '../services/services';
import EventSerivceEditForm from './eventServiceEdit';


type Props = Partial<{
  token: string;
  title: string;
  buttonType: number;
  event_service_ids: event_service_ids[];
  customer_id: number | string;
  event_id: number | string;
  
}>;

interface event_service_ids {
  event_service_id: number | string;
  service_name: string;
  completed: boolean;
  duration: number;
  property_metric: number;
  notes: string;
  service_id: number | string;
  start_date: string;
}

function useDeepCompareEffect(callback: () => void, dependencies: {}[] | undefined) {
  const currentDependenciesRef = useRef<{}[] | undefined>();

  if (!isEqual(currentDependenciesRef.current, dependencies)) {
    currentDependenciesRef.current = dependencies;
  }

  useEffect(callback, [currentDependenciesRef.current]);
}

function CompleteEventServices({ title, buttonType, token, ...rest }: Props) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<{ [key: string]: string | number }>({});
  const [eventServices, setEventServices] = useState<event_service_ids[]>([]);
  const [selectedServices, setSelectedServices] = useState<any[]>([]);
  const { services } = useFetchServices();
  const [serviceFormOpen, setServiceFormOpen] = useState(false);
  const today =  Date();
  const[endDate, setEndDate] = useState(today);
  const[startDate, setStartDate] = useState(today);
    // const apiURL =  process.env.NEXT_PUBLIC_API_URL
const apiURL =  'http://127.0.0.1:3000/api/v1'

  useDeepCompareEffect(() => {
    const { event_service_ids, ...filteredRest } = rest;
    setFormData({ ...filteredRest });
    setEventServices(event_service_ids || []);
  }, [rest]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value.toString(),
    }));
  };
  const handleSelectedServicesChange = (services: Array<{ duration: number | any; service: any | null; propertyMetric: number; recurrence: string; }>) => {
    setSelectedServices(services);
  };
  
  const handleCheckboxChange = (event_service_id: number | string, event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('event_service_id:', event_service_id);
    console.log('event:', event);
    if (!event.target.checked) {
        setSelectedServices(selectedServices.filter(serviceId => serviceId !== event_service_id));
        console.log('selectedServices1:', selectedServices);
    } else {
        console.log('selectedServices2:', selectedServices);
    setSelectedServices(
        
        [...selectedServices, event_service_id]
      
      
    );
}
  };
  const handleServiceFormOpen = () => {
    setServiceFormOpen(true);
    
  };

  const handleServiceFormClose = () => {
    console.log("Service form closed");
    setServiceFormOpen(false);
  };

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const activeEventFieldId = rest.event_id;
  const activeCustomerId = rest.customer_id;
 

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    

    
    const sendData = selectedServices

    
    try {
      const response = await axios.patch(`${apiURL}/bulk_actions/update_event_services_status`, {event_service_ids: selectedServices}, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      console.log('Completed:', selectedServices);
      alert(`Event service(s) was updated successfully`);

      window.location.href = `/`;
    } catch (error) {
      // Handle error...
    }
  };

  const handleServiceFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    

    const formDataObj = new FormData();
    Object.keys(rest).forEach(key => {
      const inputElement = document.getElementById(key) as HTMLInputElement;
      if (inputElement) {
        formDataObj.append(key, inputElement.value);
      }
    });
  
    const formJson = Object.fromEntries(Array.from(formDataObj.entries()));
    const startDateElement = document.getElementById('start_date') as HTMLInputElement;
    const endDateElement = document.getElementById('end_date') as HTMLInputElement;
    

    const requestData = {
      event_services: selectedServices.map(service => ({
        event_id: activeEventFieldId, 
        service_id: service.service?.id,
        recurrence_type: service.recurrence,
        start_date: startDate,
        end_date: endDate,
        status: "active",
        property_metric: service.propertyMetric,
        duration: service.duration,
        paid: false,
        recurrence_series_id: null,
        notes: formJson.notes,
      }))
    };

    console.log('requestData before send:', requestData);
    
  

    const apiUrl = `${apiURL}/customers/${activeCustomerId}/events/${activeEventFieldId}/event_services`;

    try {
      const response = await axios.post(apiUrl, requestData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.status === 200 || response.status === 201) {
        alert(`Event service added successfully`);
        console.log("Service submitted");
        console.log("requestData: ", requestData);
        handleServiceFormClose();
        setSelectedServices([]);
        
      } else {
        throw new Error(`Failed to add event service. Status code: ${response.status}`);
      }
    } catch (error) {
      console.error(`Error adding event service:`, error);
    }
  };

  const handleAddService = () => {
    setEventServices(prevServices => [
      ...prevServices,
      { 
        event_service_id: Date.now(), 
        service_name: '', 
        completed: false,
        duration: 0, // Default value
        property_metric: 0, // Default value
        notes: '', // Default value
        service_id: '', // Default value
        start_date: new Date().toISOString(), // Default value
      },
    ]);
  };

  return (
    <React.Fragment>
      {buttonType === 1 && (
        <Button
          sx={{ ...Styles.jobbuttons, height: '6vh' }}
          color='primary'
          variant='contained'
          startIcon={<IconCheck />}
          onClick={handleClickOpen}
        >
          Complete Job
        </Button>
      )}
      <Dialog style={Styles.overlayWindow} open={open} onClose={handleClose}>
        <form onSubmit={handleSubmit}>
          <DialogTitle style={{ display: 'flex', justifyContent: 'center' }}>{title}</DialogTitle>
          <DialogContent>
            {eventServices.map(service => (
              <div key={service.event_service_id} style={{ display: 'flex', alignItems: 'center' }}>
                <Checkbox
                  checked={service.completed}
                  onChange={(event) => handleCheckboxChange(service.event_service_id, event)}
                />
                <div style={{ flexGrow: 1, marginRight: '10px' }}>
                    {service.service_name}
                    </div>
                    <EventSerivceEditForm title="Edit Scheduled Service" event_id={activeEventFieldId} customer_id={Number(activeCustomerId)}  duration={service.duration}  property_metric={service.property_metric} notes={service.notes}  token={token} service_id={service.service_id} start_date={service.start_date} event_service_id={Number(service.event_service_id)} redirect={2}/>

              </div>
            ))}
            <Button
              sx={{ ...Styles.jobbuttons, height: '6vh' }}
              color='primary'
              variant='outlined'
              startIcon={<IconPlus />}
              onClick={handleServiceFormOpen}
            >
              Add Service
            </Button>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Complete</Button>
          </DialogActions>
        </form>
      </Dialog>
      <Dialog open={serviceFormOpen} onClose={handleServiceFormClose}>
        <form onSubmit={handleServiceFormSubmit}>
          <DialogTitle>Add Another Service</DialogTitle>
          <DialogContent>
          <TextField 
            id='start_date' 
            name='start_date' 
            label='Start Date' 
            type='date' 
            defaultValue={startDate} 
            fullWidth 
            onChange={(e) => setStartDate(e.target.value ? e.target.value : today.toString().split('T')[0])}
            value={startDate ? startDate.toString().split('T')[0] : today.toString().split('T')[0]}
            />
            <TextField 
            id='end_date' 
            name='end_date' 
            label='End Date' 
            type='date' 
            defaultValue={endDate} 
            fullWidth 
            onChange={(e) => setEndDate(e.target.value ? e.target.value : today.toString().split('T')[0])}
            value={endDate ? endDate.toString().split('T')[0] : today.toString().split('T')[0]}
            />
            <AddServices onSelectedServicesChange={handleSelectedServicesChange}/>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleServiceFormClose}>Cancel</Button>
            <Button type="submit">Save</Button>
          </DialogActions>
        </form>
      </Dialog>
    </React.Fragment>
  );
}

export default withAuth(CompleteEventServices);

const Styles = {
  overlayWindow: {
    borderRadius: '45px',
  },
  jobbuttons: {
    marginTop: '10px',
    marginBottom: '10px',
    backgroundColor: baselightTheme.palette.secondary.dark,
    borderRadius: '15px',
    color: '#fff',
    fontSize: '.65rem',
    textAlign: 'center',
    marginRight: '20px',
  },
};