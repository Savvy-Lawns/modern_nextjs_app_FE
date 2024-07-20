import React, { useState } from 'react';
import useFetchServices from '../services/services';

const ServicesList = () => {
    const { services, loading, error }: { services: any[], loading: boolean, error: Error | null } = useFetchServices();
    const [quoteList, setQuoteList] = useState<{ propertyMetric: any; recurrenceType: any; initialPrice: number; id: number; name: string; measurement_unit: string; price: number; notes: string; service_type: string; }[]>([]);
  
    const calculatePrice = (service, propertyMetric, recurrenceType) => {
        const recurrenceMultipliers = { once: 1,  biweekly: 2, weekly: 4, monthly: 1, seasonal: 7 };
        const multiplier = recurrenceMultipliers[recurrenceType];
        return service.price * propertyMetric * multiplier;
      };
    
      const addToQuote = (serviceId, propertyMetric, recurrenceType) => {
        const serviceToAdd = services.find(service => service.id === serviceId);
        if (!serviceToAdd) {
          console.error('Service not found');
          return;
        }
  
      // Assuming price calculation is based on a simple metric for demonstration
      const initialPrice = calculatePrice(serviceToAdd, propertyMetric, recurrenceType);

    const quoteItem = {
      ...serviceToAdd,
      propertyMetric,
      recurrenceType,
      initialPrice,
    };
  
    setQuoteList(currentQuoteList => [...currentQuoteList, quoteItem]);
    };

    const calculateTotals = () => {
    const dailyTotal = quoteList.reduce((acc, item) => acc + item.initialPrice, 0);
    const monthlyTotal = dailyTotal * 30; // Assuming 30 days in a month for simplicity
    const seasonalTotal = dailyTotal * 210; // Assuming 7 months in a season, 30 days in a month
    return { dailyTotal, monthlyTotal, seasonalTotal };
    };

const { dailyTotal, monthlyTotal, seasonalTotal } = calculateTotals();

    if (loading) return <div>Loading services...</div>;
    if (error) return <div>Error fetching services: {error.message}</div>;
  
  return (
    <div>
      <h2>Quote List</h2>
      <ul>
        {quoteList.map((item, index) => (
          <li key={index}>
            {item.name} - {item.measurement_unit} - {item.recurrenceType} - ${item.initialPrice.toFixed(2)}
          </li>
        ))}
      </ul>
      <div>
        <strong>Totals:</strong>
        <p>Daily: ${dailyTotal.toFixed(2)}</p>
        <p>Monthly: ${monthlyTotal.toFixed(2)}</p>
        <p>Seasonal: ${seasonalTotal.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default ServicesList;