
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import {
  Timeline,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
  TimelineDot,
  TimelineConnector,
  TimelineContent,
  timelineOppositeContentClasses,
} from '@mui/lab';
import { Link, Typography } from '@mui/material';
import SimpleAccordion from './SimpleAccordion';
import { baselightTheme } from '@/utils/theme/DefaultColors';

const RecentTransactions = () => {
  return (
    
      
        <Timeline
          className="theme-timeline"
          nonce={undefined}
          onResize={undefined}
          onResizeCapture={undefined}
          sx={{
            p: 0,
            mb: '-40px',
            '& .MuiTimelineConnector-root': {
              width: '1px',
              backgroundColor: baselightTheme.palette.divider
            },
            [`& .${timelineOppositeContentClasses.root}`]: {
              flex: 0.5,
              paddingLeft: 0,
            },
          }}
        >
          
            <SimpleAccordion 
            title={
            <TimelineItem>
              <TimelineOppositeContent>09:30 am</TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot color="primary" variant="outlined" />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent fontWeight="600">Johnson Residence <br/><Typography variant='body2' >Estimated Duration:</Typography><Typography variant='body2' >3.5 hours</Typography></TimelineContent>
            
            
          </TimelineItem>} 
           address={
            <div>
             <Typography variant='body1'>Address:</Typography>
             <Typography variant='body2'>12th Street</Typography>
             <Typography variant='body2'>New York, USA</Typography>

             </div>
         }
            
          contact={
            <div>
            <Typography variant='body1'>Contact:</Typography>
            <Typography variant='body2'>Joe Johnson</Typography>
            <Typography variant='body2'>+1 234 567 890</Typography>
            </div>
          }
           
           services={<div>
            <Typography variant='body1'>Services:</Typography>
            <ul>
              <li><Typography variant='body2' >Mowing and Trimming</Typography></li>
              <li><Typography variant='body2' >Pet Pickup</Typography></li>
              <li><Typography variant='body2' >Hedge Trimming</Typography></li>
            </ul>
            
           </div>}
          />
            
          
            <SimpleAccordion 
            title={
            <TimelineItem>
              <TimelineOppositeContent>09:30 am</TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot color="primary" variant="outlined" />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent fontWeight="600">Johnson Residence <br/><Typography variant='body2' >Estimated Duration:</Typography><Typography variant='body2' >3.5 hours</Typography></TimelineContent>
            
            
          </TimelineItem>} 
           address={
            <div>
             <Typography variant='body1'>Address:</Typography>
             <Typography variant='body2'>12th Street</Typography>
             <Typography variant='body2'>New York, USA</Typography>

             </div>
         }
            
          contact={
            <div>
            <Typography variant='body1'>Contact:</Typography>
            <Typography variant='body2'>Joe Johnson</Typography>
            <Typography variant='body2'>+1 234 567 890</Typography>
            </div>
          }
           
           services={<div>
            <Typography variant='body1'>Services:</Typography>
            <ul>
              <li><Typography variant='body2' >Mowing and Trimming</Typography></li>
              <li><Typography variant='body2' >Pet Pickup</Typography></li>
              <li><Typography variant='body2' >Hedge Trimming</Typography></li>
            </ul>
            
           </div>}
          />
          <SimpleAccordion 
            title={
            <TimelineItem>
              <TimelineOppositeContent>09:30 am</TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot color="primary" variant="outlined" />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent fontWeight="600">Johnson Residence <br/><Typography variant='body2' >Estimated Duration:</Typography><Typography variant='body2' >3.5 hours</Typography></TimelineContent>
            
            
          </TimelineItem>} 
           address={
            <div>
             <Typography variant='body1'>Address:</Typography>
             <Typography variant='body2'>12th Street</Typography>
             <Typography variant='body2'>New York, USA</Typography>

             </div>
         }
            
          contact={
            <div>
            <Typography variant='body1'>Contact:</Typography>
            <Typography variant='body2'>Joe Johnson</Typography>
            <Typography variant='body2'>+1 234 567 890</Typography>
            </div>
          }
           
           services={<div>
            <Typography variant='body1'>Services:</Typography>
            <ul>
              <li><Typography variant='body2' >Mowing and Trimming</Typography></li>
              <li><Typography variant='body2' >Pet Pickup</Typography></li>
              <li><Typography variant='body2' >Hedge Trimming</Typography></li>
            </ul>
            
           </div>}
          />
          <SimpleAccordion 
            title={
            <TimelineItem>
              <TimelineOppositeContent>09:30 am</TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot color="primary" variant="outlined" />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent fontWeight="600">Johnson Residence <br/><Typography variant='body2' >Estimated Duration:</Typography><Typography variant='body2' >3.5 hours</Typography></TimelineContent>
            
            
          </TimelineItem>} 
           address={
            <div>
             <Typography variant='body1'>Address:</Typography>
             <Typography variant='body2'>12th Street</Typography>
             <Typography variant='body2'>New York, USA</Typography>

             </div>
         }
            
          contact={
            <div>
            <Typography variant='body1'>Contact:</Typography>
            <Typography variant='body2'>Joe Johnson</Typography>
            <Typography variant='body2'>+1 234 567 890</Typography>
            </div>
          }
           
           services={<div>
            <Typography variant='body1'>Services:</Typography>
            <ul>
              <li><Typography variant='body2' >Mowing and Trimming</Typography></li>
              <li><Typography variant='body2' >Pet Pickup</Typography></li>
              <li><Typography variant='body2' >Hedge Trimming</Typography></li>
            </ul>
            
           </div>}
          />
         <SimpleAccordion 
            title={
            <TimelineItem>
              <TimelineOppositeContent>09:30 am</TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot color="primary" variant="outlined" />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent fontWeight="600">Johnson Residence <br/><Typography variant='body2' >Estimated Duration:</Typography><Typography variant='body2' >3.5 hours</Typography></TimelineContent>
            
            
          </TimelineItem>} 
           address={
            <div>
             <Typography variant='body1'>Address:</Typography>
             <Typography variant='body2'>12th Street</Typography>
             <Typography variant='body2'>New York, USA</Typography>

             </div>
         }
            
          contact={
            <div>
            <Typography variant='body1'>Contact:</Typography>
            <Typography variant='body2'>Joe Johnson</Typography>
            <Typography variant='body2'>+1 234 567 890</Typography>
            </div>
          }
           
           services={<div>
            <Typography variant='body1'>Services:</Typography>
            <ul>
              <li><Typography variant='body2' >Mowing and Trimming</Typography></li>
              <li><Typography variant='body2' >Pet Pickup</Typography></li>
              <li><Typography variant='body2' >Hedge Trimming</Typography></li>
            </ul>
            
           </div>}
          />
         
        </Timeline>
      
    
  );
};

export default RecentTransactions;
