"use-client"
import { min } from "lodash";

export const active = {
    selection: ''
};

const customers = [
  {
    customerId: "C1",
    customerName: "John Doe",
    address: "123 Main St",
    phone: "555-1234",
    email: "john@example.com",
    notes: { created_at: "2023-04-01", note: "VIP" },
    upcomingEvents: ["E1", "E2"]
  }
  // More customers...
];

const events = [
  {
    eventId: "E1",
    customerId: "C1",
    services: ["S1", "S2"], // Service IDs
    status: 'Scheduled',
    isPaid: true,
    estimatedTime: 2,
  },
  {
    eventID: "E2",
    services: ["3", "4"]
  }
  // More events...
];

    
    const Customers = [
      
        {
          customerId: '1',
          customerName: "Alex Johnson",
          address: '100 First St, Apt 1, Cityville, NY 10001',
          phone: '555-101-2020',
          email: 'alex.johnson@example.com',
          notes: [
            { created_at: '2023-01-01', note: 'Customer prefers email communication.' },
          ],
          upcomingEvents: [
            {
              eventId: 201,
              dateService: '2023-05-10',
              services: [{ service: 'Garden Maintenance', estimatedPrice: 150.00 }],
              status: 'Scheduled',
              isPaid: true,
              estimatedTime: 2,
              address: '100 First St, Apt 1, Cityville, NY 10001',
              customerName: 'Alex Johnson',
              phone: '555-101-2020',
              email: 'alex.johnson@example.com',
              notes: [
                { date: '2023-04-30', note: 'Confirmed appointment via email.' },
              ]
            },
            {
              eventId: 202,
              dateService: '2023-06-15',
              services: [{ service: 'Tree Planting', estimatedPrice: 300.00 }],
              status: 'Scheduled',
              isPaid: false,
              estimatedTime: 4,
              address: '100 First St, Apt 1, Cityville, NY 10001',
              customerName: 'Alex Johnson',
              phone: '555-101-2020',
              email: 'alex.johnson@example.com',
              notes: [
                { date: '2023-05-20', note: 'Customer requested to reschedule.' },
              ]
            }
          ]
        },
        // Repeat the structure for other customers with unique details
        {
          customerId: '2',
          customerName: "Bethany Kim",
          address: '200 Second St, Suite 2, Townland, CA 20002',
          phone: '555-202-3030',
          email: 'bethany.kim@example.com',
          notes: [
            { created_at: '2023-02-02', note: 'Customer asked for organic pesticides only.' },
          ],
          upcomingEvents: [
            {
              eventId: 301,
              dateService: '2023-07-20',
              services: [{ service: 'Soil Treatment', estimatedPrice: 200.00 }],
              status: 'Scheduled',
              isPaid: false,
              estimatedTime: 3,
              address: '200 Second St, Suite 2, Townland, CA 20002',
              customerName: 'Bethany Kim',
              phone: '555-202-3030',
              email: 'bethany.kim@example.com',
              notes: [
                { date: '2023-07-10', note: 'Customer inquired about service details.' },
              ]
            }
          ]
        },
        {
          customerId: '3',
          customerName: "Charlie Lee",
          address: '300 Third St, Loft 3, Villagetown, TX 30003',
          phone: '555-303-4040',
          email: 'charlie.lee@example.com',
          notes: [
            { created_at: '2023-03-03', note: 'Prefers late afternoon appointments.' },
          ],
          upcomingEvents: [
            {
              eventId: 401,
              dateService: '2023-08-15',
              services: [{ service: 'Lawn Mowing', estimatedPrice: 100.00 }],
              status: 'Scheduled',
              isPaid: true,
              estimatedTime: 1,
              address: '300 Third St, Loft 3, Villagetown, TX 30003',
              customerName: 'Charlie Lee',
              phone: '555-303-4040',
              email: 'charlie.lee@example.com',
              notes: [
                { date: '2023-08-05', note: 'Confirmed service via phone call.' },
              ]
            }
          ]
        },
        {
          customerId: '4',
          customerName: "Diana Smith",
          address: '400 Fourth St, House 4, Smallville, FL 40004',
          phone: '555-404-5050',
          email: 'diana.smith@example.com',
          notes: [
            { created_at: '2023-04-04', note: 'Asked for pet-friendly services.' },
          ],
          upcomingEvents: [
            {
              eventId: 501,
              dateService: '2023-09-10',
              services: [{ service: 'Pest Control', estimatedPrice: 250.00 }],
              status: 'Scheduled',
              isPaid: false,
              estimatedTime: 2,
              address: '400 Fourth St, House 4, Smallville, FL 40004',
              customerName: 'Diana Smith',
              phone: '555-404-5050',
              email: 'diana.smith@example.com',
              notes: [
                { date: '2023-09-01', note: 'Requested early morning appointment.' },
              ]
            }
          ]
        },
        {
          customerId: '5',
          customerName: "Evan Wright",
          address: '500 Fifth St, Bungalow 5, Lakeside, WA 50005',
          phone: '555-505-6060',
          email: 'evan.wright@example.com',
          notes: [
            { created_at: '2023-05-05', note: 'Interested in sustainable gardening practices.' },
          ],
          upcomingEvents: [
            {
              eventId: 601,
              dateService: '2023-10-20',
              services: [{ service: 'Garden Design', estimatedPrice: 500.00 }],
              status: 'Scheduled',
              isPaid: true,
              estimatedTime: 5,
              address: '500 Fifth St, Bungalow 5, Lakeside, WA 50005',
              customerName: 'Evan Wright',
              phone: '555-505-6060',
              email: 'evan.wright@example.com',
              notes: [
                { date: '2023-10-10', note: 'Confirmed design preferences via email.' },
              ]
            }
          ]
        },
        {
          customerId: '6',
          customerName: "Fiona Chen",
          address: '600 Sixth St, Condo 6, Mountainview, CO 60006',
          phone: '555-606-7070',
          email: 'fiona.chen@example.com',
          notes: [
            { created_at: '2023-06-06', note: 'Requests non-toxic weed removal.' },
          ],
          upcomingEvents: [
            {
              eventId: 701,
              dateService: '2023-11-15',
              services: [{ service: 'Weed Removal', estimatedPrice: 150.00 }],
              status: 'Scheduled',
              isPaid: false,
              estimatedTime: 2,
              address: '600 Sixth St, Condo 6, Mountainview, CO 60006',
              customerName: 'Fiona Chen',
              phone: '555-606-7070',
              email: 'fiona.chen@example.com',
              notes: [
                { date: '2023-11-05', note: 'Asked for service details via text.' },
              ]
            }
          ]
        },
        {
          customerId: '7',
          customerName: "George Davis",
          address: '700 Seventh St, Villa 7, Rivertown, MI 70007',
          phone: '555-707-8080',
          email: 'george.davis@example.com',
          notes: [
            { created_at: '2023-07-07', note: 'Interested in water-efficient landscaping.' },
          ],
          upcomingEvents: [
            {
              eventId: 801,
              dateService: '2023-12-10',
              services: [{ service: 'Irrigation System Installation', estimatedPrice: 800.00 }],
              status: 'Scheduled',
              isPaid: true,
              estimatedTime: 6,
              address: '700 Seventh St, Villa 7, Rivertown, MI 70007',
              customerName: 'George Davis',
              phone: '555-707-8080',
              email: 'george.davis@example.com',
              notes: [
                { date: '2023-12-01', note: 'Confirmed installation details over the phone.' },
              ]
            }
          ]
        },
        {
          customerId: '8',
          customerName: "Hannah Lee",
          address: '800 Eighth St, Apartment 8, Beachtown, VA 80008',
          phone: '555-808-9090',
          email: 'hannah.lee@example.com',
          notes: [
            { created_at: '2023-08-08', note: 'Prefers eco-friendly products.' },
          ],
          upcomingEvents: [
            {
              eventId: 901,
              dateService: '2024-01-20',
              services: [{ service: 'Mulching', estimatedPrice: 200.00 }],
              status: 'Scheduled',
              isPaid: false,
              estimatedTime: 3,
              address: '800 Eighth St, Apartment 8, Beachtown, VA 80008',
              customerName: 'Hannah Lee',
              phone: '555-808-9090',
              email: 'hannah.lee@example.com',
              notes: [
                { date: '2024-01-10', note: 'Inquired about mulch types via email.' },
              ]
            }
          ]
        },
        {
          customerId: '9',
          customerName: "Ian Moore",
          address: '900 Ninth St, Cottage 9, Hillside, MA 90009',
          phone: '555-909-0101',
          email: 'ian.moore@example.com',
          notes: [
            { created_at: '2023-09-09', note: 'Asked for early morning services only.' },
          ],
          upcomingEvents: [
            {
              eventId: 1001,
              dateService: '2024-02-15',
              services: [{ service: 'Snow Removal', estimatedPrice: 300.00 }],
              status: 'Scheduled',
              isPaid: true,
              estimatedTime: 4,
              address: '900 Ninth St, Cottage 9, Hillside, MA 90009',
              customerName: 'Ian Moore',
              phone: '555-909-0101',
              email: 'ian.moore@example.com',
              notes: [
                { date: '2024-02-05', note: 'Confirmed via text message.' },
              ]
            }
          ]
        },
        {
          customerId: '10',
          customerName: "Julia Carter",
          address: '1000 Tenth St, Mansion 10, Cliffside, OR 100010',
          phone: '555-010-1112',
          email: 'julia.carter@example.com',
          notes: [
            { created_at: '2023-10-10', note: 'Interested in full landscape redesign.' },
          ],
          upcomingEvents: [
            {
              eventId: 1101,
              dateService: '2024-03-20',
              services: [{ service: 'Landscape Design Consultation', estimatedPrice: 600.00 }],
              status: 'Scheduled',
              isPaid: false,
              estimatedTime: 5,
              address: '1000 Tenth St, Mansion 10, Cliffside, OR 100010',
              customerName: 'Julia Carter',
              phone: '555-010-1112',
              email: 'julia.carter@example.com',
              notes: [
                { date: '2024-03-10', note: 'Requested portfolio via email.' },
              ]
            }
          ]
        },
        // Add more customers as needed to reach a total of 10
      ];
      
    


export { Customers };
