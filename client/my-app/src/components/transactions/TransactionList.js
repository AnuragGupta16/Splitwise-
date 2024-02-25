import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const TransactionList = () => {
  const { groupId } = useParams();
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await axios.get(`/api/groups/${groupId}/transactions`); // Backend endpoint for calculating transactions
        setTransactions(res.data);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchTransactions();
  }, [groupId]);

  return (
    <div>
      <h2>Transactions</h2>
      <ul>
        {transactions.map(transaction => (
          <li key={transaction._id}>
            From: {transaction.from}, To: {transaction.to}, Amount: {transaction.amount}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionList;
