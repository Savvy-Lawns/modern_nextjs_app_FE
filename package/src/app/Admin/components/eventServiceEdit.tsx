import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import isEqual from 'lodash/isEqual';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { baselightTheme } from '@/utils/theme/DefaultColors';
import withAuth from '@/utils/withAuth';
import useFetchEvents from '../customers/events';
import { useUserContext } from './userContext';

interface Event {
    customer_id: number | string;
    event_id: number | string;
    event_services_attributes: {
        start_date: string;
        service_id: number | string;
    }[];
    relationships: {
        event_services: {
            data: {
                id: number | string;
            }[];
        };
    };
}

type Props = Partial<{
    token: string;
    title: string;
    buttonType: number;
    name: string;
    username: string;
    phone_number: string;
    email: string;
    role: number;
    measurement_unit: string;
    price: number;
    notes: string;
    service_type: string;
    address: string;
    cost: number;
    id: number;
    start_date: string;
    duration: number;
    status: string;
    paid: boolean;
    property_metric: number;
    recurrence_type: string;
    customer_id: number | string;
    event_id: number| string| null;
    event_service_id: number;
    service_id: number | string;
}>;

function useDeepCompareEffect(callback: () => void, dependencies: {}[] | undefined) {
    const currentDependenciesRef = useRef<{}[] | undefined>();

    if (!isEqual(currentDependenciesRef.current, dependencies)) {
        currentDependenciesRef.current = dependencies;
    }

    useEffect(callback, [currentDependenciesRef.current]);
}

function EventServiceEditForm({ title, customer_id, event_id, service_id, start_date, event_service_id, token, ...rest }: Props) {
    const [open, setOpen] = React.useState(false);
    const [formData, setFormData] = useState<{ [key: string]: string | number | boolean }>({});
    const { User, setUser } = useUserContext();
    const value = 'Refreshing...';
    const value2 = '';

    const fetchResult = useFetchEvents(Number(customer_id));
    console.log('event_id:', event_id);
    console.log('service_id:', service_id);
    console.log('start_date:', start_date);
    console.log('customer_id:', customer_id);
    console.log('useFetchEvents result:', fetchResult);

    const [events, loading, error] = Array.isArray(fetchResult) ? fetchResult : [[], false, null];

    const [activeEvent, setActiveEvent] = useState<Event | null>(null);
    useEffect(() => {
        if (events) {
            const active = events.find((events: { customer_id: number | string; event_id: number | string; }) => events.customer_id === customer_id && events.event_id === event_id);
            setActiveEvent(active);
        }
    }, [events]);
    console.log('activeEvent:', activeEvent);

    useDeepCompareEffect(() => {
        return setFormData({ ...rest });
    }, [rest]);

    const handleSelectChange = (event: SelectChangeEvent<string>, child: React.ReactNode) => {
        const { name, value } = event.target;
        // Handle the change event
        console.log(`Name: ${name}, Value: ${value}`);
    };

    const handleChange = (event: React.ChangeEvent<{ name?: string; value: string }>) => {
        const { name, value } = event.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name!]: value,
        }));
    };

    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formDataObj = new FormData();

        Object.entries(formData).forEach(([key, value]) => {
            formDataObj.set(key, typeof value === 'number' ? value.toString() : String(value));
        });

        const formJson = Object.fromEntries(Array.from(formDataObj.entries()));
        try {
            const response = await axios.put(`http://127.0.0.1:3000/api/v1/customers/${customer_id}/events/${event_id}/event_services/${event_service_id}`, formJson, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            console.log('Scheduled Service has been updated:', response.data.data);
            alert(`Scheduled Service was updated successfully`);
            window.location.href = `/Admin/customers`;
        } catch (error) {
            // Handle error...
        }
    };

    return (
        <React.Fragment >
            <Button sx={Styles.jobbuttons} color='secondary' variant='outlined' onClick={handleClickOpen}>Edit</Button>
            <Dialog style={Styles.overlayWindow} open={open} onClose={handleClose}>
                <form onSubmit={handleSubmit}>
                    <DialogTitle style={{ display: 'flex', justifyContent: 'center' }}>{title}</DialogTitle>
                    <DialogContent>
                        {Object.entries(rest).map(([propName, propValue]) => (
                            propName === 'status' ? (
                                <Select
                                    key={propName}
                                    margin="dense"
                                    id={propName}
                                    name={propName}
                                    label={propName.charAt(0).toUpperCase() + propName.slice(1)}
                                    fullWidth
                                    variant="outlined"
                                    defaultValue={String(propValue)}
                                    onChange={handleSelectChange}
                                >
                                    <MenuItem value="active">Active</MenuItem>
                                    <MenuItem value="cancelled">Cancelled</MenuItem>
                                    <MenuItem value="completed">Completed</MenuItem>
                                </Select>
                            ) : (
                                <TextField
                                    key={propName}
                                    margin="dense"
                                    id={propName}
                                    name={propName}
                                    label={propName.charAt(0).toUpperCase() + propName.slice(1)}
                                    type="text"
                                    fullWidth
                                    variant="outlined"
                                    defaultValue={String(propValue)}
                                    onChange={handleChange}
                                />
                            )
                        ))}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button type="submit">Save</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </React.Fragment>
    );
}

export default withAuth(EventServiceEditForm);

const Styles = {
    overlayWindow: {
        borderRadius: '45px',
    },
    jobbuttons: {
        justifyContent: 'center',
        margin: '10px 0',
        backgroundColor: baselightTheme.palette.secondary.light,
        color: baselightTheme.palette.secondary.contrastText,
        borderRadius: '15px',
        padding: '10px',
        
    },
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
    },
};