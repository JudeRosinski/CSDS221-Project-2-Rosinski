import * as React from 'react';
import './style.css';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { useState } from 'react';
import Container from '@mui/material/Container';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

let nextId = 0;

export default function App() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [priority, setPriority] = useState('');
  const [isComplete, setIsComplete] = useState('');
  const [Task, setTask] = useState([]);

  function addRow() {
    setTask([
      ...Task,
      {
        id: nextId++,
        title: 'title',
        description: 'Description',
        deadline: 'deadline',
        priority: 'priority',
        isComplete: 'isComplete',
      },
    ]);
  }

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container maxWidth="100%">
      <Dialog open={open} onClose={handleClose}>
        <AppBar position="static">
          <Toolbar style={{ align: 'center' }}>
            <Typography
              align="center"
              style={{ width: '100%', alignItems: 'center' }}
            >
              <Grid display="flex" justifyContent="center" alignItems="center">
                <MenuIcon />
                &nbsp;FRAMEWORKS
              </Grid>
            </Typography>
          </Toolbar>
        </AppBar>
        <DialogContent>
          <TextField
            required
            id="outlined-required"
            label="Required"
            defaultValue="Hello World"
          />
<br />
<br />
<TextField
          required
          id="outlined-required"
          label="Required"
          defaultValue="Hello World"
        />
        <br />
        <br />
        <TextField
          required
          id="outlined-required"
          label="Required"
          defaultValue="Hello World"
        />

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Subscribe</Button>
        </DialogActions>
      </Dialog>
      <AppBar position="static">
        <Toolbar style={{ align: 'center' }}>
          <Typography
            align="center"
            style={{ width: '100%', alignItems: 'center' }}
          >
            <Grid display="flex" justifyContent="center" alignItems="center">
              <MenuIcon />
              &nbsp;FRAMEWORKS
            </Grid>
          </Typography>
          <Button
            variant="contained"
            id="addButton"
            style={{ width: '7%' }}
            onClick={() => {
              addRow();
              handleClickOpen();
            }}
          >
            <AddCircleIcon fontSize="small" />
            &nbsp;Add
          </Button>
        </Toolbar>
      </AppBar>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center">Title</TableCell>
            <TableCell align="center">Description</TableCell>
            <TableCell align="center">Deadline</TableCell>
            <TableCell align="center">Priority</TableCell>
            <TableCell align="center">Is Complete</TableCell>
            <TableCell align="center">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Task.map((Task) => (
            <TableRow key={Task.id}>
              <TableCell align="center">{Task.title}</TableCell>
              <TableCell align="center">{Task.description}</TableCell>
              <TableCell align="center">{Task.deadline}</TableCell>
              <TableCell align="center">{Task.priority}</TableCell>
              <TableCell align="center">{Task.isComplete}</TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
}
