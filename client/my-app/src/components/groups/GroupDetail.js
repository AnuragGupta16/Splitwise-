import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { getToken } from '../../services/authService';
import ExpenseList from './ExpenseList';
import AddExpense from './addExpense';
import MinimumTransactions from './MinimumTransactions';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  card: {
    marginBottom: theme.spacing(4),
    backgroundColor: '#f9f9f9', // Light background color
    boxShadow: 'none', // Remove box shadow
  },
  content: {
    fontWeight: 'bold', // Make content bold
    color: '#333', // Dark color
    fontSize: '8rem', // Increase font size
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: theme.spacing(4),
  },
  button: {
    marginRight: theme.spacing(2),
    fontSize: '5rem', // Increase font size of button text
    size:'large'
  },
}));

const GroupDetail = () => {
  const { groupId } = useParams();
  const [group, setGroup] = useState(null);
  const [expenseAdded, setExpenseAdded] = useState(false);
  const [activeButton, setActiveButton] = useState('expenses');
  const classes = useStyles();

  useEffect(() => {
    const fetchGroup = async () => {
      try {
        const response = await axios.get(`/api/groups/${groupId}`, {
          headers: {
            Authorization: `Bearer ${getToken()}`
          }
        });
        setGroup(response.data);
      } catch (error) {
        console.error('Error fetching group details:', error);
      }
    };

    fetchGroup();
  }, [groupId]);

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  return (
    <div className={classes.root}>
      <Typography  style={{ fontSize: '5rem' }} variant="h4" gutterBottom align="center">Group Detail</Typography>
      {group && (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card className={classes.card}>
              <CardContent>
                <Typography variant="h5"   style={{ fontSize: '3rem' }} className={classes.content}>Name:</Typography>
                <Typography   style={{ fontSize: '2rem' }} className={classes.content}>{group.name}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card className={classes.card}>
              <CardContent>
                <Typography variant="h5"   style={{ fontSize: '3rem' }} className={classes.content}>Description:</Typography>
                <Typography  className={classes.content} style={{ fontSize: '2rem' }}>{group.description}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card className={classes.card}>
              <CardContent>
                <Typography variant="h5"   style={{ fontSize: '3rem' }} className={classes.content}>Category:</Typography>
                <Typography    style={{ fontSize: '2rem' }} className={classes.content}>{group.category}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card className={classes.card}>
              <CardContent>
                <Typography    style={{ fontSize: '3rem' }} variant="h5" className={classes.content}>Currency:</Typography>
                <Typography    style={{ fontSize: '2rem' }} className={classes.content}>{group.currency}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
          <Paper className={classes.buttonContainer}>
  <Button
    onClick={() => handleButtonClick('expenses')}
    variant="contained"
    color="primary"
    size="large"
    style={{ width: '300px', height: '70px', fontSize: '1.5rem' }} // Adjust width and font size
  >
    Show Expenses
  </Button>
  <Button
    onClick={() => handleButtonClick('transactions')}
    variant="contained"
    color="primary"
    size="large"
    style={{ width: '300px', height: '70px', fontSize: '1.5rem' }} // Adjust width and font size
  >
    Show Transactions
  </Button>
  <Button
    onClick={() => handleButtonClick('addExpense')}
    variant="contained"
    color="primary"
    size="large"
    style={{ width: '300px', height: '70px', fontSize: '1.5rem' }} // Adjust width and font size
  >
    Add Expense
  </Button>
</Paper>

          </Grid>
          <Grid item xl={12}>
            {activeButton === 'expenses' && (
              <ExpenseList groupId={groupId} expenseAdded={expenseAdded} setExpenseAdded={setExpenseAdded} />
            )}
            {activeButton === 'addExpense' && (
              <AddExpense groupId={groupId} members={group.members} expenseAdded={expenseAdded} setExpenseAdded={setExpenseAdded} />
            )}
            {activeButton === 'transactions' && (
              <MinimumTransactions groupId={groupId} expenseAdded={expenseAdded} setExpenseAdded={setExpenseAdded} />
            )}
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default GroupDetail;
