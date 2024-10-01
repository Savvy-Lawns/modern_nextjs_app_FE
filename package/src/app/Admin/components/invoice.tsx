import React from 'react';
import { baselightTheme } from '@/utils/theme/DefaultColors';

type Props = {
  customer_name: string;
  customer_address: string;
  customer_email: string;
  start_date: string;
  end_date: string;
  
  amount: number | string;
  event_services: any[];
};

const InvoiceButton: React.FC<Props> = ({ customer_name, customer_address, customer_email, start_date, end_date, event_services, amount }) => {
  const handleClick = () => {
    const emailBody = `
      <div style="max-width: 800px; margin: auto; padding: 30px; border: 1px solid #eee; background: #fff; box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);">
        <table style="width: 100%; line-height: inherit;">
            <tr class="top">
                <td colspan="2" style="padding-bottom: 20px;">
                    <table style="width: 100%;">
                        <tr>
                            <td>
                                <div>
                                    <img src="./SavvyLawnsLogo.png" width="175px" alt="Savvy Lawns Logo" /><br />
                                </div>
                            </td>
                            <td style="text-align: right;">
                                <div style="font-size: 45px; line-height: 45px; color: #333;">Invoice</div>
                                <div><span style="font-weight: bold;">Created: </span>January 1, 2024</div>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
            <tr class="information">
                <td colspan="2" style="padding-bottom: 40px;">
                    <table style="width: 100%;">
                        <tr>
                            <td>
                                <span style="font-weight: bold;">Savvy Lawn Services</span><br />
                                3201 Lymen Street, <br />
                                Fort Collins, CO 80526
                            </td>
                            <td style="text-align: right;">
                                <span style="font-weight: bold;">Customer Name</span><br />
                                ${customer_address}<br />
                            </td>
                        </tr>
                    </table>
                    <div style="text-align: center; font-size: 18px; font-weight: bold;">Thank you for your Business!</div>
                </td>
            </tr>
            <tr>
                <td>
                    <table style="width: 100%; background-color: #328525; color: #fff; border-radius: 5px; padding: 5px;">
                        <thead>
                            <tr>
                                <th style="padding: 10px;">Item</th>
                                <th style="padding: 10px;">Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${event_services.map((service: any) => `
                            <tr style="background-color: #9FC499;">
                                <td style="padding: 10px; border-top-left-radius: 5px;">
                                    ${service.service_name}
                                </td>
                                <td style="padding: 10px; border-top-right-radius: 5px;">
                                    ${service.total_service_cost}
                                </td>
                            </tr>`).join('')}
                            <tr style="background-color: #9FC499;">
                                <td style="text-align: right; background-color: #328525;">
                                    <span style="font-weight: bold;">Total:</span>
                                </td>
                                <td style="padding: 10px; border-bottom-left-radius: 5px; border-bottom-right-radius: 5px;">
                                    ${amount}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <table style="width: 100%;">
                        <tbody>
                            <tr>
                                <td style="width: 37%;"></td>
                                <td style="width: 100%; align-items: center;">
                                    <div style="background-color: #328525; width: 200px; text-align: center; padding: 10px; color: #fff; margin: 15px 0px; border-radius: 15px;">
                                        <span style="font-weight: bold;">insert QR code Here</span>
                                    </div>
                                </td>
                                <td style="width: 37%;"></td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
        </table>
    </div>
      
    `;

    const mailtoLink = `mailto:${customer_email}?subject=${encodeURIComponent(`Invoice for ${start_date} - ${end_date}`)}&body=${encodeURIComponent(emailBody)}`;
    window.location.href = mailtoLink;
    console.log('mailto link: ', mailtoLink);
  };
  

  return (
    <div>
      <button onClick={handleClick} >Send Invoice</button>
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
    </div>
  );
};

export default InvoiceButton;