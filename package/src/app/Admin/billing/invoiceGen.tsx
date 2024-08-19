"use client";
import React from 'react';
import Link from "next/link";
import { useEffect } from 'react';
import { Select, MenuItem, Button, styled } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import dynamic from "next/dynamic";
import { baselightTheme } from '@/utils/theme/DefaultColors';
import { ArrowBack, Refresh } from '@mui/icons-material';
import ExpensesPage from '../components/expensepage';
import withAuth from '@/utils/withAuth';
import BillingPage from '../components/billingpage';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import Image from 'next/image';

interface Service {
    id: string;
    start_date: string;
    name: string;
    amount: number;
  }
  
  type Props = {
    customer_name: string;
    start_date: string;
    end_date: string;
    bill_date: string;
    customer_phone: string | number;
    customer_email: string | number;
    customer_address: string | number;
    listOfUnpaidServices: Array<Service>;
    amount: number;
  };


const InvoiceGeneration = ({customer_name, start_date, end_date, bill_date, amount, customer_phone, customer_email, customer_address, listOfUnpaidServices}: Props ) => {
    
    const Invoice = () => (
    <Document  title={`${customer_name} Invoice for Date Range ${start_date} - ${end_date}`} >
            <Page  size={'A4'}>
            <View style={styles.sideBySideOutside}>
                <View>
                    <Image src="/images/logos/SavvyLawnsLogo.png" alt="Savvy Lawn Logo"  /> 
                    <Text>Savvy Lawn Services</Text>
                    <Text>1234 Main St</Text>
                    <Text>city, St zip</Text>
                </View>  
                <View>
                    <Text>Issue Date:</Text>
                    <Text>{bill_date}</Text>
                </View>  
            </View>

            <View style={styles.sideBySideTriple}>
                <View>
                    <Text>Bill To:</Text>
                    <Text>{customer_name}</Text>
                    <Text>{customer_phone}</Text>
                    <Text>{customer_email}</Text>
                    <Text>{customer_address}</Text>
                </View>

                <View>
                    <Text>Message:</Text>
                    <Text>This is a Bill for services performed on the property: {customer_address}. </Text>
                </View>

                <View>
                    <Text>Payment:</Text>
                    <Text>${amount}</Text>
                    {/* <Text>{due_date}</Text>
                    <Text>link to Payment option</Text>                 */}
                </View>
            </View> 
            <View style={styles.sideBySide}>
            <View>
                <View>
                    <View><Text>Service Date:</Text></View>
                    </View>
                <View>
                    <View></View><Text>Service:</Text></View>
                    <View><Text>Service Cost:</Text></View>
                </View>
                <View>
                {listOfUnpaidServices.map((service: any) => (
                <View key={service.id}>
                    <View><Text>{service.start_date}</Text></View>
                    
                    <View><Text>{service.name}</Text></View>
                    <View><Text>{service.amount}</Text></View>
                </View>
                ))}
            </View>
            </View>
            

            </Page>            
        </Document>
        )

    const BillDate = new Date().toLocaleDateString();
    const [instance, updateInstance] = usePDF({ document: Invoice, fileName: `${customer_name} Invoice for Date Range ${start_date} - ${end_date}` });

    if (instance.loading) return <div>Loading ...</div>;

    if (instance.error) return <div>Something went wrong: {error}</div>;

    return (
        <div>
            <Button href={instance.url} download="test.pdf">
      Download PDF Invoice
    </Button>
        </div>
    );
};

export default withAuth(InvoiceGeneration);

const styles = StyleSheet.create({
    sideBySideOutside: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    sideBySideTriple: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-evenly',
    },
    AccordionSummaryStyle: {
      backgroundColor: baselightTheme.palette.primary.light,
      color: baselightTheme.palette.primary.contrastText,
      borderRadius: '15px 15px 15px 15px',
      alignItems: 'center',
    },
    sideBySide: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: '10px',
    },
    serviceStyle: {
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
    },
    scrollContainer: {
      maxHeight: '400px',
    //   overflowY: 'auto',
    },
    servicesCompleted: {
      backgroundColor: baselightTheme.palette.primary.light,
      padding: '10px',
      borderRadius: '15px 0 0 15px',
      width: '65%',
    },
    servicesCost: {
      textAlign: 'center',
      alignItems: 'center',
      margin: 'auto',
      padding: '10px',
      backgroundColor: 'rgba(0,0,0,0.5)',
      width: '35%',
      borderRadius: '0 15px 15px 0',
    },
  });