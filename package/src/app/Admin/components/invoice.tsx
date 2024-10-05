import React, { useRef, useState } from 'react';
import { baselightTheme } from '@/utils/theme/DefaultColors';
import html2pdf from 'html2pdf.js';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
import { title } from 'process';
import { max } from 'lodash';
import axios from 'axios';
import Cookies from 'js-cookie';

type Props = {
    customer_last_billed: string;
  customer_id: number | string;
  customer_name: string;
  customer_address: string;
  customer_email: string;
  start_date: string;
  end_date: string;
  amount: number | string;
  event_services: any[];
};

const InvoiceButton: React.FC<Props> = ({ customer_name, customer_address, customer_email, start_date, end_date, event_services, amount , customer_id, customer_last_billed}) => {
  const invoiceRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [fileURL, setFileURL] = useState('');
  const [title, setTitle] = useState('');
  const [submission, setSubmission] = useState(false);
  const [loading, setLoading] = useState(false);
  const apiURL = process.env.NEXT_PUBLIC_API_URL;

  const handleOpen = () => {
    displayPDF();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenSubmission = () => {
    setSubmission(true);
  };
  const handleStartLoading = () => {
    setLoading(true);
  };
  const handleEndLoading = () => {
    setLoading(false);
  };

  const handleCloseSubmission = () => {
    setSubmission(false);
    setOpen(false);
  };

  const logoURL = "/images/logos/SavvyLawnsLogo.png";
  const zelleURL = "/images/logos/SavvyLawnsZelle.png";

  const getCurrentDate = () => {
    const today = new Date();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(today.getDate()).padStart(2, '0');
    const year = today.getFullYear();
  
    return `${month}/${day}/${year}`;
  };


  const generatePDF = async () => {
    if (invoiceRef.current) {
      const element = invoiceRef.current;
      const opt = {
        margin: 1,
        filename: 'invoice.pdf',
        image: { type: 'png', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
      };
      handleStartLoading();
      const pdf = await html2pdf().from(element).set(opt).outputPdf('blob');
      handleEndLoading();
      console.log('pdf:', pdf);
      return pdf;
    }
  };

  
  
  const displayPDF = async () => {
    const pdfBlob = await generatePDF();
    const pdfUrl = URL.createObjectURL(pdfBlob);
    document.getElementById('pdfEmbed')?.setAttribute('src', pdfUrl);
  };

  const downloadPDF = async () => {
    const pdfBlob = await generatePDF();
    const pdfUrl = URL.createObjectURL(pdfBlob);
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = `${start_date}-${end_date}_${customer_name}_invoice.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownload = () => {
    downloadPDF();
  };

  const handleSubmit = async () => {
     const pdfBlob = await generatePDF();
     const formData = new FormData();
     formData.append('file', pdfBlob, `${start_date}-${end_date}_${customer_name}_invoice.pdf`);
     handleStartLoading();
     const response = await fetch('https://file.io', {
      method: 'POST',
      body: formData,
    });
  
    const data = await response.json();
    const fileLink = data.link;
    setFileURL(fileLink);
    handleOpenSubmission();
    handleEndLoading();
  

  };

  const handleLastBilled = async () => {
    const today:Number = Date.now();

    const formData = {
        bill_date: String(today),
        };
    

    const token = Cookies.get('token');
    if (!token) {
      console.error('Token not found. User must be authenticated.');
      return;
    }
    try {
        const response = await axios.patch(`${apiURL}/customers/${customer_id}`, formData, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });
    
    if (response.status === 200 || response.status === 201) {
        alert('Customer has been billed');
        handleCloseSubmission();
    } else {
        alert(`Failed to bill customer. Status code: ${response.status}`)
        throw new Error(`Failed to bill customer. Status code: ${response.status}`);
    }
    } catch (error) {
        console.error('Failed to bill customer:', error);
        alert(`Failed to bill customer: ${error}`);
  };
  };
  const handleEmail = async () => {
    const emailBody = `Hi ${customer_name},

    Please find your invoice for the period ${start_date} to ${end_date} attached below:

    ${fileURL}
    
    Thank you for your business!
    `;

  const mailtoLink = `mailto:${customer_email}?subject=${encodeURIComponent(`Invoice for ${start_date} - ${end_date}`)}&body=${encodeURIComponent(emailBody)}`;
  handleStartLoading();
  await handleLastBilled();
  handleEndLoading();
  const link = document.createElement('a');
  link.href = mailtoLink;
  link.click();
  
  };

  return (
    <React.Fragment>
        <div style={{ display: 'none' }}>
      <div ref={invoiceRef} >
        <div style={{ maxWidth: '800px', height:'auto', margin: 'auto', padding: '30px', border: '1px solid #eee', background: '#fff', boxShadow: '0 0 10px rgba(0, 0, 0, 0.15)' }}>
          <table style={{ width: '100%', height: 'auto', lineHeight: 'inherit' }}>
            <tr className="top">
              <td colSpan={2} style={{ paddingBottom: '20px' }}>
                <table style={{ width: '100%' }}>
                  <tr>
                    <td>
                      <div>
                        <img src={logoURL} width="175px" alt="Savvy Lawns Logo" /><br />
                      </div>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '45px', lineHeight: '45px', color: '#333' }}>Invoice</div>
                      <div><span style={{ fontWeight: 'bold' }}>Created: </span>{getCurrentDate()}</div>
                      
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr className="information">
              <td colSpan={2} style={{ paddingBottom: '40px' }}>
                <table style={{ width: '100%' }}>
                  <tr>
                    <td>
                      <span style={{ fontWeight: 'bold' }}>Savvy Lawn Services</span><br />
                      3201 Lymen Street, <br />
                      Fort Collins, CO 80526
                    </td>
                    <td style={{ textAlign: 'right', maxWidth:'50px', wordWrap: "break-word" }}>
                      <span style={{ fontWeight: 'bold' }}>{customer_name}</span><br />
                      {customer_address}<br />
                    </td>
                  </tr>
                </table>
                
                
              </td>
            </tr>
            <tr>
              <td>
                <div style={{ textAlign: 'center', fontSize: '18px', fontWeight: 'bold' }}>Thank you for your Business!</div><br/>
              <div><span style={{ fontWeight: 'bold' }}>Bill Date: </span>{start_date} - {end_date}</div>
                <table style={{ width: '100%', backgroundColor: '#328525', color: '#fff', borderRadius: '5px', padding: '5px' }}>
                  <thead>
                    <tr>
                      
                      <th style={{ padding: '10px', width: '70%' }}>Item</th>
                      <th style={{ padding: '10px', width: '30%' }}>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {event_services.map((service: any) => (
                      <tr style={{ backgroundColor: '#9FC499' }}>
                        
                        <td style={{ padding: '10px', borderTopLeftRadius: '5px',  width: '70%'}}>
                          {service.service_name}
                        </td>
                        <td style={{ padding: '10px', borderTopRightRadius: '5px', textAlign:'right', width: '30%' }}>
                          ${Number(service.total_service_cost).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                    <tr style={{ backgroundColor: '#9FC499' }}>
                      <td style={{ textAlign: 'right', backgroundColor: '#328525' }}>
                        <span style={{ fontWeight: 'bold' }}>Total:</span>
                      </td>
                      <td style={{ padding: '10px', borderBottomLeftRadius: '5px', borderBottomRightRadius: '5px', textAlign:'right' }}>
                        ${Number(amount).toFixed(2)}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table style={{ width: '100%' }}>
                  <tbody>
                    <tr>
                      <td style={{ width: '37%' }}></td>
                      <td style={{ width: '100%', alignItems: 'center' }}>
                        <div style={{ backgroundColor: '#328525', width: '200px', textAlign: 'center', padding: '10px', color: '#fff', margin: '15px 0px', borderRadius: '15px' }}>
                          <div style={{ fontWeight: 'bold', marginBottom:'5px' }}>You can pay by Zelle here!</div>
                          <div>
                          <img src={zelleURL} width="175px" alt="Savvy Lawns Logo" /></div>
                        </div>
                        
                      </td>
                      <td style={{ width: '37%' }}></td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </table>
        </div>
      </div>
      
    </div>
    <button onClick={handleOpen} >Send Invoice</button> {customer_last_billed ? customer_last_billed : 'Never Billed'}
      <style jsx>{`
        button {
          background-color: ${baselightTheme.palette.primary.light};
          color: #fff;
          padding: 10px 20px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }
        button:hover {
          background-color: #286a1e;
        }
      `}</style>
        <Dialog style={{borderRadius:'45px', height:'auto', width:'400px', padding: '0px'}} open={open} onClose={handleClose}>
             <DialogTitle style={{display:'flex', justifyContent:'center'}}>{title}</DialogTitle>
             <DialogContent >
             <iframe id="pdfEmbed" style={{ width: '100%', height: '525px' }}></iframe></DialogContent>
                <DialogActions>
                    <Button onClick={handleSubmit} color="primary">
                        Email Invoice
                    </Button>
                    <Button onClick={handleDownload} color="primary">
                        Save
                    </Button>
                    <Button onClick={handleClose} color="primary">
                        Close
                    </Button>
                     
                   {/* <Button onClick={handleEmail} color="primary">
                        Email Invoice
                    </Button> */}
                </DialogActions>

        </Dialog>

        <Dialog style={{borderRadius:'45px', height:'auto', width:'400px', padding: '0px'}} open={submission} onClose={handleClose}>
             <DialogTitle style={{display:'flex', justifyContent:'center'}}>URL to Invoice</DialogTitle>
             <DialogContent >
             <a href={`${fileURL}`}>{fileURL}</a>
             <br/>
             <Typography variant='body2'>*Note: This URL is valid for 30 days and the file may be downloaded up to 3 times before it is gone and will need to be regenerated</Typography>
             </DialogContent>
                <DialogActions>
                    <Button onClick={handleEmail} color="primary">
                        Email Invoice
                    </Button>
                    
                    <Button onClick={handleCloseSubmission} color="primary">
                        Close
                    </Button>
                     
                   {/* <Button onClick={handleEmail} color="primary">
                        Email Invoice
                    </Button> */}
                </DialogActions>

        </Dialog>

        <Dialog style={{borderRadius:'45px', height:'auto', width:'400px', padding: '0px'}} open={loading} onClose={handleEndLoading}>
             <DialogTitle style={{display:'flex', justifyContent:'center'}}></DialogTitle>
             <DialogContent >
            
             <Typography variant='body2'>Loading Please Wait</Typography>
             </DialogContent>
                <DialogActions>
               
                     
                   {/* <Button onClick={handleEmail} color="primary">
                        Email Invoice
                    </Button> */}
                </DialogActions>

        </Dialog>

    </React.Fragment>
    
  );
};

export default InvoiceButton;

const Styles = {
  overlayWindow: {
    borderRadius: '45px',
    width: '100%',
    maxWidth: '800px',
    height: '100%',
  },

};