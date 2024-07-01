"use-client"
import { min } from "lodash";

export const active = {
    selection: ''
};

 const Services = [
        {
            "serviceId": 1,
            "name": "Lawn Mowing",
            "measurement": "sq ft",
            "cost": 10.00,
            "note": "",
            "type": 1
        },
        {
            "serviceId": "2",
            "name": "Hedge Trimming",
            "measurement": "linear ft",
            "cost": 5.00,
            "note": "",
            "type": 1
        },
        {
            "serviceId": "3",
            "name": "Leaf Removal",
            "measurement": "sq ft",
            "cost": 8.00,
            "note": "",
            "type": 1
        },
        {
            "serviceId": "4",
            "name": "Weed Control",
            "measurement": "sq ft",
            "cost": 15.00,
            "note": "4",
            "type": 1
        },
        {
            "serviceId": "5",
            "name": "Fertilization",
            "measurement": "sq ft",
            "cost": 20.00,
            "note": "",
            "type": 1
        },
        {
            "serviceId": "6",
            "name": "Aeration",
            "measurement": "sq ft",
            "cost": 25.00,
            "note": "",
            "type": 1
        },
        {
            "serviceId": "7",
            "name": "Seeding",
            "measurement": "sq ft",
            "cost": 30.00,
            "note": "",
            "type": 1
        },
        {
            "serviceId": "8",
            "name": "Sod Installation",
            "measurement": "sq ft",
            "cost": 35.00,
            "note": "",
            "type": 1
        },
        {
            "serviceId": "9",
            "name": "Tree Planting",
            "measurement": "per item",
            "cost": 50.00,
            "note": "",
            "type": 1
        },
        {
            "serviceId": "10",
            "name": "Garden Maintenance",
            "measurement": "sq ft",
            "cost": 18.00,
            "note": "",
            "type": 1
        },
        {
            "serviceId": "11",
            "name": "Discount10",
            "measurement": "dollars",
            "cost": -10.00,
            "note": "Discount for $10",
            "type": 2
        }
    ]


export { Services };
