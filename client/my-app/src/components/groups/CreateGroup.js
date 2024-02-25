import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import Select from 'react-select';
import './CreateGroup.css';
import { getToken } from '../../services/authService';

const CreateGroup = () => {
  const [groupName, setGroupName] = useState('');
  const [description, setDescription] = useState('');
  const [members, setMembers] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [currency, setCurrency] = useState('');
  const [category, setCategory] = useState('');
  const history = useHistory();

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const token = getToken();
        const response = await axios.get('/api/groups/users', {
          headers: {
            Authorization: `Bearer ${token}` // Add Authorization header with token
          }
        });
        // Map response data to options for Select component
        const options = response.data.map(member => ({ value: member._id, label: member.username }));
        setMembers(options);
      } catch (error) {
        console.error('Error fetching group members:', error);
      }
    };

    fetchMembers();
  }, []);

  const handleMemberChange = selectedOptions => {
    setSelectedMembers(selectedOptions.map(option => option.value));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const token = getToken();
      const response = await axios.post('/api/groups', {
        name:groupName,
        description,
        members: selectedMembers,
        currency,
        category
      }, {
        headers: {
          Authorization: `Bearer ${getToken()}` // Add Authorization header with token
        }
      });
      console.log('Group created successfully:', response.data);
      history.push('/dashboard');
    } catch (error) {
      console.error('Create group error:', error);
    }
  };

  return (
    <div className="create-group-container">
      <h2 className="create-group-heading">Create Group</h2>
      <form onSubmit={handleSubmit} className="create-group-form">
        <div className="form-group">
          <label htmlFor="groupName">Group Name:</label>
          <input type="text" id="groupName" value={groupName} onChange={e => setGroupName(e.target.value)} className="form-input" />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <input type="text" id="description" value={description} onChange={e => setDescription(e.target.value)} className="form-input" />
        </div>
        {members && members.length > 0 && (
          <div className="form-group">
            <label htmlFor="members">Group Members:</label>
            <Select
              isMulti
              options={members}
              value={members.filter(option => selectedMembers.includes(option.value))}
              onChange={handleMemberChange}
              className="select-dropdown"
            />
          </div>
        )}
        <div className="form-group">
          <label htmlFor="currency">Currency:</label>
          <select id="currency" value={currency} onChange={e => setCurrency(e.target.value)} className="currency-dropdown">
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="category">Category:</label>
          <select id="category" value={category} onChange={e => setCategory(e.target.value)} className="category-dropdown">
            <option value="Food">Food</option>
            <option value="Trip">Trip</option>
            <option value="Office">Office</option>
            <option value="Shopping">Shopping</option>
            <option value="Others">Others</option>
          </select>
        </div>
        <button type="submit" className="create-group-btn">Create</button>
      </form>
    </div>
  );
};

export default CreateGroup;
