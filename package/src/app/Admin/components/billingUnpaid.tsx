import React from 'react';
import useFetchUnpaidServices from '../billing/billing';

type Props = {
    startDate: string;
    endDate: string;
};

type UnpaidService = {
    id: string, 
        name: string, 
        address: string, 
        email: string, 
        phone_number: string, 
        events:  Events[],
                
        


};

type Events = {
     
        id: string, 
        balance: number, 
        amount_paid: number, 
        event_services:EventServices[],
};

type EventServices= {
    id: string, 
    service_name: string, 
    property_metric: string, 
    total_service_cost: number, 
    duration: string
};

const UnpaidServicesComponent = ( startDate: string, endDate:string) => {
  const { unpaidServices, loading, error } = useFetchUnpaidServices(startDate, endDate) as {
    unpaidServices: UnpaidService[];
    loading: boolean;
    error: Error | null;
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {unpaidServices.map(unpaidService => (
        <div key={unpaidService.id}>
          <h2>{unpaidService.name}</h2>
          <p>{unpaidService.address}</p>
          <p>{unpaidService.email}</p>
          <p>{unpaidService.phone_number}</p>
          {unpaidService.events.map(event => (
            <div key={event.id}>
              <h3>Event ID: {event.id}</h3>
              <p>Balance: {event.balance}</p>
              <p>Amount Paid: {event.amount_paid}</p>
              {event.event_services.map(service => (
                <div key={service.id}>
                  <p>Service Name: {service.service_name}</p>
                  <p>Property Metric: {service.property_metric}</p>
                  <p>Total Service Cost: {service.total_service_cost}</p>
                  <p>Duration: {service.duration}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default UnpaidServicesComponent;