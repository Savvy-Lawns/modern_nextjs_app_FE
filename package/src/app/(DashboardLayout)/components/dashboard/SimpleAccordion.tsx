import React, { Children } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { baselightTheme } from '@/utils/theme/DefaultColors';
import { nth } from 'lodash';
import { BorderBottom, Padding } from '@mui/icons-material';
import { Button, colors } from '@mui/material';
import { text } from 'stream/consumers';

type Props = {
    title?: JSX.Element;
    address?: JSX.Element;
    contact?: JSX.Element;
    services?: JSX.Element;
    
  };

  
  
  const SimpleAccordion = ({
    title,
    address,
    contact,
    services,    
  }: Props) => {

  return (
    <div>
      <Accordion >
        <AccordionSummary 
          style={styles.AccordionSummaryStyle}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>{title}</Typography>
        </AccordionSummary>
        <AccordionDetails style={styles.AccordionDetailsStyle}>
          <Typography sx={styles.serviceStyle}>
          {services}
          </Typography>
         
          <Typography sx={styles.sidebyside}>
          {address}{contact}
          </Typography>
          <div style={styles.sidebyside}>
          <Button sx={styles.jobbuttons} color='secondary' variant='outlined'>View More</Button>
          <Button sx={styles.jobbuttons} color='secondary' variant='outlined'>Complete</Button>
          </div>
          
          
        </AccordionDetails>
      </Accordion>
      
    </div>
  );
}

export default SimpleAccordion;


const styles: {
  AccordionDetailsStyle: React.CSSProperties;
  AccordionSummaryStyle: React.CSSProperties;
  sidebyside: React.CSSProperties & { flexDirection: 'row' };
  jobbuttons: React.CSSProperties;
  serviceStyle: React.CSSProperties;
} = {
 AccordionDetailsStyle: {
    backgroundColor: baselightTheme.palette.primary.main,
    color: baselightTheme.palette.primary.contrastText,
    
    boxShadow: 'inset 0px -3px 5px 1px rgba(0,0,0,0.75)',
 },
 AccordionSummaryStyle: {
    backgroundColor: baselightTheme.palette.primary.light,
    color: baselightTheme.palette.primary.contrastText,
   
    boxShadow: '0px 2px 2px 1px rgba(0,0,0,0.75)',
    border: ".5px solid rgba(0,0,0,0.75)",
 },
sidebyside: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    textAlign: 'center',
},
 jobbuttons: {
    marginTop: '10px',
    backgroundColor: baselightTheme.palette.secondary.light,
    color: baselightTheme.palette.secondary.contrastText,
    borderRadius: '15px',
 },
serviceStyle:{
    border: '.5px solid rgba(0,0,0,0.65)',
    marginBottom: '10px',
    borderRadius: '15px',
    padding: '8px 0px 10px 15px',
    backgroundColor: 'rgba(256,256,256,0.4)',
    boxShadow: 'inset 0px -2px 2px 1px rgba(0,0,0,0.75)',

},

};