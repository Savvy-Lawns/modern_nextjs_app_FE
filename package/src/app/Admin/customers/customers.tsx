"use-client"
import { min } from "lodash";

export const active = {
    selection: ''
};


    
    const Customers = [
        {
          'customerId': '1',
          "customerName": "Raj Patel",
          "address": [{
            'addressName': 'Main House',
              'street1': '123 Main St',
              'street2': 'Apt 101',
              'city': 'Denver',
              'state': 'CO',
              'zip': '80202',
            },],
          
          'onSiteContact':[
             {
                'name': 'Raj Patel',
              'phone': '970-555-5678',
              'email': 'RPatel@gmail.com',
            },
          ],
          'notes': [
            { date: '2021-10-01', note: 'Customer called to update address.' },
            { date: '2021-10-01', note: 'Customer called to update address.' },

            { date: '2021-10-01', note: 'Customer called to update address.' },


            { date: '2021-10-02', note: 'Customer called to update phone number.' },
            { date: '2021-10-03', note: 'Customer called to update email address.' },
          ],
          'upcomingEvents': [
            {'eventId': 154123, 'dateService': '2022-02-10', 
                'services': [{'service':'Landscape Design', 
                'estimatedPrice': 500.00} ],
                'status': 'Scheduled', 
                'isPaid': false, 
                'estimatedTime': 5, 
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
                    'notes': [
                    {'date': '2022-02-01', 'note': 'Customer inquired about eco-friendly options.'}, {'date': '2022-02-02', 'note': 'Customer provided referral.'}
                    ]
                   
        }]
        },
        {
          'customerId': '2',
          "customerName": "Alex Johnson",
          "address": [{
            'addressName': 'Elm House',
              'street1': '456 Elm St',
              'street2': 'Suite 200',
              'city': 'Boulder',
              'state': 'CO',
              'zip': '80301',
            }],
          
          'onSiteContact': 
             {'name':'Alex Johnson',
              'phone': '970-555-1234',
              'email': 'AlexJ@gmail.com',
            },
          'notes': [
            { date: '2021-11-01', note: 'Customer inquired about additional services.' },
            { date: '2021-11-02', note: 'Customer requested a reschedule.' },
          ],
          'upcomingEvents': [
            {'eventId': 154123, 'dateService': '2022-02-10', 
                'services': [{'service':'Landscape Design', 
                'estimatedPrice': 500.00} ], 
                'status': 'Scheduled', 
                'isPaid': false, 
                'estimatedTime': 5, 
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
                    'notes': [
                        {'date': '2022-02-01', 'note': 'Customer inquired about eco-friendly options.'}, {'date': '2022-02-02', 'note': 'Customer provided referral.'}
                    ]
                   
        }]
        },
        {
          'customerId': '3',
          "customerName": "Samantha Green",
          "address": [{
            'addressName': 'Pine House',
              'street1': '789 Pine St',
              'street2': '',
              'city': 'Fort Collins',
              'state': 'CO',
              'zip': '80521',
            }],
         
          'onSiteContact': {
            'name': 'Samantha Green',
              'phone': '970-555-7890',
              'email': 'SGreen@gmail.com',
            },
          'notes': [
            { date: '2021-12-01', note: 'Customer praised the service quality.' },
          ],
          'upcomingEvents': [
            {'eventId': 154123, 'dateService': '2022-02-10', 
                'services': [{'service':'Landscape Design', 
                'estimatedPrice': 500.00} ],
                'status': 'Scheduled', 
                'isPaid': false, 
                'estimatedTime': 5, 
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
                'notes': [{'date': '2022-02-01', 'note': 'Customer inquired about eco-friendly options.'}, {'date': '2022-02-02', 'note': 'Customer provided referral.'}]
                   
        }]
        },
        {
          'customerId': '4',
          "customerName": "Michael Brown",
          "address": [{
            
            'addressName': 'Oak House',
              'street1': '101 Oak St',
              'street2': 'Apt 202',
              'city': 'Colorado Springs',
              'state': 'CO',
              'zip': '80903',
            }],
          
          'onSiteContact': {
            'name': 'Michael Brown',
              'phone': '970-555-4567',
              'email': 'MBrown@gmail.com',
          },
          'notes': [
            { date: '2022-01-01', note: 'Customer requested early morning service.' },
            { date: '2022-01-02', note: 'Customer updated payment method.' },
          ],
          'upcomingEvents': [
            {'eventId': 154123, 
                'dateService': '2022-02-10', 
                'services': [{'service':'Landscape Design', 
                'estimatedPrice': 500.00} ],
                'status': 'Scheduled', 
                'isPaid': false, 
                'estimatedTime': 5, 
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
                    'notes': [
                        {'date': '2022-02-01', 'note': 'Customer inquired about eco-friendly options.'}, 
                        {'date': '2022-02-02', 'note': 'Customer provided referral.'}]
                   
        }]
        },
        {
          'customerId': '5',
          "customerName": "Linda Smith",
          "address": [{
            'addressName': 'Willow House',
              'street1': '202 Willow St',
              'street2': 'Apt 303',
              'city': 'Pueblo',
              'state': 'CO',
              'zip': '81003',
            }],
          
          'onSiteContact': [{
            'name': 'Linda Smith',
              'phone': '970-555-6789',
              'email': 'LSmith@gmail.com',
          }],
          'notes': [
            { date: '2022-02-01', note: 'Customer inquired about eco-friendly options.' },
            { date: '2022-02-02', note: 'Customer provided referral.' },
          ],
          'upcomingEvents': [
            {'eventId': 154123, 'dateService': '2022-02-10', 
                'services': [{'service':'Landscape Design', 
                'estimatedPrice': 500.00} ],
                'status': 'Scheduled', 
                'isPaid': false, 
                'estimatedTime': 5, 
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
                    'notes': [{'date': '2022-02-01', 'note': 'Customer inquired about eco-friendly options.'}, {'date': '2022-02-02', 'note': 'Customer provided referral.'}]
                   
        }]
        }
      ];
    


export { Customers };
