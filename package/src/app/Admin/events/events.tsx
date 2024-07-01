"use-client"
import { min } from "lodash";
import { Customers } from "./customers";

export const active = {
    selection: ''
};
const _Customers = Customers



    
    const _Events = [
        
            {
                'eventId': 154123, 
                'dateService': '2022-02-10', 
                'services': [{'service':'Landscape Design', 
                'estimatedPrice': 500.00} ],
                'status': 'Scheduled', 
                'isPaid': false, 
                'estimatedTime': 5, 
                'customer':"Raj Patel", 
                'address': {
                    'addressName': 'Willow House',
                        'street1': '202 Willow St', 
                        'street2': 'Apt 303', 
                        'city': 'Pueblo', 
                        'state': 'CO', 
                        'zip': '81003'}, 
                        
                   
                'onSiteContact': {
                    'name':'Linda Smith',
                    'phone': '970-555-6789', 
                    'email': ''}, 
                'notes': [{
                    'date': '2022-02-01', 
                    'note': 'Customer inquired about eco-friendly options.'}, 
                    {'date': '2022-02-02', 
                        'note': 'Customer provided referral.'}]
                   
        }]
       
      
    


export { Customers };
