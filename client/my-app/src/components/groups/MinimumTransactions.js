import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getToken } from '../../services/authService';
import { List, ListItem, ListItemText, Typography, Divider, CircularProgress, Container } from '@mui/material';

const MinimumTransactions = ({ groupId, ExpenseAdded, setExpenseAdded }) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(`/api/expenses/${groupId}/transactions`, {
          headers: {
            Authorization: `Bearer ${getToken()}` // Add Authorization header with token
          }
        });
        setTransactions(response.data);
        setLoading(false);
        setExpenseAdded(false);
      } catch (error) {
        console.error('Error fetching transactions:', error);
        setLoading(false);
        setExpenseAdded(false);
      }
    };

    fetchTransactions();
  }, [groupId, ExpenseAdded]);

  return (
    <Container>
      <Typography variant="h5"   gutterBottom style={{ fontSize: '3rem', textAlign: 'center', color: '#333' }}>Minimum Transactions</Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        <List style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {transactions && transactions.map((transaction, index) => (
            <div key={index} style={{ width: '100%' }}>
              <ListItem style={{ textAlign: 'center', width: '100%' }}>
                <ListItemText>
                  <Typography variant="body1" style={{ fontSize: '2rem', color: '#333', fontWeight: 'bold' }}>
                    {`${transaction.from.username} owes ${transaction.amount} to ${transaction.to.username}`}
                  </Typography>
                </ListItemText>
              </ListItem>
              <Divider />
            </div>
          ))}
        </List>
      )}
    </Container>
  );
};

export default MinimumTransactions;
