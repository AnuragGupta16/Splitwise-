import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getToken } from '../../services/authService';
import Select from 'react-select';
import { makeStyles } from '@mui/styles';
import { Typography, TextField, Button } from '@mui/material';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(3),
  },
  form: {
    width: '100%',
    maxWidth: '400px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: theme.spacing(2),
  },
  input: {
    width: '100%',
    fontSize: '3.0rem',
  },
  label: {
    fontSize: '3.0rem',
    color: theme.palette.primary.main,
  },
  button: {
    fontSize: '3.0rem',
    width: '50%',
  },
  selectContainer: {
    width: '100%',
  },
  select: {
    fontSize: '2.5rem',
    minHeight: '50px', // Increase dropdown box height
  },
  option: {
    fontSize: '2.5rem', // Increase text size of options
  },
}));

const AddExpense = ({ groupId, members,  setExpenseAdded }) => {
  const classes = useStyles();
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [paidBy, setPaidBy] = useState('');
  const [participants, setParticipants] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const participantValues = participants.map(participant => participant.value);
      const response = await axios.post(
        `/api/expenses/${groupId}/expenses`,
        { description, amount, paidBy: paidBy.value, participants: participantValues },
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );

      setExpenseAdded(true);
      console.log('Expense added successfully:', response.data);

      setDescription('');
      setAmount('');
      setPaidBy('');
      setParticipants([]);
    } catch (error) {
      console.error('Error adding expense:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={classes.root}>
      <Typography variant="h3" gutterBottom>Add Expense</Typography>
      <form onSubmit={handleSubmit} className={classes.form}>
        <label htmlFor="description" className={classes.label}>Description:</label>
        <TextField
          type="text"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          variant="outlined"
          className={classes.input}
        />

        <label htmlFor="amount" className={classes.label}>Amount:</label>
        <TextField
          type="number"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          variant="outlined"
          className={classes.input}
        />

        <label htmlFor="paidBy" className={classes.label}>Paid By:</label>
        <div className={classes.selectContainer}>
          <Select
            id="paidBy"
            value={paidBy}
            onChange={(selectedOption) => setPaidBy(selectedOption)}
            options={members.map((member) => ({ value: member._id, label: member.username }))}
            className={classes.select}
            classNamePrefix="select"
          />
        </div>

        <label htmlFor="participants" className={classes.label}>Participants:</label>
        <div className={classes.selectContainer}>
          <Select
            id="participants"
            value={participants}
            onChange={(selectedOptions) => setParticipants(selectedOptions)}
            options={members.map((member) => ({ value: member._id, label: member.username }))}
            isMulti
            className={classes.select}
            classNamePrefix="select"
          />
        </div>

        <Button type="submit" disabled={isLoading} variant="contained" color="primary" className={classes.button}>
          Add Expense
        </Button>
      </form>
    </div>
  );
};

export default AddExpense;
