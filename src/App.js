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
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import Stack from '@mui/material/Stack';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import DoNotDisturbAltRoundedIcon from '@mui/icons-material/DoNotDisturbAltRounded';
import Checkbox from '@mui/material/Checkbox';

import moment from 'moment';
import toastr from 'toastr';

let nextId = 0;
let priorityChoice = '';

export default function App() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [priority, setPriority] = useState('');
  const [isComplete, setIsComplete] = useState('');
  const [Task, setTask] = useState([]);
  const [appBar, setAppBar] = React.useState(false);
  const [editBar, setEditBar] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [checked, setChecked] = React.useState(false);
  const [titleError, setTitleError] = React.useState(false);
  const [descriptionError, setDescriptionError] = React.useState(false);
  const [titleHelper, setTitleHelper] = useState('');
  const [descriptionHelper, setDescriptionHelper] = useState('');

  function addRow(title, description, deadline, priority) {
    setTask([
      ...Task,
      {
        id: nextId++,
        title: title,
        description: description,
        deadline: deadline,
        priority: priority,
        isComplete: isComplete,
      },
    ]);
    {Task.map((Task) => (
      console.log(Task.id)
    ))}
  }

  


  function validateValues() {
    if (document.getElementById('nameInput').value == '') {
      setTitleError(true);
      setTitleHelper('Title is Required!');
    } else if (document.getElementById('nameInput').value != '') {
      setTitleError(false);
      setTitleHelper('');
    }
    if (document.getElementById('descriptionInput').value == '') {
      setDescriptionError(true);
      setDescriptionHelper('Description is Required!');
    } else if (document.getElementById('descriptionInput').value != '') {
      setDescriptionError(false);
      setDescriptionHelper('');
    }
    if (
      document.getElementById('nameInput').value != '' &&
      document.getElementById('descriptionInput').value != ''
    ) {
      addRow(
        document.getElementById('nameInput').value,
        document.getElementById('descriptionInput').value,
        moment(document.getElementById('dateInput').value).format('MM/DD/YYYY'),
        priority
      );
      handleClose();
    }
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setAppBar(false);
    setEditBar(false);
  };

  const handleAppOpen = () => {
    setAppBar(true);
  };

  const handleEditOpen = () => {
    setEditBar(true);
  };

  const checkedBox = (nextId) => {
    setChecked(nextId.target.checked);
  };

  return (
    <Container maxWidth="100%">
      <Dialog open={open} onClose={handleClose}>
        <AppBar
          position="static"
          style={{ display: appBar ? 'block' : 'none' }}
        >
          <Toolbar style={{ align: 'center' }}>
            <Typography
              align="center"
              style={{ width: '100%', alignItems: 'center' }}
            >
              <Grid display="flex" justifyContent="center" alignItems="center">
                <AddCircleIcon fontSize="small" />
                &nbsp;Add Task
              </Grid>
            </Typography>
          </Toolbar>
        </AppBar>
        <AppBar
          position="static"
          style={{ display: editBar ? 'block' : 'none' }}
        >
          <Toolbar style={{ align: 'center' }}>
            <Typography
              align="center"
              style={{ width: '100%', alignItems: 'center' }}
            >
              <Grid display="flex" justifyContent="center" alignItems="center">
                <EditRoundedIcon fontSize="small" />
                &nbsp;Edit Task
              </Grid>
            </Typography>
          </Toolbar>
        </AppBar>
        <DialogContent>
          <Stack component="form" validate spacing={1}>
            <TextField
              id="nameInput"
              label="Title"
              className={`visible ${appBar ? 'hidden' : ''}`}
              style={{ display: appBar ? 'block' : 'none' }}
              fullWidth
              error={titleError}
              helperText={titleHelper}
            />
            <br style={{ display: appBar ? 'block' : 'none' }} />
            <TextField
              id="descriptionInput"
              label="Description"
              style={{ display: 'block' }}
              fullWidth
              error={descriptionError}
              helperText={descriptionHelper}
            />
            <br />
            <TextField
              type="date"
              defaultValue={'2022-11-09'}
              id="dateInput"
              label="Deadline"
              style={{ display: 'block' }}
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
            />

            <FormLabel>Priority</FormLabel>
            <RadioGroup
              row
              name="row-radio-buttons-group"
              defaultValue="low"
              id="radioInputs"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <FormControlLabel value="low" control={<Radio />} label="Low" />
              <FormControlLabel
                value="medium"
                control={<Radio />}
                label="Medium"
              />
              <FormControlLabel value="high" control={<Radio />} label="High" />
            </RadioGroup>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            style={{
              background: '#1E88E5',
              color: 'white',
              display: editBar ? 'block' : 'none',
              width: 100,
            }}
          >
            <Grid display="flex" justifyContent="center" alignItems="center">
              <EditRoundedIcon fontSize="small" />
              &nbsp;Edit
            </Grid>
          </Button>
          <Button
            onClick={() => {
              validateValues();
            }}
            style={{
              background: '#1E88E5',
              color: 'white',
              display: appBar ? 'block' : 'none',
              width: 100,
            }}
          >
            <Grid display="flex" justifyContent="center" alignItems="center">
              <AddCircleIcon fontSize="small" />
              &nbsp;Add
            </Grid>
          </Button>
          <Button
            onClick={handleClose}
            style={{ background: '#dc3545', color: 'white', width: 100 }}
          >
            <Grid display="flex" justifyContent="center" alignItems="center">
              <DoNotDisturbAltRoundedIcon fontSize="small" />
              &nbsp;Cancel
            </Grid>
          </Button>
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
              handleClickOpen();
              handleAppOpen();
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
              <TableCell align="center">
                <Checkbox
                  name={nextId}
                  onChange={checkedBox}
                  inputProps={{ 'aria-label': 'controlled' }}
                />
              </TableCell>
              <TableCell align="center">
                <div>
                  <Button
                    onClick={() => {
                      console.log(Task);
                      handleClickOpen();
                      handleEditOpen();
                    }}
                    style={{
                      background: '#1E88E5',
                      color: 'white',
                      display: appBar ? 'none' : '',
                      width: 100,
                    }}
                  >
                    <Grid
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <EditRoundedIcon fontSize="small" />
                      &nbsp;Update
                    </Grid>
                  </Button>
                </div>
                <div>
                  <Button
                    onClick={handleClose}
                    style={{
                      background: '#dc3545',
                      color: 'white',
                      width: 100,
                    }}
                  >
                    <Grid
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <DoNotDisturbAltRoundedIcon fontSize="small" />
                      &nbsp;Delete
                    </Grid>
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
}
