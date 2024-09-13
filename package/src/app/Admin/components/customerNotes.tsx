import React, {use, useEffect, useState} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { baselightTheme } from '@/utils/theme/DefaultColors';
import { TextField, Typography } from '@mui/material';
import { BorderBottom } from '@mui/icons-material';
import withAuth from '@/utils/withAuth';
import axios from 'axios';
import useFetchNotes from '../customers/notes';

interface Note {
    created_at: string;
    note: string;
  }

type Props = {
    
    customer_id: number | string;
    token: string | undefined;
    
};


function ViewNotes({ customer_id, token }: Props) {
    const apiURL =  process.env.NEXT_PUBLIC_API_URL
    const [open, setOpen] = React.useState(false);
    const { notes, loading, error } = useFetchNotes(customer_id, token); 
    const [note, setNote] = React.useState('');
    const [formOpen, setFormOpen] = React.useState(false);
    const notesDeletion: any = []
    
    console.log('notes: ', notes)

    const [displayData, setDisplayData] = React.useState<Array<{ created_at: string; note: string; }>>(Array.isArray(notes) ? notes : []);

   
    useEffect(() => {
        if (notes){
        setDisplayData(notes);
        } 
    }, [notes]);

    const handleClickOpen =  () => {
                setOpen(true);
        };
       
    const handleClose = () => {
        setOpen(false);
    };

    const handleFormOpen = () => {
        setFormOpen(true);
    };

    const handleFormClose = () => {
        setFormOpen(false);
    };

    

    

    // Debugging: Log the type of displayData before calling reduce
   // console.log('Type of displayData:', typeof displayData, Array.isArray(displayData) ? 'Array' : 'Not Array');

   const handleAddNote = async () => {
        const todaysDate = new Date().toISOString();
        const newNote = {
            created_at: todaysDate,
            note,
        };
        if (!note) {
            alert('Please enter a note');
    };
        try {
            const response = await axios.post(`${apiURL}/customers/${customer_id}/customer_notes`, newNote, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
            if (response.status === 200 || response.status === 201) {
                alert('Note added successfully');
                setDisplayData([...displayData, newNote]);
                setNote('');
                handleFormClose();
                
            } else {
                alert('Failed to add note');
            }
        } catch (error) {
            console.error('Error adding note:', error);
        }

    };
    function formatDate(date: string) {
        const dateStr = date;
        const dateConv = new Date(dateStr);
        const month = String(dateConv.getMonth() + 1).padStart(2, '0');
        const day = String(dateConv.getDate()).padStart(2, '0');
        const year = dateConv.getFullYear();
        return `${month}-${day}-${year}`;
    }
    const checkboxChange = (event: React.ChangeEvent<HTMLInputElement>, notes_id:number | string) => {
        if (event.target.checked) {
            notesDeletion.push(notes_id);
        } else {
            const index = notesDeletion.indexOf(notes_id);
            notesDeletion.splice(index, 1);
        }
    };
    const handleNoteDeletionRemoval: any = (noteId: number | string) => {
        const index = notesDeletion.indexOf(noteId);
        notesDeletion.splice(index, 1);
    };

    const handleDeleteNote = async () => {
        const successDeletedNoteIds: any = [];
        if (notesDeletion.length === 0) {
            alert('Please select notes to delete');
            return;
        }else {
        notesDeletion.forEach(async (noteId:string | number) => {
            try {
                const response = await axios.delete(`${apiURL}/customers/${customer_id}/customer_notes/${String(noteId)}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },

        });
        console.log('notesDeletion before:', notesDeletion);

        if (response.status === 200 || response.status === 204) {
            handleNoteDeletionRemoval(noteId);
            console.log('notesDeletion after:', notesDeletion);
            successDeletedNoteIds.push(noteId);
            console.log('successDeletedNoteIds :', successDeletedNoteIds);
            const newDisplayData = displayData.filter((item: any) => item.id !== noteId);

        if (successDeletedNoteIds.length > 0) {
                alert(`${successDeletedNoteIds} have been deleted successfully`);
                window.location.href = `/Admin/customers`
         } else {
            console.log('notesDeletion:', notesDeletion);
            alert(`${notesDeletion} failed to delete`);
        };
        }
    } catch (error) {
        console.error('Error deleting note:', error);
    }
    });
    
}
    
    };

    

    console.log(formatDate('2024-09-12T22:02:49.689Z')); // Output: 09-12-2024
    console.log('displayData:', displayData);

    
    return (
        <React.Fragment>
            <div style={{ display: 'flex', justifyContent: 'center', marginRight:'10px', marginBottom: '10px' }}>
                <Button
                    type="submit"
                    style={{ backgroundColor: baselightTheme.palette.primary.main, color: '#fff', padding: '20px 10px', width:'100%' }}
                    onClick={handleClickOpen}
                >
                    View Notes
                </Button>
            </div>

            <Dialog style={Styles.overlayWindow} open={open} onClose={handleClose} >
                <DialogTitle style={{ display: 'flex', justifyContent: 'center' }}>Notes Details</DialogTitle>
                <DialogContent>
                    <div style={Styles.notesTable}>
                    <Typography variant='body1'>Date</Typography>
                    <Typography variant='body1'>Notes</Typography>
                      </div>
                      
                            {displayData.map((item:any, index) => (
                                <div style={Styles.notesData} key={index}>
                                    <input type="checkbox" onChange={(e) => checkboxChange(e, item.id)} />
                                    <Typography style={{width:"40%"}} variant='body2'>{formatDate(item.created_at)}</Typography>
                                    <Typography style={{width:"60%"}}variant='body2'>{item.note}</Typography>
                                </div>
                            ))}
                       

                    
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteNote} sx={{color:baselightTheme.palette.error.main, }}>Delete</Button>
                    <Button onClick={handleFormOpen}>Add Note</Button>

                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>

            <Dialog style={Styles.overlayWindow} open={formOpen} onClose={handleFormClose} >
                <form onSubmit={handleAddNote}>
                <DialogTitle style={{ display: 'flex', justifyContent: 'center' }}>Add a Note</DialogTitle>
                <DialogContent>
                    
                      <div >
                            
                        <TextField
                            margin="dense"
                            id="note"
                            label="Note"
                            type="text"
                            fullWidth
                            variant="outlined"
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                        />
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleAddNote}>Add Note</Button>

                    <Button onClick={handleFormClose}>Close</Button>
                </DialogActions>
                </form>
            </Dialog>
        </React.Fragment>
    );
} export default withAuth(ViewNotes);

const Styles = {
    overlayWindow: {
        borderRadius: '45px',
        width: '100%',
    },
    notesTable: {
        minWidth: '200px',
        width: '100%',
        display: 'flex',
        height: '100%',
        maxHeight: '1000px',
        marginBottom: '10px',
        justifyContent: 'space-around',

    },
    totalNotes: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    notesData: {
        minWidth: '200px',
        width: '100%',
       display: 'flex',
        height: 'auto',
        maxHeight: '1000px',
        TextAlign: 'center',
        justifyContent: 'space-between',
        borderBottom: "1px solid black",
        marginBottom: "10px",
    }
};