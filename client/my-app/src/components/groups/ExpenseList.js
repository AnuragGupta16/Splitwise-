import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getToken } from '../../services/authService';
import './ExpenseList.css'; // Import CSS file for styling

const ExpenseList = ({ groupId, setExpenseAdded, ExpenseAdded }) => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await axios.get(`/api/expenses/${groupId}/expenses`, {
          headers: {
            Authorization: `Bearer ${getToken()}` // Add Authorization header with token
          }
        });
        setExpenses(response.data);
        setExpenseAdded(false);
      } catch (error) {
        console.error('Error fetching expenses:', error);
        setExpenseAdded(false);
      }
    };

    fetchExpenses();
  }, [groupId, ExpenseAdded]);

  return (
    <div style={{ fontSize: '2.5rem' }}> {/* Increase font size */}
      <h3 style={{ fontWeight: 'bold', color: '#333' }}>Expenses</h3> {/* Make bold and change color */}
      <table className="expense-table">
        <thead>
          <tr>
            <th>Description</th>
            <th>Amount</th>
            <th>Paid By</th>
            <th>Participants</th>
          </tr>
        </thead>
        <tbody>
          {expenses && expenses.map(expense => (
            <tr key={expense._id}>
              <td>{expense.description}</td>
              <td>{expense.amount}</td>
              <td>{expense.paidBy ? expense.paidBy.username : 'Unknown'}</td>
              <td>
                <ul>
                  {expense.participants.map(participant => (
                    <li key={participant._id}>{participant.username ? participant.username : 'Unknown'}</li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseList;
