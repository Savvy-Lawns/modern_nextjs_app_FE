"use-client"
import { min } from "lodash";



const Users = [
    {
        "userId": "1",
        "name": "Samantha Smith",
        "phone": "970-555-1234",
        "email": "SSmith@gmail.com",
        "acctType": 2,
        "mileage": [{
            "miles": 100,
            "created_at": "2022-02-01"},
        {
            "miles": 100,
            "created_at": "2022-02-01"},
        {
            "miles": 100,
            "created_at": "2022-02-01"},
        {
            "miles": 100,
            "created_at": "2022-02-01"},
        {
            "miles": 100,
            "created_at": "2022-02-01"},
        {
            "miles": 100,
            "created_at": "2022-02-01"},
        ],
        "hours":[{
            "total_hours": 100,
            "created_at": "2022-02-01"},
        {
            "total_hours": 100,
            "created_at": "2022-02-01"},
        {
            "total_hours": 100,
            "created_at": "2022-02-01"},
        {
            "total_hours": 100,
            "created_at": "2022-02-01"},
        {
            "total_hours": 100,
            "created_at": "2022-02-01"},
        {
            "total_hours": 100,
            "created_at": "2022-02-01"},
        ]
    },
    {
        "userId": "2",

        "name": "Raj Patel",
        "phone": "970-555-5678",
        "email": "RPatel@gmail.com",
        "acctType": 1,
"mileage": [{
            "miles": 100,
            "created_at": "2022-02-01"},
        {
            "miles": 100,
            "created_at": "2022-02-01"},
        {
            "miles": 100,
            "created_at": "2022-02-01"},
        {
            "miles": 100,
            "created_at": "2022-02-01"},
        {
            "miles": 100,
            "created_at": "2022-02-01"},
        {
            "miles": 100,
            "created_at": "2022-02-01"},
        ],        "hours":[{
            "total_hours": 100,
            "created_at": "2022-02-01"},
        {
            "total_hours": 100,
            "created_at": "2022-02-01"},
        {
            "total_hours": 100,
            "created_at": "2022-02-01"},
        {
            "total_hours": 100,
            "created_at": "2022-02-01"},
        {
            "total_hours": 100,
            "created_at": "2022-02-01"},
        {
            "total_hours": 100,
            "created_at": "2022-02-01"},
        ]
    },
    {
        "userId": "3",
        "name": "Luisa Gomez",
        "phone": "970-555-9101",
        "email": "LGomez@gmail.com",
        "acctType": 2,
"mileage": [{
            "miles": 100,
            "created_at": "2022-02-01"},
        {
            "miles": 100,
            "created_at": "2022-02-01"},
        {
            "miles": 100,
            "created_at": "2022-02-01"},
        {
            "miles": 100,
            "created_at": "2022-02-01"},
        {
            "miles": 100,
            "created_at": "2022-02-01"},
        {
            "miles": 100,
            "created_at": "2022-02-01"},
            {
                "miles": 100,
                "created_at": "2022-02-01"},
            {
                "miles": 100,
                "created_at": "2022-02-01"},
            {
                "miles": 100,
                "created_at": "2022-02-01"},
            {
                "miles": 100,
                "created_at": "2022-02-01"},
            {
                "miles": 100,
                "created_at": "2022-02-01"},
            {
                "miles": 100,
                "created_at": "2022-02-01"},
                {
                    "miles": 100,
                    "created_at": "2022-02-01"},
                {
                    "miles": 100,
                    "created_at": "2022-02-01"},
                {
                    "miles": 100,
                    "created_at": "2022-02-01"},
                {
                    "miles": 100,
                    "created_at": "2022-02-01"},
                {
                    "miles": 100,
                    "created_at": "2022-02-01"},
                {
                    "miles": 100,
                    "created_at": "2022-02-01"},
                    {
                        "miles": 100,
                        "created_at": "2022-02-01"},
                    {
                        "miles": 100,
                        "created_at": "2022-02-01"},
                    {
                        "miles": 100,
                        "created_at": "2022-02-01"},
                    {
                        "miles": 100,
                        "created_at": "2022-02-01"},
                    {
                        "miles": 100,
                        "created_at": "2022-02-01"},
                    {
                        "miles": 100,
                        "created_at": "2022-02-01"},
                        {
                            "miles": 100,
                            "created_at": "2022-02-01"},
                        {
                            "miles": 100,
                            "created_at": "2022-02-01"},
                        {
                            "miles": 100,
                            "created_at": "2022-02-01"},
                        {
                            "miles": 100,
                            "created_at": "2022-02-01"},
                        {
                            "miles": 100,
                            "created_at": "2022-02-01"},
                        {
                            "miles": 100,
                            "created_at": "2022-02-01"},
                            {
                                "miles": 100,
                                "created_at": "2022-02-01"},
                            {
                                "miles": 100,
                                "created_at": "2022-02-01"},
                            {
                                "miles": 100,
                                "created_at": "2022-02-01"},
                            {
                                "miles": 100,
                                "created_at": "2022-02-01"},
                            {
                                "miles": 100,
                                "created_at": "2022-02-01"},
                            {
                                "miles": 100,
                                "created_at": "2022-02-01"},
                                {
                                    "miles": 100,
                                    "created_at": "2022-02-01"},
                                {
                                    "miles": 100,
                                    "created_at": "2022-02-01"},
                                {
                                    "miles": 100,
                                    "created_at": "2022-02-01"},
                                {
                                    "miles": 100,
                                    "created_at": "2022-02-01"},
                                {
                                    "miles": 100,
                                    "created_at": "2022-02-01"},
                                {
                                    "miles": 100,
                                    "created_at": "2022-02-01"},
                                    {
                                        "miles": 100,
                                        "created_at": "2022-02-01"},
                                    {
                                        "miles": 100,
                                        "created_at": "2022-02-01"},
                                    {
                                        "miles": 100,
                                        "created_at": "2022-02-01"},
                                    {
                                        "miles": 100,
                                        "created_at": "2022-02-01"},
                                    {
                                        "miles": 100,
                                        "created_at": "2022-02-01"},
                                    {
                                        "miles": 100,
                                        "created_at": "2022-02-01"},
                                        {
                                            "miles": 100,
                                            "created_at": "2022-02-01"},
                                        {
                                            "miles": 100,
                                            "created_at": "2022-02-01"},
                                        {
                                            "miles": 100,
                                            "created_at": "2022-02-01"},
                                        {
                                            "miles": 100,
                                            "created_at": "2022-02-01"},
                                        {
                                            "miles": 100,
                                            "created_at": "2022-02-01"},
                                        {
                                            "miles": 100,
                                            "created_at": "2022-02-01"},
                                            {
                                                "miles": 100,
                                                "created_at": "2022-02-01"},
                                            {
                                                "miles": 100,
                                                "created_at": "2022-02-01"},
                                            {
                                                "miles": 100,
                                                "created_at": "2022-02-01"},
                                            {
                                                "miles": 100,
                                                "created_at": "2022-02-01"},
                                            {
                                                "miles": 100,
                                                "created_at": "2022-02-01"},
                                            {
                                                "miles": 100,
                                                "created_at": "2022-02-01"},
        ],        "hours":[{
            "total_hours": 100,
            "created_at": "2022-02-01"},
        {
            "total_hours": 100,
            "created_at": "2022-02-01"},
        {
            "total_hours": 100,
            "created_at": "2022-02-01"},
        {
            "total_hours": 100,
            "created_at": "2022-02-01"},
        {
            "total_hours": 100,
            "created_at": "2022-02-01"},
        {
            "total_hours": 100,
            "created_at": "2022-02-01"},
        ]
    },
    {
        "userId": "4",
        "name": "Xin Zhao",
        "phone": "970-555-1213",
        "email": "XZhao@gmail.com",
        "acctType": 1,
"mileage": [{
            "miles": 100,
            "created_at": "2022-02-01"},
        {
            "miles": 100,
            "created_at": "2022-02-01"},
        {
            "miles": 100,
            "created_at": "2022-02-01"},
        {
            "miles": 100,
            "created_at": "2022-02-01"},
        {
            "miles": 100,
            "created_at": "2022-02-01"},
        {
            "miles": 100,
            "created_at": "2022-02-01"},
        ],        "hours":[{
            "total_hours": 100,
            "created_at": "2022-02-01"},
        {
            "total_hours": 100,
            "created_at": "2022-02-01"},
        {
            "total_hours": 100,
            "created_at": "2022-02-01"},
        {
            "total_hours": 100,
            "created_at": "2022-02-01"},
        {
            "total_hours": 100,
            "created_at": "2022-02-01"},
        {
            "total_hours": 100,
            "created_at": "2022-02-01"},
        ]
    },
    {
        "userId": "5",
        "name": "Emily Hughes",
        "phone": "970-555-1415",
        "email": "EHughes@gmail.com",
        "acctType": 2,
"mileage": [{
            "miles": 100,
            "created_at": "2022-02-01"},
        {
            "miles": 100,
            "created_at": "2022-02-01"},
        {
            "miles": 100,
            "created_at": "2022-02-01"},
        {
            "miles": 100,
            "created_at": "2022-02-01"},
        {
            "miles": 100,
            "created_at": "2022-02-01"},
        {
            "miles": 100,
            "created_at": "2022-02-01"},
        ],        "hours":[{
            "total_hours": 100,
            "created_at": "2022-02-01"},
        {
            "total_hours": 100,
            "created_at": "2022-02-01"},
        {
            "total_hours": 100,
            "created_at": "2022-02-01"},
        {
            "total_hours": 100,
            "created_at": "2022-02-01"},
        {
            "total_hours": 100,
            "created_at": "2022-02-01"},
        {
            "total_hours": 100,
            "created_at": "2022-02-01"},
        ]
    }
];

export { Users };
