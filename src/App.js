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
import TextField from '@mui/material/TextField';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import Stack from '@mui/material/Stack';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import DoNotDisturbAltRoundedIcon from '@mui/icons-material/DoNotDisturbAltRounded';
import Checkbox from '@mui/material/Checkbox';
import toastr from 'toastr';

import moment from 'moment';
import jquery from 'jquery';

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
  let [id, setId] = React.useState(0);
  const [taskComplete, setTaskComplete] = React.useState(false);

  function addRow(title, description, deadline, priority) {
    setTask([
      ...Task,
      {
        id: id,
        title: title,
        description: description,
        deadline: deadline,
        priority: priority,
        isComplete: isComplete,
      },
    ]);
    setId((id) => id + 1);
  }

  let changeTitle = (value) => {
    setTitle(value);
  };

  let changeDescription = (value) => {
    setDescription(value);
  };

  function changeDeadline(value) {
    setDeadline(value);
  }

  function toggleUpdate(id) {
    let index = 0;
    for (let i = 0; i < Task.length; i++) {
      if (Task[i].id == id) {
        index = i;
      }
    }
    setTask((Task) => {
      let newTask = [...Task];
      Task[index].isComplete = !Task[index].isComplete;
      return newTask;
    });
  }

  function checkUnique(newTitle) {
    let titleTaken = 0;
    for (let i = 0; i < Task.length; i++) {
      if (Task[i].title == newTitle) {
        titleTaken = 1;
      }
    }
    return titleTaken;
  }

  toastr.options = {
    positionClass: 'toast-bottom-left',
  };

  function validateValues() {
    if (document.getElementById('nameInput').value == '') {
      setTitleError(true);
      setTitleHelper('Title is Required!');
    } else if (checkUnique(document.getElementById('nameInput').value) == 1) {
      setTitleError(true);
      setTitleHelper('Needs a Unique Title!');
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
      document.getElementById('descriptionInput').value != '' &&
      checkUnique(document.getElementById('nameInput').value) == 0
    ) {
      addRow(
        document.getElementById('nameInput').value,
        document.getElementById('descriptionInput').value,
        document.getElementById('dateInput').value,
        priority
      );
      handleClose();
      toastr.success('Item Successfully Added!');
    }
  }

  function validateEdit() {
    if (document.getElementById('descriptionInput').value == '') {
      setDescriptionError(true);
      setDescriptionHelper('Description is Required!');
    } else if (document.getElementById('descriptionInput').value != '') {
      setDescriptionError(false);
      setDescriptionHelper('');
    }
    if (document.getElementById('descriptionInput').value != '') {
      return 1;
    } else {
      return 0;
    }
  }

  const editRow = (id, description, deadline, priority) => {
    let index = 0;
    for (let i = 0; i < Task.length; i++) {
      if (Task[i].id == id) {
        index = i;
      }
    }
    if (validateEdit() == 1) {
      Task[index].description = description;
      Task[index].deadline = deadline;
      Task[index].priority = priority;
      handleClose();
      toastr.success('Item Successfully Updated!');
    }
  };

  const fillValues = (id) => {
    let index = 0;
    for (let i = 0; i < Task.length; i++) {
      if (Task[i].id == id) {
        index = i;
      }
    }
    setDescription(Task[index].description);
    setDeadline(Task[index].deadline);
    setPriority(Task[index].priority);
  };

  const deleteRow = (id) => {
    let index = 0;
    for (let i = 0; i < Task.length; i++) {
      if (Task[i].id == id) {
        index = i;
      }
    }
    setTask((Task) => {
      let newTask = [...Task];
      newTask.splice(index, 1);
      setTask([...newTask]);
      return newTask;
    });
  };

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
          <Stack component="form" spacing={1}>
            <TextField
              id="nameInput"
              label="Title"
              className={`visible ${appBar ? 'hidden' : ''}`}
              style={{ display: appBar ? 'block' : 'none' }}
              fullWidth
              error={titleError}
              helperText={titleHelper}
              value={title}
              onChange={(e) => changeTitle(e.target.value)}
            />
            <br style={{ display: appBar ? 'block' : 'none' }} />
            <TextField
              id="descriptionInput"
              label="Description"
              style={{ display: 'block' }}
              fullWidth
              error={descriptionError}
              helperText={descriptionHelper}
              value={description}
              onChange={(e) => changeDescription(e.target.value)}
            />
            <br />
            <TextField
              type="date"
              id="dateInput"
              label="Deadline"
              style={{ display: 'block' }}
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
              value={deadline}
              onChange={(e) => changeDeadline(e.target.value)}
            />

            <FormLabel>Priority</FormLabel>
            <RadioGroup
              row
              name="row-radio-buttons-group"
              defaultValue="Low"
              id="radioInputs"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <FormControlLabel value="Low" control={<Radio />} label="Low" />
              <FormControlLabel
                value="Medium"
                control={<Radio />}
                label="Medium"
              />
              <FormControlLabel value="High" control={<Radio />} label="High" />
            </RadioGroup>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              editRow(
                document.getElementById('nameInput').value,
                document.getElementById('descriptionInput').value,
                document.getElementById('dateInput').value,
                priority
              );
            }}
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
              setTitle('');
              setDescription('');
              setDeadline('2022-11-17');
              setPriority('Low');
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
              <TableCell align="center">
                {moment(Task.deadline).format('MM/DD/YYYY')}
              </TableCell>
              <TableCell align="center">{Task.priority}</TableCell>
              <TableCell align="center">
                <Checkbox
                  onClick={() => {
                    toggleUpdate(Task.id);
                  }}
                />
              </TableCell>
              <TableCell align="center">
                {!Task.isComplete ? (
                  <div>
                    <Button
                      onClick={() => {
                        handleClickOpen();
                        handleEditOpen();
                        fillValues(Task.id);
                      }}
                      style={{
                        background: '#1E88E5',
                        color: 'white',
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
                ) : (
                  <></>
                )}
                <div>
                  <Button
                    onClick={() => {
                      deleteRow(Task.id);
                      toastr.success('Item Successfully Deleted!');
                    }}
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
