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
import withAuth  from '@/utils/withAuth';
import { Typography } from '@mui/material';

interface AddServicesProps {
    onSelectedServicesChange?: (services: Array<{ 
      duration: any; 
      service: Service | null; 
      propertyMetric: number; 
      recurrence: string;
      price: number | string; 
    }> ) => void;
  }

  const AddServices: React.FC<AddServicesProps> = ({ onSelectedServicesChange }) => {
    const { services, loading } = useFetchServices();
    const [propertyMetric, setPropertyMetric] = useState('');
    const [recurrence, setRecurrence] = useState('');
    const [selectedServices, setSelectedServices] = useState<Array<{
        duration: number | string; service: Service | null, propertyMetric: number, recurrence: string, price: number | string;
}>>([]);
    const [metricAndRecurrenceDialogOpen, setMetricAndRecurrenceDialogOpen] = useState(false);
    const [tempService, setTempService] = useState<Service | null>(null);
    const [inputValue, setInputValue] = useState(''); 
    const [duration, setDuration] = useState(0);
    const [notes, setNotes] = useState('');
    const [serviceId, setServiceId] = useState('');

    useEffect(() => {
      if (onSelectedServicesChange) {
        onSelectedServicesChange(selectedServices);
      }
    }, [selectedServices, onSelectedServicesChange]);


    const handleServiceSelect = (newValue: Service | null) => {
        setTempService(newValue); // Temporarily store selected service
        setMetricAndRecurrenceDialogOpen(true); // Open dialog for metric and recurrence
      };

    const handleMetricAndRecurrenceDialogClose = () => {
    setMetricAndRecurrenceDialogOpen(false);
    setPropertyMetric("");
    setRecurrence("");
    setDuration(0);
    };

    const calculateServiceCost = (service: Service, propertyMetric: number): number => {
        return service.price * propertyMetric;
    };

    const calculateTotalCost = (): number => {
        return selectedServices.reduce((total, item) => {
            if (item.service) {
                return total + calculateServiceCost(item.service, item.propertyMetric);
            }
            return total;
        }, 0);
    };

    const handleMetricAndRecurrenceSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        event.stopPropagation(); // Prevent the form from submitting traditionally
        if (tempService) {
          // setSelectedServices([]);
          setSelectedServices(prevServices => [
            ...prevServices, 
            { service: tempService, propertyMetric: Number(propertyMetric), recurrence, price: tempService.price, duration}
          ]);
          setTempService(null); // Clear temporary service
          setPropertyMetric(""); // Clear property metric
          setRecurrence(""); // Clear recurrence
          setMetricAndRecurrenceDialogOpen(false);
          setDuration(0);
      
        }
      };

      const removeSelectedService = (index: number) => {
        setSelectedServices(prevServices => prevServices.filter((_, i) => i !== index));
      };

      const renderSelectedServices = () => (
        <div>
          {selectedServices && selectedServices.map((item, index) => {
            const costOfService = item.service ? item.service.price * item.propertyMetric : 0;
            const key = item.service && item.service.id 
              ? `${item.service.id}-${index}` 
              : `temp-${index}-${item.propertyMetric}-${item.recurrence}`;
            return (
              <div key={key}>
               <div style={Styles.serviceListTitle}>
                <Typography variant={'h6'}>{item.service ? `${item.service.name}` : `Service not available`}
                
                <button 
                  onClick={() => removeSelectedService(index)} 
                  style={{ marginLeft: '10px', cursor: 'pointer', background: 'none', border: 'none', color: 'red' }}
                >
                 <Typography variant={'h5'}>X</Typography>
                </button></Typography></div>
                <div style={Styles.serviceList}>
                    <div style={Styles.serviceListItem}><Typography variant={'subtitle1'}>Total Service Cost:</Typography> <Typography variant={'body2'}>${item.service ? `${Number(calculateServiceCost(item.service, item.propertyMetric)).toFixed(2)}` : 'Service not available'}</Typography>
                    </div>
                    <div style={Styles.serviceListItem}><Typography variant={'subtitle1'}>Metric:</Typography> <Typography variant={'body2'}>{item.service ? `${item.propertyMetric} ${item.service.measurement_unit}` : `Service not available - Metric: ${item.propertyMetric}, `}</Typography>
                    </div>
                    <div style={Styles.serviceListItem}><Typography variant={'subtitle1'}>Price per Metric: </Typography>
                    <Typography variant={'body2'}>{item.price ? `
                    $${Number(item.price).toFixed(2)}` : 'Recurrence not available'}</Typography>
                    </div>
                    <div style={Styles.serviceListItem}><Typography variant={'subtitle1'}>Duration:</Typography> <Typography variant={'body2'}>{item.service ? `${item.duration} Minutes` : `Service not available - Duration: ${item.duration}, `}</Typography>
                    </div>
                    <div style={Styles.serviceListItem}><Typography variant={'subtitle1'}>Recurrence: </Typography>
                    <Typography variant={'body2'}>{item.recurrence ? `${item.recurrence}` : 'Recurrence not available'}</Typography>
                    </div>
                    
                </div>
              </div>
            );
          })}
        </div>
      );

return (
    <div>
        <Autocomplete
            style={Styles.eventDetailField}
              options={services}
              getOptionLabel={(option) => option.name}
              onChange={(event, newValue) => handleServiceSelect(newValue)}
              inputValue={inputValue}
              renderInput={(params) => <TextField {...params} label="Select Service"/>}
              noOptionsText={'No services found'}
            />
          
            <Typography variant={'h6'}>Total Cost: ${Number(calculateTotalCost()).toFixed(2)}</Typography>

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
                    label="Duration"
                    type="number"
                    fullWidth
                    variant="outlined"
                    value={duration}
                    onChange={(e) => setDuration(Number(e.target.value))}
                    style={Styles.eventDetailField}
                /><TextField
                    label="notes"
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    
                />
                <TextField
                    label="recurrence_type"
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
                    <option value='one_time'>One Time</option>
                    <option value='weekly'>Weekly</option>
                    <option value='biweekly'>Bi-Weekly</option>
                    <option value='monthly'>Monthly</option>
                </TextField>
                
                </DialogContent>
                <DialogActions>
                <Button onClick={handleMetricAndRecurrenceDialogClose}>Cancel</Button>
                <Button type="submit">Submit</Button>
                </DialogActions>
            </form>
            </Dialog>

            
            </div>
    );
};

export default withAuth(AddServices);


const Styles = {
  overlayWindow: {
    borderRadius: '45px',
    width: '100%',
  },
  
  eventDetailField: {
    marginBottom: '10px',
    marginTop: '8px',
  },
  serviceList: { 
      marginLeft: '20px',
      marginRight: '30px',
  },
  serviceListItem: {
      display: 'flex',
      justifyContent: 'space-between',
      flexDirection: 'row' as 'row',
  },
  serviceListTitle: { 
      marginLeft: '10px',
      marginTop: '10px',
  },
};